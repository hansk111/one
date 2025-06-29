import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { Platform } from "react-native";
import { logoutAuth, setAuth } from "../auth/authSlice";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from "../auth/tokenManager";

interface RefreshResponse {
  access: string;
}

// 환경 정보 로깅
const logEnvironmentInfo = () => {
  console.log("=== ENVIRONMENT INFO ===");
  console.log("Platform.OS:", Platform.OS);
  console.log("EXPO_PUBLIC_HOST:", process.env.EXPO_PUBLIC_HOST);
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log(
    "__DEV__:",
    typeof __DEV__ !== "undefined" ? __DEV__ : "undefined"
  );
  console.log("typeof window:", typeof window);
  console.log("========================");
};

// 앱 시작 시 환경 정보 로깅
logEnvironmentInfo();

// 안전한 baseUrl 가져오기
const getBaseUrl = () => {
  const host = process.env.EXPO_PUBLIC_HOST;
  if (!host) {
    console.error("❌ EXPO_PUBLIC_HOST is not defined!");
    // 여기에 fallback URL을 설정하세요
    return "https://smarthan.site"; // 실제 API 도메인으로 변경
  }
  const baseUrl = `${host}/api`;
  console.log("✅ Using baseUrl:", baseUrl);
  return baseUrl;
};

// 플랫폼 감지 개선
// const isWeb = Platform.OS === "web" || typeof window !== "undefined";
const isWeb = Platform.OS === "web";
const isNative = !isWeb;

console.log("Platform detection:", {
  "Platform.OS": Platform.OS,
  isWeb,
  isNative,
});

const mutex = new Mutex();

const baseQueryAndroid = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: async (headers) => {
    console.log("🔧 Preparing headers for Android...");
    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        console.log("✅ Access token added to headers");
      } else {
        console.log("⚠️ No access token found");
      }
    } catch (error) {
      console.error("❌ Error getting access token:", error);
    }
    return headers;
  },
});

const baseQueryWeb = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  const baseQuery = isWeb ? baseQueryWeb : baseQueryAndroid;
  console.log(`🚀 Making request with ${isWeb ? "web" : "native"} base query`);

  let result = await baseQuery(args, api, extraOptions);

  // 요청 결과 로깅
  if (result.error) {
    console.log("❌ Request failed:", {
      status: result.error.status,
      data: result.error.data,
      url: typeof args === "string" ? args : args.url,
    });
  } else {
    console.log("✅ Request successful");
  }

  // 401 에러 처리
  const isRefreshRequest =
    typeof args === "object" && "url" in args && args.url === "/jwt/refresh/";

  if (result.error && result.error.status === 401 && !isRefreshRequest) {
    console.log("🔄 Attempting token refresh...");

    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        let refreshResult;

        if (isWeb) {
          console.log("🌐 Refreshing token for web (cookie-based)");
          refreshResult = await baseQuery(
            {
              url: "/jwt/refresh/",
              method: "POST",
            },
            api,
            extraOptions
          );
        } else {
          console.log("📱 Refreshing token for native (token-based)");
          const refreshToken = await getRefreshToken();

          if (!refreshToken) {
            console.log("❌ No refresh token found, logging out");
            api.dispatch(logoutAuth());
            return result;
          }

          console.log("🔑 Refresh token found, attempting refresh");
          refreshResult = await baseQuery(
            {
              url: "/jwt/refresh/",
              method: "POST",
              body: { refresh: refreshToken },
            },
            api,
            extraOptions
          );
        }

        if (refreshResult.data) {
          console.log("✅ Token refresh successful");

          if (
            isNative &&
            refreshResult.data &&
            typeof refreshResult.data === "object" &&
            "access" in refreshResult.data
          ) {
            await saveAccessToken(
              (refreshResult.data as RefreshResponse).access
            );
            console.log("💾 New access token saved");
          }

          api.dispatch(setAuth());
          console.log("🔄 Retrying original request");
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("❌ Token refresh failed, logging out");
          api.dispatch(logoutAuth());
        }
      } catch (error) {
        console.error("❌ Token refresh error:", error);
        api.dispatch(logoutAuth());
      } finally {
        release();
      }
    } else {
      console.log("⏳ Waiting for ongoing token refresh...");
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Todos", "Avatar", "Category"],
  endpoints: (builder) => ({}),
});

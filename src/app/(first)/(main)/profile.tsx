import {
  useGetUserAvatarQuery,
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/store/auth/authApiSlice";
import { logoutAuth } from "@/store/auth/authSlice";
import { deleteAllTokens } from "@/store/auth/tokenManager";
import { useDispatch } from "@/store/hooks";

import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();
  const handlelogoutButton = async () => {
    try {
      const res = await logout({}).unwrap();
      dispatch(logoutAuth());

      if (Platform.OS === "android") {
        await deleteAllTokens();
      }
      console.log("로그아웃 성공:", res);
      router.push("/signin");
    } catch (error: any) {
      console.error("로그인 실패:", error);
      alert(error.message || "로그인 실패");
    }
  };
  const { data: user } = useRetrieveUserQuery();
  const { data: avatar } = useGetUserAvatarQuery();

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{user?.first_name}</Text>
      <Text>{user?.last_name}</Text>
      {/* <Text>{user?.id}</Text> */}
      <Text>{user?.email}</Text>
      <Text>{avatar?.image.replace("http://", "https://")}</Text>

      <Image
        className="h-40 w-40 rounded-full bg-red border border-red-500"
        resizeMode="cover"
        source={{ uri: avatar?.image.replace("http://", "https://") }}
      ></Image>

      <TouchableOpacity
        onPress={handlelogoutButton}
        className="bg-blue-500 justify-center items-center rounded-md p-2 my-5"
      >
        <Text>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 경기도 버스 정보 API 서비스키 (실제 사용시 발급받아서 사용해야 합니다)
const API_KEY =
  "aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D";
const BASE_URL = "https://apis.data.go.kr/6410000";

export const busApi = createApi({
  reducerPath: "busApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apis.data.go.kr/6410000",
  }),
  tagTypes: ["BusRoute", "BusStop", "BusArrival", "BusInfo"],
  endpoints: (builder) => ({
    // 근처 버스 정류장 검색
    getNearbyBusStops: builder.query({
      query: ({ x = 127.111209047, y = 37.394726159, radius = 500 }) =>
        `/busstationservice/v2/getBusStationAroundListv2?serviceKey=${API_KEY}&x=${x}&y=${y}&radius=${radius}`,
      transformResponse: (response) => {
        return response.response.msgBody?.busStationAroundList || [];
      },
      providesTags: ["BusStop"],
    }),

    // 버스 정류장 검색
    getBusStops: builder.query({
      query: ({ keyword = "", pageNo = 1 }) =>
        `/busstationservice/v2/getBusStationListv2?serviceKey=${API_KEY}&keyword=${encodeURIComponent(
          keyword
        )}&pageNo=${pageNo}`,
      transformResponse: (response) => {
        return response.response.msgBody?.busStationList || [];
      },
      providesTags: ["BusStop"],
    }),

    getBusRoutes: builder.query({
      query: ({ keyword = "", pageNo = 1 }) =>
        `/busrouteservice/v2/getBusRouteListv2?serviceKey=${API_KEY}&keyword=${encodeURIComponent(
          keyword
        )}&pageNo=${pageNo}`,
      transformResponse: (response) => {
        return response.response.msgBody?.busRouteList || [];
      },
      providesTags: ["BusRoute"],
    }),

    getBusArrivalInfo: builder.query({
      query: ({ id }) =>
        `/busarrivalservice/v2/getBusArrivalListv2?serviceKey=${API_KEY}&stationId=${id}`,
      transformResponse: (response) => {
        return response.response.msgBody?.busArrivalList || [];
      },
      providesTags: ["BusArrival"],
    }),

    // 특정 노선의 정류장 목록
    getRouteStations: builder.query({
      query: ({ routeId }) =>
        `/busrouteservice/v2/getBusRouteStationListv2?serviceKey=${API_KEY}&routeId=${routeId}`,
      transformResponse: (response) => {
        return response.response.msgBody?.busRouteStationList || [];
      },
      providesTags: ["BusStop"],
    }),

    // 특정 노선의 정보
    getRouteInfoItem: builder.query({
      query: ({ routeId }) =>
        `/busrouteservice/v2/getBusRouteInfoItemv2?serviceKey=${API_KEY}&routeId=${routeId}`,
      transformResponse: (response) => {
        return response.response.msgBody.busRouteInfoItem || null;
      },
      providesTags: ["BusInfo"],
    }),

    // 버스 정류장 검색
    // getBusStops: builder.query<BusStop[], { keyword?: string; pageNo?: number }>({
    //     query: ({ keyword = '', pageNo = 1 }) =>
    //         `/getBusStationList?serviceKey=${API_KEY}&keyword=${encodeURIComponent(keyword)}&pageNo=${pageNo}`,
    //     transformResponse: (response: ApiResponse<BusStopListResponse>) => {
    //         return response.msgBody?.busStationAroundList || [];
    //     },
    //     providesTags: ['BusStop'],
    // }),

    // 근처 버스 정류장 검색
    // getNearbyBusStops: builder.query<BusStop[], { x: number; y: number; radius?: number }>({
    //     query: ({ x = 127.111209047, y = 37.394726159, radius = 500 }) =>
    //         `/getBusStationAroundListv2?serviceKey=${API_KEY}&x=${x}&y=${y}&radius=${radius}`,
    //     transformResponse: (response: ApiResponse<BusStopListResponse>) => {
    //         return response.msgBody?.busStationAroundList || [];
    //     },
    //     providesTags: ['BusStop'],
    // }),

    // 버스 도착 정보
    // getBusArrivalInfo: builder.query<BusArrival[], { stationId: string }>({
    //     query: ({ stationId }) =>
    //         `/getBusArrivalList?serviceKey=${API_KEY}&stationId=${stationId}`,
    //     transformResponse: (response: ApiResponse<BusArrivalResponse>) => {
    //         return response.msgBody?.busArrivalList || [];
    //     },
    //     providesTags: ['BusArrival'],
    // }),

    // 특정 노선의 정류장 목록
    // getRouteStations: builder.query<BusStop[], { routeId: string }>({
    //     query: ({ routeId }) =>
    //         `/getBusRouteStationList?serviceKey=${API_KEY}&routeId=${routeId}`,
    //     transformResponse: (response: ApiResponse<BusStopListResponse>) => {
    //         return response.msgBody?.busStationAroundList || [];
    //     },
    //     providesTags: ['BusStop'],
    // }),
  }),
});

export const {
  useGetBusRoutesQuery,
  useGetBusStopsQuery,
  useGetNearbyBusStopsQuery,
  useGetBusArrivalInfoQuery,
  useGetRouteStationsQuery,
  useGetRouteInfoItemQuery,
  useLazyGetBusRoutesQuery,
  useLazyGetBusStopsQuery,
  useLazyGetNearbyBusStopsQuery,
  useLazyGetBusArrivalInfoQuery,
  useLazyGetRouteStationsQuery,
} = busApi;

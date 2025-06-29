import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import { BusStopCard, EmptyState, Loading } from "@/components/bus";
import {
  useGetRouteInfoItemQuery,
  useGetRouteStationsQuery,
} from "@/store/bus/busApi";
import { addFavorite, removeFavorite } from "@/store/bus/busSlice";
import type { RootState } from "@/store/store";
import type { BusRoute } from "@/types";

interface BusRouteDetailScreenProps {
  route: BusRoute;
  onBack: () => void;
  onStopPress: (stopId: string) => void;
}

export const BusRouteDetailScreen: React.FC<BusRouteDetailScreenProps> = ({
  route,
  onBack,
  onStopPress,
}) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.bus);
  const isFavorite = favorites.includes(route.routeId);

  console.log("route", route.routeId);
  const {
    data: stations = [],
    isLoading,
    error,
    refetch,
  } = useGetRouteStationsQuery({ routeId: route.routeId });
  console.log("stations", stations);
  const { data: businfo } = useGetRouteInfoItemQuery({
    routeId: route.routeId,
  });

  console.log("businfo", businfo);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(route.routeId));
      Alert.alert("알림", "즐겨찾기에서 제거되었습니다.");
    } else {
      dispatch(addFavorite(route.routeId));
      Alert.alert("알림", "즐겨찾기에 추가되었습니다.");
    }
  };

  const getRouteTypeColor = (routeTypeName: string) => {
    switch (routeTypeName) {
      case "직행좌석형시내버스":
        return "bg-red-500";
      case "좌석형시내버스":
        return "bg-blue-500";
      case "일반형시내버스":
        return "bg-green-500";
      case "광역급행형시내버스":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center p-8">
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text className="text-gray-700 text-lg font-medium mt-4">
            노선 정보를 불러올 수 없습니다
          </Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">
            네트워크 상태를 확인하고 다시 시도해주세요
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-lg px-6 py-3 mt-4"
            onPress={refetch}
          >
            <Text className="text-white font-medium">다시 시도</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* 헤더 */}
      <View className="bg-white px-4 py-3 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={onBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-bold text-gray-800 flex-1 text-center mr-10">
            노선 정보
          </Text>
        </View>

        {/* 노선 정보 */}
        <View className="bg-gray-50 rounded-lg p-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1">
              <View
                className={`px-3 py-1 rounded-lg ${getRouteTypeColor(
                  businfo?.routeTypeName
                )}`}
              >
                <Text className="text-white text-sm font-bold">
                  {businfo?.routeTypeName}
                </Text>
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-2xl font-bold text-gray-800">
                  {businfo?.routeName}
                </Text>
                <Text className="text-sm text-gray-600">
                  {businfo?.companyName}
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={handleToggleFavorite} className="p-2">
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#EF4444" : "#9CA3AF"}
              />
            </TouchableOpacity>
          </View>

          {/* 운行 시간 정보 */}
          <View className="bg-white rounded-lg p-4">
            <Text className="text-sm font-semibold text-gray-700 mb-3">
              운행 정보
            </Text>

            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                평일 기점({businfo?.startStationName}) 첫차/막차
              </Text>
              <Text className="text-sm font-medium text-gray-800">
                {businfo?.upFirstTime} / {businfo?.upLastTime}
              </Text>
            </View>

            {/* <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                평일 기점({businfo?.startStationName}) 막차시간(상행)
              </Text>
              <Text className="text-sm font-medium text-gray-800">
                {businfo?.upLastTime}
              </Text>
            </View> */}

            <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                평일 종점({businfo?.endStationName}) 첫차/막차
              </Text>
              <Text className="text-sm font-medium text-gray-800">
                {businfo?.downFirstTime} / {businfo?.downLastTime}
              </Text>
            </View>

            {/* <View className="flex-row justify-between mb-2">
              <Text className="text-sm text-gray-600">
                평일 종점({businfo?.endStationName}) 막차시간(하행)
              </Text>
              <Text className="text-sm font-medium text-gray-800">
                {businfo?.downLastTime}
              </Text>
            </View> */}

            <View className="border-t border-gray-200 pt-3 mt-3">
              <View className="flex-row justify-between mb-1">
                <Text className="text-sm text-gray-600">평일 배차시간</Text>
                <Text className="text-sm font-medium text-gray-800">
                  {businfo?.peekAlloc}분 ~ {businfo?.nPeekAlloc}분
                </Text>
              </View>
            </View>

            {businfo?.companyTel && (
              <View className="border-t border-gray-200 pt-3 mt-3">
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm text-gray-600">운수회사 연락처</Text>
                  <Text className="text-sm font-medium text-blue-600">
                    {businfo?.companyTel}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* 정류장 목록 */}
      <View className="flex-1">
        <View className="px-4 py-3 bg-white border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-800">
            경유 정류장 ({stations.length}개)
          </Text>
        </View>

        {isLoading ? (
          <Loading message="정류장 목록을 불러오는 중..." />
        ) : stations.length > 0 ? (
          <ScrollView
            className="flex-1 px-4"
            showsVerticalScrollIndicator={false}
          >
            <View className="py-4">
              {stations.map((station: any, index: number) => (
                <View key={`${station.stationId}-${index}`} className="mb-3">
                  <View className="flex-row items-center mb-2">
                    <View className="w-6 h-6 bg-primary rounded-full items-center justify-center mr-3">
                      <Text className="text-white text-xs font-bold">
                        {index + 1}
                      </Text>
                    </View>
                    <View className="h-px bg-gray-200 flex-1" />
                  </View>
                  <BusStopCard
                    stop={station}
                    onPress={() => onStopPress(station.stationId)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        ) : (
          <EmptyState
            title="정류장 정보가 없습니다"
            subtitle="잠시 후 다시 시도해주세요"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

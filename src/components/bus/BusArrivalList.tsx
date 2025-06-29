import type { BusArrival } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

interface BusArrivalCardProps {
  arrival: BusArrival;
}

const BusArrivalCard: React.FC<BusArrivalCardProps> = ({ arrival }) => {
  const formatTime = (seconds: number) => {
    if (seconds <= 0) return '곧 도착';
    if (seconds < 60) return `${seconds}초`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}분`;
  };

  const getStatusColor = (time: number) => {
    if (time <= 0) return 'text-red-600';
    if (time <= 300) return 'text-orange-600'; // 5분 이하
    return 'text-green-600';
  };

  return (
    <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-blue-500 rounded items-center justify-center mr-3">
            <Text className="text-white font-bold text-xs">{arrival.routeName}</Text>
          </View>
          <Text className="text-lg font-semibold text-gray-800">{arrival.routeName}번</Text>
          <Text className="text-lg font-semibold text-gray-800 ml-6">{arrival.routeDestName} 행</Text>
        </View>

        <View className="items-end">
          <Text className="text-xs text-gray-500">정류장 순서</Text>
          <Text className="text-sm font-medium text-gray-700">{arrival.staOrder}번째</Text>
        </View>
      </View>

      <View className="space-y-2">
        {/* 첫 번째 버스 */}
        <View className="flex-row items-center justify-between bg-gray-50 rounded-lg p-3">
          <View className="flex-row items-center">
            <Ionicons
              name="bus"
              size={16}
              color={arrival.lowPlate1 === 1 ? "#10B981" : "#6B7280"}
            />
            <Text className="ml-2 text-sm text-gray-700">
              1번째 버스 {arrival.lowPlate1 === 1 ? '(저상)' : ''}
            </Text>
            <Text className="ml-2 text-sm text-gray-700">
              {arrival.stationNm1}
            </Text>
          </View>
          <View className="items-end">
            <Text className={`text-sm font-bold ${getStatusColor(arrival.predictTimeSec1)}`}>
              {formatTime(arrival.predictTimeSec1)}
            </Text>
            <Text className="text-xs text-gray-500">
              {arrival.locationNo1}번째 전
            </Text>
          </View>
        </View>

        {/* 두 번째 버스 */}
        {arrival.predictTime2 > 0 && (
          <View className="flex-row items-center justify-between bg-gray-50 rounded-lg p-3">
            <View className="flex-row items-center">
              <Ionicons
                name="bus"
                size={16}
                color={arrival.lowPlate2 === 1 ? "#10B981" : "#6B7280"}
              />
              <Text className="ml-2 text-sm text-gray-700">
                2번째 버스 {arrival.lowPlate2 === 1 ? '(저상)' : ''}
              </Text>
              <Text className="ml-2 text-sm text-gray-700">
                {arrival.stationNm2}
              </Text>
            </View>
            <View className="items-end">
              <Text className={`text-sm font-bold ${getStatusColor(arrival.predictTimeSec2)}`}>
                {formatTime(arrival.predictTimeSec2)}
              </Text>
              <Text className="text-xs text-gray-500">
                {arrival.locationNo2}번째 전
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

interface BusArrivalListProps {
  arrivals: BusArrival[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const BusArrivalList: React.FC<BusArrivalListProps> = ({
  arrivals,
  isLoading,
  onRefresh,
}) => {
  if (arrivals.length === 0 && !isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Ionicons name="bus-outline" size={64} color="#9CA3AF" />
        <Text className="text-gray-500 text-lg mt-4">도착 정보가 없습니다</Text>
        <Text className="text-gray-400 text-sm mt-2">잠시 후 다시 시도해주세요</Text>
      </View>
    );
  }
  
  // Ensure arrivals is always an array
  const arrivalsArray = Array.isArray(arrivals) ? arrivals : [arrivals];

  return (
    <ScrollView
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View className="p-4">
        {arrivalsArray.map((arrival, index) => (
          <BusArrivalCard key={`${arrival.routeId}-${index}`} arrival={arrival} />
        ))}
      </View>
    </ScrollView>
  );
};

import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const Bus_layout = () => {
  const router = useRouter();

  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="bushome"
        options={{
          title: "경기도 버스 정보",
          popToTopOnBlur: true,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "bus" : "bus-outline"}
              size={24}
              color={color}
            />
          ),
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => router.replace("/apps")}
            >
              <Ionicons name="arrow-back-circle" size={40} color="pink" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="busroutedetail"
        options={{
          title: "Bus Route Detail",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "eye" : "eye-outline"}
              size={24}
              color={color}
            />
          ),
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              className="ml-4"
              onPress={() => router.navigate("/(first)/(main)")}
            >
              <Ionicons name="arrow-back-circle" size={40} color="pink" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default Bus_layout;

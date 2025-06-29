import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const Mp3player_layout = () => {
  const router = useRouter();

  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="mp3player"
        options={{
          title: "MP3 Player",
          popToTopOnBlur: true,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "musical-notes" : "musical-notes-outline"}
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
            <TouchableOpacity className="ml-4" onPress={() => router.back()}>
              <Ionicons name="home" size={24} color="blue" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="favor"
        options={{
          title: "Favor",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "search-sharp" : "search-outline"}
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
              <Ionicons name="home" size={24} color="blue" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
};

export default Mp3player_layout;

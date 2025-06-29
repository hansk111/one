// import RequireAuth from "@/utils/RequireAuth";
import { Ionicons } from "@expo/vector-icons";

import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function MainTabsLayout() {
  const router = useRouter();

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Blog Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
            headerStyle: {
              backgroundColor: "white",
            },
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
        <Tabs.Screen
          name="apps"
          options={{
            title: "Applications",
            popToTopOnBlur: true,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "grid-sharp" : "grid-outline"}
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
        <Tabs.Screen
          name="profile"
          options={{
            title: "My Profile",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "person-sharp" : "person-outline"}
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
    </>
  );
}

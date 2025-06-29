import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Apps = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold text-center">Category</Text>
      <View className="flex-row w-full justify-around mt-10">
        <Link href="/(first)/movie">
          <View className="items-center">
            <MaterialIcons name="movie" size={40} color="magenta" />
            <Text>Movie</Text>
          </View>
        </Link>
        <Link href="/(first)/imageedit">
          <View className="items-center">
            <Ionicons name="image" size={40} color="blue" />
            <Text>Image</Text>
          </View>
        </Link>
        <Link href="/mp3player">
          <View className="tems-center">
            <Ionicons name="musical-notes" size={40} color="red" />
            <Text>Music</Text>
          </View>
        </Link>
        <Link href="/bushome">
          <View className="tems-center">
            <Ionicons name="bus-sharp" size={40} color="red" />
            <Text>Bus home</Text>
          </View>
        </Link>
      </View>
    </View>
  );
};

export default Apps;

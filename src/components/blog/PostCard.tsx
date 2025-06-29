import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PostCard = ({ id, title, coverImg, view, createdAt }: Post) => {
  return (
    <Link href={`/blog/${id}`} asChild>
      <TouchableOpacity className="w-[50%]">
        <Image
          source={{
            uri: coverImg
              ? `${process.env.EXPO_PUBLIC_HOST}/media/${coverImg}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-black mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-black font-bold uppercase">
            {Math.round(view / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {createdAt?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            아무거나
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default PostCard;

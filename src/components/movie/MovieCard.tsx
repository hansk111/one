import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from 'react';
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
  original_title,
}: Movie) => {

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[50%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-80 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold text-black mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-black font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            {original_title}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

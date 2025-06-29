import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { useGetQuery } from "@/store/blog/BlogApiSlice"; // Assuming this is correct
import AntDesign from "@expo/vector-icons/AntDesign";
import { format } from "date-fns";
import RenderHtml from "react-native-render-html";

const PostDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  // Log the ID and host for debugging on both platforms
  console.log("Post ID:", id);
  console.log("EXPO_PUBLIC_HOST:", process.env.EXPO_PUBLIC_HOST);

  // Use the correct hook name if it's `useGetPostQuery` from the slice
  // Otherwise, if it's a generic `useGetQuery` ensure it accepts the ID correctly
  const { data: post, isLoading, error } = useGetQuery(id as string);

  // --- Loading State ---
  if (isLoading) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-black mt-2">Loading post...</Text>
      </SafeAreaView>
    );
  }

  // --- Error State ---
  if (error) {
    console.error("Error fetching post:", error);
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center px-4">
        <Text className="text-red-500 text-lg text-center">
          Failed to load post details. Please check your network connection or
          try again later.
        </Text>
        {/* You can display a more specific error message if 'error' object contains it */}
        {error.message && (
          <Text className="text-red-400 text-sm mt-2 text-center">
            Error: {error.message}
          </Text>
        )}
        <TouchableOpacity
          className="mt-5 bg-accent rounded-lg py-3.5 px-5 flex-row items-center justify-center"
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#111"
          />
          <Text className="text-blue font-semibold text-base">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- No Post Data (Edge Case) ---
  if (!post) {
    return (
      <SafeAreaView className="bg-primary flex-1 justify-center items-center px-4">
        <Text className="text-black text-lg text-center">
          Post not found or no data available.
        </Text>
        <TouchableOpacity
          className="mt-5 bg-accent rounded-lg py-3.5 px-5 flex-row items-center justify-center"
          onPress={router.back}
        >
          <Image
            source={icons.arrow}
            className="size-5 mr-1 mt-0.5 rotate-180"
            tintColor="#111"
          />
          <Text className="text-blue font-semibold text-base">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_HOST}/media/${post?.coverImg}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-center justify-center mt-5 px-5">
          <Text className="text-black font-bold text-xl text-center">
            {post?.title}
          </Text>
        </View>
        <View className="flex-row items-center gap-x-1 mt-2 ml-5 mr-5 justify-between">
          <Image
            source={{
              uri: post?.author.image
                ? `${process.env.EXPO_PUBLIC_HOST}/${post?.author.image}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="h-10 w-10 rounded-full"
          />
          <Text className="text-light-200 text-lg flex-row items-center">
            <AntDesign name="eye" size={20} color="black" />
            <Text className="ml-1 mr-3">{post?.view}</Text>
            <AntDesign name="like2" size={20} color="black" />
            <Text className="ml-1">{post?.likes}</Text>
          </Text>
          <Text className="text-light-200 text-sm">
            {format(new Date(post?.createdAt), "E, MMM d")}
          </Text>
        </View>

        <View className="text-light-200 text-black">
          <RenderHtml
            contentWidth={width}
            source={{ html: post?.content || "" }}
          />
        </View>
        {/* Removed the empty flex row */}
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#111"
        />
        <Text className="text-blue font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostDetails;

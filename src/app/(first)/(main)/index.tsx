import PostCard from "@/components/blog/PostCard";
import {
  useGetUserAvatarQuery,
  useRetrieveUserQuery,
} from "@/store/auth/authApiSlice";
import { setAvatar, setUser } from "@/store/auth/authSlice";
import { useGetAllQuery } from "@/store/blog/BlogApiSlice";
import { useDispatch } from "@/store/hooks";
// import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Blog() {
  // const { user } = useSelector((state) => state.auth);
  // const { avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // const router = useRouter();
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  // const [value, setValue] = useState(6);
  const [selectedValue, setSelectedValue] = useState(4);
  const { data: userinfo } = useRetrieveUserQuery();
  const { data: avatarinfo } = useGetUserAvatarQuery();
  const {
    data: newposts,
    isLoading: postLoading,
    isError: postError,
  } = useGetAllQuery({ page: page, value: selectedValue });

  useEffect(() => {
    if (userinfo) {
      dispatch(setUser(userinfo));
      dispatch(setAvatar(avatarinfo));
    }
  }, [dispatch, userinfo, avatarinfo]);

  useEffect(() => {
    if (newposts) {
      setPosts((prevPosts) => [...prevPosts, ...newposts.results]);
      setTotalpage(Math.ceil(newposts.count / selectedValue));
    }
  }, [newposts, selectedValue]);

  // const handleChange = (e: any) => {
  //   setPage(1);
  //   setPosts([]);
  //   setSelectedValue(e.target.value);
  // };

  return (
    <View className="flex-1 bg-primary">
      {/* <Image source={images.bg} className="absolute w-full z-0" /> */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {postLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : postError ? (
          <Text className="text-white text-lg text-center mt-10 self-center">
            Error: {postError}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg text-black font-bold mt-5 mb-3">
                  최근 포스트 총{totalpage}페이지
                </Text>
                {/* <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue, itemIndex) =>
                    handleChange(itemValue as number)
                  }
                  className="h-5 w-120"
                >
                  <Picker.Item label="2개" value={2} />
                  <Picker.Item label="4개" value={4} />
                  <Picker.Item label="6개" value={6} />
                </Picker> */}
              </View>
              <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 5,
                }}
                className="mt-2 pb-1"
                scrollEnabled={false}
              />
              <View className="flex-1">
                <TouchableOpacity
                  className={`justify-center items-center rounded-md p-2 my-5 ml-5 mr-5 mt-5 ${
                    page === totalpage ? "bg-gray-300" : "bg-blue-500"
                  }`}
                  disabled={page === totalpage ? true : false}
                  onPress={() => {
                    setPage((prevPage) => prevPage + 1);
                  }}
                >
                  <Text className="text-xl">
                    {page === totalpage
                      ? "End"
                      : `More ${page * selectedValue}/${newposts.count}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

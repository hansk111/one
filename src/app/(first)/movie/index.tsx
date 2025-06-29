import MovieCard from "@/components/movie/MovieCard";
import SearchBar from "@/components/movie/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetchMoviesQuery } from "@/store/movie/movieApi";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  adult: boolean;
  video: boolean;
}
interface MoviePage {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface UseFetchMoviesQueryResult {
  data: MoviePage | undefined;
  isLoading: boolean;
  error: any; // 필요에 따라 더 구체적인 타입으로 변경
  refetch: () => void;
}

export default function Index() {
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryf, setSearchQueryf] = useState("");

  const {
    data: newmovies,
    isLoading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
  } = useFetchMoviesQuery({ query: searchQueryf, page: page });

  useEffect(() => {
    if (newmovies) {
      setMovies((prevMovies) => [...prevMovies, ...newmovies.results]);
    }
  }, [newmovies]);

  const loadMoreMovies = async () => {
    setLoading(true);
    try {
      await loadMovies();
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleSearchButton = () => {
    setSearchQueryf(searchQuery);
    setPage(1);
    setMovies([]);
  };

  const renderFooter = () => {
    if (loading) {
      return (
        <View className="flex-1">
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  };

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white text-lg text-center mt-10 self-center">
            Error: {moviesError ? "moviesError" : "Unknown error"}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <View className="flex-row justify-center mt-1 items-center m-1">
              <SearchBar
                placeholder="Search Movie"
                value={searchQuery}
                onChangeText={handleSearch}
              ></SearchBar>
              <TouchableOpacity
                onPress={handleSearchButton}
                className="bg-blue-500 justify-center items-center rounded-md p-2 my-5"
              >
                <Text>검색</Text>
              </TouchableOpacity>
            </View>
            <>
              {searchQuery ? (
                <Text className="text-lg text-black font-bold mt-5 mb-3">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              ) : (
                <Text className="text-lg text-black font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
              )}
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                // onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
              />
              <TouchableOpacity
                className="bg-blue-500 justify-center items-center rounded-md p-2 my-5 ml-5 mr-5 mt-5"
                onPress={loadMoreMovies}
              >
                <Text className="text-xl">
                  Load_more {newmovies.page}/{newmovies.total_pages}
                </Text>
              </TouchableOpacity>
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

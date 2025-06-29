import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const EXPO_PUBLIC_MOVIE_API_TOKEN = process.env.EXPO_PUBLIC_MOVIE_API_TOKEN;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${EXPO_PUBLIC_MOVIE_API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchMovies: builder.query({
      query: ({ query, page }) => {
        if (query) {
          return {
            url: "/search/movie",
            params: {
              language: "ko-kr",
              sort_by: "popularity.desc",
              query: `${encodeURIComponent(query)}`,
              page: page,
            },
          };
        } else {
          return {
            url: "/discover/movie",
            params: {
              language: "ko-kr",
              sort_by: "popularity.desc",
              page: page,
            },
          };
        }
      },
    }),

    fetchMovieDetails: builder.query({
      query: (id) => {
        return {
          url: `/movie/${id}`,
          params: {
            language: "ko-kr",
            api_key: EXPO_PUBLIC_MOVIE_API_TOKEN,
          },
        };
      },
    }),
  }),
});

export const { useFetchMoviesQuery, useFetchMovieDetailsQuery } = movieApi;

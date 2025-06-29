// const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTg1NDQ5MTkwZDBlODU1ZTUzNGY4MzNiN2M0NmIwYSIsIm5iZiI6MTY2NTk4NzM0NS45NzgsInN1YiI6IjYzNGNmMzExODlmNzQ5MDA4MmUxYWViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tcuu8o14Zs0uwNh7pzUYipxSMHWZT0_VYwFVp3weAy0'
//     }
//   };

//   fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.error(err));

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_TOKEN,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_TOKEN}`,
  },
};

export const SMARTHAN_CONFIG = {
  BASE_URL: `${process.env.EXPO_PUBLIC_HOST}/api`,
  headers: {
    accept: "application/json",
    origin: `${process.env.EXPO_PUBLIC_HOST}`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTg1NDQ5MTkwZDBlODU1ZTUzNGY4MzNiN2M0NmIwYSIsIm5iZiI6MTY2NTk4NzM0NS45NzgsInN1YiI6IjYzNGNmMzExODlmNzQ5MDA4MmUxYWViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tcuu8o14Zs0uwNh7pzUYipxSMHWZT0_VYwFVp3weAy0`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&language=ko-kr`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?language=ko-kr&sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchPosts = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${SMARTHAN_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}`
    : `${SMARTHAN_CONFIG.BASE_URL}/post/`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: SMARTHAN_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

export const fetchPostDetails = async (
  postId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(`${SMARTHAN_CONFIG.BASE_URL}/post/${postId}`, {
      method: "GET",
      headers: SMARTHAN_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post details:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?language=ko-kr&api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

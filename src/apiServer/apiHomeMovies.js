import axios from "axios";

axios.defaults.baseURL =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzliOTI4MDhhOTBjYjNjNzc2MTRkOTkyNGE0OWVmMyIsIm5iZiI6MTcyMzU0OTY5Ny40NjczNjksInN1YiI6IjY2YmIyZDNkMzBkZDRmZTA5YTFhNzI3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kmjfCCDCcMez-gDLJDWI4XaAVYCYrtFd7MnFOnfLf-U";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getHomeMovies = async () => {
  const { data } = await axios.get();
  return data;
};

export const getDetailsMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`
  );
  return data;
};

export const getCastMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`
  );
  return data;
};

export const getReviewsMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`
  );
  return data;
};

export const getSearchMovie = async (query) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}`
  );

  return data;
};

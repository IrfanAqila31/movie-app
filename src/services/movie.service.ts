import { api } from "./api";
import type { Movie, Cast, MovieVideo } from "../types/movie";

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await api.get("/movie/popular?language=en-US&page=1");
  return response.data.results;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await api.get(`/movie/${id}?language=en-US`);
  return response.data;
};

export const getMovieCredits = async (id: string): Promise<Cast[]> => {
  const response = await api.get(`/movie/${id}/credits?language=en-US`);
  return response.data.cast;
};

export const getMovieSimilar = async (id: string): Promise<Movie[]> => {
  const response = await api.get(`/movie/${id}/similar?language=en-US&page=1`);
  return response.data.results;
};

export const getNowPlayingMovies = async (): Promise<Movie[]> => {
  const response = await api.get("/movie/now_playing?language=en-US&page=1");
  return response.data.results;
};

export const getMovieVideos = async (id: string): Promise<MovieVideo[]> => {
  const response = await api.get(`/movie/${id}/videos?language=en-US`);
  return response.data.results;
};

export const searchMovie = async (query: string): Promise<Movie[]> => {
  const response = await api.get(
    `/search/movie?query=${query}&language=en-US&page=1`,
  );
  return response.data.results;
};

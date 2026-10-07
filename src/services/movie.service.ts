import { api } from "./api";
import type { Movie } from "../types/movie";

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await api.get("/movie/popular?language=id-ID&page=1");
  return response.data.results;
};

export const getMovieById = async (id: string): Promise<Movie> => {
  const response = await api.get(`/movie/${id}?language=id-ID`);
  return response.data;
};

export const getMovieCredits = async (id: string) => {
  const response = await api.get(`/movie/${id}/credits?language=id-ID`);
  return response.data.results;
};

export const getMovieSimilar = async (id: string) => {
  const response = await api.get(`/movie/${id}/similar?language=id-ID`);
  return response.data.results;
};

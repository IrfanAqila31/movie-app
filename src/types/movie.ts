export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genre_ids: number[]; // Dipakai di daftar film (Popular)
  genres: Genre[]; // Dipakai di halaman Detail film
  tagline: string;
  runtime: number;
  status: string;
  original_language: string;
  budget: number;
  production_companies: ProductionCompany[];
}

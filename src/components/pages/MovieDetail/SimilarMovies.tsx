import type { Movie } from "../../../types/movie";
import CardMovie from "../../ui/CardMovie";

type SimilarMoviesProps = {
  movies?: Movie[];
  isLoading?: boolean;
  isError?: boolean;
};

const SimilarMovies = ({
  movies = [],
  isLoading = false,
  isError = false,
}: SimilarMoviesProps) => {
  if (isLoading) {
    return <p className="text-slate-300 mt-4">Memuat rekomendasi film...</p>;
  }

  if (isError) {
    return (
      <p className="text-red-500 mt-4">
        Gagal memuat rekomendasi film. Silakan coba lagi nanti.
      </p>
    );
  }

  if (!movies.length) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-slate-700 pt-6">
      <h2 className="text-xl font-bold mb-4 text-white">
        Rekomendasi Film
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {movies.slice(0, 8).map((movie) => (
          <CardMovie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarMovies;
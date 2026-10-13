import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../../services/movie.service";
import CardMovie from "../../ui/CardMovie";

const PopularMovie = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular-movie"],
    queryFn: getPopularMovies,
  });
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <h1 className="text-center text-2xl">Loading Film...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
        <h1 className="text-center text-2xl">Gagal Memuat Film</h1>
      </div>
    );
  }
  if (!data) {
    return <h1 className="text-center mt-10">Film tidak ditemukan</h1>;
  }
  return (
    <section className="pt-24 min-h-screen bg-slate-900">
      <main className="container mx-auto px-4">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-100">
            Film Populer Saat Ini
          </h1>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {data.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      </main>
    </section>
  );
};
export default PopularMovie;

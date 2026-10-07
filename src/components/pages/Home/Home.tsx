import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../../services/movie.service";
import CardMovie from "../../ui/CardMovie";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular-movie"],
    queryFn: getPopularMovies,
  });
  if (isLoading) {
    return <h1 className="text-center mt-10">Loading Film...</h1>;
  }
  if (isError) {
    return <h1 className="text-center mt-10">Gagal Memuat Film</h1>;
  }
  return (
    <section className="container mx-auto p-4 min-h-screen bg-slate-900">
      <main>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-100">
            Film Populer Saat Ini
          </h1>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data?.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </main>
    </section>
  );
};
export default Home;

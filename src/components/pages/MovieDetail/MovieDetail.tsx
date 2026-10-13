import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById, getMovieSimilar } from "../../../services/movie.service";
// import CardMovie from "../../ui/CardMovie";
import SimilarMovies from "./SimilarMovies";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });

  const {
    data: similarMovies,
    isLoading: isSimilarLoading,
    isError: isSimilarError,
  } = useQuery({
    queryKey: ["movie-similar", id],
    queryFn: () => getMovieSimilar(id!),
    enabled: !!id,
  });
  // console.log("data film", data);
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
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto pt-24">
        <img
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={data.title}
          className="w-full h-96 object-cover rounded-xl mb-5"
        />

        <div className="flex gap-10">
          <figure className="shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt={data.title}
              className="w-48 h-72 object-cover rounded-xl"
            />
          </figure>

          <div className="max-w-5xl flex-1">
            <header>
              <h1 className="text-3xl font-bold">{data.title}</h1>

              <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-slate-300">
                <p className="flex items-center gap-1.5 font-medium pr-4 border-r border-slate-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-amber-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                  Rating:{" "}
                  <span className="font-semibold text-amber-400">
                    {data.vote_average.toFixed(1)}
                  </span>
                </p>

                <p className="pr-4 border-r border-slate-700">
                  Durasi:{" "}
                  <span className="font-semibold text-white">
                    {data.runtime ? `${data.runtime} Menit` : "Tidak tersedia"}
                  </span>
                </p>

                <p className="pr-4 border-r border-slate-700">
                  Rilis:{" "}
                  <time
                    dateTime={data.release_date}
                    className="font-semibold text-white"
                  >
                    {data.release_date}
                  </time>
                </p>
                <p className="flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-amber-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>{" "}
                  {data.vote_average.toFixed(1)}{" "}
                  <span className="text-slate-400 text-xs">
                    ({data.vote_count.toLocaleString()} suara)
                  </span>
                </p>
              </div>

              <ul className="flex gap-2 mt-4 flex-wrap">
                {data.genres?.map((genre) => (
                  <li
                    className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold"
                    key={genre.id}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </header>

            <section className="mt-6">
              <h2 className="text-xl font-bold text-white">Sinopsis</h2>
              <p className="mt-2 text-slate-300 leading-relaxed text-base">
                {data.overview ||
                  "Belum ada ringkasan sinopsis untuk film ini."}
              </p>
            </section>
          </div>
        </div>

        {data.production_companies && data.production_companies.length > 0 && (
          <section className="mt-10 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-bold mb-4 text-white">
              Studio Produksi
            </h2>
            <ul className="flex flex-wrap gap-3">
              {data.production_companies.map((production) => (
                <li
                  key={production.id}
                  className="bg-slate-800/80 border border-slate-700/60 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium"
                >
                  {production.name}
                </li>
              ))}
            </ul>
          </section>
        )}
        <SimilarMovies
          movies={similarMovies}
          isLoading={isSimilarLoading}
          isError={isSimilarError}
        />
      </div>
    </main>
  );
};
export default MovieDetail;

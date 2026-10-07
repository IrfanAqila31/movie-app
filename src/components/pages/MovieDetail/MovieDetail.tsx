import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../../../services/movie.service";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id!),
    enabled: !!id,
  });
  console.log("data film", data);
  if (isLoading) {
    return <h1 className="text-center mt-10">Loading Film...</h1>;
  }
  if (isError) {
    return <h1 className="text-center mt-10">Gagal Memuat Film</h1>;
  }
  if (!data) {
    return <h1 className="text-center mt-10">Film tidak ditemukan</h1>;
  }
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 py-6">
       <div className="max-w-7xl mx-auto p-4">
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

          <header className="max-w-5xl">
            <h1 className="text-3xl font-bold mt-4">{data.title}</h1>

            <p className="mt-2 text-slate-300">{data.overview}</p>

            <ul className="flex gap-4 mt-4">
              {data.genres.map((genre) => (
                <li
                  className="bg-amber-400 text-slate-900 px-3 py-1 rounded-xl text-sm font-semibold"
                  key={genre.id}
                >
                  {genre.name}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-slate-200 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-amber-400"
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

            <p className="mt-1 text-slate-400">
              Rilis:{" "}
              <time dateTime={data.release_date}>{data.release_date}</time>
            </p>
          </header>
        </div>
        <ul>
          {data.production_companies.map((production) => (
            <li key={production.id}>{production.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};
export default MovieDetail;

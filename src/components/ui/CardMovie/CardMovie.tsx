import { Link } from "react-router-dom";
import type { Movie } from "../../../types/movie";

type CardMovieProps = Pick<
  Movie,
  "id" | "title" | "poster_path" | "release_date" | "vote_average"
>;

const CardMovie = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: CardMovieProps) => {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link
      to={`/movie/${id}`}
      className="bg-slate-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-87 object-cover"
        loading="lazy"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg text-slate-100 line-clamp-1">
          {title}
        </h2>
        <div className="flex justify-between items-center mt-2 text-sm text-slate-400">
          <span>{release_date ? release_date.substring(0, 4) : ""}</span>
          <span className="flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded-full font-medium">
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;

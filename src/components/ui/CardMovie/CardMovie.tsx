import { Link } from "react-router-dom";
import type { Movie } from "../../../types/movie";

type CardMovieProps = Pick<Movie, "id" | "title" | "poster_path">;

const CardMovie = ({ id, title, poster_path }: CardMovieProps) => {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link
      to={`/movie/${id}`}
      className="group relative block w-full overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:scale-[1.01]"
    >
      <img
        src={imageUrl}
        alt={title}
        className="h-60 w-full object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 text-center">
        <h2 className="line-clamp-2 text-lg font-bold text-white">{title}</h2>
      </div>
    </Link>
  );
};

export default CardMovie;

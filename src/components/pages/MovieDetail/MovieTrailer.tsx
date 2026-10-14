import type { MovieVideo } from "../../../types/movie";

interface MovieTrailerProps {
  videos?: MovieVideo[];
  isLoading: boolean;
  isError: boolean;
}

const MovieTrailer = ({ videos, isLoading, isError }: MovieTrailerProps) => {
  if (isLoading) {
    return <p className="text-slate-400 mt-6 px-4">Memuat trailer...</p>;
  }

  if (isError || !videos || videos.length === 0) {
    return null;
  }

  const trailer =
    videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
    videos[0];

  if (!trailer) return null;

  return (
    <section className="mt-10 pt-6 border-t border-slate-800">
      <h2 className="text-xl font-bold mb-4 text-white">Trailer: {trailer.name}</h2>

      <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl bg-black">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default MovieTrailer;

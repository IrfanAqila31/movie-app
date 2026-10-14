import type { Cast } from "../../../types/movie";

interface MovieCastProps {
  cast?: Cast[];
  isLoading: boolean;
  isError: boolean;
}

const MovieCast = ({ cast, isLoading, isError }: MovieCastProps) => {
  if (isLoading) {
    return <p className="text-slate-300">Memuat Pemain Film...</p>;
  }
  if (isError) {
    return <p className="text-red-500">Gagal Memuat Pemain Film</p>;
  }
  if (!cast || cast.length === 0) {
    return <p className="text-slate-300">Pemain Film Tidak Ditemukan</p>;
  }

  return (
    <section className="mt-10 pt-6 border-t border-slate-800">
      <h2 className="text-xl font-bold mb-4 text-white">Pemeran Utama</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5">
        {cast.slice(0, 10).map((actor) => (
          <div key={actor.id} className="flex flex-col items-center text-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "https://via.placeholder.com/185x185?text=No+Photo"
              }
              alt={actor.name}
              className="h-30 w-30 object-cover rounded-full"
            />
            <h3>{actor.name}</h3>
            <p>{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieCast;

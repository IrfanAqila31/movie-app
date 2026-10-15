import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { searchMovie } from "../../../services/movie.service";
import type { Movie } from "../../../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w92";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed.length < 2) return;

    let cancelled = false;

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const data = await searchMovie(trimmed);
        if (!cancelled) {
          setResults(data.slice(0, 6));
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchResults();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (movieId: number) => {
    setQuery("");
    setIsOpen(false);
    navigate(`/movie/${movieId}`);
  };

  return (
    <search ref={containerRef} className="relative w-64">
      <label htmlFor="movie-search" className="sr-only">
        Search movies
      </label>
      <input
        id="movie-search"
        type="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Search movies..."
        autoComplete="off"
        aria-label="Search movies"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full px-4 py-2 rounded-full bg-slate-900/30 text-white 
                   placeholder-slate-400 border border-slate-300/20 
                   focus:outline-none focus:border-slate-300/30 transition"
      />
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Search results"
          className="absolute top-full mt-2 w-full bg-gray-900 rounded-xl 
                     shadow-xl border border-white/10 overflow-hidden z-50 
                     list-none p-0 m-0"
        >
          {isLoading ? (
            <li className="text-white/50 text-sm text-center py-4">
              Searching...
            </li>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <li key={movie.id} role="option" aria-selected="false">
                <button
                  onClick={() => handleSelect(movie.id)}
                  className="flex items-center gap-3 w-full px-4 py-2 
                             hover:bg-white/10 transition text-left"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : "https://placehold.co/46x69?text=No+Image"
                    }
                    alt={`Poster of ${movie.title}`}
                    width={32}
                    height={48}
                    className="w-8 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="text-white text-sm font-medium">
                      {movie.title}
                    </p>
                    <p className="text-white/40 text-xs">
                      {movie.release_date?.slice(0, 4) ?? "Unknown"}
                    </p>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <li className="text-white/50 text-sm text-center py-4">
              No results found.
            </li>
          )}
        </ul>
      )}
    </search>
  );
}

export default SearchBar;

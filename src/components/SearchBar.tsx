import { useEffect, useState } from "react";
import type { Game } from "../types";
import SkeletonCard from "./SkeletonCard";
import ResultCard from "./ResultCard";

import "./SearchBar.css";

function SearchBar({ handleAddGame }: { handleAddGame: (game: Game) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3000/api/games/search?name=${encodeURIComponent(
            query
          )}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          setResults([]);
          setLoading(false);
          setError("Failed to fetch results");
          return;
        }
        const data: Game[] = await res.json();
        setResults(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Network error");
        }
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(delayDebounce);
      controller.abort();
    };
  }, [query]);

  const handleSelectGame = (game: Game) => {
    handleAddGame(game);
  };

  const skeletonCount = 6;

  // show skeletons only if loading AND there are no results yet
  const showSkeletons = loading && results.length === 0;

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className="input mb-2"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search games"
        aria-busy={loading}
      />

      {(showSkeletons || results.length > 0 || error) && (
        <div className="search-results" role="list" aria-live="polite">
          <div
            className="columns is-multiline is-variable is-1"
            style={{ margin: 0, padding: "6px", backgroundColor: "#1e1e1e" }}
          >
            {error && (
              <div className="column is-full">
                <div className="notification is-warning is-light">{error}</div>
              </div>
            )}

            {showSkeletons
              ? Array.from({ length: skeletonCount }).map((_, i) => (
                  <div className="column is-narrow" key={`skeleton-${i}`}>
                    <SkeletonCard />
                  </div>
                ))
              : results.map((game) => (
                  <div className="column is-narrow is-card" key={game._id}>
                    <ResultCard game={game} onSelect={handleSelectGame} />
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;

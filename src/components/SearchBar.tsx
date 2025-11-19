import { useState } from "react";
import type { Game } from "../types";

import { useEffect } from "react";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/games/search?name=${encodeURIComponent(
            query
          )}`
        );
        const data: Game[] = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectGame = (game: Game) => {
    console.log("Selected game:", game);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        className="input mb-2"
        placeholder="Search games..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid black",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "78vh",
            overflowY: "auto",
            zIndex: 20,
          }}
        >
          {results.map((game) => (
            <div
              key={game._id}
              className="card mb-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectGame(game)}
            >
              <div
                className="card-content"
                style={{ display: "flex", gap: "10px" }}
              >
                {game.imageUrl && (
                  <figure className="image is-64x64">
                    <img src={game.imageUrl} alt={game.title} />
                  </figure>
                )}
                <div>
                  <p className="title is-6">{game.title}</p>
                  <p className="subtitle is-7">{game.platform}</p>
                  {game.createdAt === null && (
                    <span className="tag is-info is-light">RAWG</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

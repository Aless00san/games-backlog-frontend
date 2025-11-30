import type { Game } from "../types";

import "./ResultCard.css";

interface ResultCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export default function ResultCard({ game, onSelect }: ResultCardProps) {
  return (
    <div
      className="result-cell"
      key={game._id}
      onClick={() => onSelect(game)}
      style={{ position: "relative" }}
    >
      <div
        className="is-flex image"
        style={{ margin: "0 auto", width: "fit-content" }}
      >
        <img
          src={game.imageUrl}
          alt={game.title}
          style={{
            margin: "0 auto",
            height: "128px",
            objectFit: "cover",
            maxWidth: "90px",
            imageRendering: "auto",
            borderRadius: 4,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            className="title-is-small"
            style={{
              textAlign: "center",
              width: "125px",
              marginLeft: game.title.length > 20 ? "5px" : "0px",
            }}
          >
            {game.title}
          </p>

          <p
            className="subtitle-is-small"
            style={{ textAlign: "center", width: "125px" }}
          >
            {game.platformNames.slice(0, 3).join(", ")}
            {game.platformNames.length > 3 ? " ..." : ""}
          </p>
        </div>
      </div>

      {!game.createdAt && (
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <span className="tag is-tag is-tiny is-warning">
            Data provided by RAWG
          </span>
        </div>
      )}
    </div>
  );
}

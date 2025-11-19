import "./App.css";
import StarMeter from "./StarMeter";
import {
  platformIcons,
  platformColors,
  defaultPlatformIcon,
  defaultPlatformColor,
} from "./platformIcons";
import type { IconType } from "react-icons";

interface EntryCardProps {
  name: string;
  imageUrl: string;
  username?: string;
  platformId?: number;
  status: "Backlog" | "Playing" | "Completed";
}

function EntryCard({
  name,
  imageUrl,
  username = "AlpacaSama",
  platformId,
  status,
}: EntryCardProps) {
  const Icon: IconType = platformId
    ? platformIcons[platformId] || defaultPlatformIcon
    : defaultPlatformIcon;

  const iconColor = platformId
    ? platformColors[platformId] || defaultPlatformColor
    : defaultPlatformColor;

  const statusColors: Record<string, string> = {
    Backlog: "lightblue",
    Playing: "dodgerblue",
    Completed: "greenyellow",
  };

  return (
    <div className="card">
      <div className="card-header" style={{ display: "flex", gap: "1rem" }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "33%",
            height: "125px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <section className="center">
              <h4>{name}</h4>
              <h5 style={{ color: statusColors[status] || "white" }}>
                {status}
              </h5>
            </section>

            <section
              className="top-right"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <h4>{username}</h4>
              <Icon size={24} color={iconColor} />
            </section>
          </div>

          <StarMeter />
        </div>
      </div>

      <section className="reviewData">
        <h4>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </h4>
      </section>
    </div>
  );
}

export default EntryCard;

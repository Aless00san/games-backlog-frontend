import type { Entry } from "../types";
import {
  platformIcons,
  defaultPlatformIcon,
  platformColors,
} from "./platformIcons";
import type { IconType } from "react-icons";

interface KanbanEntryCardProps {
  entry: Entry;
}

export default function KanbanEntryCard({ entry }: KanbanEntryCardProps) {
  const Icon: IconType = entry.platformId
    ? platformIcons[entry.platformId] || defaultPlatformIcon
    : defaultPlatformIcon;

  const statusColors: Record<string, string> = {
    Backlog: "#2b2b2b",
    Playing: "#3D3D3D",
    Completed: "#474747",
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        color: "white",
        cursor: "grab",
        borderTop: "1px solid white",
        borderBottom: "1px solid white",
        backgroundColor: statusColors[entry.status],
      }}
    >
      <img
        src={entry.imageUrl}
        alt={entry.name}
        style={{
          width: "60px",
          height: "60px",
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "1rem" }}>{entry.name}</h4>
      </div>

      <Icon size={24} color={platformColors[entry.platformId]} />
    </div>
  );
}

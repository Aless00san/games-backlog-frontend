import type { Entry } from "../types";
import {
  platformIcons,
  defaultPlatformIcon,
  platformColors,
  specialStyles,
} from "./platformIcons";
import type { IconType } from "react-icons";

interface KanbanEntryCardProps {
  entry: Entry;
}

export default function KanbanEntryCard({ entry }: KanbanEntryCardProps) {
  const Icon: IconType = entry.platform
    ? platformIcons[entry.platform] || defaultPlatformIcon
    : defaultPlatformIcon;

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
      }}
    >
      <img
        src={entry.imageUrl}
        alt={entry.title}
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
        <h4 style={{ margin: 0, fontSize: "1rem" }}>{entry.title}</h4>
      </div>

      <Icon
        size={32}
        color={platformColors[entry.platform]}
        className={specialStyles[entry.platform]}
      />
    </div>
  );
}

// SkeletonCard.tsx
import "./SkeletonCard.css";

export default function SkeletonCard() {
  return (
    <div className="result-cell" aria-hidden="true">
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <span className="skeleton skeleton-image" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <span className="skeleton skeleton-title" />
          <span className="skeleton skeleton-subtitle" />
        </div>
      </div>
    </div>
  );
}

import { personal } from "@/data/content";

export default function AvailabilityBadge() {
  const isAvailable = personal.availability.toLowerCase().includes("open");

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.45rem 0.75rem", border: "3px solid var(--line)", background: "var(--surface)", boxShadow: "3px 3px 0 var(--line)" }}>
      <span
        style={{
          width: "10px",
          height: "10px",
          background: isAvailable ? "var(--accent-3)" : "var(--text-soft)",
          flexShrink: 0,
          display: "block",
          border: "2px solid var(--line)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "0.68rem",
          fontWeight: 800,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--text)",
        }}
      >
        {personal.availability}
      </span>
    </div>
  );
}

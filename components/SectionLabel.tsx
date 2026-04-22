interface SectionLabelProps {
  children: React.ReactNode;
  color?: string;
}

export default function SectionLabel({ children, color }: SectionLabelProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.9rem" }}>
      <span style={{ width: "12px", height: "12px", background: color ?? "var(--accent-2)", border: "2px solid var(--line)" }} />
      <span
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "0.68rem",
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: color ?? "var(--accent-2)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

interface Props {
  label?: string;
}

export default function Divider({ label }: Props) {
  if (!label) {
    return (
      <div
        style={{
          margin: "3rem 0",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--border-bright), transparent)",
        }}
      />
    );
  }

  return (
    <div
      style={{
        margin: "3rem 0",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      <span
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--text-dim)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
    </div>
  );
}

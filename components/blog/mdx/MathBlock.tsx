interface Props {
  children: React.ReactNode;
  label?: string;
}

export default function MathBlock({ children, label }: Props) {
  return (
    <div
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "1.25rem 1.5rem",
        margin: "1.5rem 0",
        position: "relative",
        overflowX: "auto",
      }}
    >
      {label && (
        <span
          style={{
            position: "absolute",
            top: "0.6rem",
            right: "0.75rem",
            fontFamily: "var(--font-syne)",
            fontSize: "0.5625rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.9375rem",
          color: "var(--text)",
          textAlign: "center",
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </div>
  );
}

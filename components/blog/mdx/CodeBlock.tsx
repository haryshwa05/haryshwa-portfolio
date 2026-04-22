interface Props {
  children: React.ReactNode;
  filename?: string;
  language?: string;
}

export default function CodeBlock({ children, filename, language }: Props) {
  return (
    <div
      style={{
        background: "var(--code-bg)",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        margin: "1.5rem 0",
        overflow: "hidden",
      }}
    >
      {(filename || language) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.6rem 1rem",
            borderBottom: "1px solid var(--border)",
            background: "var(--surface2)",
          }}
        >
          {filename && (
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              {filename}
            </span>
          )}
          {language && (
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
              }}
            >
              {language}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: "1.25rem", overflowX: "auto" }}>
        <pre
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          {children}
        </pre>
      </div>
    </div>
  );
}

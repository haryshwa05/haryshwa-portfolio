interface Row {
  label: string;
  a: string;
  b: string;
}

interface Props {
  labelA: string;
  labelB: string;
  rows: Row[];
  title?: string;
}

export default function CompareTable({ labelA, labelB, rows, title }: Props) {
  return (
    <div style={{ margin: "1.5rem 0", overflowX: "auto" }}>
      {title && (
        <p
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            marginBottom: "0.75rem",
          }}
        >
          {title}
        </p>
      )}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "var(--surface2)" }}>
            <th
              style={{
                padding: "0.75rem 1rem",
                textAlign: "left",
                fontFamily: "var(--font-syne)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-dim)",
                borderBottom: "1px solid var(--border)",
                borderRight: "1px solid var(--border)",
              }}
            >
              —
            </th>
            <th
              style={{
                padding: "0.75rem 1rem",
                textAlign: "left",
                fontFamily: "var(--font-syne)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent)",
                borderBottom: "1px solid var(--border)",
                borderRight: "1px solid var(--border)",
              }}
            >
              {labelA}
            </th>
            <th
              style={{
                padding: "0.75rem 1rem",
                textAlign: "left",
                fontFamily: "var(--font-syne)",
                fontSize: "0.6875rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--accent2)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {labelB}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              style={{ background: i % 2 === 0 ? "transparent" : "var(--surface)" }}
            >
              <td
                style={{
                  padding: "0.7rem 1rem",
                  fontFamily: "var(--font-syne)",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  borderRight: "1px solid var(--border)",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                {row.label}
              </td>
              <td
                style={{
                  padding: "0.7rem 1rem",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  borderRight: "1px solid var(--border)",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                {row.a}
              </td>
              <td
                style={{
                  padding: "0.7rem 1rem",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                {row.b}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

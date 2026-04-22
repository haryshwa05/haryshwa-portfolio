interface Props {
  children: React.ReactNode;
}

export default function Insight({ children }: Props) {
  return (
    <div
      style={{
        margin: "2.5rem 0",
        padding: "1.5rem 2rem",
        borderLeft: "3px solid var(--accent2)",
        background: "rgba(0,212,170,0.04)",
        borderRadius: "0 8px 8px 0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-instrument)",
          fontSize: "1.125rem",
          fontStyle: "italic",
          color: "var(--text)",
          lineHeight: 1.65,
        }}
      >
        {children}
      </div>
    </div>
  );
}

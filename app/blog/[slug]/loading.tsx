export default function BlogLoading() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "740px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Back link skeleton */}
        <div style={{ width: "80px", height: "14px", background: "var(--surface3)", borderRadius: "4px", marginBottom: "3rem" }} className="skeleton" />

        {/* Tag */}
        <div style={{ width: "60px", height: "12px", background: "var(--surface3)", borderRadius: "4px", marginBottom: "1rem" }} className="skeleton" />

        {/* Title */}
        <div style={{ width: "90%", height: "48px", background: "var(--surface3)", borderRadius: "6px", marginBottom: "0.75rem" }} className="skeleton" />
        <div style={{ width: "70%", height: "48px", background: "var(--surface3)", borderRadius: "6px", marginBottom: "1.5rem" }} className="skeleton" />

        {/* Description */}
        <div style={{ width: "100%", height: "16px", background: "var(--surface3)", borderRadius: "4px", marginBottom: "0.5rem" }} className="skeleton" />
        <div style={{ width: "85%", height: "16px", background: "var(--surface3)", borderRadius: "4px", marginBottom: "2rem" }} className="skeleton" />

        {/* Meta row */}
        <div style={{ display: "flex", gap: "1rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)", marginBottom: "3rem" }}>
          <div style={{ width: "120px", height: "13px", background: "var(--surface3)", borderRadius: "4px" }} className="skeleton" />
          <div style={{ width: "70px", height: "13px", background: "var(--surface3)", borderRadius: "4px" }} className="skeleton" />
        </div>

        {/* Content lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i % 3 === 2 ? "75%" : "100%",
              height: "15px",
              background: "var(--surface3)",
              borderRadius: "4px",
              marginBottom: "0.75rem",
            }}
            className="skeleton"
          />
        ))}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .skeleton {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

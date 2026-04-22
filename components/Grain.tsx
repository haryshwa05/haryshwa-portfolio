export default function Grain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.12,
        backgroundImage: "radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)",
        backgroundSize: "18px 18px",
      }}
    />
  );
}

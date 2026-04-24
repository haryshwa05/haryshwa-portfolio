"use client";

import { motion } from "framer-motion";

export default function AnimatedBg() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Slowly drifting grid â€” one full-cell shift creates a seamless infinite scroll */}
      <motion.div
        style={{
          position: "absolute",
          top: "-24px",
          left: "-24px",
          right: "-24px",
          bottom: "-24px",
          backgroundImage:
            "linear-gradient(var(--bg-pattern) 1px, transparent 1px), linear-gradient(90deg, var(--bg-pattern) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={{ x: [0, 24], y: [0, 24] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{
          position: "absolute",
          inset: "-12%",
          background:
            "radial-gradient(circle at 18% 24%, rgba(255,77,0,0.08), transparent 24%), radial-gradient(circle at 80% 18%, rgba(0,87,255,0.08), transparent 22%), radial-gradient(circle at 62% 72%, rgba(30,175,65,0.06), transparent 20%)",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        animate={{ x: [0, 18, -12, 0], y: [0, -16, 14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gradient orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
    </div>
  );
}

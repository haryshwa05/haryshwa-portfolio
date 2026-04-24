"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!barRef.current) return;

        const el = document.documentElement;
        const scrollTop = el.scrollTop || document.body.scrollTop;
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        barRef.current.style.transform = `scaleX(${progress})`;
        if (chipRef.current) {
          chipRef.current.textContent = `${Math.round(progress * 100)}% read`;
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={chipRef}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 10001,
          fontFamily: "var(--font-dm-mono)",
          fontSize: "0.68rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
          color: "var(--text)",
          background: "var(--surface)",
          border: "2px solid var(--line)",
          boxShadow: "3px 3px 0 var(--line)",
          padding: "0.3rem 0.55rem",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        0% read
      </div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 10000,
          background: "var(--line)",
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "100%",
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            transform: "scaleX(0)",
            transformOrigin: "0 50%",
            willChange: "transform",
          }}
        />
      </div>
    </>
  );
}

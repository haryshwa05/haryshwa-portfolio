"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/content";

const STAGGER = 0.04;
const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
      transition: {
        duration: 0.55,
        delay: i * STAGGER,
        ease: "easeOut" as const,
      },
  }),
};

export default function AnimatedName() {
  const parts = personal.name.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  const firstLetters = firstName.split("");
  const lastLetters = lastName.split("");

  return (
    <h1
      style={{
        fontFamily: "var(--font-instrument)",
        fontSize: "clamp(52px, 8vw, 120px)",
        lineHeight: 1.0,
        letterSpacing: "-0.02em",
        color: "var(--text)",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        gap: "0.25em",
      }}
    >
      {/* First name — paddingBottom lets descenders (y, g) show inside overflow:hidden */}
      <span style={{ display: "flex", overflow: "hidden", paddingBottom: "0.18em" }}>
        {firstLetters.map((char, i) => (
          <motion.span
            key={`first-${i}`}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      {/* Last name — italic + accent tint */}
      <span
        style={{
          display: "flex",
          overflow: "hidden",
          paddingBottom: "0.18em",
          fontStyle: "italic",
          color: "var(--accent-bright)",
        }}
      >
        {lastLetters.map((char, i) => (
          <motion.span
            key={`last-${i}`}
            custom={firstLetters.length + i}
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            style={{ display: "inline-block" }}
            whileHover={{
              transition: { duration: 0.15 },
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

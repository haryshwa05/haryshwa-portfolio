"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { workExperience, research } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";

function Tag({ children }: { children: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: "0.62rem",
        fontWeight: 800,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--text)",
        background: "var(--surface)",
        border: "2px solid var(--line)",
        padding: "0.2rem 0.45rem",
      }}
    >
      {children}
    </span>
  );
}

const statusColors: Record<string, string> = {
  published: "var(--accent2)",
  preprint: "var(--accent-amber)",
  ongoing: "var(--accent)",
  thesis: "var(--accent3)",
};

export default function WorkClient() {
  const [activeTab, setActiveTab] = useState<"experience" | "research">("experience");
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const filteredResearch =
    activeStatus ? research.filter((r) => r.status === activeStatus) : research;

  const statuses = Array.from(new Set(research.map((r) => r.status)));

  return (
    <div className="site-wrap" style={{ padding: "2rem 1rem 3rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
          <SectionLabel>Career</SectionLabel>
          <h1 className="neo-title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.05 }}>
            Work & Research
          </h1>
      </div>

      <div className="neo-card" style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem", padding: "0.5rem" }}>
          {(["experience", "research"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "0.875rem",
                fontWeight: 800,
                letterSpacing: "0.03em",
                color: activeTab === tab ? "var(--text-inverse)" : "var(--text)",
                background: activeTab === tab ? "var(--accent)" : "var(--surface)",
                border: "2px solid var(--line)",
                padding: "0.55rem 0.95rem",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {tab === "experience" ? "Experience" : "Research"}
              <span
                style={{
                  marginLeft: "0.5rem",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.75rem",
                  color: activeTab === tab ? "var(--text-inverse)" : "var(--text-soft)",
                  background: "transparent",
                  padding: "0.1rem 0.4rem",
                }}
              >
                {tab === "experience" ? workExperience.length : research.length}
              </span>
            </button>
          ))}
      </div>

      {activeTab === "experience" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {workExperience.map((job, i) => (
                  <article key={`${job.company}-${i}`} className="neo-card" style={{ padding: "1.2rem", borderLeft: i === 0 ? "6px solid var(--accent)" : "3px solid var(--line)" }}>
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "0.75rem",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                          <h2 className="neo-title" style={{ fontSize: "1.15rem", margin: 0 }}>
                            {job.company}
                          </h2>
                          {job.link && (
                            <a
                              href={job.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--text-soft)",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <ExternalLink size={13} />
                            </a>
                          )}
                        </div>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "0.875rem",
                            color: "var(--accent-2)",
                            marginTop: "0.25rem",
                          }}
                        >
                          {job.role}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "0.75rem",
                            color: "var(--text-soft)",
                            marginTop: "0.2rem",
                          }}
                        >
                          {job.location}
                        </p>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.8125rem",
                          color: "var(--text-soft)",
                          background: "var(--surface-alt)",
                          border: "2px solid var(--line)",
                          padding: "0.3rem 0.75rem",
                          flexShrink: 0,
                        }}
                      >
                        {job.period}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: "var(--font-dm-mono)",
                        fontSize: "0.8125rem",
                        color: "var(--text-soft)",
                        marginBottom: "1rem",
                        fontStyle: "italic",
                      }}
                    >
                      {job.description}
                    </p>

                    {/* Bullets */}
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
                      {job.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          style={{
                            fontFamily: "var(--font-dm-mono)",
                            fontSize: "0.8125rem",
                            color: "var(--text-soft)",
                            lineHeight: 1.75,
                            display: "flex",
                            gap: "0.6rem",
                            alignItems: "flex-start",
                          }}
                        >
                          <span style={{ color: "var(--accent-3)", flexShrink: 0, marginTop: "0.15em" }}>→</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {job.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
      )}

      {activeTab === "research" && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2rem",
                }}
              >
                <button
                  onClick={() => setActiveStatus(null)}
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "0.6875rem",
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: activeStatus === null ? "var(--text-inverse)" : "var(--text)",
                    background: activeStatus === null ? "var(--accent)" : "var(--surface)",
                    border: "2px solid var(--line)",
                    padding: "0.3rem 0.75rem",
                    cursor: "pointer",
                  }}
                >
                  All
                </button>
                {statuses.map((status) => {
                  const color = statusColors[status] ?? "var(--text-muted)";
                  const isActive = activeStatus === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setActiveStatus(isActive ? null : status)}
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: "0.6875rem",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "capitalize",
                        color: isActive ? "var(--text-inverse)" : "var(--text)",
                        background: isActive ? color : "var(--surface)",
                        border: "2px solid var(--line)",
                        padding: "0.3rem 0.75rem",
                        cursor: "pointer",
                      }}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {filteredResearch.map((item) => {
                  const color = statusColors[item.status] ?? "var(--text-muted)";
                  return (
                    <article key={item.title} className="neo-card" style={{ padding: "1.2rem" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                        <h2 className="neo-title" style={{ fontSize: "1.2rem", lineHeight: 1.3, flex: 1, margin: 0 }}>
                          {item.title}
                        </h2>
                        <span
                          style={{
                            fontFamily: "var(--font-syne)",
                            fontSize: "0.625rem",
                            fontWeight: 800,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "var(--text-inverse)",
                            background: color,
                            border: "2px solid var(--line)",
                            padding: "0.25rem 0.6rem",
                            flexShrink: 0,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p
                        style={{
                          fontFamily: "var(--font-syne)",
                          fontSize: "0.6875rem",
                          fontWeight: 800,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "var(--text-soft)",
                          marginBottom: "0.75rem",
                        }}
                      >
                        {item.venue} · {item.period}
                      </p>

                      <p
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.8125rem",
                          color: "var(--text-soft)",
                          lineHeight: 1.75,
                          marginBottom: "1.25rem",
                        }}
                      >
                        {item.description}
                      </p>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                          {item.tags.map((tag) => (
                            <Tag key={tag}>{tag}</Tag>
                          ))}
                        </div>
                        {item.link && (
                          <Link
                            href={item.link}
                            style={{
                              fontFamily: "var(--font-syne)",
                              fontSize: "0.8125rem",
                              fontWeight: 800,
                            }}
                            className="neo-btn neo-btn-secondary"
                          >
                            Read paper <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredResearch.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "4rem",
                    color: "var(--text-soft)",
                    fontFamily: "var(--font-dm-mono)",
                    fontSize: "0.875rem",
                  }}
                >
                  No research entries for this filter.
                </div>
              )}
            </div>
      )}

      <div style={{ padding: "1.4rem 0" }}>
        <Link
          href="/"
          className="neo-btn neo-btn-secondary"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import { GithubIcon } from "@/components/icons";

const GITHUB_PLACEHOLDER = "https://github.com/haryshwa05";

function Tag({ children, active, onClick }: { children: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: "0.68rem",
        fontWeight: 800,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: active ? "var(--text-inverse)" : "var(--text)",
        background: active ? "var(--accent-2)" : "var(--surface)",
        border: "2px solid var(--line)",
        padding: "0.35rem 0.75rem",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {children}
    </button>
  );
}

export default function ProjectsClient() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, []);

  const filtered = useMemo(
    () => (activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects),
    [activeTag]
  );

  return (
    <div className="site-wrap" style={{ padding: "2rem 1rem 3rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
          <SectionLabel>Portfolio</SectionLabel>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
            <h1 className="neo-title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.05 }}>
              Projects
            </h1>
            <span style={{ fontSize: "0.92rem", color: "var(--text-soft)" }}>
              {projects.length} total
            </span>
          </div>
      </div>

      <div className="neo-card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <Tag
            active={activeTag === null}
            onClick={() => setActiveTag(null)}
          >
            All
          </Tag>
          {allTags.map((tag) => (
            <Tag
              key={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            >
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="proj-grid">
        {filtered.map((project) => (
          <article key={project.name} className="neo-card" style={{ padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
              <p className="neo-kicker" style={{ color: "var(--accent-2)", margin: 0 }}>{project.year} {project.featured ? "· FEATURED" : ""}</p>
              <span
                style={{
                  border: "2px solid var(--line)",
                  background: project.status === "building" ? "var(--accent-3)" : "var(--surface-alt)",
                  color: project.status === "building" ? "var(--text-inverse)" : "var(--text)",
                  padding: "0.2rem 0.55rem",
                  fontFamily: "var(--font-syne)",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {project.status === "building" ? "Currently Building" : "Built"}
              </span>
            </div>
            <h2 className="neo-title" style={{ fontSize: "1.3rem", margin: "0.4rem 0" }}>{project.name}</h2>
            <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "var(--text-soft)" }}>{project.description}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "0.8rem",
              }}
            >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        background: "var(--surface-alt)",
                        border: "2px solid var(--line)",
                        padding: "0.2rem 0.45rem",
                        cursor: "pointer",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <a
                    href={project.github || GITHUB_PLACEHOLDER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn neo-btn-secondary"
                    aria-label={`${project.name} GitHub repository`}
                  >
                    <GithubIcon size={15} /> GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-primary"
                    >
                      <ExternalLink size={13} /> Live
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
      </div>

      {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-soft)", fontSize: "0.875rem" }}>
            No projects found for &quot;{activeTag}&quot;.{" "}
            <button
              onClick={() => setActiveTag(null)}
              style={{
                background: "none",
                border: "none",
                color: "var(--accent-2)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              Clear filter
            </button>
          </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .proj-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

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

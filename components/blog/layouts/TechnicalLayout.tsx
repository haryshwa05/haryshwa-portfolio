import type { BlogPost } from "@/lib/blogs";
import Link from "next/link";
import ScrollProgress from "@/components/ScrollProgress";
import SectionLabel from "@/components/SectionLabel";

interface Props {
  post: BlogPost;
  children: React.ReactNode;
}

export default function TechnicalLayout({ post, children }: Props) {
  const { frontmatter, readTime } = post;
  const accent = frontmatter.accentColor ?? "var(--accent)";

  return (
    <>
      <ScrollProgress />
      <div className="site-wrap" style={{ minHeight: "100vh", padding: "2rem 1rem 4rem", position: "relative" }}>
        <article
          style={{
            maxWidth: "780px",
            margin: "0 auto",
          }}
        >
          <Link
            href="/blog"
            className="neo-btn neo-btn-secondary"
            style={{ marginBottom: "1rem" }}
          >
            All writing
          </Link>

          <header className="neo-card" style={{ marginBottom: "1.2rem", padding: "1.2rem" }}>
            <SectionLabel color={accent}>{frontmatter.tag}</SectionLabel>

            <h1 className="neo-title" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", lineHeight: 1.1, marginBottom: "0.75rem" }}>
              {frontmatter.title}
            </h1>

            {frontmatter.description && (
              <p
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.9rem",
                  color: "var(--text-soft)",
                  lineHeight: 1.75,
                  marginBottom: "1rem",
                }}
              >
                {frontmatter.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                paddingTop: "0.7rem",
                borderTop: "2px solid var(--line)",
              }}
            >
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.8125rem", color: "var(--text-soft)" }}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>·</span>
              <span style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.8125rem", color: "var(--text-soft)" }}>
                {readTime}
              </span>
              <span>·</span>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "0.6875rem",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-inverse)",
                  background: accent,
                  border: "2px solid var(--line)",
                  padding: "0.2rem 0.5rem",
                }}
              >
                Technical
              </span>
            </div>
          </header>

          <div className="neo-card prose" style={{ padding: "1.2rem" }}>{children}</div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <Link
              href="/blog"
              className="neo-btn neo-btn-secondary"
            >
              All writing
            </Link>
            <Link
              href="/"
              className="neo-btn neo-btn-primary"
            >
              haryshwa.com
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

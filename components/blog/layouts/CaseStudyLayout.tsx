import type { BlogPost } from "@/lib/blogs";
import Link from "next/link";
import ScrollProgress from "@/components/ScrollProgress";
import SectionLabel from "@/components/SectionLabel";

interface Props {
  post: BlogPost;
  children: React.ReactNode;
}

export default function CaseStudyLayout({ post, children }: Props) {
  const { frontmatter, readTime } = post;
  const accent = frontmatter.accentColor ?? "#0ea5e9";

  return (
    <>
      <ScrollProgress />
      <div className="site-wrap" style={{ minHeight: "100vh", padding: "2rem 1rem 4rem" }}>
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            <Link
              href="/blog"
              className="neo-btn neo-btn-secondary"
              style={{ marginBottom: "1rem" }}
            >
              All writing
            </Link>

          <div className="neo-card" style={{ padding: "1.2rem" }}>
            <SectionLabel color={accent}>{frontmatter.tag}</SectionLabel>

            <h1 className="neo-title" style={{ fontSize: "clamp(1.8rem, 5vw, 3.1rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              {frontmatter.title}
            </h1>

            {frontmatter.description && (
              <p
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: "0.9rem",
                  color: "var(--text-soft)",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}
              >
                {frontmatter.description}
              </p>
            )}

            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                {
                  label: "Date",
                  value: new Date(frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }),
                },
                { label: "Reading time", value: readTime },
                { label: "Type", value: "Case Study" },
                { label: "Status", value: frontmatter.status ?? "Published" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: "0.625rem",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-soft)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-mono)", fontSize: "0.875rem", color: "var(--text)" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "1rem 0" }}>
          <div className="prose neo-card" style={{ padding: "1.2rem" }}>{children}</div>
        </div>

        <div
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "0.5rem 0 0",
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
    </div>
    </>
  );
}

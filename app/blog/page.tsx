import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";
import { personal } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Writing",
  description: `Essays, research notes, and technical writing by ${personal.name}`,
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogs();

  return (
    <div className="site-wrap" style={{ padding: "2rem 1rem 3rem" }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <div style={{ marginBottom: "1.3rem" }}>
          <SectionLabel>Writing</SectionLabel>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
            <h1 className="neo-title" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.05 }}>
              Writing
            </h1>
            <span style={{ fontSize: "0.92rem", color: "var(--text-soft)" }}>
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: "0.875rem",
              color: "var(--text-soft)",
              lineHeight: 1.75,
              marginTop: "1rem",
              maxWidth: "520px",
            }}
          >
            Technical deep-dives, research notes, and product thinking. Long-form only.
          </p>
        </div>

        {/* Posts list */}
        {posts.length === 0 ? (
          <div className="neo-card" style={{ textAlign: "center", padding: "2rem", color: "var(--text-soft)", fontFamily: "var(--font-dm-mono)", fontSize: "0.875rem" }}>
            No posts yet. Check back soon.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  padding: "1rem",
                  border: "3px solid var(--line)",
                  boxShadow: "var(--shadow)",
                  background: "var(--surface)",
                  textDecoration: "none",
                  marginBottom: "0.9rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    {/* Tag + meta row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginBottom: "0.6rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-syne)",
                          fontSize: "0.625rem",
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--text-inverse)",
                          background: post.frontmatter.accentColor,
                          border: "2px solid var(--line)",
                          padding: "0.2rem 0.5rem",
                        }}
                      >
                        {post.frontmatter.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.75rem",
                          color: "var(--text-soft)",
                        }}
                      >
                        {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.75rem",
                          color: "var(--text-soft)",
                        }}
                      >
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="neo-title" style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.45rem)", lineHeight: 1.3, marginBottom: "0.5rem" }}>
                      {post.frontmatter.title}
                    </h2>

                    {post.frontmatter.description && (
                      <p
                        style={{
                          fontFamily: "var(--font-dm-mono)",
                          fontSize: "0.8125rem",
                          color: "var(--text-soft)",
                          lineHeight: 1.7,
                        }}
                      >
                        {post.frontmatter.description}
                      </p>
                    )}
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: "1.25rem",
                      color: "var(--text-soft)",
                      flexShrink: 0,
                      display: "block",
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: "920px", margin: "0 auto", paddingTop: "1.2rem" }}>
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

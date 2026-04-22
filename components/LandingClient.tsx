"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Mail, MapPin, Clock, Calendar } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import SectionLabel from "@/components/SectionLabel";
import { personal, social, workExperience, research, projects } from "@/data/content";
import profile from "@/data/profile.json";
import { motion, type Variants } from "framer-motion";
import type { BlogMeta } from "@/lib/blogs";

interface Props {
  blogs: BlogMeta[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function LandingClient({ blogs }: Props) {
  const featuredProjects = projects.filter((p) => p.featured);
  const services = [
    {
      title: "AI workflow automation for businesses",
      description: "Custom systems that reduce manual work, automate repetitive ops, and turn messy inputs into clean outputs.",
    },
    {
      title: "Custom RAG systems",
      description: "Retrieval systems built around your files, databases, and workflows instead of generic chatbot demos.",
    },
    {
      title: "Full-stack AI applications",
      description: "End-to-end products with the backend, interface, and UX needed to make AI useful in real business settings.",
    },
  ];

  const statusLines = Object.entries(profile).map(([key, value]) => ({ key, value }));

  const [featuredPost, ...restPosts] = blogs;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="site-wrap"
        style={{
          padding: "3rem 1rem 2rem",
          minHeight: "calc(100svh - 76px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="neo-grid hero-grid">
          <motion.div
            className="neo-card"
            style={{ padding: "1.5rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
          >
            <AvailabilityBadge />
            <h1
              className="neo-title"
              style={{
                fontSize: "clamp(2.2rem, 8vw, 4.6rem)",
                margin: "1rem 0 0",
              }}
            >
              {personal.name}
            </h1>
            <p className="neo-kicker" style={{ color: "var(--accent)", marginTop: "0.5rem" }}>
              {personal.title}
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "48ch", margin: "0.9rem 0", color: "var(--text-soft)" }}>
              {personal.tagline}
            </p>
            <p style={{ display: "inline-flex", gap: "0.35rem", alignItems: "center", fontSize: "0.8rem", marginBottom: "1rem" }}>
              <MapPin size={14} /> {personal.location}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              <Link href="#projects" className="neo-btn neo-btn-primary">View Projects</Link>
              <Link href="/blog"     className="neo-btn neo-btn-secondary">Read Writing</Link>
            </div>
          </motion.div>

          <motion.div
            className="neo-card"
            style={{ overflow: "hidden" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.14 }}
          >
            {/* Terminal bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", borderBottom: "3px solid var(--line)", padding: "0.65rem 0.85rem", background: "var(--surface-alt)" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", border: "2px solid var(--line)" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e", border: "2px solid var(--line)" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", border: "2px solid var(--line)" }} />
              <span style={{ marginLeft: "0.45rem", fontFamily: "var(--font-syne)", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-soft)" }}>
                profile.json
              </span>
            </div>

            <div style={{ padding: "0.95rem 1rem", fontFamily: "var(--font-dm-mono), monospace", fontSize: "0.8rem", lineHeight: 1.75 }}>
              <div style={{ color: "var(--text-soft)" }}>{"{"}</div>
              <div style={{ paddingLeft: "0.9rem" }}>
                {statusLines.map((line, i) => (
                  <motion.div
                    key={line.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.3 }}
                  >
                    <span style={{ color: "var(--accent-2)" }}>&quot;{line.key}&quot;</span>
                    <span style={{ color: "var(--text-soft)" }}>: </span>
                    <span style={{ color: "var(--text)" }}>&quot;{line.value}&quot;</span>
                    <span style={{ color: "var(--text-soft)" }}>,</span>
                  </motion.div>
                ))}
              </div>
              <div style={{ color: "var(--text-soft)" }}>{"}"}</div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", padding: "0 1rem 1rem" }}>
              {[
                { href: social.github,   icon: <GithubIcon size={16} />,   label: "GitHub"   },
                { href: social.linkedin, icon: <LinkedinIcon size={16} />, label: "LinkedIn" },
                { href: social.email,    icon: <Mail size={16} />,         label: "Email"    },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  style={{ width: "36px", height: "36px", display: "grid", placeItems: "center", border: "2px solid var(--line)", background: "var(--surface-alt)" }}
                  whileHover={{ y: -2, boxShadow: "2px 4px 0 var(--line)" }}
                  transition={{ duration: 0.12 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────── */}
      <motion.section
        id="about"
        className="site-wrap"
        style={{ padding: "2rem 1rem" }}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="neo-grid about-grid">
          <div>
            <SectionLabel>About</SectionLabel>
            <h2 className="neo-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", lineHeight: undefined}}>
              Who I am
            </h2>
          </div>
          <div className="neo-card" style={{ padding: "1.2rem" }}>
            {personal.bio.map((line) => (
              <p key={line} style={{ fontSize: "0.9rem", lineHeight: 1.75, marginTop: "0.8rem", color: "var(--text-soft)" }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="services"
        className="site-wrap"
        style={{ padding: "2rem 1rem" }}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ marginBottom: "1.3rem" }}>
          <SectionLabel>Services</SectionLabel>
          <h2 className="neo-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", lineHeight: 1.15 }}>
            What I can build for you
          </h2>
        </div>
        <motion.div
          className="neo-grid services-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              className="neo-card hover-card"
              style={{ padding: "1rem" }}
            >
              <p className="neo-kicker" style={{ color: "var(--accent-2)", margin: 0 }}>Offer</p>
              <h3 className="neo-title" style={{ fontSize: "1.18rem", margin: "0.5rem 0", lineHeight: 1.18 }}>
                {service.title}
              </h3>
              <p style={{ fontSize: "0.86rem", lineHeight: 1.75, color: "var(--text-soft)", margin: 0 }}>
                {service.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Projects ────────────────────────────────────────────────── */}
      <motion.section
        id="projects"
        className="site-wrap"
        style={{ padding: "2rem 1rem" }}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div style={{ marginBottom: "1.4rem" }}>
          <SectionLabel>Projects</SectionLabel>
          <h2 className="neo-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", lineHeight: undefined}}>
            Things I&apos;ve built
          </h2>
        </div>
        <motion.div
          className="neo-grid projects-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {featuredProjects.map((project) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              className="neo-card hover-card"
              style={{ padding: "1rem" }}
            >
              <p className="neo-kicker" style={{ color: "var(--accent-2)", margin: 0 }}>{project.year}</p>
              <h3 className="neo-title" style={{ fontSize: "1.3rem", margin: "0.5rem 0", lineHeight: undefined}}>{project.name}</h3>
              <p style={{ fontSize: "0.84rem", lineHeight: 1.75, color: "var(--text-soft)" }}>{project.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.8rem" }}>
                {project.tags.map((tag) => (
                  <span key={tag} style={{ border: "2px solid var(--line)", background: "var(--surface-alt)", padding: "0.22rem 0.5rem", fontFamily: "var(--font-syne)", fontSize: "0.64rem", fontWeight: 700, textTransform: "uppercase" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: "0.9rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {project.github && <a className="neo-btn neo-btn-secondary" href={project.github} target="_blank" rel="noopener noreferrer">Code</a>}
                {project.live   && <a className="neo-btn neo-btn-secondary" href={project.live}   target="_blank" rel="noopener noreferrer">Live <ExternalLink size={14} /></a>}
              </div>
            </motion.article>
          ))}
        </motion.div>
        <div style={{ marginTop: "1rem" }}>
          <Link href="/projects" className="neo-btn neo-btn-primary">View all projects <ArrowRight size={14} /></Link>
        </div>
      </motion.section>

      {/* ── Work ────────────────────────────────────────────────────── */}
      <motion.section
        id="work"
        className="site-wrap"
        style={{ padding: "2rem 1rem" }}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <SectionLabel>Experience</SectionLabel>
        <h2 className="neo-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", marginBottom: "1rem", lineHeight: undefined}}>
          Where I&apos;ve worked
        </h2>
        <motion.div
          className="neo-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {workExperience.map((job) => (
            <motion.article
              key={job.company}
              variants={fadeUp}
              className="neo-card hover-card"
              style={{ padding: "1rem" }}
            >
              <p className="neo-kicker" style={{ color: "var(--accent-2)", margin: 0 }}>{job.period}</p>
              <h3 className="neo-title" style={{ fontSize: "1.18rem", margin: "0.4rem 0", lineHeight: undefined}}>{job.company}</h3>
              <p style={{ margin: 0, fontWeight: 700 }}>{job.role}</p>
              <p style={{ fontSize: "0.78rem", color: "var(--text-soft)" }}>{job.location}</p>
              <ul style={{ margin: "0.8rem 0 0", paddingLeft: "1rem", lineHeight: 1.7, fontSize: "0.86rem", color: "var(--text-soft)" }}>
                {job.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Research ────────────────────────────────────────────────── */}
      {research.length > 0 && (
        <motion.section
          id="research"
          className="site-wrap"
          style={{ padding: "2rem 1rem" }}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <SectionLabel>Research</SectionLabel>
          <h2 className="neo-title" style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", marginBottom: "1rem", lineHeight: undefined}}>
            Research &amp; Exploration
          </h2>
          <motion.div
            className="neo-grid research-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {research.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="neo-card hover-card"
                style={{ padding: "1rem" }}
              >
                <p className="neo-kicker" style={{ color: "var(--accent-3)", margin: 0 }}>{item.status}</p>
                <h3 className="neo-title" style={{ fontSize: "1.18rem", margin: "0.4rem 0", lineHeight: undefined}}>{item.title}</h3>
                <p style={{ fontSize: "0.75rem", margin: 0 }}>{item.venue} · {item.period}</p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-soft)", lineHeight: 1.7 }}>{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* ── Writing ─────────────────────────────────────────────────── */}
      <motion.section
        id="blog"
        className="site-wrap"
        style={{ padding: "2.5rem 1rem" }}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Section header */}
        <div style={{ marginBottom: "1.2rem" }}>
          <SectionLabel color="var(--accent)">Writing</SectionLabel>
          <h2 className="neo-title" style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", lineHeight: undefined, marginBottom: "0.4rem" }}>
            Long-form technical thinking.
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-soft)", maxWidth: "52ch", lineHeight: 1.7 }}>
            Deep-dives into AI systems, research, and engineering decisions. No summaries — the full story.
          </p>
        </div>

        {/* Featured post — full width, independent whileInView (no parent propagation) */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
            style={{ marginBottom: "1rem" }}
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <article
                className="neo-card hover-card"
                style={{
                  padding: "0",
                  borderLeft: `5px solid ${featuredPost.frontmatter.accentColor}`,
                }}
              >
                {/* Top accent strip */}
                <div style={{ padding: "1.4rem 1.4rem 0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.9rem" }}>
                    <span
                      style={{
                        background: featuredPost.frontmatter.accentColor,
                        color: "#fff",
                        border: "2px solid var(--line)",
                        padding: "0.22rem 0.55rem",
                        fontFamily: "var(--font-syne)",
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      {featuredPost.frontmatter.tag}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-soft)" }}>
                      <Calendar size={12} /> {formatDate(featuredPost.frontmatter.date)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--text-soft)" }}>
                      <Clock size={12} /> {featuredPost.readTime}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "var(--font-syne)",
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: featuredPost.frontmatter.accentColor,
                        border: `2px solid ${featuredPost.frontmatter.accentColor}`,
                        padding: "0.2rem 0.5rem",
                      }}
                    >
                      Featured
                    </span>
                  </div>
                  <h3 className="neo-title" style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.65rem)", lineHeight: 1.2, marginBottom: "0.7rem" }}>
                    {featuredPost.frontmatter.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--text-soft)", maxWidth: "72ch" }}>
                    {featuredPost.frontmatter.description}
                  </p>
                </div>
                <div style={{ padding: "1rem 1.4rem 1.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    className="neo-btn neo-btn-primary"
                    style={{ fontSize: "0.8rem", padding: "0.5rem 0.9rem" }}
                  >
                    Read Article <ArrowRight size={13} />
                  </span>
                </div>
              </article>
            </Link>
          </motion.div>
        )}

        {/* Remaining posts */}
        {restPosts.length > 0 && (
          <motion.div
            className="neo-grid blog-preview-grid"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            style={{ marginBottom: "1rem" }}
          >
            {restPosts.map((post) => (
              <motion.div key={post.slug} variants={fadeUp}>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <article
                    className="neo-card hover-card"
                    style={{
                      padding: "1.1rem",
                      borderLeft: `4px solid ${post.frontmatter.accentColor}`,
                      height: "100%",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.65rem" }}>
                      <span
                        style={{
                          background: post.frontmatter.accentColor,
                          color: "#fff",
                          border: "2px solid var(--line)",
                          padding: "0.18rem 0.45rem",
                          fontFamily: "var(--font-syne)",
                          fontSize: "0.6rem",
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.frontmatter.tag}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-soft)" }}>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="neo-title" style={{ fontSize: "1.02rem", marginBottom: "0.5rem" }}>
                      {post.frontmatter.title}
                    </h3>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-soft)" }}>
                      {post.frontmatter.description}
                    </p>
                    <p style={{ marginTop: "0.8rem", fontSize: "0.78rem", color: "var(--text-soft)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Calendar size={11} /> {formatDate(post.frontmatter.date)}
                    </p>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <Link href="/blog" className="neo-btn neo-btn-secondary">
          Read all writing <ArrowRight size={14} />
        </Link>
      </motion.section>

      {/* ── Contact ─────────────────────────────────────────────────── */}
      <motion.section
        id="contact"
        className="site-wrap"
        style={{ padding: "2rem 1rem 4rem" }}
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="neo-grid contact-grid">
          <div className="neo-card" style={{ padding: "1.5rem" }}>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="neo-title" style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)", margin: "0.4rem 0 0.7rem", lineHeight: 1.06 }}>
              Let&apos;s build something.
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-soft)", maxWidth: "56ch" }}>
              Looking for software engineering, AI/ML roles, and meaningful collaborations.
            </p>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--text-soft)", marginTop: "1rem" }}>
              If you want to talk about a role, a product idea, or an AI system for your business, send the details here and I&apos;ll get back to you.
            </p>
            <a
              href={social.email}
              className="neo-btn neo-btn-secondary"
              style={{ marginTop: "1rem", fontFamily: "var(--font-dm-mono), monospace", fontWeight: 500, letterSpacing: "0.01em", textTransform: "none", fontSize: "0.95rem" }}
            >
              {personal.email}
            </a>
          </div>

          <motion.form
            action="https://formsubmit.co/haryshwa198@gmail.com"
            method="POST"
            className="neo-card"
            style={{ padding: "1.5rem", display: "grid", gap: "0.9rem" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" as const }}
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New portfolio inquiry" />

            <label style={{ display: "grid", gap: "0.35rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-soft)" }}>Name</span>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                style={{ border: "2px solid var(--line)", background: "var(--surface)", padding: "0.8rem 0.9rem", fontFamily: "var(--font-manrope), sans-serif" }}
              />
            </label>

            <label style={{ display: "grid", gap: "0.35rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-soft)" }}>Company</span>
              <input
                type="text"
                name="company"
                placeholder="Company or team"
                style={{ border: "2px solid var(--line)", background: "var(--surface)", padding: "0.8rem 0.9rem", fontFamily: "var(--font-manrope), sans-serif" }}
              />
            </label>

            <label style={{ display: "grid", gap: "0.35rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-soft)" }}>Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                style={{ border: "2px solid var(--line)", background: "var(--surface)", padding: "0.8rem 0.9rem", fontFamily: "var(--font-manrope), sans-serif" }}
              />
            </label>

            <label style={{ display: "grid", gap: "0.35rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-soft)" }}>What they need</span>
              <textarea
                name="need"
                required
                rows={5}
                placeholder="Tell me about the role, collaboration, or system you want built."
                style={{ border: "2px solid var(--line)", background: "var(--surface)", padding: "0.8rem 0.9rem", resize: "vertical", fontFamily: "var(--font-manrope), sans-serif" }}
              />
            </label>

            <label style={{ display: "grid", gap: "0.35rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-soft)" }}>Budget range</span>
              <select
                name="budget"
                required
                defaultValue=""
                style={{ border: "2px solid var(--line)", background: "var(--surface)", padding: "0.8rem 0.9rem", fontFamily: "var(--font-manrope), sans-serif" }}
              >
                <option value="" disabled>Select a range</option>
                <option>Under $1k</option>
                <option>$1k - $3k</option>
                <option>$3k - $7k</option>
                <option>$7k - $15k</option>
                <option>$15k+</option>
                <option>Full-time role</option>
              </select>
            </label>

            <button type="submit" className="neo-btn neo-btn-primary">
              Send inquiry <ArrowRight size={14} />
            </button>
          </motion.form>
        </div>
      </motion.section>

      <style>{`
        @media (min-width: 880px) {
          .hero-grid         { grid-template-columns: 1.2fr 1fr; }
          .about-grid        { grid-template-columns: 0.7fr 1.3fr; }
          .services-grid     { grid-template-columns: repeat(3, 1fr); }
          .projects-grid     { grid-template-columns: repeat(2, 1fr); }
          .research-grid     { grid-template-columns: repeat(2, 1fr); }
          .blog-preview-grid { grid-template-columns: repeat(2, 1fr); }
          .contact-grid      { grid-template-columns: 0.9fr 1.1fr; align-items: start; }
        }
        @media (max-width: 879px) {
          .hero-grid, .about-grid, .services-grid, .projects-grid,
          .research-grid, .blog-preview-grid, .contact-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}

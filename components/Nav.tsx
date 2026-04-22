"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { personal } from "@/data/content";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

type NavItem =
  | { label: string; anchor: string; href?: never }
  | { label: string; href: string; anchor?: never };

const navLinks: NavItem[] = [
  { label: "About",    anchor: "about"    },
  { label: "Services", anchor: "services" },
  { label: "Work",     anchor: "work"     },
  { label: "Projects", anchor: "projects" },
  { label: "Writing",  href: "/blog"      },
  { label: "Contact",  anchor: "contact"  },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const navRef  = useRef<HTMLElement>(null);
  const [navHeight, setNavHeight] = useState(80);
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const measure = () => {
      if (navRef.current) setNavHeight(navRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  const scrollToSection = useCallback((id: string) => {
    closeMenu();

    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = navRef.current?.offsetHeight ?? 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    };

    if (pathname !== "/") {
      // Navigate home first, then scroll after the page loads
      router.push("/");
      setTimeout(doScroll, 400);
    } else {
      doScroll();
    }
  }, [pathname, router]);

  const renderLink = (link: NavItem, className: string) => {
    if (link.anchor) {
      return (
        <button
          key={link.label}
          onClick={() => scrollToSection(link.anchor!)}
          className={className}
        >
          {link.label}
        </button>
      );
    }
    return (
      <Link key={link.label} href={link.href!} onClick={closeMenu} className={className}>
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: "0.5rem 0",
          background: "transparent",
        }}
      >
        <div className="site-wrap">
          <div
            className="neo-card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.65rem 0.85rem",
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label="Back to top"
            >
              <span
                style={{
                  width: "30px",
                  height: "30px",
                  background: "var(--accent)",
                  color: "var(--text-inverse)",
                  border: "2px solid var(--line)",
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                H
              </span>
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  letterSpacing: "0.02em",
                }}
              >
                {personal.firstName}
              </span>
            </button>

            {/* Desktop nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }} className="nav-desktop">
              {navLinks.map((link) => renderLink(link, "nav-link-btn"))}
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                style={{
                  border: "2px solid var(--line)",
                  background: "var(--accent-2)",
                  color: "var(--text-inverse)",
                  padding: "0.45rem",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 var(--line)",
                  transition: "transform 0.12s ease, box-shadow 0.12s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 var(--line)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "2px 2px 0 var(--line)";
                }}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>

            {/* Mobile controls */}
            <div style={{ display: "flex", gap: "0.5rem" }} className="nav-mobile">
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                style={{
                  border: "2px solid var(--line)",
                  background: "var(--accent-2)",
                  color: "var(--text-inverse)",
                  padding: "0.4rem",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                style={{
                  border: "2px solid var(--line)",
                  background: mobileOpen ? "var(--accent)" : "var(--surface)",
                  color: mobileOpen ? "var(--text-inverse)" : "var(--text)",
                  padding: "0.4rem",
                  cursor: "pointer",
                  display: "flex",
                  transition: "background 0.15s ease, color 0.15s ease",
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay â€” fixed, always visible regardless of scroll */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
              background: "var(--bg)",
              paddingTop: `${navHeight}px`,
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{ padding: "0.85rem 1rem" }}
            >
              <div
                className="neo-card"
                style={{ maxWidth: "1180px", margin: "0 auto", padding: "1rem", display: "grid", gap: "0.55rem" }}
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.22, ease: "easeOut" }}
                  >
                    {renderLink(link, "mobile-nav-link")}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile  { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}

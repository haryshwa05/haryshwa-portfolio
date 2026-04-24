import type { Metadata } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Grain from "@/components/Grain";
import AnimatedBg from "@/components/AnimatedBg";
import ThemeProvider from "@/components/ThemeProvider";
import { personal } from "@/data/content";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const syne = Space_Grotesk({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${personal.name} - ${personal.title}`,
    template: `%s - ${personal.name}`,
  },
  description: personal.tagline,
  metadataBase: new URL("https://haryshwa.com"),
  openGraph: {
    type: "website",
    url: "https://haryshwa.com",
    siteName: personal.name,
    title: `${personal.name} - ${personal.title}`,
    description: personal.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} - ${personal.title}`,
    description: personal.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmMono.variable} ${syne.variable} ${manrope.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {"try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}"}
        </Script>
      </head>
      <body style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-manrope), sans-serif", minHeight: "100vh" }}>
        <ThemeProvider>
          <AnimatedBg />
          <Grain />
          <Nav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

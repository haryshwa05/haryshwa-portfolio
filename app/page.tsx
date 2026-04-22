import type { Metadata } from "next";
import LandingClient from "@/components/LandingClient";
import { personal } from "@/data/content";
import { getAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.title}`,
  description: personal.tagline,
};

export default function HomePage() {
  const blogs = getAllBlogs();
  return <LandingClient blogs={blogs} />;
}

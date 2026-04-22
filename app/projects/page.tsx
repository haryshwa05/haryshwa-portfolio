import type { Metadata } from "next";
import ProjectsClient from "@/components/ProjectsClient";
import { personal } from "@/data/content";

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${personal.name} — ${personal.title}`,
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}

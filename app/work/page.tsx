import type { Metadata } from "next";
import WorkClient from "@/components/WorkClient";
import { personal } from "@/data/content";

export const metadata: Metadata = {
  title: "Work & Research",
  description: `Work experience and research by ${personal.name}`,
};

export default function WorkPage() {
  return <WorkClient />;
}

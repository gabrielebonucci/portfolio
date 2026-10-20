import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const description =
  "Progetti di Gabriele Bonucci: Barton AI, un gestionale prenotazioni in Laravel e il plugin WordPress Web Hospitality, sviluppati con Claude Code.";

export const metadata: Metadata = {
  title: "Progetti",
  description,
  openGraph: {
    title: `Progetti | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}

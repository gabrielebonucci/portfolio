import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Projects",
  description: "Featured projects by Gabriele Bonucci — Boolflix and Trankiliti FC. React, Firebase, and API integrations.",
  keywords: ["projects", "react", "firebase", "full stack", "Gabriele Bonucci"],
  openGraph: {
    title: `Projects — ${siteConfig.name}`,
    description: "Featured web development projects built with React, Firebase, and modern tooling.",
    url: `${baseUrl}/projects`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-projects.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Projects`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects — ${siteConfig.name}`,
    description: "Featured web development projects built with React, Firebase, and modern tooling.",
    images: [`${baseUrl}/og-image-projects.png`],
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  );
}

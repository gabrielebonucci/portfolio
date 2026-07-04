import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Workbench",
  description: "Active experiments and work in progress — web apps, n8n automations, and AI agent projects by Gabriele Bonucci.",
  keywords: ["experiments", "prototypes", "work in progress", "n8n", "automation"],
  openGraph: {
    title: `Workbench — ${siteConfig.name}`,
    description: "Active experiments, prototypes, and work in progress.",
    url: `${baseUrl}/workbench`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-workbench.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Workbench`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Workbench — ${siteConfig.name}`,
    description: "Active experiments, prototypes, and work in progress.",
    images: [`${baseUrl}/og-image-workbench.png`],
  },
  alternates: {
    canonical: `${baseUrl}/workbench`,
  },
};

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  );
}

import type { Metadata } from "next";
import { AboutPageContent } from "@/components/public/about/about-page-content";
import { siteConfig } from "@/lib/site-config";

const description =
  "Gabriele Bonucci, junior web developer di Spoleto: esperienza in GraphxStudio, formazione, competenze e lingue.";

export const metadata: Metadata = {
  title: "Chi sono",
  description,
  openGraph: {
    title: `Chi sono | ${siteConfig.name}`,
    description,
    url: `${siteConfig.url}/introduction`,
    type: "profile",
  },
  alternates: {
    canonical: `${siteConfig.url}/introduction`,
  },
};

export default function IntroductionPage() {
  return <AboutPageContent />;
}

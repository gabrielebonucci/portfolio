import { BlogHero } from "@/components/public/blog/blog-hero";
import { BlogList } from "@/components/public/blog/blog-list";
import { BlogSidebar } from "@/components/public/blog/blog-sidebar";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on React development, Firebase, AI automation with n8n, and full stack web projects by Gabriele Bonucci.",
  openGraph: {
    title: `Blog — ${siteConfig.name}`,
    description: "Technical articles and insights on web development and AI automation.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-blog.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — ${siteConfig.name}`,
    description: "Technical articles and insights on web development and AI automation.",
    images: [`${baseUrl}/og-image-blog.png`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <BlogList />
            <BlogSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}

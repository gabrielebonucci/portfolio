import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TechStack } from "@/components/tech-stack"
import { ProjectsGrid } from "@/components/projects-grid"
import { Workbench } from "@/components/workbench"
import { Footer } from "@/components/footer"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"
import { siteConfig } from "@/lib/site-config"

export default function Home() {
  const baseUrl = siteConfig.url
  const websiteStructuredData = generateWebsiteStructuredData(baseUrl)
  const personStructuredData = generatePersonStructuredData()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
      />
      <main className="min-h-screen">
        <div>
          <Header />
          <HeroSection />
          <TechStack />
          <ProjectsGrid />
          <Workbench />
          <Footer />
        </div>
      </main>
    </>
  )
}

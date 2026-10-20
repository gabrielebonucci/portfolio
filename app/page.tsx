import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectBands } from "@/components/project-bands"
import { OtherProjects } from "@/components/other-projects"
import { ExperienceStrip } from "@/components/experience-strip"
import { Footer } from "@/components/footer"
import { mainProjects, otherProjects } from "@/lib/projects-data"
import { generateWebsiteStructuredData, generatePersonStructuredData } from "@/lib/structured-data"
import { siteConfig } from "@/lib/site-config"

export default function Home() {
  const websiteStructuredData = generateWebsiteStructuredData(siteConfig.url)
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
      <Header />
      <main>
        <HeroSection />
        <ProjectBands projects={mainProjects} />
        <OtherProjects projects={otherProjects} />
        <ExperienceStrip />
      </main>
      <Footer />
    </>
  )
}

"use client"

import { ProjectBands } from "@/components/project-bands"
import { OtherProjects } from "@/components/other-projects"
import { mainProjects, otherProjects } from "@/lib/projects-data"
import { useLanguage } from "@/lib/i18n"

export function ProjectsPageContent() {
  const { t } = useLanguage()

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16">
        <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-[0.9] text-ink">{t("projects.heading")}</h1>
        <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">{t("projects.intro")}</p>
      </section>
      <ProjectBands projects={mainProjects} detailed />
      <OtherProjects projects={otherProjects} detailed />
    </>
  )
}

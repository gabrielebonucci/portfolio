"use client"

import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import type { BandColor, Project } from "@/lib/projects-data"

const bandStyles: Record<BandColor, string> = {
  violet: "bg-band-violet text-white",
  orange: "bg-band-orange text-ink",
  lime: "bg-band-lime text-ink",
}

// Main projects as full-colour bands: side by side on large screens, stacked below
export function ProjectBands({ projects, detailed = false }: { projects: Project[]; detailed?: boolean }) {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="main-projects" className="grid lg:grid-cols-3">
      <h2 id="main-projects" className="sr-only">
        {t("projects.main")}
      </h2>
      {projects.map((project) => (
        <article
          key={project.slug}
          className={cn(
            "band flex flex-col justify-between gap-8 px-5 py-7 sm:px-8",
            detailed ? "min-h-[26rem]" : "min-h-[17rem]",
            bandStyles[project.band ?? "lime"],
          )}
        >
          <div>
            <p className="text-sm font-semibold">{t(`projects.kind.${project.kind}`)}</p>
            <h3 className="mt-3 font-display text-[2.5rem] leading-[0.95]">{project.title}</h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed">
              {t(`projects.${project.slug}.${detailed ? "description" : "summary"}`)}
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-3 text-sm font-semibold">
            <span>{project.stack.join(", ")}</span>
            {project.repoUrl || project.liveUrl ? (
              <span className="flex gap-4">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    {t("projects.code")}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 underline underline-offset-4"
                  >
                    {t("projects.live")}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </span>
            ) : (
              <span className="font-medium">{t("projects.privateNote")}</span>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}

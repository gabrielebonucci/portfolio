"use client"

import { useLanguage } from "@/lib/i18n"
import type { Project } from "@/lib/projects-data"

// Earlier projects in compact rows, under the main colour bands
export function OtherProjects({ projects, detailed = false }: { projects: Project[]; detailed?: boolean }) {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="other-projects" className="mx-auto max-w-7xl px-4 py-14 sm:px-8 sm:py-20">
      <h2 id="other-projects" className="font-display text-4xl leading-none text-ink sm:text-5xl">
        {t("projects.others")}
      </h2>
      <ul className="mt-8 border-t border-line">
        {projects.map((project) => (
          <li key={project.slug} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[180px_1fr] sm:gap-8">
            {project.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt=""
                loading="lazy"
                className="aspect-[16/10] w-full max-w-[280px] rounded-md border border-line object-cover sm:max-w-none"
              />
            ) : (
              <span aria-hidden="true" />
            )}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
                <span className="text-sm text-ink-muted">
                  {t(`projects.kind.${project.kind}`)}, {project.year}
                </span>
              </div>
              <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
                {t(`projects.${project.slug}.${detailed ? "description" : "summary"}`)}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <span className="text-ink-muted">{project.stack.join(", ")}</span>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink underline underline-offset-4"
                  >
                    {t("projects.code")}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink underline underline-offset-4"
                  >
                    {t("projects.live")}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

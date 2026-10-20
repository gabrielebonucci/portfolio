"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

const previous = [
  { company: "AgriEuro", key: "agrieuro" },
  { company: "Very Important Web", key: "viw" },
]

// Home summary of the career: current job first, earlier roles in one line each
export function ExperienceStrip() {
  const { t } = useLanguage()

  return (
    <section aria-labelledby="experience" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="experience" className="font-display text-4xl leading-none text-ink sm:text-5xl">
            {t("home.experience.heading")}
          </h2>
          <p className="mt-8 text-sm font-semibold text-ink-muted">{t("home.experience.now")}</p>
          <p className="mt-2 text-2xl font-semibold text-ink">GraphxStudio</p>
          <p className="text-ink-soft">
            {t("exp.graphx.role")}, Umbertide. {t("exp.graphx.period")}
          </p>
          <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{t("exp.graphx.desc")}</p>
        </div>
        <div className="lg:pt-[4.5rem]">
          <p className="text-sm font-semibold text-ink-muted">{t("home.experience.before")}</p>
          <ul className="mt-2">
            {previous.map((job) => (
              <li key={job.key} className="border-b border-line py-3">
                <span className="font-semibold text-ink">{job.company}</span>
                <span className="text-ink-soft">
                  {", "}
                  {t(`exp.${job.key}.role`)}, {t(`exp.${job.key}.period`)}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/introduction" className="mt-6 inline-block font-semibold text-ink underline underline-offset-4">
            {t("home.experience.more")}
          </Link>
        </div>
      </div>
    </section>
  )
}

"use client"

import { siteConfig } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n"

const skillGroups = ["frontend", "wp", "ai", "backend", "tools"]

const jobs = [
  { key: "graphx", company: "GraphxStudio", place: "Umbertide (PG)", bullets: ["b1", "b2", "b3", "b4"] },
  { key: "agrieuro", company: "AgriEuro", place: "Spoleto (PG)", bullets: [] },
  { key: "viw", company: "Very Important Web", place: "Spoleto (PG)", bullets: [] },
]

const schools = [
  { key: "boolean", school: "Boolean", hasDesc: true },
  { key: "its", school: "ITS Umbria Academy", hasDesc: true },
  { key: "itcg", school: "ITCG Spagna, Spoleto", hasDesc: false },
]

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-4xl leading-none text-ink sm:text-5xl">
      {children}
    </h2>
  )
}

export function AboutPageContent() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      {/* Bio and portrait */}
      <section className="grid gap-10 pb-14 pt-10 sm:pt-16 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          <h1 className="font-display text-[clamp(3rem,8vw,5rem)] leading-[0.9] text-ink">{t("intro.title")}</h1>
          <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>{t("intro.bio.p1")}</p>
            <p>{t("intro.bio.p2")}</p>
            <p>{t("intro.bio.p3")}</p>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/developer-portrait.jpg"
          alt={t("intro.photoAlt")}
          className="aspect-square w-full max-w-[320px] rounded-md object-cover lg:mt-4"
        />
      </section>

      {/* Skills */}
      <section aria-labelledby="skills" className="border-t border-line py-14">
        <SectionTitle id="skills">{t("intro.skills.heading")}</SectionTitle>
        <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group} className="border-b border-line py-4">
              <dt className="font-semibold text-ink">{t(`intro.skills.${group}.title`)}</dt>
              <dd className="mt-1 text-ink-soft">{t(`intro.skills.${group}.items`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Experience */}
      <section aria-labelledby="experience" className="border-t border-line py-14">
        <SectionTitle id="experience">{t("intro.experience.heading")}</SectionTitle>
        <ol className="mt-8">
          {jobs.map((job) => (
            <li key={job.key} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <p className="text-sm font-medium text-ink-muted">{t(`exp.${job.key}.period`)}</p>
              <div>
                <h3 className="text-xl font-semibold text-ink">{job.company}</h3>
                <p className="text-ink-soft">
                  {t(`exp.${job.key}.role`)}, {job.place}
                </p>
                {job.bullets.length > 0 ? (
                  <ul className="mt-3 max-w-3xl list-disc space-y-1.5 pl-5 leading-relaxed text-ink-soft">
                    {job.bullets.map((b) => (
                      <li key={b}>{t(`exp.${job.key}.${b}`)}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">{t(`exp.${job.key}.desc`)}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section aria-labelledby="education" className="border-t border-line py-14">
        <SectionTitle id="education">{t("intro.education.heading")}</SectionTitle>
        <ol className="mt-8">
          {schools.map((s) => (
            <li key={s.key} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
              <p className="text-sm font-medium text-ink-muted">{t(`edu.${s.key}.period`)}</p>
              <div>
                <h3 className="text-xl font-semibold text-ink">{t(`edu.${s.key}.title`)}</h3>
                <p className="text-ink-soft">{s.school}</p>
                {s.hasDesc && <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">{t(`edu.${s.key}.desc`)}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Languages and outside work */}
      <section className="grid gap-12 border-t border-line py-14 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-ink">{t("intro.languages.heading")}</h2>
          <p className="mt-3 text-lg text-ink-soft">{t("intro.languages.value")}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-ink">{t("intro.other.heading")}</h2>
          <ul className="mt-3 space-y-3 leading-relaxed text-ink-soft">
            <li>{t("intro.other.referee")}</li>
            <li>
              {t("intro.other.series")}{" "}
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline underline-offset-4"
              >
                {siteConfig.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

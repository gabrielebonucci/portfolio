"use client"

import { siteConfig } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="hero-in mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_260px] lg:items-end lg:gap-12">
        <h1 className="font-display text-[clamp(3rem,9vw,5.75rem)] leading-[0.9] tracking-[-0.01em] text-ink text-balance">
          {t("hero.title")}
        </h1>
        <div className="max-w-md lg:pb-2">
          <p className="text-base leading-relaxed text-ink-soft">{t("hero.body")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
            >
              {t("hero.cta.contact")}
            </a>
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-ink px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {t("hero.cta.cv")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

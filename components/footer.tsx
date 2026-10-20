"use client"

import { siteConfig } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n"

export function Footer() {
  const { t } = useLanguage()
  const linkClass = "font-semibold text-ink underline-offset-4 hover:underline"

  return (
    <footer id="contatti" className="border-t border-line bg-white/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="font-display text-5xl leading-none text-ink sm:text-6xl">{t("footer.heading")}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-ink-soft">{t("footer.body")}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-6 inline-block break-all text-xl font-semibold text-ink underline underline-offset-4 sm:text-2xl"
          >
            {siteConfig.email}
          </a>
        </div>
        <ul className="space-y-3 text-[15px] lg:text-right">
          <li>
            <a href={siteConfig.phoneHref} className={linkClass}>
              {siteConfig.phone}
            </a>
          </li>
          <li>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
          </li>
          <li>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
          </li>
          <li className="text-ink-soft">
            {t("footer.videos")}{" "}
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {siteConfig.instagramHandle}
            </a>
          </li>
        </ul>
      </div>
      <p className="mx-auto max-w-7xl px-4 pb-8 text-sm text-ink-muted sm:px-8">
        © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
      </p>
    </footer>
  )
}

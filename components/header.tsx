"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n"
import { LanguageToggle } from "./language-toggle"

const navItems = [
  { key: "nav.projects", href: "/projects" },
  { key: "nav.about", href: "/introduction" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const linkClass = (href: string) =>
    cn(
      "rounded-md px-3 py-2 text-[15px] font-medium transition-colors hover:text-ink",
      pathname.startsWith(href) ? "text-ink underline decoration-2 underline-offset-[6px]" : "text-ink-muted",
    )

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
        <Link href="/" className="text-[15px] font-semibold tracking-tight text-ink" onClick={() => setIsMenuOpen(false)}>
          {siteConfig.name}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className={linkClass(item.href)}>
              {t(item.key)}
            </Link>
          ))}
          <a href={siteConfig.cvUrl} target="_blank" rel="noopener noreferrer" className={linkClass(siteConfig.cvUrl)}>
            {t("nav.cv")}
          </a>
          <LanguageToggle />
          <a
            href={`mailto:${siteConfig.email}`}
            className="ml-2 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-85"
          >
            {t("nav.contact")}
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={t("nav.menu")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink hover:bg-ink/5"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-line bg-paper px-4 pb-5 pt-2 md:hidden">
          <div className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-line py-3.5 text-lg font-medium text-ink"
              >
                {t(item.key)}
              </Link>
            ))}
            <a
              href={siteConfig.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-line py-3.5 text-lg font-medium text-ink"
            >
              {t("hero.cta.cv")}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 rounded-md bg-ink px-4 py-3 text-center font-semibold text-paper"
            >
              {t("nav.contact")}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

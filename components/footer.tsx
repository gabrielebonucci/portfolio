"use client"

import { Github, Linkedin, Mail, ExternalLink, Heart, Phone } from "lucide-react"
import { siteConfig, socialLinks } from "@/lib/site-config"
import { useLanguage } from "@/lib/i18n"

const iconMap = {
  Github,
  Linkedin,
  Mail,
  Phone,
}

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer id="connect" className="border-t border-border/30 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">{t("footer.eyebrow")}</p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
                {t("footer.heading.a")}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text ">{t("footer.heading.b")}</span>
              </h2>
            </div>
            <p className="max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>

            <div className="pt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 font-mono text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/30 active:scale-[0.98] w-full sm:w-auto"
              >
                <span>{t("footer.cta")}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right column - Links */}
          <div className="space-y-6 lg:text-right animate-fade-in-up stagger-2">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
              {t("footer.elsewhere")}
            </p>
            <div className="space-y-2">
              {socialLinks.map((link, index) => {
                const Icon = iconMap[link.icon]
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "Email" && link.label !== "Phone" ? "_blank" : undefined}
                    rel={link.label !== "Email" && link.label !== "Phone" ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 lg:flex-row-reverse active:bg-secondary/30 hover:border-border/50 hover:bg-card/50 glass animate-fade-in"
                    style={{ animationDelay: `${index * 100 + 400}ms` }}
                  >
                    <div className="flex items-center gap-3 lg:flex-row-reverse">
                      <Icon className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                      <span className="font-mono text-sm font-medium transition-colors group-hover:text-gradient">
                        {link.label}
                      </span>
                      {link.label !== "Email" && link.label !== "Phone" && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                      )}
                    </div>
                    <span className="font-mono text-xs text-muted-foreground truncate">{link.handle}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 flex flex-col items-center justify-between gap-6 border-t border-border/30 pt-8 sm:pt-10 sm:flex-row animate-fade-in stagger-4">
          <div className="flex items-center gap-4">
            {socialLinks.slice(0, 3).map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>

          <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            © {new Date().getFullYear()} {siteConfig.name} — {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}

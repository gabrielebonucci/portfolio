"use client"

import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

export function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-lg",
        "text-muted-foreground transition-all duration-300",
        "hover:text-primary hover:bg-primary/10",
      )}
      aria-label={t("lang.tooltip")}
    >
      <Globe className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      {/* Compact IT/EN indicator badge */}
      <span className="absolute -bottom-0.5 -right-0.5 rounded bg-primary/15 px-1 font-mono text-[8px] font-semibold uppercase leading-tight text-primary">
        {language}
      </span>
      <span
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap",
          "rounded-md bg-card border border-border px-2.5 py-1",
          "font-mono text-[10px] text-muted-foreground",
          "opacity-0 transition-all duration-200 pointer-events-none shadow-lg",
          "group-hover:opacity-100 group-hover:-bottom-9",
        )}
      >
        {language === "en" ? "Switch to Italiano" : "Passa a English"}
      </span>
    </button>
  )
}

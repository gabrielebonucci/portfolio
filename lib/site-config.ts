export const siteConfig = {
  name: "Gabriele Bonucci",
  shortName: "Gabriele Bonucci",
  title: "Gabriele Bonucci, Web Developer",
  description:
    "Junior Web Developer da GraphxStudio. Costruisco siti e applicazioni web in React e JavaScript e sviluppo ogni giorno con Claude Code.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-xw9f-three.vercel.app",
  location: "Spoleto, Umbria",
  role: "Junior Web Developer",
  employer: "GraphxStudio",
  email: "g.bonucci99@gmail.com",
  phone: "+39 366 147 3344",
  phoneHref: "tel:+393661473344",
  cvUrl: "/cv.pdf",
  github: "https://github.com/gabrielebonucci",
  linkedin: "https://linkedin.com/in/gabriele-bonucci-5334201b1",
  instagram: "https://www.instagram.com/unbugalgiorno/",
  instagramHandle: "@unbugalgiorno",
} as const

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github, handle: "@gabrielebonucci", icon: "Github" as const },
  { label: "LinkedIn", href: siteConfig.linkedin, handle: "/in/gabriele-bonucci-5334201b1", icon: "Linkedin" as const },
  { label: "Email", href: `mailto:${siteConfig.email}`, handle: siteConfig.email, icon: "Mail" as const },
  { label: "Phone", href: siteConfig.phoneHref, handle: siteConfig.phone, icon: "Phone" as const },
]

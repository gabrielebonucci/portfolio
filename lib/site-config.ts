export const siteConfig = {
  name: "Gabriele Bonucci",
  shortName: "GB LAB",
  title: "Gabriele Bonucci — Full Stack Developer & AI Automation",
  description:
    "Junior Full Stack Developer specializing in modern React interfaces and AI automations. Building web apps with React, Node.js/Express, and intelligent workflows with n8n and AI agents.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://gabrielebonucci.vercel.app",
  location: "Spoleto, Umbria (Italy)",
  role: "Full Stack Web Developer & AI Automation Specialist",
  email: "g.bonucci99@gmail.com",
  phone: "+39 366 147 3344",
  phoneHref: "tel:+393661473344",
  // Drop the real PDF at /public/cv.pdf (placeholder path used by the "Download CV" CTA)
  cvUrl: "/cv.pdf",
  github: "https://github.com/gabrielebonucci",
  linkedin: "https://linkedin.com/in/gabriele-bonucci-5334201b1",
  bio: "Junior Full Stack Developer specializing in modern interfaces with React and AI automations. I build websites and web applications with React, JavaScript, Node.js/Express, and develop intelligent automations with n8n and AI agents — including WhatsApp chatbots for restaurant and bar reservation management. Trained through the Boolean Master in Full Stack Web Development and the ITS Umbria Academy Master in Automation and Digital Systems (95/100).",
} as const

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github, handle: "@gabrielebonucci", icon: "Github" as const },
  { label: "LinkedIn", href: siteConfig.linkedin, handle: "/in/gabriele-bonucci-5334201b1", icon: "Linkedin" as const },
  { label: "Email", href: `mailto:${siteConfig.email}`, handle: siteConfig.email, icon: "Mail" as const },
  { label: "Phone", href: siteConfig.phoneHref, handle: siteConfig.phone, icon: "Phone" as const },
]

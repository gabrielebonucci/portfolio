import { Code2, Layers, Bot, Globe, Briefcase, GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";

const skills = [
  {
    category: "Frontend",
    items: ["React.js", "JavaScript", "HTML5", "CSS3"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "MySQL"],
  },
  {
    category: "CMS",
    items: ["WordPress"],
  },
  {
    category: "AI & Automation",
    items: ["n8n", "AI Agents", "Workflow Automation", "WhatsApp Chatbot"],
  },
  {
    category: "Design",
    items: ["Adobe (social & brand graphics)"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Vite", "Axios", "Firebase"],
  },
  {
    category: "Languages",
    items: ["Italian (native)", "English", "French", "Spanish"],
  },
];

const experience = [
  {
    company: "AGRIEURO",
    role: "Data Entry Specialist",
    period: "1 year 7 months",
    description: "Database management and product data entry for the outlet department in the company ERP system.",
  },
  {
    company: "Very Important Web",
    role: "Junior Web Designer",
    period: "6 months",
    description: "Created graphics and managed Instagram profiles for client companies.",
  },
  {
    company: "A.I.A. - FIGC",
    role: "Football Referee",
    period: "Since 2018",
    description: "Leadership, quick decision-making, and pressure management on the field.",
  },
];

const education = [
  {
    school: "Boolean",
    title: "Master in Full Stack Web Development",
  },
  {
    school: "ITS Umbria Academy",
    title: "Automation and Mechatronic Systems (95/100)",
  },
  {
    school: "ITCG Spagna",
    title: "Technical and Professional Institute Diploma",
  },
];

const focusAreas = [
  {
    icon: Layers,
    title: "Full Stack Web Apps",
    description:
      "React frontends with Node.js/Express backends, MySQL databases, and deployment-ready architectures.",
  },
  {
    icon: Bot,
    title: "AI & Workflow Automation",
    description:
      "n8n workflows, AI agents, and WhatsApp chatbots for booking management in restaurants and bars.",
  },
  {
    icon: Globe,
    title: "Modern Interfaces",
    description:
      "Responsive, component-driven UIs with React, Vite, and API integrations for dynamic user experiences.",
  },
];

// Vertical timeline column shared by Experience and Education
function TimelineColumn({
  eyebrow,
  heading,
  icon: Icon,
  items,
}: {
  eyebrow: string;
  heading: string;
  icon: typeof Briefcase;
  items: { title: string; subtitle: string; period?: string; description?: string }[];
}) {
  return (
    <div>
      <div className="mb-8 space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">{eyebrow}</p>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
      </div>

      <div className="relative">
        {/* Vertical rail */}
        <div className="absolute left-4 top-2 bottom-2 w-px -translate-x-1/2 bg-border/60" aria-hidden="true" />

        <div className="space-y-8">
          {items.map((item, index) => (
            <div key={index} className="relative flex gap-5">
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-1 pt-0.5">
                <h3 className="font-semibold leading-tight text-foreground">{item.title}</h3>
                <p className="font-mono text-xs text-muted-foreground">{item.subtitle}</p>
                {item.period && <p className="font-mono text-xs text-primary">{item.period}</p>}
                {item.description && (
                  <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                  About {siteConfig.name}
                </p>
                {/* Availability badge with green indicator */}
                <Badge variant="outline" className="gap-2 rounded-full bg-secondary/40 px-3 py-1 font-mono uppercase tracking-wider text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Open to work
                </Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                {siteConfig.role.split(" & ")[0].replace("Junior ", "")}{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  & AI Automation
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              {siteConfig.bio.replace("Junior ", "")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm">
            <div className="grid gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:items-start md:gap-12">
              {/* Professional portrait — drop the real photo at public/developer-portrait.jpg */}
              <div className="relative mx-auto w-full max-w-[280px] md:mx-0">
                <div className="relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/10 to-accent/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/developer-portrait.jpg"
                    alt={`${siteConfig.name} — ${siteConfig.role.split(" & ")[0].replace("Junior ", "")}`}
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <div
                  className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-primary/10 blur-2xl"
                  aria-hidden="true"
                />
              </div>

              {/* Bio text */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                    About Me
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Developer from {siteConfig.location}
                  </h2>
                </div>

                <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I&apos;m a Full Stack Developer with a strong focus on modern React interfaces and intelligent
                    workflow automations. My path combines hands-on web development training at Boolean with a
                    specialized master in automation and digital systems at ITS Umbria Academy, where I graduated with
                    95/100.
                  </p>

                  <p>
                    Beyond code, I bring experience from data management at AGRIEURO, social media design at Very
                    Important Web, and over six years as a FIGC football referee — skills in precision, communication,
                    and performing under pressure that translate directly into professional development work.
                  </p>

                  <p>
                    Currently exploring AI-powered automations with n8n, building WhatsApp chatbots for hospitality
                    businesses, and shipping React applications from concept to deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
              Technical Stack
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Skills & Tools</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                    {skill.category}
                  </h3>
                </div>
                {/* Technologies as a responsive flex-wrap grid of badges */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <Badge key={item} variant="secondary" className="font-mono font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education — parallel vertical timelines */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <TimelineColumn
              eyebrow="Career"
              heading="Experience"
              icon={Briefcase}
              items={experience.map((item) => ({
                title: `${item.role} — ${item.company}`,
                subtitle: item.period,
                period: undefined,
                description: item.description,
              }))}
            />
            <TimelineColumn
              eyebrow="Education"
              heading="Formation"
              icon={GraduationCap}
              items={education.map((item) => ({
                title: item.title,
                subtitle: item.school,
              }))}
            />
          </div>
        </div>
      </section>

      {/* Highlights / Focus Areas */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Focus Areas</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I Build</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border border-border/50 bg-card/50 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                {/* Prominent icon placeholder above each description */}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-primary/30 bg-gradient-to-br from-primary/20 to-accent/10 text-primary shadow-lg shadow-primary/10 transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-primary/20 group-hover:scale-105">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

import { Code2, Layers, Bot, Globe, Briefcase, GraduationCap } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

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

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                About {siteConfig.name}
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                {siteConfig.role.split(" & ")[0]}{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  & AI Automation
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              {siteConfig.bio}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
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
                I&apos;m a Junior Full Stack Developer with a strong focus on modern React interfaces and intelligent
                workflow automations. My path combines hands-on web development training at Boolean with a specialized
                master in automation and digital systems at ITS Umbria Academy, where I graduated with 95/100.
              </p>

              <p>
                Beyond code, I bring experience from data management at AGRIEURO, social media design at Very Important
                Web, and over six years as a FIGC football referee — skills in precision, communication, and performing
                under pressure that translate directly into professional development work.
              </p>

              <p>
                {/* TODO: Sostituire /developer-portrait.png con una foto professionale reale di Gabriele Bonucci */}
                Currently exploring AI-powered automations with n8n, building WhatsApp chatbots for hospitality
                businesses, and shipping React applications from concept to deployment.
              </p>
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
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {skill.category}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{skill.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Career</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Experience</h2>
          </div>

          <div className="space-y-6">
            {experience.map((item, index) => (
              <div
                key={index}
                className="rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                      {item.role} — {item.company}
                    </h3>
                    <p className="font-mono text-xs text-primary">{item.period}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Education</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Formation</h2>
          </div>

          <div className="space-y-6">
            {education.map((item, index) => (
              <div
                key={index}
                className="rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="font-mono text-xs text-muted-foreground">{item.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">Focus Areas</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What I Build</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
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
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
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

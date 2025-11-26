"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowUpRight, Sparkles, Shield, Network } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ProjectType = "web" | "desktop" | "cpp"

type Project = {
  title: string
  category: string
  description: string
  stack: string[]
  stats: Array<{ label: string; value: string }>
  image: string
  link: string
  github?: string
  accent: string
  type: ProjectType
}

const projects: Project[] = [
  {
    title: "Sawerni",
    category: "Flagship Web",
    description:
      "Algeria's marketplace for verified photographers with automated trust scoring, Rust microservices, and mobile-first flows.",
    stack: ["Rust", "TypeScript", "PostgreSQL", "Microservices"],
    stats: [
      { label: "Latency", value: "120ms" },
      { label: "Coverage", value: "48 wilayas" },
    ],
    image: "/sawerni.png",
    link: "https://sawerni.vercel.app/",
    github: "https://github.com/xCyberpunkx/sawerni-kv",
    accent: "from-emerald-50/80 via-white to-white",
    type: "web",
  },
  {
    title: "Optimize Construction",
    category: "Web Edge",
    description:
      "Realtime lead routing and headless CMS workflows for modular construction specialists, tuned for SEO and sales ops.",
    stack: ["Next.js", "Cloudflare", "WordPress", "Edge Functions"],
    stats: [
      { label: "Leads", value: "+37%" },
      { label: "SEO", value: "+61%" },
    ],
    image: "/optimize.png",
    link: "https://optimize-construction.dz",
    accent: "from-amber-50/80 via-white to-white",
    type: "web",
  },
  {
    title: "SignalOps Console Suite",
    category: "Desktop Telemetry",
    description:
      "C#/.NET 8 console toolkit that streams factory telemetry, triages anomalies, and syncs with ClickUp-style command boards.",
    stack: ["C#", ".NET 8", "gRPC", "Azure"],
    stats: [
      { label: "Nodes", value: "42 edge" },
      { label: "Ingest", value: "1.3M evt/min" },
    ],
    image: "/personal.png",
    link: "https://github.com/xCyberpunkx/signal-ops",
    github: "https://github.com/xCyberpunkx/signal-ops",
    accent: "from-indigo-50/80 via-white to-white",
    type: "desktop",
  },
  {
    title: "Chronicle Scheduler",
    category: "Desktop R&D",
    description:
      "ClickUp-inspired orchestration desk built with C# + Avalonia. Syncs sprints, DSA logs, and console apps with offline-ready storage.",
    stack: ["C#", "Avalonia", "SQLite", "SignalR"],
    stats: [
      { label: "Teams", value: "18" },
      { label: "Uptime", value: "99.9%" },
    ],
    image: "/max.jpg",
    link: "https://github.com/xCyberpunkx/chronicle",
    github: "https://github.com/xCyberpunkx/chronicle",
    accent: "from-rose-50/80 via-white to-white",
    type: "desktop",
  },
  {
    title: "C++ ECS Playground",
    category: "C++ Render Lab",
    description:
      "Lightweight ECS renderer that benchmarks allocators, cache-friendly systems, and shader hot-reload. Ships with CLI profiler.",
    stack: ["C++20", "SDL2", "ImGui", "ECS"],
    stats: [
      { label: "Frame", value: "8.7ms" },
      { label: "Entities", value: "25k" },
    ],
    image: "/images/pixel-cpp.png",
    link: "https://github.com/xCyberpunkx/ecs-playground",
    github: "https://github.com/xCyberpunkx/ecs-playground",
    accent: "from-slate-100/80 via-white to-white",
    type: "cpp",
  },
  {
    title: "DSA Console Kit",
    category: "C++ Problem Sets",
    description:
      "Set of DSA-focused console apps that log approaches, generate test cases, and export markdown write-ups for C++ and C# parity.",
    stack: ["C++17", "Catch2", "CMake", "CLI"],
    stats: [
      { label: "Problems", value: "140" },
      { label: "Bench", value: "1.2x faster" },
    ],
    image: "/images/pixel-opengl.png",
    link: "https://github.com/xCyberpunkx/dsa-console",
    github: "https://github.com/xCyberpunkx/dsa-console",
    accent: "from-cyan-50/80 via-white to-white",
    type: "cpp",
  },
]

const filters: Array<{ label: string; value: "all" | ProjectType }> = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Desktop", value: "desktop" },
  { label: "C++", value: "cpp" },
]

const networkingLabs = [
  {
    title: "Zero-Trust Homelab",
    summary: "Proxmox cluster with WireGuard mesh, pfSense policies, and Grafana panels for latency budgets.",
    stack: ["Proxmox", "WireGuard", "pfSense", "Grafana"],
    metric: "22ms avg latency",
  },
  {
    title: "BGP Sandbox",
    summary: "FRRouting lab that simulates ISP failover and traffic engineering with containerized edge routers.",
    stack: ["FRR", "Docker", "Ansible"],
    metric: "Failover < 3s",
  },
]

const cyberPlaybooks = [
  {
    title: "Red Team Notebook",
    summary: "Rust tooling for payload staging + detection engineering, paired with Sigma rules.",
    stack: ["Rust", "Sigma", "Elastic"],
    metric: "6 playbooks",
  },
  {
    title: "SOC Automation Pack",
    summary: "Python workers that auto-triage alerts, enrich IP intel, and file ClickUp tasks.",
    stack: ["Python", "FastAPI", "SOAR"],
    metric: "45% MTTR reduction",
  },
  {
    title: "Container Hardening Deck",
    summary: "Kubernetes PSP + Falco policies with ready-to-run Terraform modules.",
    stack: ["Kubernetes", "Falco", "Terraform"],
    metric: "12 policies",
  },
]

const layoutPattern = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectType>("all")

  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === "all" || project.type === activeFilter),
    [activeFilter]
  )

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-emerald-100/20 to-cyan-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-indigo-100/15 to-purple-100/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Premium Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-gray-200/50 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 text-gray-600" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">Project Atlas</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Engineering <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Curated selection of production systems, research labs, and open-source contributions. 
              Each project includes live demos, technical deep-dives, and performance metrics.
            </p>
          </div>
          <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300 group">
            View Archive 
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </div>

        {/* Premium Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={cn(
                "px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 backdrop-blur-sm",
                activeFilter === filter.value
                  ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white border-gray-900 shadow-lg shadow-gray-900/25"
                  : "bg-white/70 text-gray-700 border-gray-200/80 hover:border-gray-300 hover:text-black hover:bg-white/90 hover:shadow-md"
              )}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Premium Project Grid */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 auto-rows-[1fr]">
          {filteredProjects.map((project, index) => (
            <article key={project.title} className="group">
              <Card className="relative h-full overflow-hidden border border-gray-100/80 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-gray-200">
                {/* Premium Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    `bg-gradient-to-br ${project.accent}`
                  )}
                />
                
                {/* Premium Image Container */}
                <div className="relative mx-5 mt-5 h-48 rounded-2xl overflow-hidden border border-gray-100/70 bg-gray-50">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Premium Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 text-xs">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 text-white space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/80 font-medium">
                      {project.stats[0]?.label}
                    </p>
                    <p className="text-lg font-bold tracking-tight">
                      {project.stats[0]?.value}
                    </p>
                  </div>
                </div>

                <CardContent className="relative z-10 flex flex-col gap-4 p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {project.description}
                    </p>
                  </div>

                  {/* Premium Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={`${project.title}-${tech}`}
                        variant="secondary"
                        className="rounded-lg border border-gray-200/60 bg-white/50 text-gray-700 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Premium Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button 
                      asChild 
                      size="sm" 
                      className="gap-2 bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/30"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Live Demo 
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    {project.github && (
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 bg-white/70 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-gray-300"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Source 
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* Premium Labs & Playbooks Section */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          {/* Networking Labs Card */}
          <div className="rounded-3xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Network className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Networking Labs</h3>
                <Badge className="bg-blue-50 text-blue-700 border border-blue-100 mt-1">Layer 3/4</Badge>
              </div>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Production-grade networking environments for testing BGP policies, VPN architectures, and observability stacks before client deployment.
            </p>
            <div className="space-y-4">
              {networkingLabs.map((lab) => (
                <div key={lab.title} className="rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white/50 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{lab.title}</h4>
                    <span className="text-sm font-mono text-blue-600 font-medium">{lab.metric}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{lab.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {lab.stack.map((tech) => (
                      <span key={`${lab.title}-${tech}`} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cyber Playbooks Card */}
          <div className="rounded-3xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-50 rounded-xl">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Cyber Defense</h3>
                <Badge className="bg-red-50 text-red-700 border border-red-100 mt-1">Security</Badge>
              </div>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Battle-tested security automation, red team methodologies, and infrastructure hardening protocols for modern defense operations.
            </p>
            <div className="space-y-4">
              {cyberPlaybooks.map((pack) => (
                <div key={pack.title} className="rounded-2xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white/50 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{pack.title}</h4>
                    <span className="text-sm font-mono text-red-600 font-medium">{pack.metric}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pack.summary}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pack.stack.map((tech) => (
                      <span key={`${pack.title}-${tech}`} className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
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
      "Algeria’s marketplace for verified photographers with automated trust scoring, Rust microservices, and mobile-first flows.",
    stack: ["Rust", "TypeScript", "PostgreSQL", "Microservices"],
    stats: [
      { label: "Latency", value: "120ms" },
      { label: "Coverage", value: "48 wilayas" },
    ],
    image: "/sawerni.png",
    link: "https://sawerni.vercel.app/",
    github: "https://github.com/xCyberpunkx/sawerni-kv",
    accent: "from-emerald-50 via-white to-white",
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
    accent: "from-amber-50 via-white to-white",
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
    accent: "from-indigo-50 via-white to-white",
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
    accent: "from-rose-50 via-white to-white",
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
    accent: "from-slate-100 via-white to-white",
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
    accent: "from-cyan-50 via-white to-white",
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
    <section id="projects" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">Project Atlas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              2 web builds, 2 desktop labs, 2 C++ experiments
            </h2>
            <p className="text-gray-600">
              Tap any filter to reshuffle the grid. Each tile ships with real demos, repo links, and screenshots.
            </p>
          </div>
          <Button variant="outline" className="bg-white/90">
            View Archive <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={cn(
                "px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-300",
                activeFilter === filter.value
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-white/80 text-gray-700 border-gray-200 hover:border-black/40 hover:text-black"
              )}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-6 auto-rows-[1fr]">
          {filteredProjects.map((project, index) => (
            <article key={project.title} className={cn("col-span-6", layoutPattern[index % layoutPattern.length])}>
              <Card className="group relative h-full overflow-hidden border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    `bg-gradient-to-br ${project.accent}`
                  )}
                />
                <div className="relative mx-4 mt-4 h-40 rounded-3xl overflow-hidden border border-gray-100/70">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">{project.category}</p>
                    <p className="text-base font-semibold">
                      {project.stats[0]?.value}{" "}
                      <span className="text-xs font-normal text-white/70">{project.stats[0]?.label}</span>
                    </p>
                  </div>
                </div>

                <CardContent className="relative z-10 flex flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.stack.map((tech) => (
                      <Badge
                        key={`${project.title}-${tech}`}
                        className="rounded-full border border-gray-200 bg-white text-gray-900 px-3 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Button asChild size="sm" className="gap-2">
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View build <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                    {project.github && (
                      <Button asChild variant="outline" size="sm" className="gap-2 bg-white/70">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          Source <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Networking Labs</h3>
              <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100">Layer 3/4</Badge>
            </div>
            <p className="text-gray-600 mt-2">
              Labs I keep running to test BGP tweaks, VPN meshes, and observability pipelines before shipping to clients.
            </p>
            <div className="mt-6 space-y-4">
              {networkingLabs.map((lab) => (
                <div key={lab.title} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">{lab.title}</h4>
                    <span className="text-sm font-mono text-gray-500">{lab.metric}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{lab.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lab.stack.map((tech) => (
                      <span key={`${lab.title}-${tech}`} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Cyber Defense Playbooks</h3>
              <Badge className="bg-slate-900 text-white border border-slate-800">Security</Badge>
            </div>
            <p className="text-gray-600 mt-2">
              High-signal security kits: red-team notes, SOC automation, and infra hardening packs ready for real teams.
            </p>
            <div className="mt-6 space-y-4">
              {cyberPlaybooks.map((pack) => (
                <div key={pack.title} className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">{pack.title}</h4>
                    <span className="text-sm font-mono text-gray-500">{pack.metric}</span>
                  </div>
                    <p className="text-sm text-gray-600 mt-1">{pack.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pack.stack.map((tech) => (
                        <span key={`${pack.title}-${tech}`} className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
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

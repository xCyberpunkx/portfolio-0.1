"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, FileText, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Article = {
  title: string
  summary: string
  category: string
  stack: string[]
  image: string
  link: string
}

type DsaPost = {
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
  tags: string[]
  summary: string
  link: string
}

type ConsoleDoc = {
  title: string
  summary: string
  repo: string
  doc: string
}

const projectArticles: Article[] = [
  {
    title: "Sawerni postmortem: shipping a trust-heavy marketplace",
    summary:
      "Covering the Rust services, queue-based verification, and the SEO playbook that got Algeria-wide adoption. Includes schema JSON + dashboards.",
    category: "Case Study",
    stack: ["Rust", "Next.js", "Postgres"],
    image: "/sawerni.png",
    link: "https://github.com/xCyberpunkx/sawerni-kv#readme",
  },
  {
    title: "SignalOps console: C# telemetry from laptop to factory",
    summary:
      "Deep-dive into the .NET 8 console suite that streams gRPC data, writes ClickUp tasks, and self-documents every command with Markdown.",
    category: "Desktop R&D",
    stack: [".NET 8", "gRPC", "Serilog"],
    image: "/personal.png",
    link: "https://github.com/xCyberpunkx/signal-ops",
  },
  {
    title: "ECS playground notes",
    summary:
      "C++ ECS renderer journal: arena allocator benchmarks, frame captures, and ImGui tooling. Includes download links for the profiler.",
    category: "C++ Lab",
    stack: ["C++20", "SDL2", "ImGui"],
    image: "/images/pixel-cpp.png",
    link: "https://github.com/xCyberpunkx/ecs-playground",
  },
]

const dsaPosts: DsaPost[] = [
  {
    title: "Minimum Effort Graph Builder",
    difficulty: "Hard",
    tags: ["Graphs", "Union Find", "C++"],
    summary: "Why Kruskal wins here, plus the C# parity that keeps allocations at 0.8ms.",
    link: "https://github.com/xCyberpunkx/dsa-console/tree/main/graphs",
  },
  {
    title: "Digit DP – Counting Steady Numbers",
    difficulty: "Medium",
    tags: ["DP", "Memoization", "C#"],
    summary: "Shared interface powering both the C++ CLI and .NET notebook with tests.",
    link: "https://github.com/xCyberpunkx/dsa-console/tree/main/dp",
  },
  {
    title: "Sliding Window + Prefix math mashup",
    difficulty: "Easy",
    tags: ["Arrays", "Sliding Window"],
    summary: "Whiteboard screenshots + console output so you can replay the reasoning.",
    link: "https://github.com/xCyberpunkx/dsa-console/tree/main/arrays",
  },
]

const consoleDocs: ConsoleDoc[] = [
  {
    title: "Chronicle Scheduler Docs",
    summary: "Avalonia UI + CLI combination, release checklist, and how to sync with ClickUp.",
    repo: "https://github.com/xCyberpunkx/chronicle",
    doc: "https://github.com/xCyberpunkx/chronicle/wiki",
  },
  {
    title: "Telemetry CLI handbook",
    summary: "Command reference, sample YAML recipes, and screenshots of the streaming view.",
    repo: "https://github.com/xCyberpunkx/signal-ops",
    doc: "https://github.com/xCyberpunkx/signal-ops/tree/main/docs",
  },
  {
    title: "DSA Console Kit docs",
    summary: "How I structure problems, log attempts, and export Markdown/PNG reports.",
    repo: "https://github.com/xCyberpunkx/dsa-console",
    doc: "https://github.com/xCyberpunkx/dsa-console/tree/main/docs",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-16">
        <header className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <Link href="/" className="inline-flex items-center text-white/70 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to portfolio
            </Link>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">Build Journal</p>
            <h1 className="text-4xl sm:text-5xl font-bold">Projects, DSA logs, and console docs</h1>
            <p className="text-white/80 text-lg">
              Every article ships with screenshots, copy-paste code, and the GitHub repo I used to test it. Use it as your reference
              for C++/C# experiments or just skim the summaries.
            </p>
          </div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest project write-ups</h2>
            <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
              <Link href="mailto:rouabah.zineedinee@gmail.com">Submit a topic</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projectArticles.map((article) => (
              <article key={article.title} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur">
                <div className="relative h-48">
                  <Image src={article.image} alt={article.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-4">
                    <Badge className="bg-white/20 text-white border border-white/30">{article.category}</Badge>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                  <p className="text-sm text-white/70">{article.summary}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-white/60">
                    {article.stack.map((tech) => (
                      <span key={`${article.title}-${tech}`} className="uppercase tracking-wide">{tech}</span>
                    ))}
                  </div>
                  <Button asChild size="sm" className="mt-2 bg-white text-black hover:bg-slate-100">
                    <Link href={article.link} target="_blank" rel="noopener noreferrer">
                      Read + repo <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">DSA problem notebook</h2>
            <Badge className="bg-white/10 text-white border border-white/20">Updated weekly</Badge>
          </div>
          <div className="grid gap-4">
            {dsaPosts.map((post) => (
              <div key={post.title} className="rounded-2xl border border-white/10 bg-black/30 p-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <Badge className="bg-white/5 text-white border border-white/20">{post.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-white/70">{post.summary}</p>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-white/60">
                    {post.tags.map((tag) => (
                      <span key={`${post.title}-${tag}`}>{tag}</span>
                    ))}
                  </div>
                </div>
                <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                  <Link href={post.link} target="_blank" rel="noopener noreferrer">
                    View notes <FileText className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Console apps & docs</h2>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
              <Link href="https://github.com/xCyberpunkx?tab=repositories" target="_blank" rel="noopener noreferrer">
                Browse GitHub <Github className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {consoleDocs.map((doc) => (
              <div key={doc.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                <h3 className="text-lg font-semibold">{doc.title}</h3>
                <p className="text-sm text-white/70">{doc.summary}</p>
                <div className="flex gap-3">
                  <Button asChild size="sm" className="bg-white text-black hover:bg-slate-100">
                    <Link href={doc.repo} target="_blank" rel="noopener noreferrer">
                      Repo <Github className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost" className="text-white hover:bg-white/10">
                    <Link href={doc.doc} target="_blank" rel="noopener noreferrer">
                      Docs <ExternalLink className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}


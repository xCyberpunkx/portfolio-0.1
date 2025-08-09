"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Terminal, Gamepad2, Sun, Moon, Code2, Github, Linkedin, Keyboard, Cpu } from "lucide-react"
import { ThemeModeProvider, useThemeMode } from "@/components/theme-mode-provider"
import { FakeTerminalOverlay } from "@/components/fake-terminal-overlay"
import { KonamiWatcher } from "@/components/konami-watcher"
import projectsData from "@/data/projects.json"
import resumeData from "@/data/resume.json"
import setupData from "@/data/dev-setup.json"
import { TopProgressBar, useTopProgress } from "@/components/top-progress"
import { useSectionNav } from "@/hooks/use-section-nav"

// Lazy visual layers
const PixelCity = dynamic(() => import("@/components/visuals/pixel-city"), { ssr: false })
const MatrixRain = dynamic(() => import("@/components/visuals/matrix-rain"), { ssr: false })
const HiddenGame = dynamic(() => import("@/components/hidden-8bit-game"), { ssr: false })

type Project = {
  id: string
  title: string
  cover: string
  type: string
  tech: string[]
  stats: { key: string; value: string }[]
  snippet: string
  repo?: string
  demo?: string
}

type Resume = {
  experience: {
    company: string
    role: string
    period: string
    details: string[]
  }[]
  skills: string[]
  education: {
    school: string
    degree: string
    period: string
  }[]
  missions: string[]
  pdf: string
  timeline: { id: string; label: string; branch: number }[]
}

export default function Page() {
  return (
    <ThemeModeProvider>
      <Home />
    </ThemeModeProvider>
  )
}

function Home() {
  const { mode, setScheme, setMatrix, scheme, matrix } = useThemeMode()
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [gameUnlocked, setGameUnlocked] = useState(false)
  const [filter, setFilter] = useState<string>("All")
  const [codeOpen, setCodeOpen] = useState(false)
  const [codeProject, setCodeProject] = useState<Project | null>(null)
  const { start, done } = useTopProgress()
  const { active, gotoSection, SECTION_IDS } = useSectionNav(["hero", "about", "projects", "resume", "contact"])

  const projects = useMemo(() => projectsData as Project[], [])
  const resume = useMemo(() => resumeData as Resume, [])
  const filters = useMemo(() => ["All", "CLI", "GUI", "Game", "Lib", "Tooling"], [])

  // Progress bar on anchor navigation
  const handleJump = (id: string) => {
    start()
    gotoSection(id)
    setTimeout(done, 500)
  }

  // Console ASCII + tips
  useEffect(() => {
    const art = [
      "             _           _         _     _       ",
      " _ __   __ _(_)_ __  ___| |__   __| | __| | ___  ",
      "| '_ \\ / _` | | '_ \\/ __| '_ \\ / _` |/ _` |/ _ \\ ",
      "| | | | (_| | | | | \\__ \\ | | | (_| | (_| | (_) |",
      "|_| |_|\\__,_|_|_| |_|___/_| |_|\\__,_|\\__,_|\\___/ ",
      "",
      "Tips: Open terminal overlay with ` key. Type `help`.",
      "Konami Code unlocks a hidden game: ↑↑↓↓←→←→BA",
    ].join("\n")
    // eslint-disable-next-line no-console
    console.log("\n" + art + "\n")
  }, [])

  return (
    <div className={cn("relative min-h-screen bg-black text-zinc-100 antialiased")}>
      {/* Visual layers */}
      <CRTOverlays />
      <TopProgressBar />

      {/* Matrix mode overlay */}
      {matrix && <MatrixRain defaultProps={{}} />}

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-emerald-400">{'$ echo "Zine Eddine"'}</span>
            <Separator className="h-5 bg-white/10" orientation="vertical" />
            <nav className="hidden sm:flex items-center gap-2">
              {SECTION_IDS.map((id) => (
                <Button
                  key={id}
                  size="sm"
                  variant={active === id ? "default" : "ghost"}
                  className={cn(
                    "rounded-full font-mono text-xs",
                    active === id ? "bg-emerald-500 text-black" : "text-zinc-300",
                  )}
                  onClick={() => handleJump(id)}
                  aria-current={active === id ? "page" : undefined}
                >
                  {id}
                </Button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-zinc-300"
              onClick={() => setTerminalOpen(true)}
              aria-label="Open terminal"
            >
              <Terminal className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full text-zinc-300"
              onClick={() => setScheme(scheme === "dark" ? "light" : "dark")}
              aria-label="Toggle light/dark"
            >
              {scheme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-1 pl-2 border-l border-white/10">
              <Switch
                id="matrix-mode"
                checked={matrix}
                onCheckedChange={(v) => setMatrix(v)}
                aria-label="Toggle Matrix mode"
              />
              <label htmlFor="matrix-mode" className="ml-1 font-mono text-xs text-emerald-400">
                {"matrix"}
              </label>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero */}
        <section id="hero" className="relative min-h-screen pt-16">
          <Hero onNavigate={(id) => handleJump(id)} defaultProps={{ onNavigate: () => {} }} />
        </section>

        <SectionDivider />

        {/* About */}
        <section id="about" className="relative min-h-screen py-16">
          <About defaultProps={{}} />
        </section>

        <SectionDivider />

        {/* Projects */}
        <section id="projects" className="relative min-h-screen py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center justify-between">
              <h2 className="font-mono text-2xl text-emerald-400">{"// Projects"}</h2>
              <div className="hidden sm:flex gap-2">
                {filters.map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={filter === f ? "default" : "outline"}
                    className={cn(
                      "rounded-full font-mono text-xs",
                      filter === f ? "bg-purple-500 text-black" : "border-white/20 text-zinc-200",
                    )}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                  >
                    {f}
                  </Button>
                ))}
              </div>
            </div>
            <div className="sm:hidden mt-4">
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="w-full flex flex-wrap justify-start">
                  {filters.map((f) => (
                    <TabsTrigger key={f} value={f} className="font-mono text-xs">
                      {f}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {filters.map((f) => (
                  <TabsContent key={f} value={f} />
                ))}
              </Tabs>
            </div>
            <ProjectGrid
              items={projects}
              filter={filter}
              onOpenCode={(p) => {
                setCodeProject(p)
                setCodeOpen(true)
              }}
              defaultProps={{ items: [], filter: "All", onOpenCode: () => {} }}
            />
          </div>
        </section>

        <SectionDivider />

        {/* Resume */}
        <section id="resume" className="relative min-h-screen py-16">
          <ResumeDossier data={resume} defaultProps={{ data: resume }} />
        </section>

        <SectionDivider />

        {/* Contact */}
        <section id="contact" className="relative min-h-screen py-16">
          <Contact defaultProps={{}} />
        </section>

        {/* Hidden Game when unlocked */}
        {gameUnlocked ? (
          <section id="secret" className="relative py-16">
            <div className="mx-auto max-w-6xl px-4">
              <h3 className="font-mono text-lg text-emerald-400 mb-4">{"// Secret: 8-bit game"}</h3>
              <HiddenGame defaultProps={{}} />
            </div>
          </section>
        ) : null}
      </main>

      <footer className="relative border-t border-white/10 py-8 mt-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs text-zinc-400">
            {"© "}
            {new Date().getFullYear()}
            {" Zine Eddine — Built with Next.js • shadcn/ui • Tailwind"}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px] border-emerald-500/40 text-emerald-400">
              Linux • Rust • C++ • C# • Vim • OpenGL
            </Badge>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <FakeTerminalOverlay
        open={terminalOpen}
        onOpenChange={setTerminalOpen}
        onNavigate={(id) => handleJump(id)}
        onUnlockGame={() => setGameUnlocked(true)}
        defaultProps={{ open: false, onOpenChange: () => {}, onNavigate: () => {}, onUnlockGame: () => {} }}
      />
      <KonamiWatcher onUnlock={() => setGameUnlocked(true)} defaultProps={{ onUnlock: () => {} }} />
      <Dialog open={codeOpen} onOpenChange={setCodeOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="font-mono">{codeProject?.title || "Code Snippet"}</DialogTitle>
          </DialogHeader>
          <pre className="bg-zinc-900 rounded p-4 text-xs overflow-auto font-mono">
            {codeProject?.snippet || "/* Sample code */"}
          </pre>
          <div className="mt-3 flex gap-2">
            {codeProject?.repo ? (
              <Button asChild variant="secondary" size="sm">
                <a href={codeProject.repo} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4 mr-1" />
                  Repo
                </a>
              </Button>
            ) : null}
            {codeProject?.demo ? (
              <Button asChild variant="outline" size="sm">
                <a href={codeProject.demo} target="_blank" rel="noreferrer">
                  <Gamepad2 className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <Separator className="bg-white/10" />
    </div>
  )
}

function CRTOverlays() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 2px, transparent 4px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          boxShadow: "inset 0 0 200px rgba(0,255,200,0.08), inset 0 0 60px rgba(160,0,255,0.06)",
        }}
      />
    </>
  )
}

function Hero({
  onNavigate,
  defaultProps,
}: {
  onNavigate: (id: string) => void
  defaultProps: { onNavigate: (id: string) => void }
}) {
  const [boot, setBoot] = useState<string[]>([])
  const [typed, setTyped] = useState("")
  const [done, setDone] = useState(false)
  const skills = ["Rust", "C++", "C#", "Linux", "Vim", "OpenGL", "Graphics", "Systems", "WASM"]
  const indexRef = useRef(0)

  useEffect(() => {
    const lines = [
      "[BOOT] Initializing kernel... OK",
      "[INIT] Loading device drivers... OK",
      "[SYS ] Mounting /dev/sda1... OK",
      "[NET ] Bringing up loopback... OK",
      "[TERM] Starting zsh... OK",
    ]
    let i = 0
    const id = setInterval(() => {
      setBoot((b) => [...b, lines[i]])
      i++
      if (i >= lines.length) {
        clearInterval(id)
        setTimeout(() => setDone(true), 400)
      }
    }, 260)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!done) return
    const target = 'echo "Hello, I’m Zine Eddine"'
    let i = 0
    const id = setInterval(() => {
      setTyped(target.slice(0, i + 1))
      i++
      if (i >= target.length) clearInterval(id)
    }, 50)
    return () => clearInterval(id)
  }, [done])

  // mark seen
  useEffect(() => {
    try {
      const raw = localStorage.getItem("arcade:seen")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("hero")) {
        arr.push("hero")
        localStorage.setItem("arcade:seen", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  return (
    <div className="relative">
      <div className="absolute inset-0">
        <PixelCity defaultProps={{}} />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="rounded border border-white/10 bg-black/60 p-4 font-mono text-xs text-emerald-400 mb-6 max-w-xl">
          <div aria-live="polite" aria-atomic="true">
            {boot.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
          <div className="flex">
            <span className="text-purple-400">{"$ "}</span>
            <span className="ml-2">{typed}</span>
            <span className="ml-1 animate-pulse">█</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          <span className="font-mono text-emerald-400">{"High‑performance engineer"}</span>
          <br />
          <span className="text-zinc-100">{"building systems, visuals, and fun."}</span>
        </h1>
        <p className="mt-4 text-zinc-300 max-w-2xl">
          {"Linux • Rust • C++ • C# • OpenGL • Vim — blending low-level power with high-level polish."}
        </p>
        <div className="mt-6 flex items-center gap-2">
          <Button onClick={() => onNavigate("projects")} className="bg-emerald-500 text-black hover:bg-emerald-400">
            <Code2 className="h-4 w-4 mr-2" />
            View Projects
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate("contact")}
            className="border-white/20 text-zinc-200 hover:bg-white/10"
          >
            Hire Me
          </Button>
        </div>

        {/* Arcade ticker */}
        <div className="mt-10 relative overflow-hidden border border-white/10 rounded bg-black/50">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,197,94,0.15),transparent,rgba(168,85,247,0.15))]" />
          <div
            className="py-2 whitespace-nowrap will-change-transform font-mono text-sm"
            style={{
              animation: "ticker 22s linear infinite",
            }}
          >
            {Array.from({ length: 3 }).map((_, k) => (
              <span key={k} className="mx-6">
                {skills.map((s, i) => (
                  <Badge key={i} variant="outline" className="mx-1 border-emerald-500/40 text-emerald-300">
                    {s}
                  </Badge>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}

function About({ defaultProps }: { defaultProps: {} }) {
  const matrix: { stat: string; value: number; color: string }[] = useMemo(
    () => [
      { stat: "HP", value: 92, color: "emerald" },
      { stat: "MP", value: 76, color: "cyan" },
      { stat: "ATK", value: 88, color: "purple" },
      { stat: "INT", value: 94, color: "amber" },
      { stat: "DEX", value: 81, color: "pink" },
    ],
    [],
  )

  // mark seen
  useEffect(() => {
    try {
      const raw = localStorage.getItem("arcade:seen")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("about")) {
        arr.push("about")
        localStorage.setItem("arcade:seen", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative group">
          <img
            src="/images/anime-avatar.png"
            alt="Anime-style avatar"
            className="w-full max-w-md rounded border border-white/10 mx-auto group-hover:opacity-90"
            style={{ imageRendering: "pixelated" }}
          />
          {/* Glitch layers */}
          <div className="pointer-events-none absolute inset-0 rounded mix-blend-screen opacity-0 group-hover:opacity-100 transition">
            <img
              src="/images/anime-avatar.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full rounded"
              style={{ clipPath: "inset(0 0 60% 0)", transform: "translateX(2px)", filter: "hue-rotate(10deg)" }}
            />
            <img
              src="/images/anime-avatar.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full rounded"
              style={{ clipPath: "inset(70% 0 0 0)", transform: "translateX(-2px)", filter: "hue-rotate(-20deg)" }}
            />
          </div>
        </div>
        <div>
          <h2 className="font-mono text-2xl text-emerald-400 mb-2">{"// About Me"}</h2>
          <p className="text-zinc-300">
            {
              "I’m Zine Eddine — systems-focused engineer who enjoys low-level performance, graphics, and developer experience. I love Vim keymaps, tiling WMs, and anime OSTs while coding."
            }
          </p>

          <div className="mt-6">
            <h3 className="font-mono text-lg text-purple-400">{"Skill Matrix"}</h3>
            <div className="mt-3 space-y-3">
              {matrix.map((m) => (
                <RPGBar key={m.stat} label={m.stat} value={m.value} color={m.color} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-mono text-lg text-emerald-400">{"Dev Setup"}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-3 text-sm">
              {(setupData as any[]).map((d, i) => (
                <li key={i} className="flex items-center gap-3">
                  <img
                    src={d.icon || "/images/pixel-linux.png"}
                    alt=""
                    className="h-6 w-6"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <span className="text-zinc-200">{d.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function RPGBar({ label, value, color }: { label: string; value: number; color: string }) {
  const hue =
    color === "emerald" ? 150 : color === "cyan" ? 190 : color === "purple" ? 280 : color === "amber" ? 40 : 320
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span className="font-mono">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="h-3 rounded border border-white/10 bg-zinc-900 overflow-hidden">
        <div
          className="h-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, hsl(${hue} 80% 50%), hsl(${hue + 30} 80% 50%))`,
            boxShadow: `0 0 12px hsl(${hue} 80% 40%)`,
          }}
        />
      </div>
    </div>
  )
}

function ProjectGrid({
  items,
  filter,
  onOpenCode,
  defaultProps,
}: {
  items: Project[]
  filter: string
  onOpenCode: (p: Project) => void
  defaultProps: { items: Project[]; filter: string; onOpenCode: (p: Project) => void }
}) {
  const filtered = filter === "All" ? items : items.filter((p) => p.type === filter)

  // mark seen
  useEffect(() => {
    try {
      const raw = localStorage.getItem("arcade:seen")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("projects")) {
        arr.push("projects")
        localStorage.setItem("arcade:seen", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  return (
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((p) => (
        <CabinetCard key={p.id} project={p} onOpenCode={() => onOpenCode(p)} />
      ))}
    </div>
  )
}

function CabinetCard({ project, onOpenCode }: { project: Project; onOpenCode: () => void }) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-white/15 overflow-hidden bg-gradient-to-b from-zinc-900 to-black",
        "shadow-[0_0_40px_rgba(0,255,180,0.08)]",
      )}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(0,255,170,0.1), rgba(160,50,255,0.1)), radial-gradient(100% 60% at 50% 0%, rgba(255,255,255,0.06), transparent)",
      }}
    >
      {/* Marquee top */}
      <div className="px-3 py-2 border-b border-white/10 bg-black/50 flex items-center justify-between">
        <div className="font-mono text-sm text-emerald-400">{project.title}</div>
        <div className="flex gap-1">
          {project.tech.slice(0, 3).map((t, i) => (
            <Badge key={i} variant="outline" className="border-purple-500/40 text-purple-300">
              {t}
            </Badge>
          ))}
        </div>
      </div>
      {/* Screen */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.cover || "/placeholder.svg?height=720&width=1280&query=retro arcade neon project"}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-black/70 p-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {project.stats.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-zinc-300">
                <span>{s.key}</span>
                <span className="text-emerald-400">{s.value}</span>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-3 flex gap-2">
            {project.repo ? (
              <a
                className="px-2 py-1 rounded border border-white/20 text-xs hover:bg-white/10"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            ) : null}
            {project.demo ? (
              <a
                className="px-2 py-1 rounded border border-white/20 text-xs hover:bg-white/10"
                href={project.demo}
                target="_blank"
                rel="noreferrer"
              >
                Demo
              </a>
            ) : null}
            <button onClick={onOpenCode} className="px-2 py-1 rounded border border-white/20 text-xs hover:bg-white/10">
              View Code
            </button>
          </div>
        </div>
        {/* Halo */}
        <div className="pointer-events-none absolute inset-0" style={{ boxShadow: "inset 0 0 40px #00ff8840" }} />
      </div>
      {/* Controls */}
      <div className="px-3 py-2 border-t border-white/10 bg-black/60 flex items-center justify-between">
        <span className="font-mono text-[11px] text-zinc-400">{"Insert coin • Press START"}</span>
        <div className="flex gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
          <div className="h-2.5 w-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
        </div>
      </div>
    </div>
  )
}

function ResumeDossier({ data, defaultProps }: { data: Resume; defaultProps: { data: Resume } }) {
  const [tab, setTab] = useState("experience")

  // mark seen
  useEffect(() => {
    try {
      const raw = localStorage.getItem("arcade:seen")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("resume")) {
        arr.push("resume")
        localStorage.setItem("arcade:seen", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="font-mono text-2xl text-emerald-400 mb-4">{"// Dossier"}</h2>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="experience" className="font-mono">
            Experience
          </TabsTrigger>
          <TabsTrigger value="skills" className="font-mono">
            Skills
          </TabsTrigger>
          <TabsTrigger value="education" className="font-mono">
            Education
          </TabsTrigger>
          <TabsTrigger value="missions" className="font-mono">
            Missions Completed
          </TabsTrigger>
          <TabsTrigger value="timeline" className="font-mono">
            Git Timeline
          </TabsTrigger>
        </TabsList>
        <TabsContent value="experience">
          <Card className="p-4 bg-black/50 border-white/10">
            <ul className="space-y-4">
              {data.experience.map((e, i) => (
                <li key={i}>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-purple-300">
                      {e.role} @ {e.company}
                    </div>
                    <div className="text-xs text-zinc-400">{e.period}</div>
                  </div>
                  <ul className="list-disc pl-5 mt-1 text-zinc-300 text-sm">
                    {e.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card className="p-4 bg-black/50 border-white/10">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <Badge key={i} variant="outline" className="border-emerald-500/40 text-emerald-300">
                  {s}
                </Badge>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="education">
          <Card className="p-4 bg-black/50 border-white/10">
            <ul className="space-y-3">
              {data.education.map((ed, i) => (
                <li key={i}>
                  <div className="font-mono text-purple-300">
                    {ed.degree} — {ed.school}
                  </div>
                  <div className="text-xs text-zinc-400">{ed.period}</div>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        <TabsContent value="missions">
          <Card className="p-4 bg-black/50 border-white/10">
            <ul className="list-disc pl-5 text-zinc-300">
              {data.missions.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </Card>
        </TabsContent>
        <TabsContent value="timeline">
          <GitTimeline nodes={data.timeline} />
        </TabsContent>
      </Tabs>

      <div className="mt-4 flex gap-2">
        <Button asChild className="bg-emerald-500 text-black hover:bg-emerald-400">
          <a href={data.pdf} download>
            Download PDF
          </a>
        </Button>
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="border-white/20 text-zinc-200 hover:bg-white/10"
        >
          Print
        </Button>
      </div>
    </div>
  )
}

function GitTimeline({ nodes }: { nodes: { id: string; label: string; branch: number }[] }) {
  return (
    <Card className="p-4 bg-black/50 border-white/10">
      <div className="relative h-64 overflow-x-auto">
        <svg viewBox="0 0 800 240" className="w-[800px] h-full">
          {nodes.map((n, i) => {
            const x = 60 + i * 80
            const y = 40 + n.branch * 60
            return (
              <g key={n.id}>
                <circle cx={x} cy={y} r="8" fill="#22c55e" />
                <text x={x + 12} y={y + 4} fontSize="10" fill="#e5e7eb">
                  {n.label}
                </text>
                {i > 0 ? (
                  <line
                    x1={x - 80 + 8}
                    y1={40 + nodes[i - 1].branch * 60}
                    x2={x - 8}
                    y2={y}
                    stroke="#6b7280"
                    strokeDasharray="4 4"
                  />
                ) : null}
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}

function Contact({ defaultProps }: { defaultProps: {} }) {
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [sending, setSending] = useState(false)

  // mark seen
  useEffect(() => {
    try {
      const raw = localStorage.getItem("arcade:seen")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("contact")) {
        arr.push("contact")
        localStorage.setItem("arcade:seen", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  // Configure a Formspree endpoint or fallback to mailto
  const FORMSPREE = "" // e.g. "https://formspree.io/f/abcde"

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      if (FORMSPREE) {
        const form = document.createElement("form")
        form.action = FORMSPREE
        form.method = "POST"
        form.target = "_blank"
        const payload = { name, email, message }
        Object.entries(payload).forEach(([k, v]) => {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = k
          input.value = String(v)
          form.appendChild(input)
        })
        document.body.appendChild(form)
        form.submit()
        form.remove()
      } else {
        const subject = encodeURIComponent(`Portfolio Contact — ${name}`)
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`)
        window.location.href = `mailto:zine@example.com?subject=${subject}&body=${body}`
      }
      setSending(false)
      setMessage("")
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="font-mono text-2xl text-emerald-400 mb-4">{"// Contact"}</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-4 bg-black/60 border-white/10">
          <div className="font-mono text-sm text-zinc-300 mb-2">{"Fake Terminal"}</div>
          <form onSubmit={submit} className="space-y-3" aria-label="Contact form terminal">
            <label className="block font-mono text-xs text-zinc-400">
              {"$ whoami"}
              <input
                className="mt-1 w-full bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-sm"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block font-mono text-xs text-zinc-400">
              {"$ echo $EMAIL"}
              <input
                type="email"
                className="mt-1 w-full bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-sm"
                placeholder="you@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block font-mono text-xs text-zinc-400">
              {"$ cat > message.txt"}
              <textarea
                className="mt-1 w-full h-32 bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-sm"
                placeholder="Type your message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
            <Button
              type="submit"
              disabled={sending}
              className="bg-emerald-500 text-black hover:bg-emerald-400 font-mono text-sm"
            >
              {sending ? "Transmitting..." : "Send"}
            </Button>
          </form>
        </Card>
        <Card className="p-4 bg-black/60 border-white/10">
          <div className="font-mono text-sm text-zinc-300 mb-2">{"System Processes"}</div>
          <ul className="space-y-2 text-sm">
            <ProcessLink icon={<Github className="h-3.5 w-3.5" />} name="githubd" url="https://github.com/you" />
            <ProcessLink
              icon={<Linkedin className="h-3.5 w-3.5" />}
              name="linkedind"
              url="https://www.linkedin.com/in/you"
            />
            <ProcessLink
              icon={<Keyboard className="h-3.5 w-3.5" />}
              name="mastodond"
              url="https://mastodon.social/@you"
            />
            <ProcessLink icon={<Cpu className="h-3.5 w-3.5" />} name="blogd" url="https://yourblog.example.com" />
          </ul>
        </Card>
      </div>
    </div>
  )
}

function ProcessLink({ icon, name, url }: { icon: React.ReactNode; name: string; url: string }) {
  const [state, setState] = useState("...")

  useEffect(() => {
    const id = setTimeout(() => setState("OK"), 500 + Math.random() * 900)
    return () => clearTimeout(id)
  }, [])

  return (
    <li className="flex items-center justify-between border border-white/10 rounded p-2 bg-black/40">
      <div className="flex items-center gap-2 text-zinc-300">
        <div className="text-emerald-400">{icon}</div>
        <span className="font-mono">{name}</span>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-xs text-emerald-400 hover:underline"
        aria-label={name}
      >
        {"load "}
        <span className="opacity-70">&raquo;</span> {state}
      </a>
    </li>
  )
}

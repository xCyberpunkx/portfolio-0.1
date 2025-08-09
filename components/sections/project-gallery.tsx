"use client"

import type React from "react"

import projects from "@/data/projects.json"
import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Move } from "lucide-react"
import { cn } from "@/lib/utils"

type Project = {
  id: string
  title: string
  cover: string
  category: string
  story: string
  tools: string[]
  demoUrl?: string
  repoUrl?: string
}

const CATEGORIES = ["All", "Web", "Design", "Data", "Mobile", "Other"]

export default function ProjectGallery({ defaultProps }: { defaultProps: {} }) {
  const [category, setCategory] = useState<string>("All")
  const [open, setOpen] = useState<boolean>(false)
  const [active, setActive] = useState<Project | null>(null)
  const list = useMemo(() => projects as Project[], [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("project-gallery")) {
        arr.push("project-gallery")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  const filtered = category === "All" ? list : list.filter((p) => p.category === category)

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{"Project Gallery"}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {"Hover an artwork to bring it to life. Click for the story."}
      </p>

      {/* Filter Wheel (radial on md+, horizontal chips on mobile) */}
      <div className="relative my-6 hidden md:block h-52">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-52 h-52">
            {CATEGORIES.map((c, i) => {
              const angle = (i / CATEGORIES.length) * Math.PI * 2
              const r = 90
              const x = Math.cos(angle) * r + 90
              const y = Math.sin(angle) * r + 90
              return (
                <button
                  key={c}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full border backdrop-blur text-xs",
                    category === c ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  style={{ left: `${x}px`, top: `${y}px` }}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="md:hidden mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={cn(
              "px-3 py-1 rounded-full border text-xs",
              category === c ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Wall of frames */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && (setActive(p), setOpen(true))}
            onClick={() => {
              setActive(p)
              setOpen(true)
            }}
            className="group relative aspect-[4/3] rounded-md border bg-gradient-to-br from-muted/40 to-background overflow-hidden"
            style={{
              perspective: "800px",
            }}
          >
            <div
              className="absolute inset-0 transition-transform duration-300 will-change-transform group-hover:-rotate-x-3 group-hover:rotate-y-3"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={p.cover || "/placeholder.svg?height=600&width=800&query=project artwork"}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 text-white drop-shadow">
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs opacity-80">{p.category}</div>
              </div>
              {/* Fake spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.2), transparent 40%)",
                }}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
                  ;(e.currentTarget as HTMLDivElement).style.setProperty("--x", `${e.clientX - rect.left}px`)
                  ;(e.currentTarget as HTMLDivElement).style.setProperty("--y", `${e.clientY - rect.top}px`)
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{active?.title || "Project"}</DialogTitle>
          </DialogHeader>
          {active ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded border overflow-hidden">
                <DraggablePreview image={active.cover} title={active.title} />
              </div>
              <div>
                <p className="text-sm">{active.story}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {active.tools.map((t, i) => (
                    <Badge key={i} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  {active.demoUrl ? (
                    <Button asChild variant="secondary" size="sm">
                      <a href={active.demoUrl} target="_blank" rel="noreferrer">
                        <Move className="h-4 w-4 mr-1" /> Live Demo
                      </a>
                    </Button>
                  ) : null}
                  {active.repoUrl ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={active.repoUrl} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4 mr-1" /> GitHub
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DraggablePreview({ image, title }: { image?: string; title: string }) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [dragging, setDragging] = useState<boolean>(false)
  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true)
  }
  const onUp = () => setDragging(false)
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    setPos((p) => ({
      x: p.x + (Math.random() > 0.5 ? 1 : -1) + (clientX % 2),
      y: p.y + (Math.random() > 0.5 ? 1 : -1) + (clientY % 2),
    }))
  }
  return (
    <div
      className="relative w-full h-48 overflow-hidden bg-muted"
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseMove={onMove}
      onTouchStart={onDown}
      onTouchEnd={onUp}
      onTouchMove={onMove}
      role="application"
      aria-label="Draggable preview"
    >
      <img
        src={image || "/placeholder.svg?height=600&width=800&query=project demo"}
        alt={`${title} preview`}
        className="absolute top-0 left-0 h-56 w-auto select-none"
        draggable={false}
        style={{ transform: `translate(${pos.x % 60}px, ${pos.y % 30}px)` }}
      />
      <div className="absolute bottom-1 right-1 text-[10px] opacity-70">{"Drag to play"}</div>
    </div>
  )
}

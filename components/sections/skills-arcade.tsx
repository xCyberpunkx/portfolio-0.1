"use client"

import skills from "@/data/skills.json"
import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type Skill = {
  id: string
  name: string
  level: number // 0-100
  category: string
  kind: "code" | "design" | "other"
}

export default function SkillsArcade({ defaultProps }: { defaultProps: {} }) {
  const list = useMemo(() => skills as Skill[], [])
  const [active, setActive] = useState<Skill | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [idx, setIdx] = useState<number>(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("skills-arcade")) {
        arr.push("skills-arcade")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  const show = list.slice(idx, idx + 8)

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{"Skills Arcade"}</h2>
      <p className="text-sm text-muted-foreground mb-4">{"Click a skill to open a micro interaction."}</p>
      <div className="flex items-center gap-2 mb-3">
        <Button variant="outline" size="sm" onClick={() => setIdx((i) => Math.max(0, i - 4))}>
          {"‹ Prev"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIdx((i) => Math.min(Math.max(0, list.length - 8), i + 4))}
        >
          {"Next ›"}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {show.map((s) => (
          <Card
            key={s.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setActive(s)
              setOpen(true)
            }}
            onKeyDown={(e) => e.key === "Enter" && (setActive(s), setOpen(true))}
            className="p-3 hover:shadow-md transition-shadow"
          >
            <div className="text-sm font-semibold">{s.name}</div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Orb key={i} filled={s.level >= (i + 1) * 20} />
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{s.category}</div>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>{active?.name || "Skill"}</DialogTitle>
          </DialogHeader>
          <div className="min-h-[200px]">
            {active?.kind === "code" ? <CodeMicro /> : active?.kind === "design" ? <DesignMicro /> : <OtherMicro />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Orb({ filled }: { filled: boolean }) {
  return (
    <div
      className={cn("h-3 w-3 rounded-full border", filled ? "bg-emerald-500 border-emerald-500" : "bg-transparent")}
    />
  )
}

function CodeMicro() {
  const code = ["function greet(name) {", "  return `Hello, ${name}!`", "}", "", "console.log(greet('Museum'))"]
  const [line, setLine] = useState<number>(1)
  useEffect(() => {
    const id = setInterval(() => setLine((l) => (l < code.length ? l + 1 : l)), 500)
    return () => clearInterval(id)
  }, [])
  return <pre className="bg-muted p-3 rounded text-xs overflow-auto">{code.slice(0, line).join("\n")}</pre>
}

function DesignMicro() {
  const [state, setState] = useState<number>(0)
  useEffect(() => {
    const id = setInterval(() => setState((s) => (s + 1) % 3), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className={cn("h-16 rounded", state === 0 ? "bg-amber-400" : "bg-amber-200")} />
      <div className={cn("h-16 rounded", state === 1 ? "bg-emerald-400" : "bg-emerald-200")} />
      <div className={cn("h-16 rounded", state === 2 ? "bg-pink-400" : "bg-pink-200")} />
      <div className={cn("col-span-3 h-8 rounded", state === 0 ? "bg-foreground/80" : "bg-foreground/20")} />
      <div className={cn("col-span-2 h-8 rounded", state === 1 ? "bg-foreground/70" : "bg-foreground/20")} />
      <div className={cn("h-8 rounded", state === 2 ? "bg-foreground/60" : "bg-foreground/20")} />
    </div>
  )
}

function OtherMicro() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setP((x) => (x + 10) % 110), 300)
    return () => clearInterval(id)
  }, [])
  return (
    <div>
      <div className="w-full h-2 bg-muted rounded">
        <div
          className="h-2 rounded bg-gradient-to-r from-emerald-500 to-amber-400"
          style={{ width: `${Math.min(p, 100)}%` }}
        />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{p}% mastery</div>
    </div>
  )
}

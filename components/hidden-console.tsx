"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { usePersonalization } from "./personalization-provider"
import { awardBadge } from "@/lib/achievements"

type LogEntry = { type: "in" | "out"; text: string }

export function HiddenConsole({ defaultProps }: { defaultProps: {} }) {
  const [open, setOpen] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  const [logs, setLogs] = useState<LogEntry[]>([{ type: "out", text: "Museum Console v1.0 — type `help`" }])
  const { setThemeVariant } = usePersonalization()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Alt+D to toggle
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "d") {
        e.preventDefault()
        setOpen((v) => !v)
        if (!open) awardBadge("console-explorer")
      }
      // ESC to close
      if (e.key === "Escape" && open) setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  const handleCommand = (cmd: string) => {
    const [base, arg] = cmd.trim().split(/\s+/, 2)
    const write = (entry: LogEntry) => setLogs((l) => [...l, entry])
    switch (base) {
      case "help":
        write({ type: "out", text: "Commands: help, credits, theme [day|night|neon], fun" })
        break
      case "credits":
        write({
          type: "out",
          text: "Designed & built by You — Powered by Next.js, shadcn/ui, R3F. Music: Ambient Hum.",
        })
        break
      case "theme":
        if (arg === "day" || arg === "night" || arg === "neon") {
          setThemeVariant(arg)
          write({ type: "out", text: `Theme changed to ${arg}.` })
        } else {
          write({ type: "out", text: "Usage: theme day|night|neon" })
        }
        break
      case "fun":
        write({ type: "out", text: "Launching sparkles..." })
        triggerFun()
        break
      default:
        write({ type: "out", text: `Unknown: ${cmd}` })
        break
    }
  }

  const triggerFun = () => {
    const count = 80
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span")
      s.textContent = "✦"
      s.style.position = "fixed"
      s.style.left = `${Math.random() * 100}vw`
      s.style.top = `${Math.random() * 100}vh`
      s.style.fontSize = `${Math.random() * 18 + 8}px`
      s.style.opacity = "0.9"
      s.style.pointerEvents = "none"
      s.style.transition = "transform 1.5s ease, opacity 1.5s ease"
      document.body.appendChild(s)
      requestAnimationFrame(() => {
        s.style.transform = `translateY(${Math.random() * -200 - 100}px)`
        s.style.opacity = "0"
      })
      setTimeout(() => s.remove(), 1600)
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Console"
      className={cn("fixed inset-0 z-50 bg-black/70 backdrop-blur", "flex items-center justify-center p-4")}
      onClick={() => setOpen(false)}
    >
      <div className="w-full max-w-2xl rounded-md border bg-background/90" onClick={(e) => e.stopPropagation()}>
        <div className="p-3 border-b text-sm font-mono opacity-70">{"Press ESC to close • Museum Console"}</div>
        <div className="p-3 h-[320px] overflow-auto font-mono text-sm space-y-1">
          {logs.map((l, i) => (
            <div key={i} className={l.type === "in" ? "text-primary" : "text-foreground"}>
              {l.type === "in" ? "> " : ""}
              {l.text}
            </div>
          ))}
        </div>
        <form
          className="p-3 border-t"
          onSubmit={(e) => {
            e.preventDefault()
            if (!input.trim()) return
            setLogs((l) => [...l, { type: "in", text: input }])
            handleCommand(input)
            setInput("")
          }}
        >
          <input
            aria-label="Console input"
            className="w-full bg-transparent outline-none font-mono text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command..."
          />
        </form>
      </div>
    </div>
  )
}

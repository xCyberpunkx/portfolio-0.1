"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function FakeTerminalOverlay({
  open,
  onOpenChange,
  onNavigate,
  onUnlockGame,
  defaultProps,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onNavigate: (id: string) => void
  onUnlockGame: () => void
  defaultProps: {
    open: boolean
    onOpenChange: (v: boolean) => void
    onNavigate: (id: string) => void
    onUnlockGame: () => void
  }
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const logRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "`") {
        e.preventDefault()
        onOpenChange(!open)
      } else if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onOpenChange])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const write = (text: string) => {
    const log = logRef.current
    if (!log) return
    const div = document.createElement("div")
    div.textContent = text
    log.appendChild(div)
    log.scrollTop = log.scrollHeight
  }

  const run = (cmd: string) => {
    const [base, arg] = cmd.trim().split(/\s+/, 2)
    switch (base) {
      case "help":
        write("Commands: help, goto <hero|about|projects|resume|contact>, theme <dark|light|matrix>, unlock")
        break
      case "goto":
        if (arg) onNavigate(arg)
        else write("Usage: goto <section>")
        break
      case "theme":
        if (arg === "dark" || arg === "light" || arg === "matrix") {
          localStorage.setItem("arcade:terminal-theme", arg)
          write(`Switched theme: ${arg}`)
          const ev = new CustomEvent("arcade:theme-switch", { detail: arg })
          window.dispatchEvent(ev)
        } else write("Usage: theme <dark|light|matrix>")
        break
      case "unlock":
        onUnlockGame()
        write("Secret game unlocked.")
        break
      default:
        write(`Unknown: ${cmd}`)
    }
  }

  useEffect(() => {
    const listen = (e: Event) => {
      const detail = (e as CustomEvent).detail as string
      if (detail === "dark" || detail === "light" || detail === "matrix") {
        // propagate to provider via storage or event
      }
    }
    window.addEventListener("arcade:theme-switch", listen as EventListener)
    return () => window.removeEventListener("arcade:theme-switch", listen as EventListener)
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal overlay"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-2xl rounded border border-emerald-500/40 bg-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 border-b border-white/10 font-mono text-xs text-zinc-400">{"press ESC to close"}</div>
        <div ref={logRef} className="p-3 h-64 overflow-auto font-mono text-sm text-emerald-300 space-y-1" />
        <form
          className="p-3 border-t border-white/10"
          onSubmit={(e) => {
            e.preventDefault()
            const input = inputRef.current
            if (!input) return
            const val = input.value
            if (!val.trim()) return
            const log = logRef.current
            if (log) {
              const div = document.createElement("div")
              div.textContent = "> " + val
              div.className = "text-purple-300"
              log.appendChild(div)
            }
            run(val)
            input.value = ""
          }}
        >
          <input
            ref={inputRef}
            className={cn(
              "w-full bg-black/60 border border-white/10 rounded px-2 py-1 font-mono text-sm text-emerald-300",
              "outline-none",
            )}
            placeholder="Type 'help'..."
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  )
}

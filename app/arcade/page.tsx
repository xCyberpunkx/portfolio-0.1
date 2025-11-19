"use client"

import { useEffect, useRef, useState } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Gamepad2, Timer, RefreshCw, Binary, Keyboard, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ArcadePage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 pb-24">
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 text-center">
            <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/70">
              <Gamepad2 className="h-4 w-4" />
              Arcade Lab
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Pixel-perfect challenges for lightning-fast engineers
            </h1>
            <p className="text-base text-white/70 sm:text-lg">
              Sharpen your reflexes, binary intuition, and command-line muscle memory through playful experiments.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to portfolio
              </Button>
              <Button
                className="bg-emerald-500 text-slate-900 hover:bg-emerald-400"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
              >
                Jump to games
              </Button>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <ReactionPad />
            <BitFlipChallenge />
            <CommandSprint />
          </div>
        </section>
      </main>
    </div>
  )
}

const ReactionPad = () => {
  const [status, setStatus] = useState<"idle" | "waiting" | "ready">("idle")
  const [message, setMessage] = useState("Tap start and react once it glows emerald.")
  const [result, setResult] = useState<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startTimeRef = useRef<number | null>(null)

  const startRound = () => {
    setResult(null)
    setStatus("waiting")
    setMessage("Wait for green…")
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setStatus("ready")
      setMessage("Tap now!")
      startTimeRef.current = performance.now()
    }, 1200 + Math.random() * 1500)
  }

  const handleTap = () => {
    if (status === "waiting") {
      setMessage("Too soon! Try again.")
      setStatus("idle")
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      return
    }
    if (status === "ready" && startTimeRef.current) {
      const delta = performance.now() - startTimeRef.current
      setResult(Math.round(delta))
      setMessage("Nice! Run another round.")
      setStatus("idle")
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Card className="border-slate-800 bg-slate-900/70 text-white">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Reflex Lab</p>
            <h3 className="text-2xl font-bold">Latency Tap</h3>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-300">real-time</Badge>
        </div>
        <div
          className={cn(
            "flex h-48 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed text-lg font-semibold transition-all duration-300",
            status === "ready"
              ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
              : "border-white/20 bg-white/5 text-white/70"
          )}
          onClick={handleTap}
        >
          {status === "waiting" ? "..." : status === "ready" ? "HIT IT!" : "Tap when glowing"}
        </div>
        <p className="text-sm text-white/70">{message}</p>
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>Reaction</span>
          <span className="font-mono text-xl text-white">{result ? `${result} ms` : "--"}</span>
        </div>
        <Button className="w-full bg-white text-slate-900 hover:bg-white/90" onClick={startRound}>
          <Timer className="mr-2 h-4 w-4" />
          Start round
        </Button>
      </CardContent>
    </Card>
  )
}

const BIT_COUNT = 5
const generateTarget = () => Math.floor(Math.random() * 2 ** BIT_COUNT)

const BitFlipChallenge = () => {
  const [bits, setBits] = useState<number[]>(Array(BIT_COUNT).fill(0))
  const [target, setTarget] = useState(generateTarget)
  const [streak, setStreak] = useState(0)

  const toggleBit = (index: number) => {
    setBits((prev) =>
      prev.map((bit, idx) => {
        if (idx === index) return bit ? 0 : 1
        return bit
      })
    )
  }

  const currentValue = bits.reduce((acc, bit, idx) => {
    const power = BIT_COUNT - idx - 1
    return acc + bit * 2 ** power
  }, 0)

  useEffect(() => {
    if (currentValue === target) {
      setStreak((prev) => prev + 1)
      setTarget(generateTarget())
      setBits(Array(BIT_COUNT).fill(0))
    }
  }, [currentValue, target])

  return (
    <Card className="border-slate-800 bg-slate-900/70 text-white">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Binary dojo</p>
            <h3 className="text-2xl font-bold">Bit Flip</h3>
          </div>
          <Badge className="bg-blue-500/20 text-blue-200">logic</Badge>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-white/50">Target decimal</p>
          <p className="text-4xl font-black text-white">{target}</p>
        </div>
        <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-white/40">
          <span>MSB</span>
          <span>LSB</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {bits.map((bit, idx) => (
            <button
              key={`bit-${idx}`}
              className={cn(
                "rounded-xl border px-3 py-4 text-xl font-semibold transition-all",
                bit
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-200"
                  : "border-white/15 bg-white/5 text-white/70"
              )}
              onClick={() => toggleBit(idx)}
            >
              {bit}
            </button>
          ))}
        </div>
        <div className="text-center text-sm text-white/70">
          <p>Current value</p>
          <p className="font-mono text-2xl text-white">{currentValue}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-white/70">
          <span>Streak</span>
          <span className="font-mono text-xl text-white">{streak}</span>
        </div>
        <Button
          className="w-full bg-blue-500 text-slate-950 hover:bg-blue-400"
          onClick={() => {
            setTarget(generateTarget())
            setBits(Array(BIT_COUNT).fill(0))
            setStreak(0)
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset puzzle
        </Button>
      </CardContent>
    </Card>
  )
}

const COMMANDS = [
  "sudo pacman -Syu",
  "cargo run --release",
  "npm run lint",
  "git rebase --continue",
  "ssh -i ~/.ssh/id_ed25519 root@edge",
] as const

const CommandSprint = () => {
  const [command, setCommand] = useState(() => COMMANDS[Math.floor(Math.random() * COMMANDS.length)])
  const [input, setInput] = useState("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [best, setBest] = useState<number | null>(null)
  const [history, setHistory] = useState<number[]>([])

  const handleInput = (value: string) => {
    if (!startTime) {
      setStartTime(performance.now())
    }
    setInput(value)
    if (value === command && startTime) {
      const delta = performance.now() - startTime
      setBest((prev) => (prev === null ? delta : Math.min(prev, delta)))
      setHistory((prev) => [delta, ...prev].slice(0, 3))
      setInput("")
      setStartTime(null)
      setCommand(COMMANDS[Math.floor(Math.random() * COMMANDS.length)])
    }
  }

  return (
    <Card className="border-slate-800 bg-slate-900/70 text-white">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Terminal sprint</p>
            <h3 className="text-2xl font-bold">Command Typer</h3>
          </div>
          <Badge className="bg-purple-500/20 text-purple-200">precision</Badge>
        </div>
        <div className="rounded-2xl border border-white/15 bg-black/30 p-4 font-mono text-sm text-emerald-200">
          {command}
        </div>
        <input
          value={input}
          onChange={(event) => handleInput(event.target.value)}
          placeholder="Type the command exactly…"
          className="w-full rounded-2xl border border-white/20 bg-white/5 p-3 font-mono text-sm text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none"
        />
        <div className="grid grid-cols-2 gap-4 text-sm text-white/70">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p>Best time</p>
            <p className="font-mono text-2xl text-white">{best ? `${best.toFixed(0)} ms` : "--"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p>Last runs</p>
            <p className="font-mono text-white">
              {history.length ? history.map((item) => `${item.toFixed(0)}ms`).join(" · ") : "—"}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full border border-white/20 text-white hover:bg-white/10"
          onClick={() => {
            setCommand(COMMANDS[Math.floor(Math.random() * COMMANDS.length)])
            setInput("")
            setStartTime(null)
          }}
        >
          <Keyboard className="mr-2 h-4 w-4" />
          Shuffle command
        </Button>
        <p className="text-xs text-white/50">
          Pro tip: keep your wrists relaxed — buttery keyboards + accurate commands = fewer production incidents.
        </p>
      </CardContent>
    </Card>
  )
}

function cn(...classes: Array<string | boolean | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}


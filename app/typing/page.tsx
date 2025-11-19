"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const WORD_BANK = {
  classic: [
    "kernel",
    "latency",
    "packet",
    "render",
    "memory",
    "thread",
    "cipher",
    "vector",
    "module",
    "driver",
    "socket",
    "binary",
    "branch",
    "opcode",
    "safety",
    "future",
    "server",
    "matrix",
    "stream",
    "buffer",
    "cursor",
    "cloud",
    "deploy",
  ],
  playful: [
    "nebula",
    "pixel",
    "glitch",
    "sprint",
    "potion",
    "cosmos",
    "noodle",
    "orbit",
    "storm",
    "prism",
    "safari",
    "mercury",
    "quantum",
    "stellar",
    "chrono",
    "lattice",
    "cosplay",
    "sunset",
    "oracle",
    "lumen",
    "flux",
  ],
} as const

const DURATIONS = [15, 30, 60] as const

type Status = {
  input: string
  expected: string
  correct: boolean
}

function generateWords(theme: keyof typeof WORD_BANK, count = 160) {
  const pool = WORD_BANK[theme]
  return Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)])
}

export default function TypingLabPage() {
  const [theme, setTheme] = useState<keyof typeof WORD_BANK>("classic")
  const [duration, setDuration] = useState<typeof DURATIONS[number]>(30)
  const [words, setWords] = useState(() => generateWords(theme))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState("")
  const [statuses, setStatuses] = useState<Status[]>([])
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<{ wpm: number; accuracy: number; characters: number } | null>(null)

  useEffect(() => {
    setWords(generateWords(theme))
    resetTest(duration, theme)
  }, [theme]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTimeLeft(duration)
  }, [duration])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return
    const id = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => window.clearTimeout(id)
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      finishTest()
    }
  }, [timeLeft, isRunning])

  const activeWords = useMemo(() => words.slice(currentIndex, currentIndex + 30), [words, currentIndex])

  const handleInput = (value: string) => {
    if (!isRunning) {
      setIsRunning(true)
    }
    if (value.endsWith(" ")) {
      submitWord(value.trim())
      return
    }
    setInput(value)
  }

  const submitWord = (value: string) => {
    const expected = words[currentIndex]
    const nextStatuses = [...statuses, { input: value, expected, correct: value === expected }]
    setStatuses(nextStatuses)
    setCurrentIndex((idx) => idx + 1)
    setInput("")
  }

  const finishTest = () => {
    setIsRunning(false)
    const elapsedSeconds = duration - timeLeft || duration
    const correctChars = statuses.reduce((sum, status) => (status.correct ? sum + status.expected.length : sum), 0)
    const accuracy =
      statuses.length === 0
        ? 0
        : Math.round(
            (statuses.filter((status) => status.correct).length / statuses.length) * 100
          )
    const wpm = Math.max(0, Math.round((correctChars / 5) / (elapsedSeconds / 60)))
    setResults({ wpm, accuracy, characters: correctChars })
  }

  const resetTest = useCallback(
    (newDuration = duration, newTheme = theme) => {
      setIsRunning(false)
      setStatuses([])
      setCurrentIndex(0)
      setInput("")
      setTimeLeft(newDuration)
      setResults(null)
      setWords(generateWords(newTheme))
    },
    [duration, theme]
  )

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center space-y-4">
            <Badge className="bg-white/10 text-white">Typing Lab</Badge>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">Monkeytype-inspired typing dojo</h1>
            <p className="text-base text-white/70">
              Minimal distractions, precise metrics, and buttery-smooth feedback. Hit space to lock a word. Timer
              starts on your first keystroke.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto_1fr] items-center text-sm text-white/70">
            <ConfigGroup label="Duration">
              {DURATIONS.map((value) => (
                <Button
                  key={value}
                  size="sm"
                  variant={value === duration ? "default" : "outline"}
                  className={cn("rounded-full", value === duration ? "bg-white text-slate-900" : "border-white/20 text-white")}
                  onClick={() => {
                    setDuration(value)
                    resetTest(value, theme)
                  }}
                >
                  {value}s
                </Button>
              ))}
            </ConfigGroup>

            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Timer</p>
              <p className="text-4xl font-mono">{timeLeft}</p>
            </div>

            <ConfigGroup label="Word pool">
              {(["classic", "playful"] as const).map((variant) => (
                <Button
                  key={variant}
                  size="sm"
                  variant={variant === theme ? "default" : "outline"}
                  className={cn("rounded-full capitalize", variant === theme ? "bg-white text-slate-900" : "border-white/20 text-white")}
                  onClick={() => {
                    setTheme(variant)
                  }}
                >
                  {variant}
                </Button>
              ))}
            </ConfigGroup>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40">
            <div className="h-32 overflow-hidden text-2xl font-mono leading-relaxed text-white/60">
              {activeWords.map((word, idx) => {
                const globalIndex = currentIndex + idx
                const status = statuses[globalIndex]
                const isCurrent = idx === 0
                let state = "pending"
                if (status) state = status.correct ? "correct" : "incorrect"
                return (
                  <span
                    key={`${word}-${globalIndex}`}
                    className={cn(
                      "mr-2 px-1 rounded-md transition",
                      state === "correct" && "text-emerald-300",
                      state === "incorrect" && "text-rose-300",
                      isCurrent && "bg-white/10 text-white"
                    )}
                  >
                    {word}
                  </span>
                )
              })}
            </div>

            <input
              value={input}
              onChange={(event) => handleInput(event.target.value)}
              disabled={!timeLeft || !!results}
              autoFocus
              spellCheck={false}
              className="mt-6 w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-4 text-2xl font-mono text-white placeholder:text-white/40 focus:border-white focus:outline-none"
              placeholder="Start typing..."
            />

            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                onClick={() => resetTest(duration, theme)}
              >
                Restart
              </Button>
              {!isRunning && !results && (
                <p className="text-sm text-white/60">Timer begins when you press your first key.</p>
              )}
            </div>
          </div>

          {results && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <StatCard label="WPM" value={results.wpm.toString()} sublabel="Net words per minute" />
              <StatCard label="Accuracy" value={`${results.accuracy}%`} sublabel="Correct words / total" />
              <StatCard label="Characters" value={results.characters.toString()} sublabel="Correct characters" />
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

function ConfigGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 text-center text-xs uppercase tracking-[0.3em] text-white/50">
      <p>{label}</p>
      <div className="flex flex-wrap justify-center gap-2">{children}</div>
    </div>
  )
}

function StatCard({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-inner shadow-white/10">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm text-white/60">{sublabel}</p>
    </div>
  )
}


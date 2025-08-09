"use client"

import { useEffect, useMemo, useState } from "react"
import projects from "@/data/projects.json"
import { awardBadge } from "@/lib/achievements"

type Card = { id: string; face: string; open: boolean; matched: boolean }

export default function MemoryMatch({ defaultProps }: { defaultProps: {} }) {
  const faces = useMemo(() => (projects as any[]).slice(0, 6).map((p) => p.cover || "/project-icon.png"), [])
  const deck = useMemo(
    () => shuffle([...faces, ...faces]).map((f, i) => ({ id: String(i), face: f, open: false, matched: false })),
    [faces],
  )
  const [cards, setCards] = useState<Card[]>(deck)
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  useEffect(() => {
    const allMatched = cards.every((c) => c.matched)
    if (allMatched) awardBadge("mini-game-winner")
  }, [cards])

  const flip = (i: number) => {
    if (cards[i].open || cards[i].matched) return
    const next = [...cards]
    next[i].open = true
    setCards(next)
    if (openIdx === null) {
      setOpenIdx(i)
    } else {
      const j = openIdx
      if (cards[i].face === cards[j].face) {
        setTimeout(() => {
          const n = [...next]
          n[i].matched = true
          n[j].matched = true
          setCards(n)
          setOpenIdx(null)
        }, 400)
      } else {
        setTimeout(() => {
          const n = [...next]
          n[i].open = false
          n[j].open = false
          setCards(n)
          setOpenIdx(null)
        }, 600)
      }
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((c, i) => (
        <button
          key={c.id}
          className="aspect-square rounded border overflow-hidden"
          onClick={() => flip(i)}
          aria-pressed={c.open}
        >
          {c.open || c.matched ? (
            <img src={c.face || "/placeholder.svg"} alt="Project icon" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
        </button>
      ))}
    </div>
  )
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

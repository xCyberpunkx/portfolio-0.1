"use client"

import { useState } from "react"
import { awardBadge } from "@/lib/achievements"

export default function LogicPuzzle({ defaultProps }: { defaultProps: {} }) {
  const [bits, setBits] = useState<[boolean, boolean, boolean]>([false, false, false])
  const solved = bits[0] && !bits[1] && bits[2]

  return (
    <div className="rounded border p-3">
      <div className="text-sm mb-2">{"Toggle the switches to match the rule: on, off, on."}</div>
      <div className="flex gap-2">
        {bits.map((b, i) => (
          <button
            key={i}
            className={`w-12 h-12 rounded ${b ? "bg-emerald-500" : "bg-muted"} border`}
            onClick={() => {
              const next = [...bits] as [boolean, boolean, boolean]
              next[i] = !next[i]
              setBits(next)
            }}
            aria-pressed={b}
          />
        ))}
      </div>
      {solved ? (
        <div className="mt-3 text-sm text-emerald-600 font-medium">
          {"Solved! Hidden message: Keep building."}
          <button className="ml-2 underline text-xs" onClick={() => awardBadge("mini-game-winner")}>
            Claim Badge
          </button>
        </div>
      ) : null}
    </div>
  )
}

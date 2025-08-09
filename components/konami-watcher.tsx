"use client"

import { useEffect } from "react"

export function KonamiWatcher({
  onUnlock,
  defaultProps,
}: {
  onUnlock: () => void
  defaultProps: { onUnlock: () => void }
}) {
  useEffect(() => {
    const seq = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    let idx = 0
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === seq[idx] || key === seq[idx].toLowerCase()) {
        idx++
        if (idx === seq.length) {
          onUnlock()
          idx = 0
        }
      } else {
        idx = 0
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onUnlock])
  return null
}

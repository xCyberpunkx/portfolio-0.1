"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

let globalStart: (() => void)[] = []
let globalDone: (() => void)[] = []

export function useTopProgress() {
  return {
    start: () => globalStart.forEach((f) => f()),
    done: () => globalDone.forEach((f) => f()),
  }
}

export function TopProgressBar() {
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const start = () => {
      setVisible(true)
      setWidth(10)
      if (timerRef.current) cancelAnimationFrame(timerRef.current)
      const step = () => {
        setWidth((w) => (w < 90 ? w + Math.random() * 10 : w))
        timerRef.current = requestAnimationFrame(step)
      }
      timerRef.current = requestAnimationFrame(step)
    }
    const done = () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current)
      setWidth(100)
      setTimeout(() => setVisible(false), 300)
      setTimeout(() => setWidth(0), 400)
    }
    globalStart.push(start)
    globalDone.push(done)
    return () => {
      globalStart = globalStart.filter((f) => f !== start)
      globalDone = globalDone.filter((f) => f !== done)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn("h-1 bg-emerald-500")}
        style={{ width: `${width}%`, boxShadow: "0 0 12px #10b981" }}
        aria-hidden="true"
      />
    </div>
  )
}

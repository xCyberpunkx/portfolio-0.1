"use client"

import { useEffect, useRef, useState } from "react"

export default function HiddenGame({ defaultProps }: { defaultProps: {} }) {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const [score, setScore] = useState(0)
  const [over, setOver] = useState(false)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf = 0
    let t = 0
    let x = 20,
      y = 60,
      vy = 0
    let obstacles: { x: number; y: number; w: number; h: number }[] = []
    const reset = () => {
      setScore(0)
      setOver(false)
      obstacles = []
      t = 0
      x = 20
      y = 60
      vy = 0
    }

    const loop = () => {
      t++
      ctx.imageSmoothingEnabled = false
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // ground
      ctx.fillStyle = "#0a0"
      ctx.fillRect(0, 118, canvas.width, 2)
      // player
      vy += 0.6
      y += vy
      if (y > 106) {
        y = 106
        vy = 0
      }
      ctx.fillStyle = "#0f0"
      ctx.fillRect(x, y, 10, 10)
      // obstacles
      if (t % 70 === 0) {
        obstacles.push({ x: canvas.width, y: 106, w: 8, h: 10 + Math.random() * 14 })
      }
      ctx.fillStyle = "#a0f"
      obstacles.forEach((o) => {
        o.x -= 2
        ctx.fillRect(o.x, o.y - o.h, o.w, o.h)
        // collision
        if (x < o.x + o.w && x + 10 > o.x && y + 10 > o.y - o.h) {
          setOver(true)
        }
      })
      setScore((s) => s + 1)
      if (!over) raf = requestAnimationFrame(loop)
      else {
        ctx.fillStyle = "#fff"
        ctx.fillText("GAME OVER - press R", 30, 60)
      }
    }
    raf = requestAnimationFrame(loop)
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !over) {
        vy = -7
      } else if (e.key.toLowerCase() === "r") {
        reset()
        raf = requestAnimationFrame(loop)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
    }
  }, [over])

  return (
    <div className="rounded border border-white/10 p-3 bg-black/60 inline-block">
      <div className="text-xs font-mono text-zinc-400 mb-1">{"Press Space to jump • R to restart"}</div>
      <canvas ref={ref} width={240} height={120} className="bg-black" style={{ imageRendering: "pixelated" }} />
      <div className="text-xs font-mono text-emerald-400 mt-2">
        {"Score: "}
        {score}
      </div>
    </div>
  )
}

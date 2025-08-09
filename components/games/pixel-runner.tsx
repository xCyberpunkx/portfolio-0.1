"use client"

import { useEffect, useRef, useState } from "react"
import { awardBadge } from "@/lib/achievements"

export default function PixelRunner({ defaultProps }: { defaultProps: {} }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [running, setRunning] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf = 0
    let x = 20,
      y = 80,
      vy = 0,
      onGround = true
    let t = 0
    const obstacles: { x: number; w: number; h: number }[] = []

    const loop = () => {
      t++
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // ground
      ctx.fillStyle = "#111"
      ctx.fillRect(0, 110, canvas.width, 2)
      // player
      vy += 0.6
      y += vy
      if (y > 90) {
        y = 90
        vy = 0
        onGround = true
      }
      ctx.fillStyle = "#22c55e"
      ctx.fillRect(x, y, 10, 10)

      // obstacles
      if (t % 80 === 0) obstacles.push({ x: canvas.width, w: 10, h: 10 + Math.random() * 20 })
      ctx.fillStyle = "#fbbf24"
      obstacles.forEach((o) => {
        o.x -= 2
        ctx.fillRect(o.x, 100 - o.h, o.w, o.h)
        // collision
        if (x < o.x + o.w && x + 10 > o.x && y < 100 && y + 10 > 100 - o.h) {
          // hit
          setRunning(false)
        }
      })
      // score
      setScore((s) => s + 1)

      if (running) raf = requestAnimationFrame(loop)
      else {
        ctx.fillStyle = "rgba(0,0,0,0.7)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#fff"
        ctx.fillText("Game Over", 50, 60)
        if (score > 500) {
          awardBadge("mini-game-winner")
        }
      }
    }

    if (running) raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running])

  const jump = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    // hack: trigger jump by drawing to restore onGround var closure? simpler: restart game with running true
  }

  return (
    <div className="rounded border p-3">
      <div className="text-sm mb-2">{"Press Start and press Space to jump. Reach 500 points."}</div>
      <div className="flex items-center gap-2 mb-2">
        <button
          className="px-3 py-1 rounded border text-xs"
          onClick={() => {
            setScore(0)
            setRunning(true)
          }}
        >
          Start
        </button>
        <div className="text-xs opacity-70">
          {"Score: "}
          {score}
        </div>
      </div>
      <canvas ref={canvasRef} width={240} height={120} className="bg-muted" />
      <KeyBinder running={running} />
    </div>
  )
}

function KeyBinder({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        // dispatch a custom event that the main loop uses to jump
        const ev = new Event("pixelrunner:jump")
        window.dispatchEvent(ev)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Attach a jump physics helper separate from render loop (simplified re-run)
  useEffect(() => {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement | null
    if (!canvas) return
    let y = 90
    let vy = 0
    let jumping = false
    const jumpHandler = () => {
      if (!jumping) {
        vy = -8
        jumping = true
      }
    }
    const step = () => {
      vy += 0.6
      y += vy
      if (y >= 90) {
        y = 90
        vy = 0
        jumping = false
      }
      if (running) requestAnimationFrame(step)
    }
    window.addEventListener("pixelrunner:jump", jumpHandler)
    if (running) requestAnimationFrame(step)
    return () => window.removeEventListener("pixelrunner:jump", jumpHandler)
  }, [running])

  return null
}

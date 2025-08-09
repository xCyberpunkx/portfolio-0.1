"use client"

import { useEffect, useRef } from "react"

export default function PixelCity({ defaultProps }: { defaultProps: {} }) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let raf = 0
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const resize = () => {
      canvas.width = canvas.clientWidth * DPR
      canvas.height = canvas.clientHeight * DPR
    }
    resize()
    const buildings = Array.from({ length: 40 }).map((_, i) => ({
      x: Math.random() * canvas.width,
      w: 20 + Math.random() * 40,
      h: 40 + Math.random() * (canvas.height * 0.6),
      hue: 180 + Math.random() * 120,
    }))
    const neon = () => 0.6 + Math.sin(Date.now() / 700) * 0.4
    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // sky gradient
      const g = ctx.createLinearGradient(0, 0, 0, canvas.height)
      g.addColorStop(0, "rgba(10,15,30,1)")
      g.addColorStop(1, "rgba(0,0,0,1)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // stars
      ctx.globalAlpha = 0.8
      for (let i = 0; i < 120; i++) {
        ctx.fillStyle = "rgba(255,255,255,0.6)"
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height * 0.4, 1, 1)
      }
      ctx.globalAlpha = 1
      // buildings
      buildings.forEach((b) => {
        ctx.fillStyle = "rgba(20,20,30,1)"
        ctx.fillRect(b.x, canvas.height - b.h, b.w, b.h)
        // windows
        for (let y = canvas.height - b.h + 8; y < canvas.height - 8; y += 8) {
          for (let x = b.x + 3; x < b.x + b.w - 3; x += 6) {
            ctx.fillStyle = Math.random() > 0.85 ? "rgba(255,220,120,0.9)" : "rgba(255,220,120,0.2)"
            ctx.fillRect(x, y, 2, 2)
          }
        }
        // neon sign
        ctx.globalCompositeOperation = "lighter"
        ctx.fillStyle = `hsla(${b.hue}, 80%, 60%, ${neon() * 0.6})`
        ctx.fillRect(b.x + b.w / 2 - 2, canvas.height - b.h - 16, 4, 10)
        ctx.globalCompositeOperation = "source-over"
      })
      // ground reflection
      ctx.fillStyle = "rgba(0,255,170,0.06)"
      ctx.fillRect(0, canvas.height - 4, canvas.width, 4)
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    const onResize = () => resize()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} className="w-full h-[60vh] sm:h-[70vh] md:h-[75vh] block" />
}

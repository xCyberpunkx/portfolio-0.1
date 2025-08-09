"use client"

import { useEffect, useRef } from "react"

export default function MatrixRain({ defaultProps }: { defaultProps: {} }) {
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
    const cols = Math.floor(canvas.width / (12 * DPR))
    const drops = Array(cols).fill(0)
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポヴ0123456789"
    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#22c55e"
      ctx.font = `${12 * DPR}px monospace`
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length))
        const x = i * 12 * DPR
        const y = drops[i] * 12 * DPR
        ctx.fillText(text, x, y)
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
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

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-20 opacity-40" aria-hidden="true" />
}

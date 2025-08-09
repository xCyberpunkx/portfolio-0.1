"use client"

import experiments from "@/data/experiments.json"
import { useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Experiment = { id: string; name: string; repo?: string; demo?: string }

export default function TheLab({ defaultProps }: { defaultProps: {} }) {
  const list = useMemo(() => experiments as Experiment[], [])
  const [count, setCount] = useState<number>(120)
  const [speed, setSpeed] = useState<number>(1.2)
  const [hue, setHue] = useState<number>(140)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("lab")) {
        arr.push("lab")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let t = 0
    let raf = 0
    const loop = () => {
      t += 0.016 * speed
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + t
        const r = 40 + 30 * Math.sin(t + i)
        const x = canvas.width / 2 + Math.cos(a) * r
        const y = canvas.height / 2 + Math.sin(a) * r
        ctx.fillStyle = `hsl(${hue + (i % 60)}, 80%, 60%)`
        ctx.fillRect(x, y, 2, 2)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [count, speed, hue])

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{"The Lab"}</h2>
      <p className="text-sm text-muted-foreground mb-4">
        {"Play with a live visual experiment. Fork or explore code below."}
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <canvas ref={canvasRef} width={320} height={220} className="w-full h-auto bg-black rounded" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="count">Particles</Label>
              <Input
                id="count"
                type="range"
                min={20}
                max={400}
                value={count}
                onChange={(e) => setCount(Number.parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="speed">Speed</Label>
              <Input
                id="speed"
                type="range"
                min={0.2}
                max={2.4}
                step={0.1}
                value={speed}
                onChange={(e) => setSpeed(Number.parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="hue">Hue</Label>
              <Input
                id="hue"
                type="range"
                min={0}
                max={360}
                value={hue}
                onChange={(e) => setHue(Number.parseInt(e.target.value))}
              />
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-semibold mb-2">{"Experiments"}</div>
          <ul className="space-y-2">
            {list.map((ex) => (
              <li key={ex.id} className="flex items-center justify-between">
                <span className="text-sm">{ex.name}</span>
                <div className="flex gap-2">
                  {ex.demo ? (
                    <Button asChild size="sm" variant="secondary">
                      <a href={ex.demo} target="_blank" rel="noreferrer">
                        Demo
                      </a>
                    </Button>
                  ) : null}
                  {ex.repo ? (
                    <Button asChild size="sm" variant="outline">
                      <a href={ex.repo} target="_blank" rel="noreferrer">
                        Fork on GitHub
                      </a>
                    </Button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

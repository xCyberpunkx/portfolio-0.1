"use client"

import cv from "@/data/cv.json"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type CV = {
  name: string
  role: string
  summary: string
  experience: { company: string; role: string; period: string; bullets: string[] }[]
  education: { school: string; degree: string; period: string }[]
  skills: string[]
}

export default function DigitalCVRoom({ defaultProps }: { defaultProps: {} }) {
  const [view, setView] = useState<"inline" | "map">("inline")

  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("digital-cv-room")) {
        arr.push("digital-cv-room")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  const data = cv as CV

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold">{"Digital CV Room"}</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setView(view === "inline" ? "map" : "inline")}>
            {view === "inline" ? "Career Map" : "Inline CV"}
          </Button>
          <Button asChild>
            <a href="/cv/resume.pdf" download>
              Download PDF
            </a>
          </Button>
        </div>
      </div>
      <div className="mt-4">
        {view === "inline" ? (
          <Card className="p-4 relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04), transparent 40%)",
              }}
            />
            <div className="relative">
              <div className="text-lg font-semibold">
                {data.name} — {data.role}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{data.summary}</p>
              <div className="mt-4">
                <div className="font-semibold">Experience</div>
                <ul className="mt-2 space-y-2">
                  {data.experience.map((e, i) => (
                    <li key={i}>
                      <div className="text-sm font-semibold">
                        {e.role} @ {e.company} <span className="text-xs opacity-60">({e.period})</span>
                      </div>
                      <ul className="list-disc pl-5 text-sm">
                        {e.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <div className="font-semibold">Education</div>
                <ul className="text-sm">
                  {data.education.map((ed, i) => (
                    <li key={i}>
                      {ed.degree} — {ed.school} <span className="text-xs opacity-60">({ed.period})</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <div className="font-semibold">Skills</div>
                <div className="text-sm">{data.skills.join(", ")}</div>
              </div>
              <div className="mt-4 rounded border overflow-hidden">
                <iframe src="/cv/resume.pdf" title="Resume PDF" className="w-full h-[420px]" />
              </div>
            </div>
          </Card>
        ) : (
          <CareerMap data={data} />
        )}
      </div>
    </div>
  )
}

function CareerMap({ data }: { data: CV }) {
  return (
    <Card className="p-4">
      <div className="text-sm text-muted-foreground mb-2">{"A simple visual of job hops."}</div>
      <div className="relative h-[380px]">
        <svg viewBox="0 0 600 300" className="w-full h-full">
          <defs>
            <linearGradient id="grad" x1="0" x2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          {data.experience.map((e, i) => {
            const x = 60 + i * 120
            const y = 180 - (i % 2) * 60
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="16" fill="url(#grad)" />
                <text x={x} y={y + 36} fontSize="10" textAnchor="middle" fill="currentColor">
                  {e.company}
                </text>
                {i < data.experience.length - 1 ? (
                  <line
                    x1={x + 16}
                    y1={y}
                    x2={x + 104}
                    y2={180 - ((i + 1) % 2) * 60}
                    stroke="currentColor"
                    strokeOpacity="0.4"
                  />
                ) : null}
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import timeline from "@/data/timeline.json"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

const Globe = dynamic(() => import("@/components/visuals/globe"), { ssr: false })

type TLItem = {
  id: string
  year: string
  title: string
  description: string
  icon: string
  coords?: [number, number] // lat, lng
  facts?: string[]
}

export default function StoryHall({ defaultProps }: { defaultProps: {} }) {
  const [activeId, setActiveId] = useState<string>((timeline as TLItem[])[0]?.id || "")
  const items = useMemo(() => timeline as TLItem[], [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("story-hall")) {
        arr.push("story-hall")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  const active = items.find((i) => i.id === activeId) || items[0]

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-10">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{"The Story Hall"}</h2>
        <div className="h-[60vh] overflow-auto pr-2">
          <ol className="relative border-l pl-4">
            {items.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "mb-6 cursor-pointer group focus-within:outline-none",
                  activeId === item.id ? "opacity-100" : "opacity-80",
                )}
                tabIndex={0}
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
              >
                <div className="absolute -left-2.5 mt-1 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-primary/20" />
                <div className="text-xs text-muted-foreground">{item.year}</div>
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm opacity-80">{item.description}</div>
                {item.facts?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.facts.map((f, idx) => (
                      <Badge key={idx} variant="outline">
                        {f}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3">{"Fact Card"}</h3>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">{active.year}</div>
          <div className="text-lg font-semibold">{active.title}</div>
          <p className="mt-2 text-sm">{active.description}</p>
          <div className="mt-4 h-[300px] rounded-md overflow-hidden border">
            <Globe
              markers={items.filter(Boolean).map((i) => ({ id: i.id, coords: i.coords }))}
              activeId={activeId}
              defaultProps={{ markers: [], activeId: "" }}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MoonStar, Sun, Sparkles, Music2, MapPin } from "lucide-react"
import { usePersonalization } from "./personalization-provider"
import { cn } from "@/lib/utils"

type SectionMeta = { id: string; label: string }

export function MiniMap({
  sections,
  activeId,
  onJump,
  defaultProps,
}: {
  sections: SectionMeta[]
  activeId: string
  onJump: (id: string) => void
  defaultProps: { sections: SectionMeta[]; activeId: string; onJump: (id: string) => void }
}) {
  const { themeVariant, setThemeVariant, ambientSound, setAmbientSound, motion, setMotion } = usePersonalization()
  const [opened, setOpened] = useState<boolean>(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        setOpened((v) => !v)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-3 left-1/2 -translate-x-1/2 z-40",
        "backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-full px-2 py-1",
      )}
      aria-label="Mini map navigation"
      role="navigation"
    >
      <div className="flex items-center gap-1">
        {sections.map((s) => (
          <Button
            key={s.id}
            variant={s.id === activeId ? "default" : "ghost"}
            size="sm"
            className={cn("rounded-full text-xs", s.id === activeId ? "font-semibold" : "opacity-70 hover:opacity-100")}
            onClick={() => onJump(s.id)}
            aria-current={s.id === activeId ? "page" : undefined}
          >
            <MapPin className="h-3 w-3 mr-1" />
            {s.label}
          </Button>
        ))}
        <span className="mx-1 opacity-50">|</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setThemeVariant(themeVariant === "day" ? "night" : themeVariant === "night" ? "neon" : "day")}
          aria-label="Toggle theme variant"
        >
          {themeVariant === "day" ? (
            <Sun className="h-4 w-4" />
          ) : themeVariant === "night" ? (
            <MoonStar className="h-4 w-4" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant={ambientSound ? "default" : "ghost"}
          size="icon"
          className="rounded-full"
          onClick={() => setAmbientSound(!ambientSound)}
          aria-pressed={ambientSound}
          aria-label="Toggle ambient audio"
        >
          <Music2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full text-xs"
          onClick={() => setMotion(motion === "cinematic" ? "minimal" : "cinematic")}
          aria-label="Toggle motion preference"
        >
          {motion === "cinematic" ? "Motion: Cinematic" : "Motion: Minimal"}
        </Button>
      </div>
    </div>
  )
}

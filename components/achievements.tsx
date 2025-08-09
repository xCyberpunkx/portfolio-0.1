"use client"

import { useEffect, useState } from "react"
import { getBadges, awardBadge } from "@/lib/achievements"
import { Badge } from "@/components/ui/badge"
import { Trophy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AchievementsDock({ defaultProps }: { defaultProps: {} }) {
  const [open, setOpen] = useState<boolean>(false)
  const [badges, setBadges] = useState(getBadges())

  // update on storage changes
  useEffect(() => {
    const sync = () => setBadges(getBadges())
    window.addEventListener("storage", sync)
    return () => window.removeEventListener("storage", sync)
  }, [])

  // Award visit-all when all sections seen (tracked via observer in page -> here we poll a flag)
  useEffect(() => {
    const handler = () => {
      const seenRaw = localStorage.getItem("museum:seen-sections")
      if (seenRaw) {
        const seen: string[] = JSON.parse(seenRaw)
        if (seen.length >= 8) {
          awardBadge("visited-all")
          setBadges(getBadges())
        }
      }
    }
    const id = setInterval(handler, 1500)
    return () => clearInterval(id)
  }, [])

  // Keyboard shortcut: Ctrl+Alt+B
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "b") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button onClick={() => setOpen((v) => !v)} variant="secondary" className="rounded-full shadow-lg">
        <Trophy className="h-4 w-4 mr-2" />
        Achievements
      </Button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Achievements"
          className="mt-2 w-80 max-w-[90vw] rounded-md border bg-background p-3 shadow-lg"
        >
          <div className="text-sm font-semibold mb-2">Badges</div>
          <div className="grid gap-2">
            {badges.map((b) => (
              <div key={b.id} className="flex items-center gap-2">
                <Badge variant={b.unlockedAt ? "default" : "outline"}>{b.name}</Badge>
                <div className="text-xs text-muted-foreground">{b.description}</div>
                {b.unlockedAt ? <CheckCircle className="h-4 w-4 text-green-500 ml-auto" /> : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

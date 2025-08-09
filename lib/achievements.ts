"use client"

export type BadgeId = "visited-all" | "console-explorer" | "mini-game-winner"

type Badge = {
  id: BadgeId
  name: string
  description: string
  unlockedAt?: number
}

const BADGES: Badge[] = [
  { id: "visited-all", name: "Grand Tourer", description: "Visited all museum rooms." },
  { id: "console-explorer", name: "Console Explorer", description: "Opened the hidden console." },
  { id: "mini-game-winner", name: "Arcade Victor", description: "Won a mini game." },
]

export function getBadges(): Badge[] {
  try {
    const raw = localStorage.getItem("museum:badges")
    const saved: Badge[] = raw ? JSON.parse(raw) : []
    // Merge with defaults to keep names/descriptions fresh
    const merged = BADGES.map((b) => ({ ...b, ...(saved.find((s) => s.id === b.id) || {}) }))
    return merged
  } catch {
    return BADGES
  }
}

export function awardBadge(id: BadgeId) {
  try {
    const badges = getBadges()
    const b = badges.find((x) => x.id === id)
    if (b && !b.unlockedAt) {
      b.unlockedAt = Date.now()
      localStorage.setItem("museum:badges", JSON.stringify(badges))
    }
  } catch {}
}

export function hasUnlockedAll(): boolean {
  const badges = getBadges()
  return badges.every((b) => !!b.unlockedAt)
}

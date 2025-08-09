"use client"

import { useEffect, useState } from "react"

export function useSectionNav(ids: string[]) {
  const [active, setActive] = useState(ids[0] || "hero")
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.intersectionRatio > b.intersectionRatio ? -1 : 1))
        if (vis[0]?.target?.id) setActive(vis[0].target.id)
      },
      { threshold: [0.5, 0.75] },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [ids])
  const gotoSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  return { active, gotoSection, SECTION_IDS: ids as Readonly<string[]> }
}

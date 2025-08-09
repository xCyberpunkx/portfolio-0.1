"use client"

import type React from "react"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

type ThemeVariant = "day" | "night" | "neon"
type MotionPref = "cinematic" | "minimal"

type PersonalizationContextType = {
  themeVariant: ThemeVariant
  setThemeVariant: (t: ThemeVariant) => void
  motion: MotionPref
  setMotion: (m: MotionPref) => void
  ambientSound: boolean
  setAmbientSound: (b: boolean) => void
}

const PersonalizationContext = createContext<PersonalizationContextType | null>(null)

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("day")
  const [motion, setMotion] = useState<MotionPref>("cinematic")
  const [ambientSound, setAmbientSound] = useState<boolean>(false)

  // Load from localStorage and prefers-reduced-motion
  useEffect(() => {
    try {
      const stored = localStorage.getItem("museum:personalization")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.themeVariant) setThemeVariant(parsed.themeVariant)
        if (parsed.motion) setMotion(parsed.motion)
        if (typeof parsed.ambientSound === "boolean") setAmbientSound(parsed.ambientSound)
      } else {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        if (reduced) setMotion("minimal")
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("museum:personalization", JSON.stringify({ themeVariant, motion, ambientSound }))
    } catch {}
  }, [themeVariant, motion, ambientSound])

  const value = useMemo(
    () => ({ themeVariant, setThemeVariant, motion, setMotion, ambientSound, setAmbientSound }),
    [themeVariant, motion, ambientSound],
  )

  return <PersonalizationContext.Provider value={value}>{children}</PersonalizationContext.Provider>
}

export function usePersonalization() {
  const ctx = useContext(PersonalizationContext)
  if (!ctx) {
    throw new Error("usePersonalization must be used within PersonalizationProvider")
  }
  return ctx
}

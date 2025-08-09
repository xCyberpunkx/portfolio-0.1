"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Scheme = "dark" | "light"
type ThemeContextType = {
  scheme: Scheme
  setScheme: (s: Scheme) => void
  matrix: boolean
  setMatrix: (v: boolean) => void
  mode: "dark" | "light" | "matrix"
  setMode: (m: "dark" | "light" | "matrix") => void
}

const ThemeModeContext = createContext<ThemeContextType | null>(null)

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setScheme] = useState<Scheme>("dark")
  const [matrix, setMatrix] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("arcade:theme")
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.scheme) setScheme(parsed.scheme)
        if (typeof parsed.matrix === "boolean") setMatrix(parsed.matrix)
      } else {
        const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches
        setScheme(prefersDark ? "dark" : "light")
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("arcade:theme", JSON.stringify({ scheme, matrix }))
    } catch {}
    document.documentElement.classList.toggle("dark", scheme === "dark")
    document.body.style.backgroundColor = scheme === "dark" ? "#000" : "#0b1020"
  }, [scheme, matrix])

  const value = useMemo(
    () => ({
      scheme,
      setScheme,
      matrix,
      setMatrix,
      mode: matrix ? "matrix" : scheme,
      setMode: (m: "dark" | "light" | "matrix") => {
        if (m === "matrix") setMatrix(true)
        else {
          setMatrix(false)
          setScheme(m)
        }
      },
    }),
    [scheme, matrix],
  )

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider")
  return ctx
}

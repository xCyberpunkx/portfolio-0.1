"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type DesignMode = "experience" | "apple"
type ColorScheme = "light" | "dark"

interface DualModeContextType {
  designMode: DesignMode
  colorScheme: ColorScheme
  setDesignMode: (mode: DesignMode) => void
  setColorScheme: (scheme: ColorScheme) => void
  toggleDesignMode: () => void
  toggleColorScheme: () => void
}

const DualModeContext = createContext<DualModeContextType | undefined>(undefined)

export function DualModeProvider({ children }: { children: React.ReactNode }) {
  const [designMode, setDesignMode] = useState<DesignMode>("experience")
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark")

  // Load from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("design-mode") as DesignMode
    const savedScheme = localStorage.getItem("color-scheme") as ColorScheme

    if (savedMode) setDesignMode(savedMode)
    if (savedScheme) setColorScheme(savedScheme)

    // Check system preference for color scheme
    if (!savedScheme && window.matchMedia("(prefers-color-scheme: light)").matches) {
      setColorScheme("light")
    }
  }, [])

  // Save to localStorage and update CSS variables
  useEffect(() => {
    localStorage.setItem("design-mode", designMode)
    localStorage.setItem("color-scheme", colorScheme)

    document.documentElement.setAttribute("data-design-mode", designMode)
    document.documentElement.setAttribute("data-color-scheme", colorScheme)

    // Update CSS custom properties for smooth transitions
    const root = document.documentElement
    if (designMode === "apple") {
      root.style.setProperty("--border-radius", "12px")
      root.style.setProperty("--glass-opacity", "0.8")
      root.style.setProperty("--blur-strength", "20px")
    } else {
      root.style.setProperty("--border-radius", "4px")
      root.style.setProperty("--glass-opacity", "0.1")
      root.style.setProperty("--blur-strength", "8px")
    }
  }, [designMode, colorScheme])

  const toggleDesignMode = () => {
    setDesignMode((prev) => (prev === "experience" ? "apple" : "experience"))
  }

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <DualModeContext.Provider
      value={{
        designMode,
        colorScheme,
        setDesignMode,
        setColorScheme,
        toggleDesignMode,
        toggleColorScheme,
      }}
    >
      {children}
    </DualModeContext.Provider>
  )
}

export function useDualMode() {
  const context = useContext(DualModeContext)
  if (context === undefined) {
    throw new Error("useDualMode must be used within a DualModeProvider")
  }
  return context
}

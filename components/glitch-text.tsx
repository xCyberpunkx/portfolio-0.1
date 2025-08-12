"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    const startGlitch = () => {
      setIsGlitching(true)
      let iterations = 0

      const interval = setInterval(() => {
        setGlitchText(
          text
            .split("")
            .map((char, index) => {
              if (index < iterations) return text[index]
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            })
            .join(""),
        )

        iterations += 1 / 3

        if (iterations >= text.length) {
          clearInterval(interval)
          setGlitchText(text)
          setIsGlitching(false)
        }
      }, 30)
    }

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        startGlitch()
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [text])

  return (
    <span
      className={cn("relative inline-block", isGlitching && "animate-pulse", className)}
      style={{
        textShadow: isGlitching ? "2px 0 #ff0080, -2px 0 #00ffff, 0 0 10px currentColor" : "0 0 10px currentColor",
      }}
    >
      {glitchText}
    </span>
  )
}

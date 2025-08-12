"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface NeonCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "green" | "purple" | "cyan" | "pink"
}

export function NeonCard({ children, className, glowColor = "green" }: NeonCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const glowColors = {
    green: "shadow-green-400/50 border-green-400/50",
    purple: "shadow-purple-400/50 border-purple-400/50",
    cyan: "shadow-cyan-400/50 border-cyan-400/50",
    pink: "shadow-pink-400/50 border-pink-400/50",
  }

  return (
    <Card
      className={cn(
        "relative bg-black/80 border-2 transition-all duration-300 backdrop-blur-sm",
        "hover:scale-105 hover:shadow-2xl",
        isHovered && glowColors[glowColor],
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: isHovered
          ? `0 0 20px var(--neon-${glowColor === "green" ? "green" : glowColor === "purple" ? "purple" : glowColor === "cyan" ? "cyan" : "pink"}), inset 0 0 20px rgba(0,0,0,0.5)`
          : "inset 0 0 20px rgba(0,0,0,0.5)",
      }}
    >
      {children}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, var(--neon-${glowColor === "green" ? "green" : glowColor === "purple" ? "purple" : glowColor === "cyan" ? "cyan" : "pink"}) 0%, transparent 70%)`,
          }}
        />
      )}
    </Card>
  )
}

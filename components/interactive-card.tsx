"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { useDualMode } from "./dual-mode-provider"

interface InteractiveCardProps {
  title: string
  description: string
  image?: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  onPreview?: () => void
  className?: string
}

export function InteractiveCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  onPreview,
  className,
}: InteractiveCardProps) {
  const { designMode } = useDualMode()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [transform, setTransform] = useState("")
  const [supportsTransform, setSupportsTransform] = useState(true)

  // Check for transform support and reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const hasTransformSupport = CSS.supports("transform", "perspective(1000px)")
    setSupportsTransform(hasTransformSupport && !prefersReducedMotion)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!supportsTransform || designMode === "apple") return

    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTransform("")
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  if (designMode === "apple") {
    return (
      <Card
        ref={cardRef}
        className={cn(
          "group relative overflow-hidden transition-all duration-300 ease-out",
          "bg-white/5 backdrop-blur-xl border-white/10",
          "hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]",
          "dark:bg-black/20 dark:hover:bg-black/30",
          className,
        )}
        style={{ borderRadius: "var(--border-radius)" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {githubUrl && (
              <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} on GitHub`}>
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {liveUrl && (
              <Button asChild size="sm" variant="default" className="flex-1">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} live demo`}>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Live
                </a>
              </Button>
            )}
            {onPreview && (
              <Button size="sm" variant="secondary" onClick={onPreview} aria-label={`Preview ${title}`}>
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  // Experience mode with 3D effects
  return (
    <Card
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer",
        "bg-zinc-900/50 border-emerald-500/20 backdrop-blur-sm",
        "hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10",
        isHovered && supportsTransform && "z-10",
        className,
      )}
      style={{
        transform: supportsTransform ? transform : undefined,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neon glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {image && (
        <div className="aspect-video overflow-hidden relative">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent" />
        </div>
      )}

      <div className="p-6 relative">
        <h3 className="font-mono text-lg font-bold mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-zinc-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-mono border-purple-500/30 text-purple-300">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          {githubUrl && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="flex-1 font-mono border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 bg-transparent"
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} on GitHub`}>
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild size="sm" className="flex-1 font-mono bg-purple-600 hover:bg-purple-500">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} live demo`}>
                <ExternalLink className="h-4 w-4 mr-1" />
                Live
              </a>
            </Button>
          )}
          {onPreview && (
            <Button
              size="sm"
              variant="secondary"
              onClick={onPreview}
              className="font-mono"
              aria-label={`Preview ${title}`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

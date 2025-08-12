"use client"

import { useState, useEffect } from "react"

interface TerminalTypewriterProps {
  lines: string[]
  onComplete?: () => void
  typeSpeed?: number // Added configurable typing speed
  lineDelay?: number // Added configurable line delay
}

export function TerminalTypewriter({
  lines,
  onComplete,
  typeSpeed = 50, // Default faster typing like Arch boot
  lineDelay = 200, // Shorter delay between lines
}: TerminalTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [completedLines, setCompletedLines] = useState<string[]>([]) // Track completed lines

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete?.()
      return
    }

    const currentLine = lines[currentLineIndex]

    if (currentText.length < currentLine.length) {
      const timeout = setTimeout(
        () => {
          setCurrentText(currentLine.slice(0, currentText.length + 1))
        },
        Math.random() * typeSpeed + typeSpeed * 0.5,
      )

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCompletedLines((prev) => [...prev, currentLine])
        setCurrentLineIndex(currentLineIndex + 1)
        setCurrentText("")
      }, lineDelay)

      return () => clearTimeout(timeout)
    }
  }, [currentText, currentLineIndex, lines, onComplete, typeSpeed, lineDelay])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-green-400 text-sm md:text-base space-y-1">
      {completedLines.map((line, index) => (
        <div key={index} className="terminal-line animate-boot-sequence" style={{ animationDelay: `${index * 0.1}s` }}>
          {line.startsWith("[") ? (
            <span className="text-cyan-400">{line}</span>
          ) : line.includes("$") ? (
            <>
              <span className="terminal-prompt">$</span>
              <span className="text-green-400">{line.replace(/^\$\s*/, "")}</span>
            </>
          ) : (
            <span className="text-purple-300">{line}</span>
          )}
        </div>
      ))}

      {currentLineIndex < lines.length && (
        <div className="terminal-line">
          {lines[currentLineIndex].startsWith("[") ? (
            <span className="text-cyan-400">{currentText}</span>
          ) : lines[currentLineIndex].includes("$") ? (
            <>
              <span className="terminal-prompt">$</span>
              <span className="text-green-400">{currentText.replace(/^\$\s*/, "")}</span>
            </>
          ) : (
            <span className="text-purple-300">{currentText}</span>
          )}
          {showCursor && <span className="terminal-cursor">█</span>}
        </div>
      )}
    </div>
  )
}

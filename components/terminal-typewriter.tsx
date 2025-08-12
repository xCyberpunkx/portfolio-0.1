"use client"

import { useState, useEffect } from "react"

interface TerminalTypewriterProps {
  lines: string[]
  onComplete?: () => void
}

export function TerminalTypewriter({ lines, onComplete }: TerminalTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)

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
        Math.random() * 100 + 50,
      )

      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1)
        setCurrentText("")
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [currentText, currentLineIndex, lines, onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="font-mono text-green-400 text-sm md:text-base">
      {lines.slice(0, currentLineIndex).map((line, index) => (
        <div key={index} className="mb-1">
          <span className="text-purple-400">$</span> {line}
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <div className="mb-1">
          <span className="text-purple-400">$</span> {currentText}
          {showCursor && <span className="bg-green-400 text-black">█</span>}
        </div>
      )}
    </div>
  )
}

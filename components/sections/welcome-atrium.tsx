"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { usePersonalization } from "@/components/personalization-provider"

export default function WelcomeAtrium({
  onStart,
  defaultProps,
}: {
  onStart: () => void
  defaultProps: { onStart: () => void }
}) {
  const { motion: motionPref } = usePersonalization()

  useEffect(() => {
    // mark section as seen
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("welcome-atrium")) {
        arr.push("welcome-atrium")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  return (
    <div className="relative h-[calc(100vh-1px)] overflow-hidden flex items-center justify-center">
      {/* Ambient rays */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 animate-[spin_30s_linear_infinite] bg-[conic-gradient(from_0deg,rgba(255,255,255,0.08),transparent_50%,rgba(255,255,255,0.08))]" />
      </div>

      {/* Spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl opacity-40 bg-white/10" />
      </div>

      <div className="relative z-10 text-center px-6">
        <AnimatePresence>
          <motion.h1
            initial={motionPref === "minimal" ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: motionPref === "minimal" ? 0 : 1.0, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            Your Name
          </motion.h1>
        </AnimatePresence>
        <motion.p
          initial={motionPref === "minimal" ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.3, duration: motionPref === "minimal" ? 0 : 0.8 }}
          className="mt-3 text-lg md:text-2xl text-muted-foreground"
        >
          {"Designing & engineering delightful experiences."}
        </motion.p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button size="lg" onClick={onStart}>
            Start Tour
          </Button>
          <a href="#story-hall" className="text-sm underline opacity-80 hover:opacity-100">
            Skip to Main Content
          </a>
        </div>
      </div>
    </div>
  )
}

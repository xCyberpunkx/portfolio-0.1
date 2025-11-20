
"use client"
  
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function TooltipCardDemo() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
      >
        Hover me for status
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-50"
          >
            Currently open to work!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

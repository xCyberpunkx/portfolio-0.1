"use client"

import { useEffect } from "react"

export function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add highlight animations to journey items
          if (entry.target.classList.contains("journey-item")) {
            const card = entry.target.querySelector(".year-highlight-card")
            const yearBox = entry.target.querySelector(".year-box")
            const dot = entry.target.querySelector(".year-highlight-dot")

            if (card) card.classList.add("in-view")
            if (yearBox) yearBox.classList.add("highlight")
            if (dot) dot.classList.add("pulse")
          }
        }
      })
    }, observerOptions)

    // Observe journey items
    const journeyItems = document.querySelectorAll(".journey-item")
    journeyItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return null
}

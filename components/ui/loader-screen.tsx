"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export  function LoaderScreen() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

      // Background fade in
      tl.fromTo(".bg-gradient", { opacity: 0 }, { opacity: 1, duration: 1.2 })

      // Logo entrance
      tl.fromTo(
        ".logo",
        { opacity: 0, scale: 0.6, rotateY: -90 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "expo.out" },
        "-=0.6"
      )

      // Logo spin loop
      gsap.to(".logo", {
        rotateY: 360,
        duration: 3.5,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      })

      // Progress bar fill
      gsap.fromTo(
        ".progress-fill",
        { width: "0%" },
        { width: "100%", duration: 4, ease: "power2.inOut", delay: 0.6 }
      )

      // Status text fade in
      tl.fromTo(
        ".status-line",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.25 },
        "-=1"
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={root}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black overflow-hidden font-sans z-50"
    >
      {/* Light gradient background */}
      <div className="bg-gradient absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),rgba(0,0,0,1))]" />

      {/* Gentle shimmer particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 blur-sm"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning logo */}
        <div className="logo text-white text-[12vw] sm:text-[6rem] font-light select-none tracking-tight">
          ⌘
        </div>

        {/* Status text */}
        <div className="mt-8 text-center text-white/70 space-y-1 text-[3vw] sm:text-base">
          <div className="status-line">Loading core modules...</div>
          <div className="status-line">Initializing UI layers...</div>
          <div className="status-line">Calibrating shaders...</div>
        </div>

        {/* Progress bar */}
        <div className="w-[70vw] sm:w-96 mt-10 h-[0.8vw] sm:h-2 bg-white/10 overflow-hidden rounded-full">
          <div className="progress-fill h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
        </div>

        {/* Footer info */}
        <div className="mt-8 text-xs text-white/40 tracking-widest">
          © 2025 Zenith Systems
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-12px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}

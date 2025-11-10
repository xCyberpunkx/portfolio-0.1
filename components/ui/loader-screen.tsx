"use client"

export function LoaderScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(59,130,246,0.2),rgba(255,255,255,0))]" />

      {/* Main content */}
      <div className="relative text-center z-10 flex flex-col items-center gap-8">
        {/* Premium loading indicator */}
        <div className="relative w-40 h-40">
          {/* Outer orbit */}
          <div className="absolute inset-0 rounded-full border border-blue-500/20" />

          {/* Middle orbiting elements */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 border-r-blue-300 animate-spin"
            style={{ animationDuration: "3s" }}
          />

          {/* Inner rotating circle */}
          <div className="absolute inset-4 rounded-full border border-blue-500/30" />
          <div
            className="absolute inset-4 rounded-full border-2 border-transparent border-b-cyan-400 border-l-blue-400 animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          />

          {/* Core glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/40 to-cyan-500/20 rounded-full blur-xl" />
          </div>

          {/* Center circle with subtle animation */}
          <div className="absolute inset-12 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" />
          </div>
        </div>

        {/* Loading text with gradient */}
        <div className="space-y-3">
          <h2 className="text-2xl font-light tracking-wide text-white">Loading Experience</h2>
          <p className="text-sm text-slate-400 font-light">Preparing something amazing for you</p>
        </div>

        {/* Animated progress indicator */}
        <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
            style={{
              animation: "slide 2s infinite",
            }}
          />
        </div>

        {/* Floating dots */}
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400/60"
              style={{
                animation: `float 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-12px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

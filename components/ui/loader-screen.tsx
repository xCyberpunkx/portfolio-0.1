export  function LoaderScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden font-mono">
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          animation: 'scanline 8s linear infinite'
        }}
      />

      {/* CRT glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent" />

      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* ASCII-style loader */}
        <div className="relative">
          {/* Rotating ASCII border */}
          <div className="text-white/80 text-6xl leading-none" style={{ animation: 'spin 4s linear infinite' }}>
            <pre className="select-none">
{`   ___
  /   \\
 |  o  |
  \\___/`}
            </pre>
          </div>

          {/* Inner rotating element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-4xl" style={{ animation: 'spin-reverse 3s linear infinite' }}>
              ╬
            </div>
          </div>
        </div>

        {/* Terminal-style output */}
        <div className="border-2 border-white/30 bg-black/80 p-6 rounded-none shadow-2xl shadow-white/10 min-w-[400px]">
          <div className="space-y-2 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/50">$</span>
              <span>INITIALIZING SYSTEM...</span>
              <span className="animate-pulse">_</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-white/50">&gt;</span>
              <span>Loading core modules</span>
              <span className="text-white">[OK]</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-white/50">&gt;</span>
              <span>Booting drivers</span>
              <span className="text-white">[OK]</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-white/50">&gt;</span>
              <span>Establishing connection</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span 
                    key={i}
                    style={{ 
                      animation: `blink 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  >
                    .
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar ASCII style */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
              <span>PROGRESS:</span>
              <span className="font-bold text-white">75%</span>
            </div>
            <div className="flex h-4 border border-white/30 bg-black">
              <div 
                className="bg-white relative overflow-hidden"
                style={{ 
                  width: '75%',
                  animation: 'progress-fill 2s ease-in-out infinite'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.3) 10px, rgba(0,0,0,0.3) 20px)',
                    animation: 'progress-stripes 1s linear infinite'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Binary rain effect */}
        <div className="text-white/40 text-xs font-mono flex gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div 
              key={i}
              className="flex flex-col"
              style={{ 
                animation: `fall ${2 + Math.random()}s linear infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              {['1', '0', '1', '1', '0'].map((bit, j) => (
                <span key={j} className="opacity-70">{bit}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Loading indicators */}
        <div className="flex items-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 border border-white animate-pulse" />
            <span>CPU</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 border border-white"
              style={{ animation: 'blink 0.5s step-end infinite' }}
            />
            <span>RAM</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 border border-white"
              style={{ animation: 'blink 0.8s step-end infinite' }}
            />
            <span>I/O</span>
          </div>
        </div>

        {/* Retro text */}
        <div className="text-center space-y-2">
          <div className="text-white/80 text-xl tracking-widest border-2 border-white/30 px-6 py-2 inline-block">
            L O A D I N G
          </div>
          <div className="text-white/40 text-xs tracking-[0.3em]">
            PLEASE STAND BY...
          </div>
        </div>

        {/* Blinking cursor */}
        <div className="text-white text-2xl" style={{ animation: 'blink 1s step-end infinite' }}>
          █
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-white/20 text-xs font-mono">
        {`┌─────────────┐`}
      </div>
      <div className="absolute top-4 right-4 text-white/20 text-xs font-mono">
        {`┐─────────────┘`}
      </div>
      <div className="absolute bottom-4 left-4 text-white/20 text-xs font-mono">
        {`└─────────────┘`}
      </div>
      <div className="absolute bottom-4 right-4 text-white/20 text-xs font-mono">
        {`┘─────────────┐`}
      </div>

      {/* System info */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">
        SYSTEM v2.1.4 :: BOOT SEQUENCE
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-xs font-mono">
        © 1985-2025 RETRO SYSTEMS INC.
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @keyframes fall {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(500%); opacity: 0; }
        }

        @keyframes progress-fill {
          0%, 100% { width: 65%; }
          50% { width: 85%; }
        }

        @keyframes progress-stripes {
          0% { transform: translateX(0); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  )
}
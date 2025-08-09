"use client"

import { useEffect, useRef } from "react"

export function AmbientAudio({
  enabled,
  defaultProps,
}: {
  enabled: boolean
  defaultProps: { enabled: boolean }
}) {
  const ref = useRef<HTMLAudioElement | null>(null)
  useEffect(() => {
    const audio = ref.current
    if (!audio) return
    if (enabled) {
      audio.volume = 0.25
      audio.play().catch(() => {
        // autoplay may fail until user gesture
      })
    } else {
      audio.pause()
    }
  }, [enabled])
  return <audio ref={ref} src="/audio/ambient-hum.mp3" loop aria-hidden="true" className="hidden" />
}

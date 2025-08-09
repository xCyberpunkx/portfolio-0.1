"use client"

import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react"

const PixelRunner = dynamic(() => import("@/components/games/pixel-runner"), { ssr: false })
const LogicPuzzle = dynamic(() => import("@/components/games/logic-puzzle"), { ssr: false })
const MemoryMatch = dynamic(() => import("@/components/games/memory-match"), { ssr: false })

export default function MiniGamesRoom({ defaultProps }: { defaultProps: {} }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem("museum:seen-sections")
      const arr: string[] = raw ? JSON.parse(raw) : []
      if (!arr.includes("mini-games-room")) {
        arr.push("mini-games-room")
        localStorage.setItem("museum:seen-sections", JSON.stringify(arr))
      }
    } catch {}
  }, [])

  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">{"Mini Games Arcade"}</h2>
      <p className="text-sm text-muted-foreground mb-4">{"Win a game to unlock a badge."}</p>
      <Tabs defaultValue="runner" className="w-full">
        <TabsList>
          <TabsTrigger value="runner">{"Pixel Runner"}</TabsTrigger>
          <TabsTrigger value="logic">{"Logic Puzzle"}</TabsTrigger>
          <TabsTrigger value="memory">{"Memory Match"}</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="runner">
            <PixelRunner defaultProps={{}} />
          </TabsContent>
          <TabsContent value="logic">
            <LogicPuzzle defaultProps={{}} />
          </TabsContent>
          <TabsContent value="memory">
            <MemoryMatch defaultProps={{}} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

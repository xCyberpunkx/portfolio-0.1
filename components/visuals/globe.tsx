"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, useTexture } from "@react-three/drei"
import { Suspense, useEffect } from "react"

type Marker = { id: string; coords?: [number, number] }

export default function Globe({
  markers,
  activeId,
  defaultProps,
}: {
  markers: Marker[]
  activeId: string
  defaultProps: { markers: Marker[]; activeId: string }
}) {
  return (
    <div className="w-full h-full">
      <Canvas className="w-full h-full" camera={{ position: [0, 0, 3] }}>
        <Suspense fallback={null}>
          <Scene markers={markers} activeId={activeId} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2.2} maxDistance={4} />
      </Canvas>
    </div>
  )
}

function Scene({ markers, activeId }: { markers: Marker[]; activeId: string }) {
  const texture = useTexture("/assets/3d/texture_earth.jpg")

  useEffect(() => {
    // no-op; could auto-focus active marker
  }, [activeId])

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {markers
        .filter((m) => m.coords)
        .map((m) => {
          const [lat, lon] = m.coords as [number, number]
          const pos = latLonToXYZ(lat, lon, 1.02)
          const active = m.id === activeId
          return (
            <mesh key={m.id} position={pos}>
              <sphereGeometry args={[active ? 0.03 : 0.02, 12, 12]} />
              <meshStandardMaterial
                color={active ? "#22c55e" : "#fbbf24"}
                emissive={active ? "#16a34a" : "#f59e0b"}
                emissiveIntensity={0.6}
              />
            </mesh>
          )
        })}
      <Stars radius={50} depth={10} count={5000} factor={4} fade />
    </>
  )
}

function latLonToXYZ(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  return [x, y, z] as [number, number, number]
}

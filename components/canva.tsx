"use client";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export function PixelatedCanvasDemo() {
  return (
    <div className="flex justify-center">
      <PixelatedCanvas
        src="max.jpg"
        width={400}
        height={500}
        cellSize={3}
        dotScale={0.9}
        shape="square"
        backgroundColor="#000000"
        dropoutStrength={0.4}
        interactive={true}
        distortionStrength={3}
        distortionRadius={80}
        distortionMode="swirl"
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={4}
        sampleAverage
        tintColor="#3333ff"
        tintStrength={0.2}
        className="rounded-xl border border-neutral-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-neutral-700"
      />
    </div>
  );
}

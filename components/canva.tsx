'use client';

import { PixelatedCanvas } from "@/components/ui/pixelated-canvas"; // ← ensure this path is correct
import { memo } from 'react';

export const PixelatedCanvasDemo = memo(() => (
  <div className="w-full aspect-[4/5] max-w-md mx-auto lg:mx-0">
    <PixelatedCanvas
      src="gg.png"
      width={800}
        height={600}
        cellSize={4}
        dotScale={0.9}
        shape="square"
        backgroundColor="#000000"
        dropoutStrength={0.1}
        interactive
        distortionStrength={0.1}
        distortionRadius={200}
        distortionMode="repel"
        followSpeed={0.3}
        jitterStrength={4}
        jitterSpeed={2}
        sampleAverage
        className="rounded-xl shadow-lg"
    />
  </div>
));

PixelatedCanvasDemo.displayName = 'PixelatedCanvasDemo';
import React from "react";
import { Cover } from "@/components/ui/cover";

export function CoverDemo() {
  return (
    <div>
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-black bg-gradient-to-b from-neutral-800 via-neutral-700 to-black dark:from-neutral-800 dark:via-white dark:to-white">
       Let’s craft extraordinary websites <Cover>fast and brilliantly designed.</Cover>
      </h1>
    </div>
  );
}

"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "From Numbers to Code",
    description:
      "It all began with a shift in direction — leaving accountancy behind to pursue something more dynamic: computer science. The moment I touched my first algorithm, I realized logic could be creative, and creativity could be logical. That change sparked the journey that defines who I am today.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-500),var(--indigo-600))] text-white text-center text-lg font-semibold p-4">
        From Numbers to Code
      </div>
    ),
  },
  {
    title: "Accelerated Growth",
    description:
      "During my web development program, I went from struggling with basic algorithms to mastering recursion and complexity analysis within two months. Hard work, curiosity, and late-night debugging sessions became my teachers. Every problem solved built confidence, structure, and purpose.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--emerald-500),var(--teal-500))] text-white text-center text-lg font-semibold p-4">
        Accelerated Growth
      </div>
    ),
  },
  {
    title: "Design Meets Engineering",
    description:
      "Now at Positive Studio, I’m an intern designer surrounded by creativity and discipline. My focus is to merge design principles with code — to build interfaces that not only work flawlessly but *feel* right. Aesthetics meet logic, and that’s where I thrive.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--rose-600))] text-white text-center text-lg font-semibold p-4">
        Design Meets Engineering
      </div>
    ),
  },
  {
    title: "Aiming Deeper — Security and Systems",
    description:
      "Beyond design and web, I’m exploring the foundations of computing — memory, networking, and systems. I’m diving into the CCNA program, studying C++, and learning how machines *truly* think. My long-term goal is to become a security engineer who understands both the art and the architecture of technology.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--amber-500),var(--orange-600))] text-white text-center text-lg font-semibold p-4">
        Aiming Deeper — Security and Systems
      </div>
    ),
  },
  {
    title: "Balance and Purpose",
    description:
      "My journey hasn’t been all smooth. Battling burnout and bipolar disorder taught me resilience, balance, and the importance of faith. I now aim to live and work beautifully — building a career rooted in purpose, discipline, and growth in both worlds: this life and the afterlife.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white text-center text-lg font-semibold p-4">
        Balance and Purpose
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}

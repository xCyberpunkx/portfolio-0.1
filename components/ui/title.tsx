import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ProjectTitleProps {
  text: string;
  className?: string;
}

const ProjectTitle: React.FC<ProjectTitleProps> = ({ text, className = "" }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const chars = text.split("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block w-fit", className)}
    >
      {chars.map((char, i) => {
        if (char === " ") return <span key={i}>&nbsp;</span>;

        // Calculate distance from mouse
        const charIndex = i;
        const maxDist = 200;
        const influence = Math.max(0, 1 - Math.sqrt(
          Math.pow(mouse.x - (charIndex * 20 + 10), 2) +
          Math.pow(mouse.y - 20, 2)
        ) / maxDist);

        // Compressa-style distortion: width, weight, italic
        const width = 100 + influence * 50; // 100% → 150%
        const weight = 400 + influence * 500; // normal → extra bold
        const italic = influence * 0.2; // 0 → 0.2 (slight slant)

        return (
          <motion.span
            key={i}
            className="inline-block"
            style={{
              fontVariationSettings: `'wght' ${Math.round(weight)}, 'wdth' ${Math.round(width)}`,
              transform: `skewX(${italic * 10}deg)`,
              display: "inline-block",
            }}
            animate={{
              scale: influence > 0.3 ? 1.05 : 1,
              y: influence > 0.3 ? -2 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {char}
          </motion.span>
        );
      })}
    </div>
  );
};
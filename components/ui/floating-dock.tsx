"use client"

import React, { PropsWithChildren, useRef, useEffect } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
} from "framer-motion"
import { cn } from "@/lib/utils"

// Constants
const DEFAULT_SIZE = 40
const DEFAULT_MAGNIFICATION = 64
const DEFAULT_DISTANCE = 160

// Dock container variants
const dockVariants = cva(
  "supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 " +
  "mx-auto mt-6 flex h-14 md:h-16 w-max items-center justify-center gap-1.5 rounded-2xl border border-neutral-200/40 dark:border-neutral-800/60 " +
  "p-2 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-white/5"
)

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  iconSize?: number
  iconMagnification?: number
  disableMagnification?: boolean
  iconDistance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      disableMagnification = false,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity)
    const isTouchDevice = useRef(false)

    useEffect(() => {
      isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0
    }, [])

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement<DockIconProps>(child) && child.type === DockIcon) {
          return React.cloneElement(child, {
            mouseX: isTouchDevice.current ? undefined : mouseX,
            size: iconSize,
            magnification: iconMagnification,
            disableMagnification: disableMagnification || isTouchDevice.current,
            distance: iconDistance,
          })
        }
        return child
      })
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseX.set(e.clientX)} // ✅ use clientX for horizontal accuracy
        onMouseLeave={() => mouseX.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    )
  }
)

Dock.displayName = "Dock"

// DockIcon props
export interface DockIconProps
  extends Omit<HTMLMotionProps<"a">, "children"> {
  size?: number
  magnification?: number
  disableMagnification?: boolean
  distance?: number
  mouseX?: MotionValue<number>
  className?: string
  children?: React.ReactNode
  href: string
  "aria-label"?: string
}

export const DockIcon = React.forwardRef<HTMLAnchorElement, DockIconProps>(
  (
    {
      size = DEFAULT_SIZE,
      magnification = DEFAULT_MAGNIFICATION,
      disableMagnification = false,
      distance = DEFAULT_DISTANCE,
      mouseX,
      className,
      children,
      href,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const refDiv = useRef<HTMLDivElement>(null)
    const padding = Math.max(6, size * 0.2)
    const defaultMouseX = useMotionValue(Infinity)

    const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
      const bounds = refDiv.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
      return val - bounds.x - bounds.width / 2
    })

    const targetSize = disableMagnification ? size : magnification

    const sizeTransform = useTransform(
      distanceCalc,
      [-distance, 0, distance],
      [size, targetSize, size]
    )

    const scaleSize = useSpring(sizeTransform, {
      mass: 0.1,
      stiffness: 180,
      damping: 10,
    })

    return (
      <motion.a
        ref={ref}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        aria-label={ariaLabel}
        className={cn(
          "flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 ease-out",
          "hover:brightness-110 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
          className
        )}
        style={{
          width: scaleSize,
          height: scaleSize,
          padding,
        }}
        {...props}
      >
        <div
          ref={refDiv}
          className="flex w-full h-full items-center justify-center"
        >
          {children}
        </div>
      </motion.a>
    )
  }
)

DockIcon.displayName = "DockIcon"
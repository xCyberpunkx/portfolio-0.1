"use client";
import React from "react";
import { Tooltip } from "@/components/ui/tooltip-card";

export function TooltipCardDemo() {
  return (
    <div className="mx-auto max-w-2xl p-4 md:p-10">
      <p className="text-base sm:text-lg md:text-xl text-black max-w-2xl mx-auto lg:mx-0 leading-relaxed">
        Software Engineer from Algeria. Passionate about{" "}
        <Tooltip
          containerClassName="text-black"
          content={
            <div className="flex items-center gap-3">
              <img
                src="/images/rust.png"
                alt="Rust logo"
                className="h-10 w-10 rounded-sm"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Rust</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Safe systems and performance.</p>
              </div>
            </div>
          }
        >
          <span className="font-semibold text-gray-800">
            <strong>Rust</strong>
          </span>
        </Tooltip>
        ,{" "}
        <Tooltip
          containerClassName="text-black"
          content={
            <div className="flex items-center gap-3">
              <img
                src="/images/cpp.avif"
                alt="C++ logo"
                className="h-10 w-10 rounded-sm"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">C++</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">High-performance systems and tooling.</p>
              </div>
            </div>
          }
        >
          <span className="font-semibold text-gray-800">
            <strong>C++</strong>
          </span>
        </Tooltip>
        , and secure systems on{" "}
        <Tooltip
          containerClassName="text-black"
          content={
            <div className="flex items-center gap-3">
              <img
                src="/images/tux.png"
                alt="Linux logo"
                className="h-10 w-10 rounded-sm"
              />
              <div>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">Linux</p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">Security-first workflows and kernels.</p>
              </div>
            </div>
          }
        >
          <span className="font-semibold text-gray-800">
            <strong>Linux</strong>
          </span>
        </Tooltip>{" "}
        🐧.
      </p>
    </div>
  );
}

import React from "react";
import Link from "next/link";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  isLink?: boolean;
}

export function BrandMark({ size = "md", isLink = true }: BrandMarkProps) {
  const content = (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Verification Shield with Concentric Lens */}
      <div className="relative flex items-center justify-center">
        <svg
          className={`${
            size === "sm" ? "w-7 h-7" : size === "lg" ? "w-10 h-10" : "w-8 h-8"
          } text-red-800 transition-transform duration-300 group-hover:scale-105`}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield Outline */}
          <path
            d="M16 3L5 7.5V15.5C5 22.4 9.7 28.7 16 30C22.3 28.7 27 22.4 27 15.5V7.5L16 3Z"
            className="fill-red-950 stroke-red-800"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Outer Lens Ring */}
          <circle
            cx="16"
            cy="16"
            r="7.5"
            className="stroke-red-500/80"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          {/* Inner Optical Core */}
          <circle
            cx="16"
            cy="16"
            r="4.5"
            className="fill-red-600/30 stroke-red-400"
            strokeWidth="1.5"
          />
          {/* Focal Precision Point */}
          <circle cx="16" cy="16" r="1.5" className="fill-white" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={`font-semibold tracking-[0.08em] text-slate-950 ${
              size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg"
            }`}
          >
            TRUTH<span className="text-red-700">LENS</span>
          </span>
        </div>
        {size !== "sm" && (
          <span className="text-xs text-slate-500">
            Verify the signal. Understand the risk.
          </span>
        )}
      </div>
    </div>
  );

  if (isLink) {
    return (
      <Link href="/" className="inline-block outline-none focus-visible:ring-2 focus-visible:ring-red-700 rounded-md">
        {content}
      </Link>
    );
  }

  return content;
}

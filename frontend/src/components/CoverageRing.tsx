import React from "react";

interface CoverageRingProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  subLabel?: string;
}

export function CoverageRing({
  value,
  size = 72,
  strokeWidth = 6,
  label,
  subLabel = "Coverage",
}: CoverageRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeValue = Math.max(0, Math.min(100, value));
  const strokeDashoffset = circumference * (1 - safeValue / 100);

  // Dynamic color matching coverage completeness
  const strokeColor =
    safeValue >= 80 ? "#166534" : safeValue >= 50 ? "#92400E" : "#B91C1C";

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || `${subLabel}: ${safeValue}%`}
      >
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Dynamic Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-800 text-xs">
          {safeValue}%
        </div>
      </div>

      {label && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-800">{label}</span>
          <span className="text-[11px] text-slate-500">{subLabel}</span>
        </div>
      )}
    </div>
  );
}

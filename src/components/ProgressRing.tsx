"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number; // 0-100
  completed: number;
  total: number;
  className?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ progress, completed, total, className }) => {
  const radius = 20;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  // Color interpolation: 0 = red (hue 0), 100 = green (hue 120)
  const hue = (progress / 100) * 120;
  const color = `hsl(${hue}, 80%, 45%)`;

  return (
    <div className={cn("absolute top-2 right-2 flex h-12 w-12 items-center justify-center", className)}>
      <svg
        className="h-full w-full transform -rotate-90"
        viewBox="0 0 50 50"
      >
        <circle
          className="text-muted/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx="25"
          cy="25"
        />
        <circle
          className="transition-all duration-300"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={normalizedRadius}
          cx="25"
          cy="25"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-bold leading-none text-foreground">{completed}</span>
        <span className="text-[9px] font-bold leading-none text-muted-foreground">/{total}</span>
      </div>
    </div>
  );
};

export default ProgressRing;

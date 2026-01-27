"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';

interface TimerRingProps {
  timeLeft: number;
  totalTime: number;
  className?: string;
}

const TimerRing: React.FC<TimerRingProps> = ({ timeLeft, totalTime, className }) => {
  const radius = 45;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  
  const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative flex h-28 w-28 items-center justify-center", className)}>
      <svg
        className="h-full w-full transform -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          className="text-muted/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
        <circle
          className="transition-all duration-1000 linear"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="hsl(var(--amber))"
          fill="transparent"
          r={normalizedRadius}
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute flex items-baseline justify-center text-center">
        <span className="text-4xl font-bold text-foreground">{timeLeft}</span>
        <span className="text-xl font-semibold text-muted-foreground">s</span>
      </div>
    </div>
  );
};

export default TimerRing;

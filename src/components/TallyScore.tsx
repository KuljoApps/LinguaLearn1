"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TallyScoreProps {
  score: number;
}

const TallyMark: React.FC<{ index: number; animate: boolean }> = ({ index, animate }) => {
    const x = index * 8;
    return (
        <line
            x1={x}
            y1="0"
            x2={x}
            y2="28"
            strokeWidth="3"
            strokeLinecap="round"
            className={cn(animate ? 'animate-draw-line' : '')}
        />
    );
};

const TallyGroup: React.FC<{ animateLast: boolean }> = ({ animateLast }) => (
    <g>
        {[0, 1, 2, 3].map(i => <TallyMark key={i} index={i} animate={false} />)}
        <line
            x1="-2"
            y1="2"
            x2="30"
            y2="26"
            strokeWidth="3"
            strokeLinecap="round"
            className={cn(animateLast ? 'animate-draw-line' : '')}
        />
    </g>
);

const TallyScore: React.FC<TallyScoreProps> = ({ score }) => {
    const [prevScore, setPrevScore] = useState(score);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (score !== prevScore) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500); // Animation duration
            setPrevScore(score);
            return () => clearTimeout(timer);
        }
    }, [score, prevScore]);

    if (score < 0) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-destructive">{score}</span>
            </div>
        );
    }
    
    if (score === 0) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-muted-foreground">0</span>
            </div>
        );
    }

    const groupsOfFive = Math.floor(score / 5);
    const remainder = score % 5;
    const animateLastMark = isAnimating && score > prevScore;

    return (
        <div className="flex flex-wrap items-center justify-center gap-4">
            {Array.from({ length: groupsOfFive }).map((_, i) => (
                <svg key={i} width="32" height="28" className="stroke-success overflow-visible">
                    <TallyGroup animateLast={animateLastMark && remainder === 0 && i === groupsOfFive - 1} />
                </svg>
            ))}
            {remainder > 0 && (
                <svg width={(remainder) * 8} height="28" className="stroke-success overflow-visible">
                    {Array.from({ length: remainder }).map((_, i) => (
                        <TallyMark key={i} index={i} animate={animateLastMark && i === remainder - 1} />
                    ))}
                </svg>
            )}
        </div>
    );
};

export default TallyScore;

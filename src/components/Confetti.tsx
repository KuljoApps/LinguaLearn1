"use client";

import React from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

interface ConfettiProps {
  onConfettiComplete?: () => void;
}

const Confetti: React.FC<ConfettiProps> = ({ onConfettiComplete }) => {
  const [width, height] = useWindowSize();

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      onConfettiComplete={onConfettiComplete}
    />
  );
};

export default Confetti;

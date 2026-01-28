"use client";

import React from 'react';
import ReactConfetti, { Props as ReactConfettiProps } from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

const Confetti: React.FC<Partial<ReactConfettiProps>> = (props) => {
  const { width, height } = useWindowSize();

  return (
    <ReactConfetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
      {...props}
    />
  );
};

export default Confetti;

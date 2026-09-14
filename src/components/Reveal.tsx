import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';

export interface RevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
  zoomScale?: number;
}

export const LUXURY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  distance = 32,
  amount = 0.2,
  once = true,
  className,
  style,
  zoomScale,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  // Calculate initial transform offsets based on direction
  let initialX = 0;
  let initialY = 0;
  let initialScale = zoomScale !== undefined ? zoomScale : (direction === 'zoom' ? 0.92 : 1);

  switch (direction) {
    case 'up':
      initialY = distance;
      break;
    case 'down':
      initialY = -distance;
      break;
    case 'left':
      initialX = -distance;
      break;
    case 'right':
      initialX = distance;
      break;
    case 'zoom':
      break;
    case 'none':
    default:
      break;
  }

  const transition: Transition = {
    duration,
    delay,
    ease: LUXURY_EASE,
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
        scale: initialScale,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once, amount }}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

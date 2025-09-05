'use client';

import React from 'react';

// Re-export specific named exports from framer-motion
import {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView as motionUseInView,
  useReducedMotion,
  MotionConfig,
  MotionValue
} from 'framer-motion';

// Import LayoutGroup if available, otherwise create a component
let LayoutGroup: React.FC<{id?: string; children?: React.ReactNode}>;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fm = require('framer-motion');
  LayoutGroup = fm.LayoutGroup as typeof LayoutGroup;
} catch {
  LayoutGroup = ({ children }) => React.createElement(React.Fragment, null, children);
}

// Define types for backward compatibility
export type Variants = {
  [key: string]: {
    [cssProperty: string]: string | number | undefined;
  };
};

export type Transition = {
  duration?: number;
  ease?: string | number | (string | number)[];
  delay?: number;
  type?: string;
};

// Re-export useInView hook from react-intersection-observer for consistency
import { useInView } from 'react-intersection-observer';

export {
  motion,
  AnimatePresence,
  useAnimation,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  motionUseInView,
  useReducedMotion,
  MotionConfig,
  LayoutGroup,
  MotionValue,
  useInView
};
'use client';

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
  LayoutGroup,
  Variants,
  Transition,
  MotionValue
} from 'framer-motion';

// Re-export from react-intersection-observer
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
  Variants,
  Transition,
  MotionValue,
  useInView
};
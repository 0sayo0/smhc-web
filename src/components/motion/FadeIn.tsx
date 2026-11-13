"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

// ========================================
// TYPES
// ========================================

type RevealDirection = "up" | "left" | "right" | "none";

interface FadeInProps {
  children: ReactNode;

  className?: string;

  direction?: RevealDirection;

  delay?: number;
  duration?: number;
  distance?: number;

  amount?: number;
  once?: boolean;
}

// ========================================
// MOTION FOUNDATION
// ========================================

const editorialEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ========================================
// COMPONENT
// ========================================

export function FadeIn({
  children,

  className,

  direction = "up",

  delay = 0,
  duration = 0.7,
  distance = 20,

  amount = 0.15,
  once = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  // ========================================
  // DIRECTION
  // ========================================

  const offset = {
    x: direction === "left" ? -distance : direction === "right" ? distance : 0,

    y: direction === "up" ? distance : 0,
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once,
        amount,
        margin: "0px 0px -32px 0px",
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,

        delay: shouldReduceMotion ? 0 : delay,

        ease: editorialEase,
      }}
    >
      {children}
    </motion.div>
  );
}

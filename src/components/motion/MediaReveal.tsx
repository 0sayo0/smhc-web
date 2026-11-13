"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

interface MediaRevealProps {
  children: ReactNode;

  className?: string;

  delay?: number;

  duration?: number;
}

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MediaReveal({
  children,

  className,

  delay = 0.1,

  duration = 1.05,
}: MediaRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0.7,
              scale: 1.035,
            }
      }
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,

        delay: shouldReduceMotion ? 0 : delay,

        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

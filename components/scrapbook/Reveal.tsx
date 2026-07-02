"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The one motion wrapper for the whole site — a calm fade/rise (plus an
 * optional settle into a tilt) as elements scroll into view.
 *
 * Reduced motion is honored via transition timing only (instant reveal),
 * never by branching the rendered markup — a structural branch would
 * mismatch the server-rendered HTML during hydration and leave the
 * content stuck invisible.
 */
export function Reveal({
  delay = 0,
  rotate = 0,
  className = "",
  children,
}: {
  delay?: number;
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: "easeOut" }
      }
    >
      {children}
    </motion.div>
  );
}

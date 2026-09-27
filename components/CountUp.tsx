"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpProps {
  /** Target number to count up to */
  target: number;
  /** Suffix to append after the number (e.g. "+") */
  suffix?: string;
  /** Duration of the count animation in seconds */
  duration?: number;
  /** CSS class names for the wrapper span */
  className?: string;
}

/**
 * Animated counter that counts from 0 to `target` when the element
 * scrolls into view. Uses framer-motion's `animate` for a buttery-smooth
 * spring-driven interpolation and `useInView` to trigger once.
 */
export default function CountUp({
  target,
  suffix = "",
  duration = 2,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1], // custom ease-out expo curve
      onUpdate(latest) {
        setDisplay(Math.round(latest).toString());
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

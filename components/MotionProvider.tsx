"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Automatically disables transform animations for users who prefer reduced motion
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

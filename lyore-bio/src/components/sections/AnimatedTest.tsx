"use client";

import { motion, useReducedMotion } from "motion/react";

/* ============================================================
   AnimatedTest — fade-in + slide-up with stagger
   Supports prefers-reduced-motion (opacity-only)
   ============================================================ */

interface AnimatedTestProps {
    children: React.ReactNode;
    /** Stagger delay in seconds (default 0) */
    delay?: number;
    /** Optional className */
    className?: string;
}

export default function AnimatedTest({
    children,
    delay = 0,
    className,
}: AnimatedTestProps) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            initial={{
                opacity: 0,
                // Only apply translate when motion is allowed
                ...(shouldReduceMotion ? {} : { y: 20 }),
            }}
            animate={{
                opacity: 1,
                ...(shouldReduceMotion ? {} : { y: 0 }),
            }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ============================================================
   StaggerGroup — renders children with staggered delays
   Delays: 0ms, 100ms, 200ms, 300ms…
   ============================================================ */
interface StaggerGroupProps {
    children: React.ReactNode[];
    /** Base delay between children in seconds (default 0.1) */
    staggerDelay?: number;
    /** Optional className for wrapper */
    className?: string;
}

export function StaggerGroup({
    children,
    staggerDelay = 0.1,
    className,
}: StaggerGroupProps) {
    return (
        <div className={className}>
            {children.map((child, i) => (
                <AnimatedTest key={i} delay={i * staggerDelay}>
                    {child}
                </AnimatedTest>
            ))}
        </div>
    );
}

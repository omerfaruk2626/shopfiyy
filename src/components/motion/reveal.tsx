"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { fadeUpVariants, motionTokens, staggerContainer } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";

type RevealProps = {
  className?: string;
  delay?: number;
  children: ReactNode;
};

/**
 * Animasyon JS yüklenemezse veya IO tetiklenmezse içerik görünür kalmalı.
 * initial={false} SSR/hydration'da opacity:0 tuzağını önler; mount sonrası animate çalışır.
 */
export function FadeIn({ className, delay = 0, children }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: motionTokens.distance.sm }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: motionTokens.duration.base,
        ease: motionTokens.ease.out,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ className, delay = 0, children }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: delay },
        },
      }}
    >
      <motion.div variants={fadeUpVariants}>{children}</motion.div>
    </motion.div>
  );
}

export function StaggerChildren({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUpVariants}>
      {children}
    </motion.div>
  );
}

export function TextReveal({
  lines,
  as: Comp = "h1",
  className,
}: {
  lines: string[];
  as?: "h1" | "h2" | "p";
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Comp className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Comp>
    );
  }

  return (
    <Comp className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: motionTokens.duration.reveal,
              ease: motionTokens.ease.out,
              delay: 0.08 + index * 0.08,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
}

export function ScaleReveal({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.2,
          ease: motionTokens.ease.out,
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

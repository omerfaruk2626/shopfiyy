export const motionTokens = {
  ease: {
    out: [0.22, 1, 0.36, 1] as const,
    inOut: [0.65, 0, 0.35, 1] as const,
    emphasized: [0.2, 0.8, 0.2, 1] as const,
  },
  duration: {
    fast: 0.25,
    base: 0.45,
    slow: 0.7,
    reveal: 0.9,
  },
  distance: {
    sm: 12,
    md: 24,
    lg: 40,
  },
} as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: motionTokens.distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.ease.out,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

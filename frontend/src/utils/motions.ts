export const exhale = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const exhaleMotion = (duration: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration },
});

export const topToBottomBounce = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { type: "spring", duration: 0.3 },
};

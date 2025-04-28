export const formatCompactNumber = (value: number): string => {
  if (value >= 1_000_000) {
    const compact = value / 1_000_000;
    return (
      new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
        compact
      ) + "M"
    );
  }
  if (value >= 1_000) {
    const compact = value / 1_000;
    return (
      new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(
        compact
      ) + "k"
    );
  }
  return new Intl.NumberFormat("en-US").format(value);
};

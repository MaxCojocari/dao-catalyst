export const formatCompactNumber = (value: number): string => {
  if (value >= 1_000_000)
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (value >= 1_000)
    return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return value.toString();
};

export const formatWithCommas = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

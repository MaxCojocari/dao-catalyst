export function shortenAddress(address: string, chars = 4): string {
  if (!address || address.length < 2 * chars + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export const truncateText = (text: string, maxLength: number = 200): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
};

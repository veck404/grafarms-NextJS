export const getProductVolumeLabel = (name: string, fallback = "Standard") => {
  const match = name.match(/(\d+)\s*Litres?/i);
  if (match?.[1]) {
    return `${match[1]} Litres`;
  }
  return fallback;
};

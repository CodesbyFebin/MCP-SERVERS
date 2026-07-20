export function computeReadTime(text: string): string {
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
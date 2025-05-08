export function truncText(text: string, length: number) {
  if (!text) return "";
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

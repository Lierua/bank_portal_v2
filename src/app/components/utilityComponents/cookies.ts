export function getOpenedRequests(): number[] {
  if (typeof document === "undefined") return [];

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("openedRequests="));

  if (!match) return [];

  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return [];
  }
}

export function setOpenedRequests(ids: number[]) {
  document.cookie = `openedRequests=${encodeURIComponent(
    JSON.stringify(ids),
  )}; path=/; max-age=31536000`;
}

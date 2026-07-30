const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validates that a string is in YYYY-MM-DD format and represents a real
 * calendar date (rejects things like 2026-02-30).
 */
export function isValidDateString(value: string): boolean {
  if (typeof value !== "string" || !DATE_PATTERN.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Formats a YYYY-MM-DD date string for display, e.g. "July 15, 2026".
 * This should only be used on the article detail page.
 */
export function formatDisplayDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Formats today's date for the header "edition date" display.
 */
export function formatEditionDate(date: Date = new Date()): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

import { formatDistanceToNow, format } from "date-fns";

const DAY = 24 * 60 * 60 * 1000;

/** "5 minutes ago", "2 weeks ago", "3 months ago" - same wording as the original site. */
export function getTimeAgo(value: string | Date | null | undefined): string {
  if (!value) return "";
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return "";

  const days = Math.floor((Date.now() - target.getTime()) / DAY);
  if (days < 7) return formatDistanceToNow(target, { addSuffix: true });
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }
  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
}

/** "Friday, November 20, 2026" */
export function formatLongDate(date: Date = new Date()): string {
  return format(date, "EEEE, MMMM d, yyyy");
}

/** "20/11/2026 04:30 AM" */
export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : format(date, "dd/MM/yyyy hh:mm a");
}

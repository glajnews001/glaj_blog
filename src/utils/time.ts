import { format, formatDistanceToNow } from "date-fns";

export function getTimeAgo(timestamp?: string | Date | null) {
  if (!timestamp) return "";
  const targetDate = new Date(timestamp);
  if (Number.isNaN(targetDate.getTime())) return "";

  const differenceInDays = Math.floor((Date.now() - targetDate.getTime()) / (24 * 60 * 60 * 1000));

  if (differenceInDays < 7) {
    return formatDistanceToNow(targetDate, { addSuffix: true });
  }
  if (differenceInDays < 30) {
    const weeksAgo = Math.floor(differenceInDays / 7);
    return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago`;
  }
  if (differenceInDays < 365) {
    const monthsAgo = Math.floor(differenceInDays / 30);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  }
  const yearsAgo = Math.floor(differenceInDays / 365);
  return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
}

export function formatStamp(timestamp?: string | Date | null) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  return format(date, "dd/MM/yyyy hh:mm a");
}

export function formatLongDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

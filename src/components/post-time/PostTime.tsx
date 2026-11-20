import { getTimeAgo } from "@/utils/time";
import { cn } from "@/utils/cn";

type PostTimeProps = { date: string; className?: string };

/** Relative publish time ("3 hours ago") in the site's yellow caption style. */
export function PostTime({ date, className }: PostTimeProps) {
  return (
    <div className={cn("pb-[0.6rem] text-[0.8rem] text-warning", className)}>{getTimeAgo(date)}</div>
  );
}

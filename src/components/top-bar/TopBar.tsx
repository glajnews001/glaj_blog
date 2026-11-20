import Link from "next/link";
import { NewsSearchBox } from "@/components/news-search-box/NewsSearchBox";
import { SocialLinks } from "@/components/social-links/SocialLinks";
import { formatLongDate } from "@/utils/time";

export function TopBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-brand p-4 text-white max-tablet:px-1.5">
      <div className="hidden items-center gap-2 wide:flex">
        <SocialLinks />
        <span className="ml-2" aria-hidden>
          |
        </span>
        <span className="ml-2">{formatLongDate()}</span>
      </div>
      <NewsSearchBox />
      <Link
        href="/videos"
        className="rounded bg-gold px-4 py-1.5 text-brand no-underline max-narrow:px-3 max-narrow:text-[0.7rem]"
      >
        Video Clip
      </Link>
    </div>
  );
}

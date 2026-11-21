import type { ReactNode } from "react";
import { LatestNewsPanel } from "@/components/latest-news-panel/LatestNewsPanel";
import { TrendingPanel } from "@/components/trending-panel/TrendingPanel";
import type { PostSummary } from "@/models/post.dto";

type HeroSectionProps = {
  latest: PostSummary[];
  trending: PostSummary[];
  /** Centre column: the lead story or the article being read. */
  children: ReactNode;
};

/**
 * Three-column news layout (Latest | lead story | Trending).
 * Desktop: 25/48/25. Tablet: Latest + story side by side, Trending below.
 * Phone: single column - story first, then Latest, then Trending.
 */
export function HeroSection({ latest, trending, children }: HeroSectionProps) {
  return (
    <section className="px-3 pt-6">
      <div className="grid grid-cols-1 gap-2.5 tablet:grid-cols-[40%_minmax(0,1fr)] desktop:grid-cols-[25%_minmax(0,1fr)_25%]">
        <div className="order-2 min-w-0 tablet:order-1">
          <LatestNewsPanel posts={latest} />
        </div>
        <div className="order-1 min-w-0 p-4 tablet:order-2">{children}</div>
        <div className="order-3 min-w-0 tablet:col-span-2 desktop:col-span-1">
          <TrendingPanel posts={trending} />
        </div>
      </div>
    </section>
  );
}

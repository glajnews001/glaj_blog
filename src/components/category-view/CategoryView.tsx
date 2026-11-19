import type { CategoryPayload } from "@/models/page.model";
import { AdSlot } from "@/components/ad-slot/AdSlot";
import { EmptyState } from "@/components/empty-state/EmptyState";
import { FeaturedPost } from "@/components/featured-post/FeaturedPost";
import { LatestNewsList } from "@/components/latest-news-list/LatestNewsList";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { StoryRow } from "@/components/story-row/StoryRow";
import Link from "next/link";

export function CategoryView({ data }: { data: CategoryPayload }) {
  return (
    <SiteShell>
      {data.posts.length === 0 ? (
        <>
          <AdSlot slot="7330142093" />
          <EmptyState title="No News Found" detail="Click the button below to view more news." />
        </>
      ) : (
        <>
          <AdSlot slot="4707848185" />
          <section className="px-3 pt-6">
            <div className="home-hero-grid">
              <LatestNewsList posts={data.latest} />
              <FeaturedPost post={data.featured} />
              <div className="trending-panel">
                <SectionHeading title="Trending News" />
                {data.posts.slice(0, 6).map((post) => (
                  <StoryRow key={post.id} post={post} />
                ))}
              </div>
            </div>
          </section>
          <AdSlot slot="1031993914" tall />
          <section className="mx-auto max-w-[900px] px-4 py-6">
            <SectionHeading title="Videos" />
            {data.videos.map((post) => (
              <StoryRow key={post.id} post={post} excerptLength={300} prominent />
            ))}
          </section>
          <section className="m-4">
            <SectionHeading title={`${data.featured?.category || data.category} News`} />
            <div className="grid grid-cols-1 gap-3 min-[721px]:grid-cols-2 min-[921px]:grid-cols-3">
              {data.posts.slice(0, 100).map((post) => (
                <StoryRow key={post.id} post={post} excerptLength={200} prominent />
              ))}
            </div>
            <Link href="/" className="mt-4 inline-block font-semibold text-[#01017a]">
              Back Home
            </Link>
          </section>
          <AdSlot slot="4089402099" />
        </>
      )}
    </SiteShell>
  );
}

import type { HomePayload } from "@/models/page.model";
import { AdSlot } from "@/components/ad-slot/AdSlot";
import { CategoryBlock } from "@/components/category-block/CategoryBlock";
import { FeaturedPost } from "@/components/featured-post/FeaturedPost";
import { LatestNewsList } from "@/components/latest-news-list/LatestNewsList";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { StoryRow } from "@/components/story-row/StoryRow";

export function HomeView({ data }: { data: HomePayload }) {
  return (
    <SiteShell>
      <AdSlot slot="6701540410" />
      <section className="px-3 pt-6">
        <div className="home-hero-grid">
          <LatestNewsList posts={data.latest} />
          <FeaturedPost post={data.featured} />
          <div className="trending-panel">
            <SectionHeading title="Trending News" />
            {data.trending.map((post) => (
              <StoryRow key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      <AdSlot slot="5196887055" tall />
      <section className="mx-auto max-w-[900px] px-4 py-6">
        <SectionHeading title="Videos" />
        {data.videos.map((post) => (
          <StoryRow key={post.id} post={post} excerptLength={300} prominent />
        ))}
      </section>
      <section className="m-4 grid grid-cols-1 gap-8 min-[721px]:grid-cols-2">
        {data.sections.map((section) => (
          <CategoryBlock key={section.key} title={section.title} href={section.href} posts={section.posts} />
        ))}
      </section>
      <AdSlot slot="2967892118" />
    </SiteShell>
  );
}

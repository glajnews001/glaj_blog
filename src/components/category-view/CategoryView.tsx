import { AdSlot } from "@/components/ad-slot/AdSlot";
import { EmptyState } from "@/components/empty-state/EmptyState";
import { FeaturedPost } from "@/components/featured-post/FeaturedPost";
import { HeroSection } from "@/components/hero-section/HeroSection";
import { PostGrid } from "@/components/post-grid/PostGrid";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { StoryRow } from "@/components/story-row/StoryRow";
import type { CategoryPayload } from "@/models/page.dto";
import { AD_SLOTS } from "@/utils/constants";

type CategoryViewProps = { data: CategoryPayload };

export function CategoryView({ data }: CategoryViewProps) {
  if (data.isEmpty) {
    return (
      <SiteShell>
        <AdSlot slot={AD_SLOTS.categoryEmpty} />
        <EmptyState title="No News Found" />
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <AdSlot slot={AD_SLOTS.categoryTop} />
      <HeroSection latest={data.latest} trending={data.trending}>
        <FeaturedPost post={data.featured} />
      </HeroSection>
      <AdSlot slot={AD_SLOTS.categoryMiddle} tall />

      {data.videos.length > 0 && (
        <section className="mx-auto max-w-[900px] px-4 py-6">
          <SectionHeading title="Videos" />
          {data.videos.map((post) => (
            <StoryRow key={post.id} post={post} variant="prominent" excerptLength={300} />
          ))}
        </section>
      )}

      <PostGrid title={`${data.title} News`} posts={data.posts} />
    </SiteShell>
  );
}

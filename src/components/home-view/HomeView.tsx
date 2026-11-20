import { AdSlot } from "@/components/ad-slot/AdSlot";
import { CategoryBlock } from "@/components/category-block/CategoryBlock";
import { FeaturedPost } from "@/components/featured-post/FeaturedPost";
import { HeroSection } from "@/components/hero-section/HeroSection";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { StoryRow } from "@/components/story-row/StoryRow";
import type { HomePayload } from "@/models/page.dto";
import { AD_SLOTS } from "@/utils/constants";

type HomeViewProps = { data: HomePayload };

export function HomeView({ data }: HomeViewProps) {
  return (
    <SiteShell>
      <AdSlot slot={AD_SLOTS.homeTop} />
      <HeroSection latest={data.latest} trending={data.trending}>
        <FeaturedPost post={data.featured} />
      </HeroSection>
      <AdSlot slot={AD_SLOTS.homeMiddle} tall />

      {data.videos.length > 0 && (
        <section className="mx-auto max-w-[900px] px-4 py-6">
          <SectionHeading title="Videos" />
          {data.videos.map((post) => (
            <StoryRow key={post.id} post={post} variant="prominent" excerptLength={300} />
          ))}
        </section>
      )}

      <section className="m-4 grid grid-cols-1 gap-x-[30px] tablet:grid-cols-2">
        {data.sections.map((section) => (
          <CategoryBlock key={section.key} title={section.title} href={section.href} posts={section.posts} />
        ))}
      </section>
    </SiteShell>
  );
}

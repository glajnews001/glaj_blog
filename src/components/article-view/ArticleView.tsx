import { AdSlot } from "@/components/ad-slot/AdSlot";
import { ArticleBody } from "@/components/article-body/ArticleBody";
import { HeroSection } from "@/components/hero-section/HeroSection";
import { PostGrid } from "@/components/post-grid/PostGrid";
import { ShareBar } from "@/components/share-bar/ShareBar";
import { SiteShell } from "@/components/site-shell/SiteShell";
import type { ArticlePayload } from "@/models/page.dto";
import { AD_SLOTS } from "@/utils/constants";

type ArticleViewProps = { data: ArticlePayload };

export function ArticleView({ data }: ArticleViewProps) {
  const { post } = data;
  const categoryTitle = post.category.replace(/-/g, " ");

  return (
    <SiteShell>
      <HeroSection latest={data.latest} trending={data.trending}>
        <ArticleBody post={post} />
      </HeroSection>
      <ShareBar url={data.shareUrl} title={post.title} imageUrl={post.imageUrl} />
      <PostGrid title={`${categoryTitle} News`} posts={data.related} />
      <AdSlot slot={AD_SLOTS.post} />
    </SiteShell>
  );
}

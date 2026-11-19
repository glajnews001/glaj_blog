import Link from "next/link";
import type { ArticlePayload } from "@/models/page.model";
import { AdSlot } from "@/components/ad-slot/AdSlot";
import { LatestNewsList } from "@/components/latest-news-list/LatestNewsList";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { ShareBar } from "@/components/share-bar/ShareBar";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { StoryRow } from "@/components/story-row/StoryRow";
import { TruncatedHtml } from "@/components/truncated-html/TruncatedHtml";
import { VideoPlayer } from "@/components/video-player/VideoPlayer";
import { getTimeAgo } from "@/utils/time";

export function ArticleView({ data, url }: { data: ArticlePayload; url: string }) {
  const post = data.post;
  if (!post) {
    return (
      <SiteShell>
        <div className="flex h-[50vh] items-center justify-center">Story not found.</div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="px-3 pt-8">
        <div className="home-hero-grid">
          <LatestNewsList posts={data.latest} />
          <article>
            <h1 className="text-[1.5rem] font-bold capitalize">{post.title}</h1>
            <div className="flex items-center justify-between py-4">
              <p className="text-[0.8rem] text-[goldenrod]">{getTimeAgo(post.createdAt)}</p>
              <span className="category-badge bg-[#01017a] px-6 py-3 text-[0.8rem] font-bold uppercase text-white">{post.category}</span>
            </div>
            {post.fileType === "video" ? (
              <div>
                {post.PublishBy ? <p className="pb-4 font-bold text-[#01017a]">Publish by : {post.PublishBy}</p> : null}
                <TruncatedHtml html={post.content} />
                <VideoPlayer videoUrl={post.imageUrl} />
              </div>
            ) : (
              <div>
                <img src={post.imageUrl} alt="" className="mb-4 max-h-[500px] w-full object-cover" />
                {post.PublishBy ? <p className="pb-4 font-bold text-[#01017a]">Publish by : {post.PublishBy}</p> : null}
                <TruncatedHtml html={post.content} />
              </div>
            )}
          </article>
          <div className="trending-panel">
            <SectionHeading title="Trending News" />
            {data.trending.map((item) => (
              <StoryRow key={item.id} post={item} />
            ))}
          </div>
        </div>
        <ShareBar url={url} title={post.title} image={post.imageUrl} />
        <section className="mt-6">
          <SectionHeading title={`${post.category} News`} />
          <div className="grid grid-cols-1 gap-3 min-[721px]:grid-cols-2 min-[921px]:grid-cols-3">
            {data.related.map((item) => (
              <StoryRow key={item.id} post={item} excerptLength={200} prominent />
            ))}
          </div>
          <Link href="/" className="mt-4 inline-block font-semibold text-[#01017a]">
            Back Home
          </Link>
        </section>
      </section>
      <AdSlot slot="8752988689" />
    </SiteShell>
  );
}

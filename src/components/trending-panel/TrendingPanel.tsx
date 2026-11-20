import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { StoryRow } from "@/components/story-row/StoryRow";
import type { PostSummary } from "@/models/post.dto";

type TrendingPanelProps = { posts: PostSummary[] };

export function TrendingPanel({ posts }: TrendingPanelProps) {
  return (
    <div className="p-4">
      <SectionHeading title="Trending News" />
      {posts.map((post) => (
        <StoryRow key={post.id} post={post} variant="compact" />
      ))}
    </div>
  );
}

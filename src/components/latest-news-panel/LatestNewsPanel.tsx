import { HeadlineItem } from "@/components/headline-item/HeadlineItem";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import type { PostSummary } from "@/models/post.dto";

type LatestNewsPanelProps = { posts: PostSummary[] };

export function LatestNewsPanel({ posts }: LatestNewsPanelProps) {
  return (
    <div className="p-[0.3rem]">
      <SectionHeading title="Latest News" />
      {posts.map((post) => (
        <HeadlineItem key={post.id} post={post} />
      ))}
    </div>
  );
}

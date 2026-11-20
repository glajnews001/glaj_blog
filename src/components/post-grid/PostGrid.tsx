import Link from "next/link";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { StoryRow } from "@/components/story-row/StoryRow";
import type { PostSummary } from "@/models/post.dto";

type PostGridProps = { title: string; posts: PostSummary[] };

/** "<Category> News": every story of a category in a 3 / 2 / 1 column grid. */
export function PostGrid({ title, posts }: PostGridProps) {
  return (
    <section className="p-4">
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 gap-2.5 tablet:grid-cols-2 desktop:grid-cols-3">
        {posts.map((post) => (
          <StoryRow key={post.id} post={post} variant="excerpt" excerptLength={200} borderless />
        ))}
      </div>
      <Link href="/" className="mt-4 inline-block">
        Back Home
      </Link>
    </section>
  );
}

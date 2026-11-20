import Link from "next/link";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { StoryRow } from "@/components/story-row/StoryRow";
import type { PostSummary } from "@/models/post.dto";

type CategoryBlockProps = { title: string; href: string; posts: PostSummary[] };

/** A home-page block: heading, up to 12 stories and a "More ..." button. */
export function CategoryBlock({ title, href, posts }: CategoryBlockProps) {
  return (
    <div className="min-w-0 p-4 pb-12">
      <SectionHeading title={title} />
      {posts.map((post) => (
        <StoryRow key={post.id} post={post} variant="excerpt" excerptLength={200} />
      ))}
      <Link
        href={href}
        className="my-4 inline-block rounded-[5px] bg-navy-soft px-4 py-[0.4rem] text-center text-white no-underline hover:bg-navy"
      >
        More ...
      </Link>
    </div>
  );
}

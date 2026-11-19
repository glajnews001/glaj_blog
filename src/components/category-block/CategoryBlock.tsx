import Link from "next/link";
import type { PostView } from "@/models/post.model";
import { SectionHeading } from "@/components/section-heading/SectionHeading";
import { StoryRow } from "@/components/story-row/StoryRow";

export function CategoryBlock({ title, href, posts }: { title: string; href: string; posts: PostView[] }) {
  return (
    <section className="trending-panel mb-8 p-4">
      <SectionHeading title={title} />
      {posts.length === 0 ? <p className="py-3 text-sm text-gray-500">No stories in this section yet.</p> : null}
      {posts.map((post) => (
        <StoryRow key={post.id} post={post} excerptLength={200} prominent />
      ))}
      <Link href={href} className="mt-4 inline-block rounded bg-[#01017a]/80 px-4 py-2 text-white">
        More ...
      </Link>
    </section>
  );
}

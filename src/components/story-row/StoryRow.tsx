import Link from "next/link";
import { PostTime } from "@/components/post-time/PostTime";
import { StoryThumb } from "@/components/story-thumb/StoryThumb";
import type { PostSummary } from "@/models/post.dto";
import { cn } from "@/utils/cn";
import { excerptFromHtml } from "@/utils/html";

type StoryRowProps = {
  post: PostSummary;
  /** "compact": title + time (trending). "excerpt": uppercase title + summary. "prominent": big title + summary. */
  variant?: "compact" | "excerpt" | "prominent";
  excerptLength?: number;
  /** Lay the row out as a bordered card (used in the category grid). */
  borderless?: boolean;
};

const titleClasses = {
  compact: "m-0 pb-4 text-[1.2rem] font-extrabold capitalize",
  excerpt: "m-0 pb-2 text-[1.25rem] font-extrabold uppercase",
  prominent: "m-0 pb-2 text-[1.4rem] font-extrabold uppercase",
};

export function StoryRow({ post, variant = "excerpt", excerptLength = 200, borderless }: StoryRowProps) {
  const showExcerpt = variant !== "compact";
  const prefix = post.fileType === "video" ? "Video : " : "";

  return (
    <Link href={`/posts/${post.id}`} className="block text-navy no-underline">
      <article className={cn("p-2", !borderless && "border-b-[0.1rem] border-navy")}>
        <div className="grid grid-cols-[1fr_30%] gap-3 max-narrow:grid-cols-[1fr_35%]">
          <div className="min-w-0">
            <p className={titleClasses[variant]}>
              {prefix}
              {post.title}
            </p>
            {showExcerpt && post.excerpt && (
              <p className="mb-2 text-base text-black">{excerptFromHtml(post.excerpt, excerptLength)}</p>
            )}
            <PostTime date={post.createdAt} />
          </div>
          <div>
            <StoryThumb post={post} />
          </div>
        </div>
      </article>
    </Link>
  );
}

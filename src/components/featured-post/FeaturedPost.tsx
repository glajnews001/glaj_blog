import Link from "next/link";
import { CategoryBadge } from "@/components/category-badge/CategoryBadge";
import { PostTime } from "@/components/post-time/PostTime";
import { SmartImage } from "@/components/smart-image/SmartImage";
import type { PostSummary } from "@/models/post.dto";

type FeaturedPostProps = { post: PostSummary | null };

/** The large lead story in the centre column. */
export function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) return null;

  return (
    <article>
      <h1 className="text-2xl font-extrabold capitalize">
        <Link href={`/posts/${post.id}`} className="text-inherit no-underline hover:underline">
          {post.title}
        </Link>
      </h1>
      <div className="flex items-center justify-between py-4">
        <PostTime date={post.createdAt} className="pb-0" />
        <CategoryBadge category={post.category} />
      </div>
      <SmartImage
        src={post.imageUrl}
        alt={post.title}
        width={900}
        priority
        className="mb-4 aspect-[16/10] w-full max-h-[500px] object-cover"
      />
      {post.publishBy && <div className="pb-4 font-bold text-navy">Published by : {post.publishBy}</div>}
      <p className="text-base">{post.excerpt}</p>
      <Link href={`/posts/${post.id}`}>Read More ...</Link>
    </article>
  );
}

import Link from "next/link";
import { SmartImage } from "@/components/smart-image/SmartImage";
import type { PostSummary } from "@/models/post.dto";
import { getTimeAgo } from "@/utils/time";

type NewsCardProps = { post: PostSummary };

/** Card used on the search results page. */
export function NewsCard({ post }: NewsCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block text-black no-underline">
      <div className="h-full overflow-hidden rounded-[10px] bg-[#f9f9f9] shadow-[0_0_10px_rgba(0,0,0,0.1)]">
        <SmartImage src={post.imageUrl} alt={post.title} width={500} className="h-[200px] w-full object-cover" />
        <div className="p-5">
          <h3 className="mb-2.5 text-lg font-medium">{post.title}</h3>
          {post.publishBy && <p className="mb-[5px] text-sm text-[#666]">{post.publishBy}</p>}
          <p className="mb-[5px] text-sm text-[#666]">{getTimeAgo(post.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

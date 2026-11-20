import Link from "next/link";
import { CategoryBadge } from "@/components/category-badge/CategoryBadge";
import { PostTime } from "@/components/post-time/PostTime";
import { VideoPlayer } from "@/components/video-player/VideoPlayer";
import type { PostSummary } from "@/models/post.dto";

type VideoClipCardProps = { post: PostSummary };

export function VideoClipCard({ post }: VideoClipCardProps) {
  return (
    <div className="min-w-0">
      <div className="p-4">
        <p className="text-[1.25rem] font-extrabold capitalize">{post.title}</p>
        <div className="flex items-center justify-between py-4">
          <div>
            <PostTime date={post.createdAt} className="pb-0" />
            {post.publishBy && <span className="text-[0.8rem]">{post.publishBy}</span>}
          </div>
          <CategoryBadge category={post.category} />
        </div>
      </div>
      <VideoPlayer src={post.imageUrl} />
      <Link href={`/posts/${post.id}`} className="mt-2 inline-block">
        watch Clip
      </Link>
    </div>
  );
}

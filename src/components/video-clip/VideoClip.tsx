import Link from "next/link";
import type { PostView } from "@/models/post.model";
import { getTimeAgo } from "@/utils/time";
import { VideoPlayer } from "@/components/video-player/VideoPlayer";

export function VideoClip({ post }: { post: PostView }) {
  return (
    <article className="overflow-hidden">
      <h3 className="text-lg font-bold capitalize">{post.title}</h3>
      <div className="flex items-center justify-between py-3">
        <p className="text-[0.8rem] text-[goldenrod]">
          {getTimeAgo(post.createdAt)}
          <br />
          {post.PublishBy}
        </p>
        <span className="category-badge bg-[#01017a] px-5 py-2 text-[0.75rem] font-bold uppercase text-white">{post.category}</span>
      </div>
      <VideoPlayer videoUrl={post.imageUrl} />
      <Link href={`/posts/${post.id}`} className="mt-2 inline-block font-semibold text-[#01017a]">
        watch Clip
      </Link>
    </article>
  );
}

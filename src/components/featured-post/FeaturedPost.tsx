import Link from "next/link";
import type { PostView } from "@/models/post.model";
import { getTimeAgo } from "@/utils/time";
import { TruncatedHtml } from "@/components/truncated-html/TruncatedHtml";

export function FeaturedPost({ post }: { post: PostView | null }) {
  if (!post) {
    return (
      <article className="recentpost px-4 py-8">
        <h2 className="text-2xl font-bold text-[#01017a]">No featured story yet</h2>
        <p className="mt-2 text-gray-600">Publish a trending image story from the admin desk and it will lead this page.</p>
      </article>
    );
  }

  return (
    <article className="px-2">
      <h2 className="text-[1.5rem] font-bold capitalize text-black">{post.title}</h2>
      <div className="flex items-center justify-between py-4">
        <p className="text-[0.8rem] text-[goldenrod]">{getTimeAgo(post.createdAt)}</p>
        <span className="category-badge bg-[#01017a] px-6 py-3 text-center text-[0.8rem] font-bold uppercase text-white">
          {post.category}
        </span>
      </div>
      {post.fileType === "video" ? null : <img src={post.imageUrl} alt="" className="mb-4 max-h-[500px] w-full object-cover" />}
      {post.PublishBy ? <p className="pb-4 font-bold text-[#01017a]">Publish by : {post.PublishBy}</p> : null}
      <TruncatedHtml html={post.content} maxLength={850} />
      <Link href={`/posts/${post.id}`} className="mt-3 inline-block font-semibold text-[#01017a]">
        Read More ...
      </Link>
    </article>
  );
}

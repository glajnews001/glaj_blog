import Link from "next/link";
import type { PostView } from "@/models/post.model";
import { getTimeAgo } from "@/utils/time";

export function LatestNewsList({ posts }: { posts: PostView[] }) {
  return (
    <aside className="latest-panel px-1">
      <h2 className="flex items-center gap-2 text-[1.6rem] font-bold text-[goldenrod]">Latest News</h2>
      <hr className="my-2 border-[#01017a]/40" />
      <div>
        {posts.length === 0 ? <p className="py-3 text-sm text-gray-500">No latest stories yet.</p> : null}
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} className="block border-b border-[#01017a] px-2 py-2 text-[#01017a]">
            <p className="text-[1.1rem] font-bold capitalize">
              {post.fileType === "video" ? "Video : " : ""}
              {post.title}
            </p>
            <p className="text-[0.8rem] text-[goldenrod]">{getTimeAgo(post.createdAt)}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}

import Link from "next/link";
import { PostTime } from "@/components/post-time/PostTime";
import type { PostSummary } from "@/models/post.dto";

type HeadlineItemProps = { post: PostSummary };

/** One line of the "Latest News" list: headline plus time. */
export function HeadlineItem({ post }: HeadlineItemProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block text-navy no-underline">
      <div className="border-b-[0.1rem] border-navy p-2">
        <p className="m-0 pb-1 text-[1.1rem] font-extrabold capitalize">
          {post.fileType === "video" ? "Video : " : ""}
          {post.title}
        </p>
        <PostTime date={post.createdAt} />
      </div>
    </Link>
  );
}

import Link from "next/link";
import type { PostView } from "@/models/post.model";
import { getTimeAgo } from "@/utils/time";
import { PostThumb } from "@/components/post-thumb/PostThumb";
import { TruncatedHtml } from "@/components/truncated-html/TruncatedHtml";

export function StoryRow({
  post,
  excerptLength,
  prominent = false,
}: {
  post: PostView;
  excerptLength?: number;
  prominent?: boolean;
}) {
  const title = `${post.fileType === "video" ? "Video : " : ""}${post.title}`;
  return (
    <Link href={`/posts/${post.id}`} className="block border-b border-[#01017a] px-2 py-2 text-[#01017a]">
      <div className="grid grid-cols-[70%_30%] gap-3">
        <div>
          <p className={prominent ? "text-[1.15rem] font-bold uppercase" : "text-[1.05rem] font-bold capitalize"}>
            {title}
          </p>
          {excerptLength ? <TruncatedHtml html={post.content} maxLength={excerptLength} /> : null}
          <p className="pt-1 text-[0.8rem] text-[goldenrod]">{getTimeAgo(post.createdAt)}</p>
        </div>
        <PostThumb post={post} />
      </div>
    </Link>
  );
}

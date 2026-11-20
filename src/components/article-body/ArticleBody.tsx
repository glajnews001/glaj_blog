import { CategoryBadge } from "@/components/category-badge/CategoryBadge";
import { PostTime } from "@/components/post-time/PostTime";
import { RichContent } from "@/components/rich-content/RichContent";
import { SmartImage } from "@/components/smart-image/SmartImage";
import { VideoPlayer } from "@/components/video-player/VideoPlayer";
import type { PostDetail } from "@/models/post.dto";

type ArticleBodyProps = { post: PostDetail };

/** The article itself: headline, byline row, media and body text. */
export function ArticleBody({ post }: ArticleBodyProps) {
  const text = (
    <div>
      {post.publishBy && <div className="pb-4 font-bold text-navy">Published by : {post.publishBy}</div>}
      <RichContent html={post.content} />
    </div>
  );

  return (
    <article>
      <h1 className="text-2xl font-extrabold capitalize">{post.title}</h1>
      <div className="flex items-center justify-between py-4">
        <PostTime date={post.createdAt} className="pb-0" />
        <CategoryBadge category={post.category} />
      </div>
      {post.fileType === "video" ? (
        <>
          {text}
          <VideoPlayer src={post.imageUrl} />
        </>
      ) : (
        <>
          <SmartImage
            src={post.imageUrl}
            alt={post.title}
            width={1000}
            priority
            className="mb-4 aspect-[16/10] w-full max-h-[600px] object-cover"
          />
          {text}
        </>
      )}
    </article>
  );
}

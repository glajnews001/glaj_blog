import type { PostView } from "@/models/post.model";
import { VideoClip } from "@/components/video-clip/VideoClip";

export function VideoGallerySection({ title, posts }: { title: string; posts: PostView[] }) {
  return (
    <section className="mx-4 my-4 md:mx-8">
      <div className="mb-4 rounded-[10px] bg-[#01017a] px-4 py-4 text-[1.3rem] text-white capitalize">{title}</div>
      {posts.length === 0 ? <p className="text-sm text-gray-500">No clips in this section yet.</p> : null}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {posts.map((post) => (
          <VideoClip key={`${title}-${post.id}`} post={post} />
        ))}
      </div>
    </section>
  );
}

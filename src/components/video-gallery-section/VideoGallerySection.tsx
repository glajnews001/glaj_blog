import { VideoClipCard } from "@/components/video-clip-card/VideoClipCard";
import type { PostSummary } from "@/models/post.dto";

type VideoGallerySectionProps = { title: string; videos: PostSummary[] };

export function VideoGallerySection({ title, videos }: VideoGallerySectionProps) {
  return (
    <section className="mx-4 my-4 tablet:mx-8">
      <h2 className="mb-4 rounded-[10px] bg-navy p-4 text-[1.3rem] font-medium capitalize text-white">{title}</h2>
      <div className="grid grid-cols-1 gap-2.5 tablet:grid-cols-2 desktop:grid-cols-3 wide:grid-cols-4">
        {videos.map((video) => (
          <VideoClipCard key={video.id} post={video} />
        ))}
      </div>
    </section>
  );
}

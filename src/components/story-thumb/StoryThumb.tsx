import { FaVideo } from "react-icons/fa";
import { SmartImage } from "@/components/smart-image/SmartImage";
import type { PostSummary } from "@/models/post.dto";

type StoryThumbProps = { post: PostSummary };

/** Thumbnail for a story row: the photo, or a pulsing video icon for clips. */
export function StoryThumb({ post }: StoryThumbProps) {
  if (post.fileType === "video") {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center text-3xl text-navy">
        <FaVideo className="animate-beat" aria-label="Video" />
      </div>
    );
  }
  return (
    <SmartImage
      src={post.imageUrl}
      alt={post.title}
      width={500}
      className="aspect-[4/3] w-full max-h-[700px] object-cover"
    />
  );
}

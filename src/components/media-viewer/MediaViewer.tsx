import { SmartImage } from "@/components/smart-image/SmartImage";

type MediaViewerProps = { url: string; type: string };

/** Shows a post's image, or a video with native controls. */
export function MediaViewer({ url, type }: MediaViewerProps) {
  if (type === "video") {
    return <video src={url} controls className="max-h-[50vh] w-full bg-black" />;
  }
  return <SmartImage src={url} alt="Post media" width={800} className="aspect-[16/10] max-h-[40vh] w-full object-contain" />;
}

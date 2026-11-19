import type { Metadata } from "next";
import { VideoGalleryView } from "@/components/video-gallery-view/VideoGalleryView";
import { PostController } from "@/controllers/post.controller";
import { pageMetadata } from "@/utils/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Video Clips",
  description: "Watch the latest video news clips from Glaj News.",
  path: "/videos",
  section: "Video",
});

export default async function VideosPage() {
  const data = await PostController.videos();
  return <VideoGalleryView data={data} />;
}

import type { Metadata } from "next";
import { VideoController } from "@/controllers/video.controller";
import { VideoGalleryView } from "@/components/video-gallery-view/VideoGalleryView";

export const revalidate = 60;

export const metadata: Metadata = { title: "Video Clips" };

export default async function VideosPage() {
  const data = await VideoController.getPage();
  return <VideoGalleryView data={data} />;
}

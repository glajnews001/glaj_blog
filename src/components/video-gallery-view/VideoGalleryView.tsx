import type { VideoPayload } from "@/models/page.model";
import { AdSlot } from "@/components/ad-slot/AdSlot";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { VideoGallerySection } from "@/components/video-gallery-section/VideoGallerySection";

export function VideoGalleryView({ data }: { data: VideoPayload }) {
  return (
    <SiteShell>
      <AdSlot slot="6701540410" />
      <VideoGallerySection title="Trending News" posts={data.trending} />
      <VideoGallerySection title="Politics" posts={data.politics} />
      <AdSlot slot="5196887055" />
      <VideoGallerySection title="Sport" posts={data.sport} />
      <AdSlot slot="2967892118" />
      <VideoGallerySection title="Entertainment" posts={data.entertainment} />
      <AdSlot slot="8752988689" />
      <VideoGallerySection title="Business" posts={data.business} />
    </SiteShell>
  );
}

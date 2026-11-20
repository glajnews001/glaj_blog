import { Fragment } from "react";
import { AdSlot } from "@/components/ad-slot/AdSlot";
import { EmptyState } from "@/components/empty-state/EmptyState";
import { SiteShell } from "@/components/site-shell/SiteShell";
import { VideoGallerySection } from "@/components/video-gallery-section/VideoGallerySection";
import type { VideoGalleryPayload } from "@/models/page.dto";

type VideoGalleryViewProps = { data: VideoGalleryPayload };

export function VideoGalleryView({ data }: VideoGalleryViewProps) {
  return (
    <SiteShell>
      <AdSlot />
      {data.isEmpty ? (
        <EmptyState title="No Videos Yet" message="Check back soon for new video clips." />
      ) : (
        data.sections.map((section, index) => (
          <Fragment key={section.key}>
            <VideoGallerySection title={section.title} videos={section.videos} />
            {index > 0 && <AdSlot />}
          </Fragment>
        ))
      )}
    </SiteShell>
  );
}

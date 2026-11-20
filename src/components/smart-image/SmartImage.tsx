"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { optimizeImageUrl } from "@/utils/media";

type SmartImageProps = {
  src: string | null | undefined;
  alt?: string;
  /** Target display width, used for Cloudinary delivery transforms. */
  width?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Plain <img> with a branded placeholder. If the file is missing, blocked or
 * unreachable the box keeps its size instead of collapsing or showing a broken icon.
 */
export function SmartImage({ src, alt = "", width = 800, className, priority }: SmartImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates, in which case onError never fires.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0 && src) setFailedSrc(src);
  }, [src]);

  if (!src || failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt || "Image unavailable"}
        className={cn("flex items-center justify-center overflow-hidden bg-[#e9ecef]", className)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/image/logo1.png" alt="" className="max-h-[60%] w-auto max-w-[60%] object-contain opacity-30" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={optimizeImageUrl(src, width)}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(src)}
      className={className}
    />
  );
}

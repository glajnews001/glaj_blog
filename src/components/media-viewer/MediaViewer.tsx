"use client";

export function MediaViewer({ mediaUrl, mediaType }: { mediaUrl?: string; mediaType?: string }) {
  if (!mediaUrl) return null;
  if (mediaType === "image") {
    return <img src={mediaUrl} alt="" className="max-h-[40vh] w-full object-contain" />;
  }
  return <video src={mediaUrl} controls className="max-h-[40vh] w-full bg-black" />;
}

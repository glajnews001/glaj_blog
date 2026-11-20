"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/button/Button";
import { cn } from "@/utils/cn";

type VideoPlayerProps = { src: string; className?: string };

/** Video with a simple Play / Pause button, no download option and no right-click menu. */
export function VideoPlayer({ src, className }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <div className={cn("w-full", className)}>
      <Button variant="navy" small onClick={toggle} className="mb-2">
        {playing ? "Pause" : "Play"}
      </Button>
      <video
        ref={ref}
        src={src}
        controls={false}
        controlsList="nodownload"
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onContextMenu={(event) => event.preventDefault()}
        className="max-h-[500px] w-full bg-black"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

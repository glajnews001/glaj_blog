"use client";

import { useState } from "react";

export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="mb-2 rounded bg-black px-4 py-1 text-white"
        onClick={(event) => {
          const video = event.currentTarget.parentElement?.querySelector("video");
          if (!video) return;
          if (video.paused) {
            void video.play();
            setPlaying(true);
          } else {
            video.pause();
            setPlaying(false);
          }
        }}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <video
        className="max-h-[500px] w-full bg-black"
        controls={false}
        controlsList="nodownload"
        onContextMenu={(event) => event.preventDefault()}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

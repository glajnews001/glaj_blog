"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/utils/constants";
import { cn } from "@/utils/cn";

type AdSlotProps = {
  slot?: string;
  /** The wide banner variant (950px, taller). */
  tall?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const SCRIPT_ID = "adsense-script";

/** Google AdSense unit. Loads the AdSense script once and pushes this slot. */
export function AdSlot({ slot, tall }: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adClient}`;
      document.head.appendChild(script);
    }
    if (!pushed.current) {
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense can throw when blocked; the page must keep working.
      }
    }
  }, []);

  return (
    <div
      className={cn(
        "mx-4 my-4 overflow-hidden bg-ad min-[850px]:mx-auto",
        tall ? "h-[50vh] max-w-[950px]" : "h-[30vh] max-w-[800px]",
      )}
    >
      <ins
        className="adsbygoogle block h-full w-full"
        style={{ display: "block" }}
        data-ad-client={SITE.adClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

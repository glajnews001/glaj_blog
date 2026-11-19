"use client";

import { useEffect, useRef } from "react";
import { AD_CLIENT } from "@/utils/constants";

type AdsWindow = Window & { adsbygoogle?: unknown[] };

export function AdSlot({ slot, tall = false }: { slot: string; tall?: boolean }) {
  const filled = useRef(false);

  useEffect(() => {
    if (filled.current) return;
    filled.current = true;
    try {
      const ads = (window as AdsWindow).adsbygoogle || [];
      (window as AdsWindow).adsbygoogle = ads;
      ads.push({});
    } catch {
      filled.current = false;
    }
  }, []);

  return (
    <div className={`mx-auto my-4 overflow-hidden bg-[#f0f8ff] ${tall ? "h-[50vh] max-w-[950px]" : "h-[30vh] max-w-[800px]"}`}>
      <ins
        className="adsbygoogle block h-full w-full"
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { SOCIAL_LINKS } from "@/utils/constants";
import { formatLongDate } from "@/utils/time";

export function TopBar() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event?: FormEvent) => {
    event?.preventDefault();
    const term = searchText.trim();
    if (!term) return;
    router.push(`/news/${encodeURIComponent(term)}`);
  };

  return (
    <div className="flex items-center justify-between gap-3 bg-[#002e5f] px-4 py-4 text-white max-[480px]:px-1">
      <div className="hidden items-center gap-2 min-[1341px]:flex">
        <div className="flex items-center gap-2 text-white">
          <a href={SOCIAL_LINKS.facebook} className="text-xl text-white" aria-label="Facebook">
            <TiSocialFacebook />
          </a>
          <a href={SOCIAL_LINKS.x} aria-label="X">
            <img src="/image/x.svg" alt="" className="h-3.5 w-3.5" />
          </a>
          <a href={SOCIAL_LINKS.instagram} className="text-xl text-white" aria-label="Instagram">
            <TiSocialInstagram />
          </a>
          <a href={SOCIAL_LINKS.linkedin} className="text-xl text-white" aria-label="LinkedIn">
            <TiSocialLinkedin />
          </a>
        </div>
        <span className="mx-2">|</span>
        <span>{formatLongDate()}</span>
      </div>
      <form onSubmit={handleSearch} className="relative min-w-0 flex-1 min-[1341px]:flex-none">
        <input
          type="text"
          placeholder="New Search"
          value={searchText}
          maxLength={30}
          onChange={(event) => setSearchText(event.target.value)}
          className="w-full rounded border border-white/30 bg-white px-3 py-2 pr-20 text-base text-black outline-none min-[481px]:w-[300px]"
        />
        <button type="submit" className="absolute top-0 right-0 bottom-0 rounded-l-[10px] bg-[goldenrod] px-3 text-[0.8rem] text-white">
          Search
        </button>
      </form>
      <button
        type="button"
        onClick={() => router.push("/videos")}
        className="shrink-0 rounded bg-[goldenrod] px-4 py-2 text-sm font-semibold text-[#002e5f] max-[480px]:text-[0.7rem]"
      >
        Video Clip
      </button>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function NewsSearchBox() {
  const router = useRouter();
  const [term, setTerm] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = term.trim();
    if (value) router.push(`/news/${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={submit} role="search" className="relative min-w-0 flex-1 max-narrow:basis-full tablet:max-w-[300px]">
      <input
        type="text"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="New Search"
        maxLength={30}
        aria-label="Search news"
        className="w-full rounded-[3px] border-0 bg-white py-1 pl-2 pr-[4.5rem] text-base text-[#212529] outline-none"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 rounded-l-[10px] bg-gold px-3 text-[0.8rem] text-white"
      >
        Search
      </button>
    </form>
  );
}

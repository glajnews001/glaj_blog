"use client";

import { useRouter } from "next/navigation";

export function EmptyState({ title, detail }: { title: string; detail: string }) {
  const router = useRouter();
  return (
    <div className="mx-auto my-5 max-w-md rounded border border-[#ccc] bg-[#f5f5f5] p-5 text-center">
      <h2 className="text-xl text-[#333]">{title}</h2>
      <p className="my-3 text-[#666]">{detail}</p>
      <button type="button" onClick={() => router.push("/")} className="rounded bg-[#007bff] px-5 py-2 text-white hover:bg-[#0056b3]">
        View More News
      </button>
    </div>
  );
}

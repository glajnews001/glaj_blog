"use client";

import { useRouter } from "next/navigation";

export function AdminList({
  title,
  count,
  countLabel,
  search,
  onSearch,
  placeholder,
  children,
}: {
  title: string;
  count: number;
  countLabel: string;
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <section className="m-4 rounded bg-white p-6 text-[#1e1e26]">
      <h1 className="mb-4 text-[1.4rem] font-semibold text-[#01017a]">{title}</h1>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => router.push("/auth/dashboard/admin")} className="rounded-[10px] bg-[#01017a] px-4 py-2 font-bold text-white">
          Back
        </button>
        <button type="button" className="rounded-[10px] bg-[#01017a] px-4 py-2 font-bold text-white">
          {count} {countLabel}
        </button>
        <input
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded border border-gray-300 px-3 py-2 sm:w-64"
        />
      </div>
      <div className="overflow-x-auto">{children}</div>
    </section>
  );
}

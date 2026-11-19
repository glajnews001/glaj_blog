"use client";

import { BsFillBellFill, BsFillEnvelopeFill, BsJustify, BsPersonCircle } from "react-icons/bs";

export function AdminHeader({ onToggle }: { onToggle: () => void }) {
  return (
    <header className="flex h-[60px] items-center justify-between bg-[#1d2634] px-6 text-white shadow-[0_6px_7px_-3px_rgba(0,0,0,0.35)] lg:col-start-2">
      <button type="button" className="text-2xl lg:hidden" onClick={onToggle} aria-label="Open menu">
        <BsJustify />
      </button>
      <div className="ml-auto flex items-center gap-4 text-xl">
        <BsFillBellFill />
        <BsFillEnvelopeFill />
        <BsPersonCircle />
      </div>
    </header>
  );
}

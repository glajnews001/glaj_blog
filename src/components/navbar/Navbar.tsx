"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { CATEGORIES } from "@/utils/constants";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const category = typeof params.category === "string" ? params.category : undefined;

  const itemClass = (active: boolean) =>
    `block px-4 py-2 text-[0.9rem] font-bold uppercase no-underline max-[1340px]:w-full max-[1340px]:border-b max-[1340px]:border-white max-[1340px]:px-4 max-[1340px]:py-5 max-[1340px]:text-left max-[1340px]:text-white ${
      active ? "text-[goldenrod]" : "text-black hover:text-[#e80707]"
    }`;

  return (
    <nav className="relative flex h-[100px] items-center justify-between bg-white text-[15px] font-bold uppercase shadow-[0_10px_10px_-10px_rgba(33,35,38,0.1)]">
      <Link href="/" className="ml-8 shrink-0" onClick={() => setOpen(false)}>
        <img src="/image/logo.svg" alt="Glaj News" className="h-28" />
      </Link>
      <button type="button" className="absolute top-7 right-6 hidden text-3xl max-[1340px]:block" onClick={() => setOpen((value) => !value)} aria-label="Menu">
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
      <ul
        className={`m-0 flex list-none items-center justify-end gap-1 p-0 max-[1340px]:absolute max-[1340px]:top-[100px] max-[1340px]:left-0 max-[1340px]:z-20 max-[1340px]:w-full max-[1340px]:flex-col max-[1340px]:bg-[#002e5f] max-[1340px]:transition-all ${
          open ? "max-[1340px]:flex" : "max-[1340px]:hidden"
        }`}
      >
        <li>
          <Link href="/" className={itemClass(pathname === "/")} onClick={() => setOpen(false)}>
            Home
          </Link>
        </li>
        {CATEGORIES.map((item) => (
          <li key={item.key}>
            <Link href={item.href} className={itemClass(category === item.key)} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

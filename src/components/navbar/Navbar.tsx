"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "@/assets/logo.png";
import { NAV_CATEGORIES } from "@/utils/constants";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeCategory = pathname.startsWith("/category/") ? pathname.split("/")[2] : undefined;
  const isHome = pathname === "/";
  const close = () => setOpen(false);

  const linkClass = (active: boolean) =>
    cn(
      "block px-4 py-2 text-[0.9rem] no-underline transition-colors",
      "max-wide:w-full max-wide:border-b max-wide:border-white max-wide:py-[1.4rem] max-wide:text-start",
      active ? "text-gold" : "text-black max-wide:text-white hover:text-danger",
    );

  return (
    <nav
      aria-label="Main"
      className="relative z-10 flex h-[100px] w-full items-center justify-between bg-white text-[15px] font-bold uppercase shadow-[rgba(33,35,38,0.1)_0_10px_10px_-10px]"
    >
      <Link href="/" onClick={close} className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo.src} alt="Glaj News" className="ml-4 h-24 w-auto wide:ml-8" />
      </Link>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="mr-4 text-[1.8rem] text-black wide:hidden"
      >
        {open ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      <ul
        className={cn(
          "m-0 list-none p-0 text-center",
          "wide:mr-4 wide:grid wide:grid-flow-col wide:gap-[5px]",
          "max-wide:absolute max-wide:left-0 max-wide:top-full max-wide:flex max-wide:max-h-[calc(100vh-100px)] max-wide:w-full max-wide:flex-col max-wide:overflow-y-auto max-wide:bg-brand max-wide:transition-transform max-wide:duration-500",
          open ? "max-wide:translate-x-0" : "max-wide:-translate-x-full max-wide:invisible",
        )}
      >
        <li className="flex items-center">
          <Link href="/" onClick={close} className={linkClass(isHome)}>
            Home
          </Link>
        </li>
        {NAV_CATEGORIES.map((category) => (
          <li key={category.slug} className="flex items-center">
            <Link
              href={`/category/${category.slug}`}
              onClick={close}
              className={linkClass(activeCategory === category.slug)}
            >
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

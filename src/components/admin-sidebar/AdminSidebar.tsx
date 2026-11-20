"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BsChatDotsFill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsGrid1X2Fill,
  BsListCheck,
  BsPeopleFill,
} from "react-icons/bs";
import { cn } from "@/utils/cn";

const items = [
  { href: "/auth/dashboard/admin", label: "Dashboard", icon: BsGrid1X2Fill },
  { href: "/auth/dashboard/create/post", label: "Create Post", icon: BsFillArchiveFill },
  { href: "/auth/dashboard/viewpost", label: "View Post", icon: BsFillGrid3X3GapFill },
  { href: "/auth/dashboard/viewuser", label: "Users", icon: BsPeopleFill },
  { href: "/auth/dashboard/support", label: "Support", icon: BsChatDotsFill },
  { href: "/auth/logout", label: "Logout", icon: BsListCheck },
];

type AdminSidebarProps = { open: boolean; onClose: () => void };

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/50 min-[993px]:hidden"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-sidebar transition-transform duration-500",
          "min-[993px]:sticky min-[993px]:top-0 min-[993px]:h-screen min-[993px]:w-[20%] min-[993px]:min-w-[230px] min-[993px]:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-[30px] flex items-center justify-between px-[30px] pt-[15px]">
          <div className="mt-[15px] flex gap-2.5 text-xl font-bold text-white">Glajnews Admin</div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-4 mt-2.5 cursor-pointer text-red-500 min-[993px]:hidden"
          >
            X
          </button>
        </div>
        <ul className="m-0 list-none p-0">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href} className={cn("hover:bg-white/20", active && "bg-white/10")}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center p-5 text-lg no-underline",
                    active ? "text-white" : "text-sidebar-text",
                  )}
                >
                  <Icon className="mr-2 text-xl" aria-hidden /> {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}

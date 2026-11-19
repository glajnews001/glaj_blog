"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsListCheck, BsPeopleFill } from "react-icons/bs";

const links = [
  { href: "/auth/dashboard/admin", label: "Dashboard", icon: BsGrid1X2Fill },
  { href: "/auth/dashboard/create/post", label: "Create Post", icon: BsFillArchiveFill },
  { href: "/auth/dashboard/viewpost", label: "View Post", icon: BsFillGrid3X3GapFill },
  { href: "/auth/dashboard/viewuser", label: "Users", icon: BsPeopleFill },
  { href: "/auth/dashboard/support", label: "Support", icon: BsPeopleFill },
  { href: "/auth/logout", label: "Logout", icon: BsListCheck },
];

export function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`${open ? "absolute z-30 block" : "hidden"} h-full min-h-screen w-[260px] overflow-y-auto bg-[#263043] text-white lg:static lg:col-start-1 lg:row-span-2 lg:block`}>
      <div className="mb-6 flex items-center justify-between px-6 pt-5">
        <p className="text-xl font-bold">Glajnews Admin</p>
        <button type="button" className="text-red-500 lg:hidden" onClick={onClose}>
          X
        </button>
      </div>
      <ul>
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className={`flex items-center gap-3 px-5 py-5 text-lg ${active ? "bg-white/10 text-white" : "text-[#9e9ea4]"} hover:bg-white/20`}>
                <Icon />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

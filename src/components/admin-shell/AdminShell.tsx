"use client";

import { useState, type ReactNode } from "react";
import { AdminHeader } from "@/components/admin-header/AdminHeader";
import { AdminSidebar } from "@/components/admin-sidebar/AdminSidebar";

type AdminShellProps = { userName: string; children: ReactNode };

/** Back-office frame: sidebar (slide-over on small screens), header and content. */
export function AdminShell({ userName, children }: AdminShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader userName={userName} onMenu={() => setOpen(true)} />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

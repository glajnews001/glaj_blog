"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/admin-header/AdminHeader";
import { AdminSidebar } from "@/components/admin-sidebar/AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1d2634] text-white lg:grid lg:grid-cols-[260px_1fr] lg:grid-rows-[60px_1fr]">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <AdminHeader onToggle={() => setOpen((value) => !value)} />
      <div className="min-h-[calc(100vh-60px)] overflow-y-auto lg:col-start-2">{children}</div>
    </div>
  );
}

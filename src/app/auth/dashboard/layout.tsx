import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin-shell/AdminShell";
import { AuthController } from "@/controllers/auth.controller";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | Glaj News Admin" },
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await AuthController.requireAdminPage();
  return <AdminShell userName={session.name}>{children}</AdminShell>;
}

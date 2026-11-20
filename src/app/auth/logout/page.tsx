import type { Metadata } from "next";
import { LogoutRunner } from "@/components/logout-runner/LogoutRunner";

export const metadata: Metadata = { title: "Signing out", robots: { index: false } };

export default function LogoutPage() {
  return <LogoutRunner />;
}

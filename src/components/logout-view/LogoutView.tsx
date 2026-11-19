"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LogoutView() {
  const router = useRouter();

  useEffect(() => {
    const leave = async () => {
      await fetch("/api/auth/logout", { method: "POST" });
      router.replace("/auth/login");
      router.refresh();
    };
    void leave();
  }, [router]);

  return <div className="grid min-h-screen place-items-center bg-[#111]">Signing out...</div>;
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/button/Button";
import { callApi } from "@/utils/api";

type UserStatusButtonProps = { userId: string; active: boolean };

/** Lets a super admin approve / suspend an account. */
export function UserStatusButton({ userId, active }: UserStatusButtonProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    setBusy(true);
    try {
      await callApi(`/api/users/${userId}`, { method: "PATCH", body: { active: !active } });
      router.refresh();
    } catch (error) {
      window.alert((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant={active ? "secondary" : "success"} small onClick={toggle} loading={busy} loadingText="...">
      {active ? "Suspend" : "Activate"}
    </Button>
  );
}

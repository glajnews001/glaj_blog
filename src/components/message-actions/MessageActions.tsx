"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/button/Button";
import { callApi } from "@/utils/api";

type MessageActionsProps = { messageId: string; isSeen: boolean };

export function MessageActions({ messageId, isSeen }: MessageActionsProps) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const run = async (method: "PATCH" | "DELETE") => {
    if (method === "DELETE" && !window.confirm("Are you sure you want to delete this message?")) return;
    setBusy(true);
    try {
      await callApi(`/api/messages/${messageId}`, { method, body: method === "PATCH" ? {} : undefined });
      router.refresh();
    } catch (error) {
      window.alert((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex gap-1.5">
      {!isSeen && (
        <Button variant="navy" small disabled={busy} onClick={() => run("PATCH")}>
          Mark read
        </Button>
      )}
      <Button variant="danger" small disabled={busy} onClick={() => run("DELETE")}>
        Delete
      </Button>
    </div>
  );
}

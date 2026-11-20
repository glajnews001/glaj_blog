"use client";

import { useEffect } from "react";
import { callApi } from "@/utils/api";

/** Signs the user out as soon as it mounts, then goes back to the login page. */
export function LogoutRunner() {
  useEffect(() => {
    callApi("/api/auth/logout", { method: "POST", body: {} })
      .catch(() => undefined)
      .finally(() => window.location.replace("/auth/login"));
  }, []);

  return <p className="p-8 text-center">Signing out...</p>;
}

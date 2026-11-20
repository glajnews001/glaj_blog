"use client";

import { Button } from "@/components/button/Button";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-[#666]">We could not load this page. Please try again.</p>
      <Button variant="navy" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}

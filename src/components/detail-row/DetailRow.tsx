import type { ReactNode } from "react";

type DetailRowProps = { label: string; children: ReactNode };

/** Label / value pair used in the post detail modal. */
export function DetailRow({ label, children }: DetailRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-pink py-4 text-start tablet:grid-cols-[40%_60%]">
      <div className="font-bold">{label}</div>
      <div className="min-w-0 overflow-auto">{children}</div>
    </div>
  );
}

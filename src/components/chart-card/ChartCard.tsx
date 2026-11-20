import type { ReactNode } from "react";

type ChartCardProps = { title: string; children: ReactNode };

export function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="min-w-0 rounded-[5px] border border-[#dee2e6] bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-[#272838]">{title}</h3>
      <div className="h-[300px] w-full">{children}</div>
    </div>
  );
}

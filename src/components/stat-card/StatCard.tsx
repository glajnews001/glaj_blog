import type { IconType } from "react-icons";

type StatCardProps = { label: string; value: number; icon: IconType; color: string };

export function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <div className="flex flex-col justify-around rounded-[5px] px-4 py-8 text-white/95" style={{ backgroundColor: color }}>
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-base font-medium uppercase">{label}</h3>
        <Icon className="text-[25px]" aria-hidden />
      </div>
      <p className="mb-0 mt-2 text-[2.5rem] font-medium leading-tight">{value.toLocaleString()}</p>
    </div>
  );
}

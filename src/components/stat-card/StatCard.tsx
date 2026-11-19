import type { IconType } from "react-icons";

export function StatCard({ label, value, icon: Icon, tone }: { label: string; value: number; icon: IconType; tone: string }) {
  return (
    <article className={`flex flex-col justify-between rounded p-6 text-white ${tone}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide">{label}</h3>
        <Icon className="text-2xl" />
      </div>
      <p className="mt-6 text-4xl font-semibold">{value}</p>
    </article>
  );
}

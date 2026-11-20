type ProgressBarProps = { value: number };

export function ProgressBar({ value }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, value));
  return (
    <div
      className="h-4 w-full overflow-hidden rounded bg-[#e9ecef] text-xs"
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="flex h-full items-center justify-center bg-[#0d6efd] text-white transition-[width]"
        style={{ width: `${percent}%` }}
      >
        {percent.toFixed(0)}%
      </div>
    </div>
  );
}

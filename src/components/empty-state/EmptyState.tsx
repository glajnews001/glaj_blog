import Link from "next/link";

type EmptyStateProps = {
  title: string;
  message?: string;
  actionLabel?: string;
  href?: string;
};

export function EmptyState({
  title,
  message = "Click the button below to view more news.",
  actionLabel = "View More News",
  href = "/",
}: EmptyStateProps) {
  return (
    <div className="mx-auto my-5 max-w-[400px] rounded-[5px] border border-[#ccc] bg-[#f5f5f5] p-5 text-center">
      <h2 className="text-[1.5rem] text-[#333]">{title}</h2>
      <p className="text-[#666]">{message}</p>
      <Link
        href={href}
        className="inline-block rounded-[5px] bg-[#007bff] px-5 py-2.5 text-white no-underline transition-colors hover:bg-[#0056b3]"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

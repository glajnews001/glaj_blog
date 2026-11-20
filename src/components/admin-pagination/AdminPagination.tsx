import Link from "next/link";
import { cn } from "@/utils/cn";

type AdminPaginationProps = {
  basePath: string;
  page: number;
  pageCount: number;
  query?: string;
};

function hrefFor(basePath: string, page: number, query?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (query) params.set("q", query);
  const search = params.toString();
  return search ? `${basePath}?${search}` : basePath;
}

/** Prev / numbered / Next links driven by the URL, so pagination is server-side. */
export function AdminPagination({ basePath, page, pageCount, query }: AdminPaginationProps) {
  if (pageCount <= 1) return null;

  const windowSize = 10;
  const start = Math.max(1, Math.min(page - Math.floor(windowSize / 2), pageCount - windowSize + 1));
  const numbers = Array.from({ length: Math.min(windowSize, pageCount) }, (_, i) => start + i);
  const item = "px-[0.7rem] py-[0.2rem] text-[1.1rem] no-underline text-navy";

  return (
    <nav aria-label="Pagination" className="mt-4">
      <ul className="m-0 flex list-none flex-wrap items-center p-0">
        <li>
          {page > 1 ? (
            <Link href={hrefFor(basePath, page - 1, query)} className={item}>
              Prev
            </Link>
          ) : (
            <span className={cn(item, "opacity-40")}>Prev</span>
          )}
        </li>
        {numbers.map((n) => (
          <li key={n}>
            <Link
              href={hrefFor(basePath, n, query)}
              aria-current={n === page ? "page" : undefined}
              className={cn(item, n === page && "text-[1.3rem] font-extrabold !text-pink")}
            >
              {n}
            </Link>
          </li>
        ))}
        <li>
          {page < pageCount ? (
            <Link href={hrefFor(basePath, page + 1, query)} className={item}>
              Next
            </Link>
          ) : (
            <span className={cn(item, "opacity-40")}>Next</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

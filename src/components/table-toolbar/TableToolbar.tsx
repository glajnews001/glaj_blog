import Link from "next/link";

type TableToolbarProps = {
  countLabel: string;
  query: string;
  placeholder?: string;
};

const pill =
  "rounded-[10px] bg-navy px-4 py-[0.4rem] font-bold capitalize text-white no-underline hover:bg-navy-deep";

/** Back button, record count and a search box (plain GET form, so it works without JavaScript). */
export function TableToolbar({ countLabel, query, placeholder = "Search" }: TableToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      <Link href="/auth/dashboard/admin" className={pill}>
        Back
      </Link>
      <span className={pill}>{countLabel}</span>
      <form role="search" className="flex w-full min-w-0 flex-1 gap-2 tablet:max-w-[25rem]">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder={placeholder}
          aria-label={placeholder}
          className="min-w-0 flex-1 rounded-md border border-[#ced4da] px-3 py-1.5"
        />
        <button type="submit" className={pill}>
          Search
        </button>
      </form>
    </div>
  );
}

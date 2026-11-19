export function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (page: number) => void }) {
  const numbers = Array.from({ length: pages }, (_, index) => index + 1).slice(0, 10);
  return (
    <nav className="mt-4">
      <ul className="flex list-none flex-wrap gap-1 p-0 text-[#1e1e26]">
        <li>
          <button type="button" className="px-3 py-1" onClick={() => onPage(Math.max(1, page - 1))}>
            Prev
          </button>
        </li>
        {numbers.map((number) => (
          <li key={number}>
            <button type="button" className={`px-3 py-1 ${page === number ? "font-bold text-[#ed1864]" : ""}`} onClick={() => onPage(number)}>
              {number}
            </button>
          </li>
        ))}
        <li>
          <button type="button" className="px-3 py-1" onClick={() => onPage(Math.min(pages, page + 1))}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

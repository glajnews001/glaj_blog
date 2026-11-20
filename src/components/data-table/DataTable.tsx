import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T, index: number) => ReactNode;
  /** Hide this column on phones to keep the table readable. */
  hideOnMobile?: boolean;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  /** Number of the first row, so S/N continues across pages. */
  startIndex?: number;
  rowKey: (row: T) => string;
  emptyText?: string;
};

export function DataTable<T>({ columns, rows, startIndex = 0, rowKey, emptyText = "No Data Found" }: DataTableProps<T>) {
  return (
    <div className="mt-4 overflow-x-auto rounded border border-[#dee2e6]">
      <table className="w-full border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "sticky top-0 z-[1] whitespace-nowrap border-b-2 border-[#eb9486] bg-[#f9f8f8] p-3 text-[0.8375rem] font-bold text-[#272838]",
                  column.hideOnMobile && "max-tablet:hidden",
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-[#6c757d]">
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={rowKey(row)} className="odd:bg-[#ece9e9]">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "border-b border-[rgba(128,128,128,0.3)] p-3 align-top text-[0.8375rem] text-[#1e1e26]",
                      column.hideOnMobile && "max-tablet:hidden",
                    )}
                  >
                    {column.render(row, startIndex + index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { MessageView } from "@/models/message.model";
import { AdminList } from "@/components/admin-list/AdminList";
import { Pagination } from "@/components/pagination/Pagination";
import { formatStamp } from "@/utils/time";

const PAGE_SIZE = 20;

export function SupportView({ messages }: { messages: MessageView[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => messages.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [messages, search]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const records = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const remove = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    const response = await fetch(`/api/messages/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      window.alert(data.message || "Could not delete the message.");
      return;
    }
    window.alert("successful");
    router.refresh();
  };

  return (
    <AdminList title="Message Register" count={messages.length} countLabel="Message" search={search} onSearch={(value) => { setSearch(value); setPage(1); }} placeholder="Search by Name">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {["S/N", "Date", "message", "Sender Name", "Status", "Delete"].map((heading) => (
              <th key={heading} className="border-b-2 border-[#eb9486] bg-[#f9f8f8] p-3 text-left">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td className="p-3" colSpan={6}>
                No Data Found
              </td>
            </tr>
          ) : (
            records.map((item, index) => (
              <tr key={item.id} className="odd:bg-[#ece9e9]">
                <td className="border-b border-gray-200 p-3">{(page - 1) * PAGE_SIZE + index + 1}</td>
                <td className="border-b border-gray-200 p-3">{formatStamp(item.createdAt)}</td>
                <td className="border-b border-gray-200 p-3">{item.message}</td>
                <td className="border-b border-gray-200 p-3">{item.name}</td>
                <td className="border-b border-gray-200 p-3">{item.is_seen ? "Read" : "unRead"}</td>
                <td className="border-b border-gray-200 p-3">
                  <button type="button" className="rounded bg-green-700 px-3 py-1 text-white" onClick={() => remove(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination page={page} pages={pages} onPage={setPage} />
    </AdminList>
  );
}

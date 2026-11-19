"use client";

import { useMemo, useState } from "react";
import type { UserView } from "@/models/user.model";
import { AdminList } from "@/components/admin-list/AdminList";
import { Pagination } from "@/components/pagination/Pagination";
import { formatStamp } from "@/utils/time";

const PAGE_SIZE = 20;

export function ViewUsersView({ users }: { users: UserView[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => {
    const needle = search.toLowerCase();
    return users.filter((user) => user.firstname.toLowerCase().includes(needle) || user.lastname.toLowerCase().includes(needle) || user.phone.toLowerCase().includes(needle));
  }, [search, users]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const records = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AdminList title="User Register" count={users.length} countLabel="Users" search={search} onSearch={(value) => { setSearch(value); setPage(1); }} placeholder="Search by Name">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {["S/N", "Created", "Name", "Phone", "Role", "Status"].map((heading) => (
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
            records.map((user, index) => (
              <tr key={user.id} className="odd:bg-[#ece9e9]">
                <td className="border-b border-gray-200 p-3">{(page - 1) * PAGE_SIZE + index + 1}</td>
                <td className="border-b border-gray-200 p-3">{formatStamp(user.created)}</td>
                <td className="border-b border-gray-200 p-3">
                  {user.firstname} {user.lastname}
                </td>
                <td className="border-b border-gray-200 p-3">{user.phone}</td>
                <td className="border-b border-gray-200 p-3">{user.permission}</td>
                <td className="border-b border-gray-200 p-3">{user.active ? "active" : "Suspended"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination page={page} pages={pages} onPage={setPage} />
    </AdminList>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PostView } from "@/models/post.model";
import { AdminList } from "@/components/admin-list/AdminList";
import { Pagination } from "@/components/pagination/Pagination";
import { PostDetailModal } from "@/components/post-detail-modal/PostDetailModal";
import { formatStamp } from "@/utils/time";

const PAGE_SIZE = 20;

export function ViewPostsView({ posts }: { posts: PostView[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<PostView | null>(null);
  const [busy, setBusy] = useState(false);

  const filtered = useMemo(() => {
    const needle = search.toLowerCase();
    return posts.filter((post) => post.blogid.toLowerCase().includes(needle) || post.category.toLowerCase().includes(needle) || post.title.toLowerCase().includes(needle));
  }, [posts, search]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const records = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const remove = async () => {
    if (!selected || busy) return;
    setBusy(true);
    const response = await fetch(`/api/posts/${selected.id}`, { method: "DELETE" });
    setBusy(false);
    if (!response.ok) {
      const data = await response.json();
      window.alert(data.message || "Could not delete the post.");
      return;
    }
    setSelected(null);
    router.refresh();
  };

  return (
    <>
      {selected ? <PostDetailModal post={selected} onClose={() => setSelected(null)} onDelete={remove} /> : null}
      <AdminList title="Post Register" count={posts.length} countLabel="Post" search={search} onSearch={(value) => { setSearch(value); setPage(1); }} placeholder="Search by name">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              {["S/N", "Created", "Post ID", "Category", "Publish By", "Status", "More.."].map((heading) => (
                <th key={heading} className={`border-b-2 border-[#eb9486] bg-[#f9f8f8] p-3 text-left ${["Created", "Category", "Publish By"].includes(heading) ? "max-[650px]:hidden" : ""}`}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td className="p-3" colSpan={7}>
                  No Data Found
                </td>
              </tr>
            ) : (
              records.map((post, index) => (
                <tr key={post.id} className="odd:bg-[#ece9e9]">
                  <td className="border-b border-gray-200 p-3">{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="border-b border-gray-200 p-3 max-[650px]:hidden">{formatStamp(post.createdAt)}</td>
                  <td className="border-b border-gray-200 p-3">{post.blogid}</td>
                  <td className="border-b border-gray-200 p-3 max-[650px]:hidden">{post.category}</td>
                  <td className="border-b border-gray-200 p-3 max-[650px]:hidden">{post.PublishBy}</td>
                  <td className="border-b border-gray-200 p-3">{post.is_active ? "active" : "Deleted"}</td>
                  <td className="border-b border-gray-200 p-3">
                    <button type="button" className="rounded bg-green-700 px-3 py-1 text-white" onClick={() => setSelected(post)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination page={page} pages={pages} onPage={setPage} />
      </AdminList>
    </>
  );
}

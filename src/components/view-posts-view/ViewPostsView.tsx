import { AdminPagination } from "@/components/admin-pagination/AdminPagination";
import { AdminSection } from "@/components/admin-section/AdminSection";
import { DataTable, type DataTableColumn } from "@/components/data-table/DataTable";
import { PostDetailButton } from "@/components/post-detail-button/PostDetailButton";
import { TableToolbar } from "@/components/table-toolbar/TableToolbar";
import type { PostsPagePayload } from "@/models/page.dto";
import type { AdminPostRow } from "@/models/post.dto";
import { formatDateTime } from "@/utils/time";

type ViewPostsViewProps = { data: PostsPagePayload };

const columns: DataTableColumn<AdminPostRow>[] = [
  { key: "sn", header: "S/N", render: (_row, index) => index + 1 },
  { key: "created", header: "Created", hideOnMobile: true, render: (row) => formatDateTime(row.createdAt) },
  { key: "title", header: "Title", render: (row) => <span className="line-clamp-2 min-w-[10rem]">{row.title}</span> },
  { key: "ref", header: "Post ID", hideOnMobile: true, render: (row) => row.blogId },
  { key: "category", header: "Category", hideOnMobile: true, render: (row) => row.category },
  { key: "publishBy", header: "Publish By", hideOnMobile: true, render: (row) => row.publishBy },
  { key: "status", header: "Status", render: (row) => (row.isActive ? "active" : "Deleted") },
  { key: "more", header: "More..", render: (row) => <PostDetailButton postId={row.id} /> },
];

export function ViewPostsView({ data }: ViewPostsViewProps) {
  return (
    <AdminSection title="Post Register">
      <TableToolbar countLabel={`${data.total} Post`} query={data.query} placeholder="Search by title, ID or category" />
      <DataTable
        columns={columns}
        rows={data.items}
        rowKey={(row) => row.id}
        startIndex={(data.page - 1) * data.pageSize}
      />
      <AdminPagination basePath="/auth/dashboard/viewpost" page={data.page} pageCount={data.pageCount} query={data.query} />
    </AdminSection>
  );
}

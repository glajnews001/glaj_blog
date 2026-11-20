import { AdminPagination } from "@/components/admin-pagination/AdminPagination";
import { AdminSection } from "@/components/admin-section/AdminSection";
import { DataTable, type DataTableColumn } from "@/components/data-table/DataTable";
import { MessageActions } from "@/components/message-actions/MessageActions";
import { TableToolbar } from "@/components/table-toolbar/TableToolbar";
import type { MessagesPagePayload } from "@/models/page.dto";
import type { MessageSummary } from "@/models/message.dto";
import { formatDateTime } from "@/utils/time";

type SupportViewProps = { data: MessagesPagePayload };

const columns: DataTableColumn<MessageSummary>[] = [
  { key: "sn", header: "S/N", render: (_row, index) => index + 1 },
  { key: "date", header: "Date", hideOnMobile: true, render: (row) => formatDateTime(row.createdAt) },
  { key: "name", header: "Sender", render: (row) => row.name },
  {
    key: "contact",
    header: "Contact",
    hideOnMobile: true,
    render: (row) => (
      <div>
        <div>{row.email}</div>
        <div>{row.phone}</div>
      </div>
    ),
  },
  { key: "message", header: "Message", render: (row) => <p className="m-0 min-w-[12rem] whitespace-pre-wrap">{row.message}</p> },
  { key: "status", header: "Status", render: (row) => (row.isSeen ? "Read" : "unRead") },
  { key: "actions", header: "Action", render: (row) => <MessageActions messageId={row.id} isSeen={row.isSeen} /> },
];

export function SupportView({ data }: SupportViewProps) {
  return (
    <AdminSection title="Message Register">
      <TableToolbar countLabel={`${data.total} Message`} query={data.query} placeholder="Search by name, email or message" />
      <DataTable
        columns={columns}
        rows={data.items}
        rowKey={(row) => row.id}
        startIndex={(data.page - 1) * data.pageSize}
      />
      <AdminPagination basePath="/auth/dashboard/support" page={data.page} pageCount={data.pageCount} query={data.query} />
    </AdminSection>
  );
}

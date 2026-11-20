import { AdminPagination } from "@/components/admin-pagination/AdminPagination";
import { AdminSection } from "@/components/admin-section/AdminSection";
import { DataTable, type DataTableColumn } from "@/components/data-table/DataTable";
import { TableToolbar } from "@/components/table-toolbar/TableToolbar";
import { UserStatusButton } from "@/components/user-status-button/UserStatusButton";
import type { UsersPagePayload } from "@/models/page.dto";
import type { UserSummary } from "@/models/user.dto";
import { ROLE } from "@/utils/constants";
import { formatDateTime } from "@/utils/time";

type ViewUsersViewProps = { data: UsersPagePayload };

export function ViewUsersView({ data }: ViewUsersViewProps) {
  const columns: DataTableColumn<UserSummary>[] = [
    { key: "sn", header: "S/N", render: (_row, index) => index + 1 },
    { key: "created", header: "Created", hideOnMobile: true, render: (row) => formatDateTime(row.created) },
    { key: "name", header: "Name", render: (row) => `${row.firstname} ${row.lastname}` },
    { key: "email", header: "Email", hideOnMobile: true, render: (row) => row.email },
    { key: "phone", header: "Phone", hideOnMobile: true, render: (row) => row.phone },
    { key: "role", header: "Role", hideOnMobile: true, render: (row) => row.permission },
    { key: "status", header: "Status", render: (row) => (row.active ? "active" : "Suspended") },
  ];

  if (data.canManage) {
    columns.push({
      key: "actions",
      header: "Action",
      render: (row) =>
        row.permission === ROLE.SUPER_ADMIN ? "-" : <UserStatusButton userId={row.id} active={row.active} />,
    });
  }

  return (
    <AdminSection title="User Register">
      <TableToolbar countLabel={`${data.total} Users`} query={data.query} placeholder="Search by name, email or phone" />
      <DataTable
        columns={columns}
        rows={data.items}
        rowKey={(row) => row.id}
        startIndex={(data.page - 1) * data.pageSize}
      />
      <AdminPagination basePath="/auth/dashboard/viewuser" page={data.page} pageCount={data.pageCount} query={data.query} />
    </AdminSection>
  );
}

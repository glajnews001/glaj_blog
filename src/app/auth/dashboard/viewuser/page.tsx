import { AdminShell } from "@/components/admin-shell/AdminShell";
import { ViewUsersView } from "@/components/view-users-view/ViewUsersView";
import { UserController } from "@/controllers/auth.controller";

export const dynamic = "force-dynamic";

export default async function ViewUserPage() {
  const users = await UserController.list();
  return (
    <AdminShell>
      <ViewUsersView users={users} />
    </AdminShell>
  );
}

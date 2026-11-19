import { AdminShell } from "@/components/admin-shell/AdminShell";
import { SupportView } from "@/components/support-view/SupportView";
import { MessageController } from "@/controllers/message.controller";

export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const messages = await MessageController.list();
  return (
    <AdminShell>
      <SupportView messages={messages} />
    </AdminShell>
  );
}

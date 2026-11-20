import { EmptyState } from "@/components/empty-state/EmptyState";
import { SiteShell } from "@/components/site-shell/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="py-10">
        <EmptyState title="Page Not Found" message="The page or story you are looking for does not exist." />
      </div>
    </SiteShell>
  );
}

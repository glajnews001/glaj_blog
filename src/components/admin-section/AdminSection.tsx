import type { ReactNode } from "react";

type AdminSectionProps = { title: string; children: ReactNode };

/** Padded content area with the navy page title used by every admin page. */
export function AdminSection({ title, children }: AdminSectionProps) {
  return (
    <section className="p-4 tablet:p-8">
      <h1 className="mb-4 text-[1.4rem] font-medium text-navy">{title}</h1>
      {children}
    </section>
  );
}

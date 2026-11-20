import type { ReactNode } from "react";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { TopBar } from "@/components/top-bar/TopBar";

type SiteShellProps = { children: ReactNode; withFooter?: boolean };

/** Public-site frame: top bar, navigation, page content and footer. */
export function SiteShell({ children, withFooter = true }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
}

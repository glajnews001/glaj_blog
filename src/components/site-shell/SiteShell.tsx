import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { TopBar } from "@/components/top-bar/TopBar";

export function SiteShell({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Navbar />
      <main>{children}</main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}

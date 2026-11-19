import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view/ContactView";
import { pageMetadata } from "@/utils/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact Glaj News for news tips, advertising, and support.",
  path: "/contact",
  section: "Contact",
});

export default function ContactPage() {
  return <ContactView />;
}

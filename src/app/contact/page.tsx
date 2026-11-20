import type { Metadata } from "next";
import { ContactView } from "@/components/contact-view/ContactView";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return <ContactView />;
}

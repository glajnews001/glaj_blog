import { ContactForm } from "@/components/contact-form/ContactForm";
import { SiteShell } from "@/components/site-shell/SiteShell";

export function ContactView() {
  return (
    <SiteShell withFooter={false}>
      <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center px-3 py-10 font-[family-name:var(--font-montserrat)]">
        <div className="flex w-full max-w-[768px] overflow-hidden rounded-[5px] bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]">
          <aside className="hidden flex-1 items-center justify-center bg-navy p-8 text-center text-white min-[601px]:flex">
            <div className="leading-[22px]">
              <h2 className="mb-4 text-[2rem] font-bold">Let&apos;s Chat</h2>
              <p className="text-[0.9rem]">
                Whether you have a question, want to advertise or simply want to connect.
              </p>
              <br />
              <p className="text-[0.9rem]">Feel free to send me a message in the contact form</p>
            </div>
          </aside>
          <div className="flex-1 p-6 min-[601px]:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}

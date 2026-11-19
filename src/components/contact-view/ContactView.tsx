"use client";

import { FormEvent, useState } from "react";
import { SiteShell } from "@/components/site-shell/SiteShell";

export function ContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send the message.");
      setNotice("Message sent successfully.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not send the message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteShell showFooter={false}>
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-10 font-[Montserrat,sans-serif]">
        <div className="grid w-full max-w-3xl overflow-hidden rounded bg-white shadow-[0_14px_28px_rgba(0,0,0,0.25)] md:grid-cols-2">
          <div className="hidden items-center justify-center bg-[#01017a] p-8 text-center text-white md:flex">
            <div>
              <h2 className="mb-4 text-3xl">Let&apos;s Chat</h2>
              <p>Whether you have a question, want to advertise or simply want to connect.</p>
              <p className="mt-4">Feel free to send me a message in the contact form</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center p-8">
            <h2 className="mb-2 hidden text-3xl md:block">Contact</h2>
            <h2 className="mb-2 text-3xl md:hidden">Let&apos;s Chat</h2>
            <p className="mb-3 text-left">* Required</p>
            {notice ? <p className="mb-3 rounded bg-blue-50 p-2 text-sm text-[#01017a]">{notice}</p> : null}
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name *" className="my-2 bg-[#eee] px-4 py-3 outline-[#01017a]" />
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email *" className="my-2 bg-[#eee] px-4 py-3 outline-[#01017a]" />
            <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" className="my-2 bg-[#eee] px-4 py-3 outline-[#01017a]" />
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={4} placeholder="Message" className="my-2 bg-[#eee] px-4 py-3 outline-[#01017a]" />
            <button disabled={loading} className="mt-3 rounded-full bg-[#01017a] px-8 py-3 text-xs font-bold tracking-wider text-white uppercase">
              {loading ? "sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </SiteShell>
  );
}

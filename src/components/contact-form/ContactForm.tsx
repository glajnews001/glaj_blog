"use client";

import { useState, type FormEvent } from "react";
import { Alert } from "@/components/alert/Alert";
import { TextAreaField } from "@/components/text-area-field/TextAreaField";
import { TextField } from "@/components/text-field/TextField";
import { callApi } from "@/utils/api";

const EMPTY = { name: "", email: "", phone: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "danger"; text: string } | null>(null);

  const update = (key: keyof typeof EMPTY) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(values).some((value) => value.trim() === "")) {
      setStatus({ type: "danger", text: "Value missing. Please fill in every field." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      await callApi("/api/contact", { body: values });
      setValues(EMPTY);
      setStatus({ type: "success", text: "Message sent successfully." });
    } catch (error) {
      setStatus({ type: "danger", text: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="text-left" noValidate>
      <h2 className="mb-4 hidden text-center text-[2rem] font-bold min-[601px]:block">Contact</h2>
      <h2 className="mb-4 text-center text-[2rem] font-bold min-[601px]:hidden">Let&apos;s Chat</h2>
      <p className="text-sm">* Required</p>
      {status && <Alert variant={status.type}>{status.text}</Alert>}
      <TextField
        fieldStyle="soft"
        name="name"
        placeholder="Name *"
        value={values.name}
        onChange={(event) => update("name")(event.target.value)}
        autoComplete="name"
      />
      <TextField
        fieldStyle="soft"
        name="email"
        type="email"
        placeholder="Email *"
        value={values.email}
        onChange={(event) => update("email")(event.target.value)}
        autoComplete="email"
      />
      <TextField
        fieldStyle="soft"
        name="phone"
        type="tel"
        placeholder="Phone *"
        value={values.phone}
        onChange={(event) => update("phone")(event.target.value)}
        autoComplete="tel"
      />
      <TextAreaField
        fieldStyle="soft"
        name="message"
        rows={4}
        placeholder="Message *"
        value={values.message}
        onChange={(event) => update("message")(event.target.value)}
      />
      <div className="mt-3 text-center">
        <button
          type="submit"
          disabled={loading}
          className="rounded-[20px] border border-navy bg-navy px-[45px] py-3 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-70"
        >
          {loading ? "sending Message..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthField } from "@/components/auth-field/AuthField";

export function RegisterView() {
  const router = useRouter();
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (value: string) => setForm((current) => ({ ...current, [key]: value }));

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      setMessage("Great! Your registration was successful. Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#111111c2] px-4 py-8">
      <div className="w-full max-w-[380px] overflow-hidden rounded-t-[15px] bg-white shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
        <div className="bg-[#111] py-8 text-center text-3xl text-white">Register</div>
        <form onSubmit={handleRegister} className="space-y-3 px-7 py-6">
          {message ? <p className="rounded bg-sky-100 p-3 text-sm">{message}</p> : null}
          <AuthField label="First Name" value={form.firstname} onChange={set("firstname")} placeholder="First name" />
          <AuthField label="Last Name" value={form.lastname} onChange={set("lastname")} placeholder="Last name" />
          <AuthField label="Email address" type="email" value={form.email} onChange={set("email")} placeholder="Enter email" />
          <AuthField label="Enter Phone Number" value={form.phone} onChange={set("phone")} placeholder="+123 - 999 - 999" />
          <AuthField label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Password" />
          <AuthField label="Confirm Password" type="password" value={form.confirmPassword} onChange={set("confirmPassword")} placeholder="Password" />
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#ed1864]">
              Login
            </Link>
          </p>
          <button disabled={loading} className="w-full rounded bg-[#111] py-2 text-white">
            {loading ? "Loading ..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

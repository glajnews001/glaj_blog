"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      setMessage("Login successful");
      router.push("/auth/dashboard/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-[#111111c2] px-4">
      <div className="w-full max-w-[380px] overflow-hidden rounded-t-[15px] bg-white shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
        <div className="bg-[#111] py-8 text-center text-3xl text-white">Login</div>
        <form onSubmit={handleLogin} className="space-y-4 px-7 py-6">
          {message ? <p className="rounded bg-sky-100 p-3 text-sm">{message}</p> : null}
          <label className="block text-sm">
            Email address
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm">
            Password
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <button disabled={loading} className="w-full rounded bg-[#111] py-2 text-white">
            {loading ? "Please Wait .." : "Login ..."}
          </button>
          <p className="text-sm text-gray-600">
            Need an account?{" "}
            <Link href="/auth/register" className="text-[#ed1864]">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

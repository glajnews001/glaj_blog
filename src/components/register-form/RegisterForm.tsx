"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert } from "@/components/alert/Alert";
import { Button } from "@/components/button/Button";
import { TextField } from "@/components/text-field/TextField";
import { callApi } from "@/utils/api";

const EMPTY = { firstname: "", lastname: "", email: "", phone: "", password: "", confirmPassword: "" };

export function RegisterForm() {
  const router = useRouter();
  const [values, setValues] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "info" | "danger"; text: string } | null>(null);

  const bind = (key: keyof typeof EMPTY) => ({
    name: key,
    value: values[key],
    onChange: (event: { target: { value: string } }) =>
      setValues((current) => ({ ...current, [key]: event.target.value })),
    required: true,
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(values).some((value) => value.trim() === "")) {
      setStatus({ type: "danger", text: "Incomplete information." });
      return;
    }
    if (values.password !== values.confirmPassword) {
      setStatus({ type: "danger", text: "Password mismatch." });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const result = await callApi<{ message: string; redirectTo: string }>("/api/auth/register", {
        body: values,
      });
      setStatus({ type: "info", text: result.message });
      setTimeout(() => router.push(result.redirectTo), 2500);
    } catch (err) {
      setStatus({ type: "danger", text: (err as Error).message });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      {status && <Alert variant={status.type}>{status.text}</Alert>}
      <TextField label="First Name" placeholder="First name" autoComplete="given-name" {...bind("firstname")} />
      <TextField label="Last Name" placeholder="Last name" autoComplete="family-name" {...bind("lastname")} />
      <TextField label="Email address" type="email" placeholder="Enter email" autoComplete="email" {...bind("email")} />
      <TextField label="Enter Phone Number" type="tel" placeholder="+123 - 999 - 999" autoComplete="tel" {...bind("phone")} />
      <TextField label="Password" type="password" placeholder="Password" autoComplete="new-password" {...bind("password")} />
      <TextField
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        autoComplete="new-password"
        {...bind("confirmPassword")}
      />
      <p className="mb-2 text-sm text-[#6c757d]">
        Already have an account?{" "}
        <Link href="/auth/login" className="cursor-pointer !text-pink no-underline">
          Login
        </Link>
      </p>
      <Button type="submit" variant="dark" block loading={loading} loadingText="Loading ..." className="my-2 py-2">
        Register
      </Button>
    </form>
  );
}

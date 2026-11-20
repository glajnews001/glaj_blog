"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert } from "@/components/alert/Alert";
import { Button } from "@/components/button/Button";
import { TextField } from "@/components/text-field/TextField";
import { callApi } from "@/utils/api";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await callApi<{ redirectTo: string }>("/api/auth/login", { body: { email, password } });
      router.replace(result.redirectTo);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      {error && <Alert variant="danger">{error}</Alert>}
      <TextField
        label="Email address"
        name="email"
        type="email"
        placeholder="Enter email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button type="submit" variant="dark" block loading={loading} loadingText="Please Wait .." className="my-2 py-2">
        Login ...
      </Button>
    </form>
  );
}

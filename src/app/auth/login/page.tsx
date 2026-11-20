import type { Metadata } from "next";
import { AuthController } from "@/controllers/auth.controller";
import { LoginView } from "@/components/login-view/LoginView";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Login", robots: { index: false } };

export default async function LoginPage() {
  await AuthController.redirectIfSignedIn();
  return <LoginView />;
}

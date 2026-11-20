import type { Metadata } from "next";
import { AuthController } from "@/controllers/auth.controller";
import { RegisterView } from "@/components/register-view/RegisterView";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Register", robots: { index: false } };

export default async function RegisterPage() {
  await AuthController.redirectIfSignedIn();
  return <RegisterView />;
}

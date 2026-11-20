import { AuthCard } from "@/components/auth-card/AuthCard";
import { LoginForm } from "@/components/login-form/LoginForm";

export function LoginView() {
  return (
    <AuthCard title="Login">
      <LoginForm />
    </AuthCard>
  );
}

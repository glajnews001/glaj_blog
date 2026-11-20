import { AuthCard } from "@/components/auth-card/AuthCard";
import { RegisterForm } from "@/components/register-form/RegisterForm";

export function RegisterView() {
  return (
    <AuthCard title="Register">
      <RegisterForm />
    </AuthCard>
  );
}

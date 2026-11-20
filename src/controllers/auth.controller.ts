import { redirect } from "next/navigation";
import type { LoginInput, RegisterInput } from "@/models/user.dto";
import { SessionService } from "@/services/session.service";
import { UserService } from "@/services/user.service";
import { ROLE } from "@/utils/constants";

export const AuthController = {
  async login(input: Partial<LoginInput>) {
    const user = await UserService.authenticate(input);
    await SessionService.create({
      userId: user.id,
      role: user.permission,
      name: `${user.firstname} ${user.lastname}`.trim(),
    });
    return { redirectTo: "/auth/dashboard/admin" };
  },

  async register(input: Partial<RegisterInput>) {
    await UserService.register(input);
    return {
      message:
        "Great! Your registration was successful. A super admin must approve your account before you can sign in. Redirecting to login...",
      redirectTo: "/auth/login",
    };
  },

  async logout() {
    await SessionService.destroy();
  },

  /** Page guard: sends signed-in admins away from the login/register pages. */
  async redirectIfSignedIn() {
    const session = await SessionService.current();
    if (session) redirect("/auth/dashboard/admin");
  },

  /** Page guard for the dashboard. Returns the session or redirects to login. */
  async requireAdminPage() {
    const session = await SessionService.current();
    if (!session || (session.role !== ROLE.ADMIN && session.role !== ROLE.SUPER_ADMIN)) {
      redirect("/auth/login");
    }
    return session;
  },
};

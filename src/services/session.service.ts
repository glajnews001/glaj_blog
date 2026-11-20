import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_DAYS, ROLE } from "@/utils/constants";
import { HttpError } from "@/utils/http";
import { signSession, verifySession, type SessionPayload } from "@/utils/jwt";

export const SessionService = {
  async create(payload: SessionPayload) {
    const token = await signSession(payload);
    const jar = await cookies();
    jar.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_DAYS * 24 * 60 * 60,
    });
  },

  async destroy() {
    const jar = await cookies();
    jar.delete(SESSION_COOKIE);
  },

  async current(): Promise<SessionPayload | null> {
    const jar = await cookies();
    return verifySession(jar.get(SESSION_COOKIE)?.value);
  },

  /** Throws 401 unless a valid admin session exists. */
  async requireAdmin(): Promise<SessionPayload> {
    const session = await this.current();
    if (!session) throw new HttpError(401, "Please sign in to continue.");
    if (session.role !== ROLE.ADMIN && session.role !== ROLE.SUPER_ADMIN) {
      throw new HttpError(403, "You do not have access to this area.");
    }
    return session;
  },

  async requireSuperAdmin(): Promise<SessionPayload> {
    const session = await this.requireAdmin();
    if (session.role !== ROLE.SUPER_ADMIN) {
      throw new HttpError(403, "Only a super admin can do this.");
    }
    return session;
  },
};

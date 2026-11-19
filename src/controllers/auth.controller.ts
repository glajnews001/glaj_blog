import { UserService } from "@/services/user.service";
import { httpError } from "@/utils/http";
import { ID_CHARS, getRandomString } from "@/utils/random";
import { clearSession, readSession, signSession, writeSession } from "@/utils/session";

export class AuthController {
  static async login(input: { email?: string; password?: string }) {
    const email = input.email?.trim() || "";
    const password = input.password || "";
    if (!email || !password) throw httpError("Email and password are required.");

    const user = await UserService.verifyPassword(email, password);
    if (!user) throw httpError("No account matches that email and password.", 401);

    const token = await signSession({
      id: user.id,
      email: user.email,
      permission: user.permission,
      firstname: user.firstname,
    });
    await writeSession(token);
    return user;
  }

  static async register(input: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }) {
    const firstname = input.firstname?.trim() || "";
    const lastname = input.lastname?.trim() || "";
    const email = input.email?.trim() || "";
    const phone = input.phone?.trim() || "";
    const password = input.password || "";
    const confirmPassword = input.confirmPassword || "";

    if (!firstname || !lastname || !email || !phone || !password || !confirmPassword) {
      throw httpError("Incomplete information.");
    }
    if (password !== confirmPassword) throw httpError("Password mismatch.");
    if (password.length < 8) throw httpError("Password must be at least 8 characters.");

    const existing = await UserService.findByEmail(email);
    if (existing) throw httpError("A user with that email already exists.", 409);

    return UserService.create({
      id: getRandomString(35, ID_CHARS),
      firstname,
      lastname,
      email,
      phone,
      password,
      permission: "admin",
    });
  }

  static async logout() {
    await clearSession();
    return { ok: true };
  }

  static async current() {
    return readSession();
  }
}

export class UserController {
  static async list() {
    const session = await readSession();
    if (!session) throw httpError("Sign in to view users.", 401);
    return UserService.list();
  }
}

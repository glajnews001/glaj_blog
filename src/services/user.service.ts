import bcrypt from "bcryptjs";
import { UserModel, type UserRecord } from "@/models/user.model";
import type { LoginInput, RegisterInput, UserSummary } from "@/models/user.dto";
import { ROLE } from "@/utils/constants";
import { HttpError } from "@/utils/http";
import { randomId } from "@/utils/random";
import { clean, isEmail } from "@/utils/validation";

const MIN_PASSWORD = 8;
// Compared against when the email is unknown so response time does not reveal valid emails.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export function toUserSummary(user: UserRecord): UserSummary {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    permission: user.permission,
    active: user.active,
    created: user.created.toISOString(),
  };
}

export const UserService = {
  async register(input: Partial<RegisterInput>) {
    const firstname = clean(input.firstname, 60);
    const lastname = clean(input.lastname, 60);
    const email = clean(input.email, 120).toLowerCase();
    const phone = clean(input.phone, 30);
    const password = typeof input.password === "string" ? input.password : "";
    const confirm = typeof input.confirmPassword === "string" ? input.confirmPassword : "";

    if (!firstname || !lastname || !email || !phone || !password || !confirm) {
      throw new HttpError(400, "Incomplete information.");
    }
    if (!isEmail(email)) throw new HttpError(400, "Enter a valid email address.");
    if (password.length < MIN_PASSWORD) {
      throw new HttpError(400, `Password must be at least ${MIN_PASSWORD} characters.`);
    }
    if (password !== confirm) throw new HttpError(400, "Password mismatch.");
    if (await UserModel.findByEmail(email)) throw new HttpError(409, "User already exists.");

    await UserModel.create({
      id: randomId(35),
      firstname,
      lastname,
      email,
      phone,
      password: await bcrypt.hash(password, 10),
      permission: ROLE.ADMIN,
      // New accounts wait for a super admin to approve them.
      active: false,
      wallet: 0,
      noBplog: 0,
    });
  },

  async authenticate(input: Partial<LoginInput>): Promise<UserRecord> {
    const email = clean(input.email, 120).toLowerCase();
    const password = typeof input.password === "string" ? input.password : "";
    if (!email || !password) throw new HttpError(400, "Enter your email and password.");

    const user = await UserModel.findByEmail(email);
    const valid = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);
    if (!user || !valid) throw new HttpError(401, "Invalid email or password.");
    if (!user.active) {
      throw new HttpError(403, "Your account is waiting for approval from a super admin.");
    }
    return user;
  },

  async page(search: string, page: number, pageSize: number) {
    const total = await UserModel.count(search || undefined);
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, pageCount);
    const rows = await UserModel.findMany(search || undefined, pageSize, (safePage - 1) * pageSize);
    return { items: rows.map(toUserSummary), total, page: safePage, pageCount, pageSize, query: search };
  },

  count() {
    return UserModel.count();
  },

  async setActive(actorId: string, targetId: string, active: boolean) {
    const target = await UserModel.findById(targetId);
    if (!target) throw new HttpError(404, "User not found.");
    if (target.id === actorId || target.permission === ROLE.SUPER_ADMIN) {
      throw new HttpError(400, "A super admin account cannot be suspended.");
    }
    await UserModel.update(targetId, { active });
  },
};

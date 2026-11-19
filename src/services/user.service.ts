import bcrypt from "bcryptjs";
import { getPrisma, hasDatabase } from "@/models/db";
import { toUserView, type UserView } from "@/models/user.model";

export class UserService {
  static async list(): Promise<UserView[]> {
    if (!hasDatabase()) return [];
    const rows = await getPrisma().user.findMany({ orderBy: { created: "desc" } });
    return rows.map(toUserView);
  }

  static async findByEmail(email: string) {
    if (!hasDatabase()) return null;
    return getPrisma().user.findUnique({ where: { email: email.toLowerCase() } });
  }

  static async create(input: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    permission?: string;
  }) {
    const password = await bcrypt.hash(input.password, 10);
    const row = await getPrisma().user.create({
      data: {
        id: input.id,
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email.toLowerCase(),
        phone: input.phone,
        password,
        active: true,
        permission: input.permission || "admin",
        wallet: 0,
        noBplog: 0,
      },
    });
    return toUserView(row);
  }

  static async count() {
    if (!hasDatabase()) return 0;
    return getPrisma().user.count();
  }

  static async verifyPassword(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user || !user.active) return null;
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) return null;
    return toUserView(user);
  }
}

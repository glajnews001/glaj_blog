export type UserRecord = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  active: boolean;
  permission: string;
  wallet: number;
  noBplog: number;
  created: Date;
};

export type UserView = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  active: boolean;
  permission: string;
  wallet: number;
  noBplog: number;
  created: string;
};

export function toUserView(user: Omit<UserRecord, "password"> & { password?: string }): UserView {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone,
    active: user.active,
    permission: user.permission,
    wallet: user.wallet,
    noBplog: user.noBplog,
    created: user.created.toISOString(),
  };
}

export type UserSummary = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  permission: string;
  active: boolean;
  created: string;
};

export type RegisterInput = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type LoginInput = { email: string; password: string };

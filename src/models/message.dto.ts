export type MessageSummary = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isSeen: boolean;
  createdAt: string;
};

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

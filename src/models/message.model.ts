export type MessageRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  blogId: string;
  isSeen: boolean;
  createdAt: Date;
};

export type MessageView = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  blogid: string;
  is_seen: boolean;
  createdAt: string;
};

export function toMessageView(message: MessageRecord): MessageView {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone,
    message: message.message,
    blogid: message.blogId,
    is_seen: message.isSeen,
    createdAt: message.createdAt.toISOString(),
  };
}

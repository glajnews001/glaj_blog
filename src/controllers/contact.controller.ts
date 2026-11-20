import { MessageService } from "@/services/message.service";
import type { ContactInput } from "@/models/message.dto";

export const ContactController = {
  submit(input: Partial<ContactInput>) {
    return MessageService.submit(input);
  },
};

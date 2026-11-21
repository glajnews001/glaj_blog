import type {
  DashboardPayload,
  MessagesPagePayload,
  PostsPagePayload,
  UsersPagePayload,
} from "@/models/page.dto";
import type { CreatePostInput, PostDetail } from "@/models/post.dto";
import { MediaService, type UploadSignature } from "@/services/media.service";
import { MessageService } from "@/services/message.service";
import { PostService } from "@/services/post.service";
import { SessionService } from "@/services/session.service";
import { StatsService } from "@/services/stats.service";
import { UserService } from "@/services/user.service";
import { PAGE_SIZE, ROLE } from "@/utils/constants";
import { HttpError } from "@/utils/http";
import { clean, firstParam, toPositiveInt } from "@/utils/validation";

export type ListQuery = { page?: string | string[]; q?: string | string[] };

const readQuery = (query: ListQuery) => ({
  page: toPositiveInt(query.page),
  search: clean(firstParam(query.q), 60),
});

/**
 * Admin back-office logic. Every method re-checks the session, so it is safe to
 * call from both pages and API route handlers.
 */
export const DashboardController = {
  async getOverview(): Promise<DashboardPayload> {
    await SessionService.requireAdmin();
    return StatsService.dashboard();
  },

  async getPosts(query: ListQuery): Promise<PostsPagePayload> {
    await SessionService.requireAdmin();
    const { page, search } = readQuery(query);
    return PostService.adminPage(search, page, PAGE_SIZE.admin);
  },

  async getPost(id: string): Promise<PostDetail> {
    await SessionService.requireAdmin();
    const post = await PostService.detailForAdmin(id);
    if (!post) throw new HttpError(404, "Post not found.");
    return post;
  },

  /** Like getPost, but returns null instead of throwing so pages can render a 404. */
  async findPost(id: string): Promise<PostDetail | null> {
    await SessionService.requireAdmin();
    return PostService.detailForAdmin(id);
  },

  async createPost(input: Partial<CreatePostInput>): Promise<PostDetail> {
    await SessionService.requireAdmin();
    return PostService.create(input, MediaService.cloudName());
  },

  async updatePost(id: string, input: Partial<CreatePostInput>): Promise<PostDetail> {
    await SessionService.requireAdmin();
    return PostService.update(id, input, MediaService.cloudName());
  },

  async deletePost(id: string) {
    await SessionService.requireAdmin();
    await PostService.remove(id);
  },

  async signUpload(fileType: string): Promise<UploadSignature> {
    await SessionService.requireAdmin();
    return MediaService.sign(fileType);
  },

  async getUsers(query: ListQuery): Promise<UsersPagePayload> {
    const session = await SessionService.requireAdmin();
    const { page, search } = readQuery(query);
    const data = await UserService.page(search, page, PAGE_SIZE.admin);
    return { ...data, canManage: session.role === ROLE.SUPER_ADMIN };
  },

  async setUserActive(userId: string, active: boolean) {
    const session = await SessionService.requireSuperAdmin();
    await UserService.setActive(session.userId, userId, active);
  },

  async getMessages(query: ListQuery): Promise<MessagesPagePayload> {
    await SessionService.requireAdmin();
    const { page, search } = readQuery(query);
    return MessageService.page(search, page, PAGE_SIZE.admin);
  },

  async markMessageSeen(id: string) {
    await SessionService.requireAdmin();
    await MessageService.markSeen(id);
  },

  async deleteMessage(id: string) {
    await SessionService.requireAdmin();
    await MessageService.remove(id);
  },
};

import type { SearchPayload } from "@/models/page.dto";
import { PostService } from "@/services/post.service";
import { PAGE_SIZE } from "@/utils/constants";

export const SearchController = {
  async getPage(rawTerm: string): Promise<SearchPayload> {
    let term = rawTerm;
    try {
      term = decodeURIComponent(rawTerm);
    } catch {
      // keep the raw value when it is not valid percent-encoding
    }
    term = term.trim().slice(0, 60);
    const posts = term ? await PostService.search(term, PAGE_SIZE.search) : [];
    return { term, posts };
  },
};

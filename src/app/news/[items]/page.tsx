import type { Metadata } from "next";
import { SearchView } from "@/components/search-view/SearchView";
import { PostController } from "@/controllers/post.controller";
import { pageMetadata } from "@/utils/seo";

export const dynamic = "force-dynamic";

type SearchPageProps = { params: Promise<{ items: string }> };

export async function generateMetadata({ params }: SearchPageProps): Promise<Metadata> {
  const term = decodeURIComponent((await params).items);
  return pageMetadata({
    title: `Search: ${term}`,
    description: `Stories matching ${term} on Glaj News.`,
    path: `/news/${encodeURIComponent(term)}`,
    index: false,
  });
}

export default async function SearchPage({ params }: SearchPageProps) {
  const term = decodeURIComponent((await params).items);
  const posts = await PostController.search(term);
  return <SearchView term={term} posts={posts} />;
}

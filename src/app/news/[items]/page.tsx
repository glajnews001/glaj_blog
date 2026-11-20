import type { Metadata } from "next";
import { SearchController } from "@/controllers/search.controller";
import { SearchView } from "@/components/search-view/SearchView";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ items: string }> };

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage({ params }: Props) {
  const { items } = await params;
  const data = await SearchController.getPage(items);
  return <SearchView data={data} />;
}

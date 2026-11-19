import type { Metadata } from "next";
import { HomeView } from "@/components/home-view/HomeView";
import { PostController } from "@/controllers/post.controller";
import { pageMetadata } from "@/utils/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Glaj News - News in one place",
  description: "Latest politics, sport, business, entertainment, education, and eyewitness news from Glaj News.",
  path: "/",
  section: "News",
});

export default async function HomePage() {
  const data = await PostController.home();
  return <HomeView data={data} />;
}

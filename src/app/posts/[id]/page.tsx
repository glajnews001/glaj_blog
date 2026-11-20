import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleController } from "@/controllers/article.controller";
import { ArticleView } from "@/components/article-view/ArticleView";
import { PostService } from "@/services/post.service";
import { excerptFromHtml } from "@/utils/html";

export const revalidate = 300;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await PostService.detail(id);
  if (!post) return { title: "Post not found" };

  const description = excerptFromHtml(post.content, 160);
  const images = post.fileType === "image" && post.imageUrl ? [post.imageUrl] : undefined;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/posts/${post.id}` },
    openGraph: { type: "article", title: post.title, description, url: `/posts/${post.id}`, images },
    twitter: { card: "summary_large_image", title: post.title, description, images },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const data = await ArticleController.getPage(id);
  if (!data) notFound();
  return <ArticleView data={data} />;
}

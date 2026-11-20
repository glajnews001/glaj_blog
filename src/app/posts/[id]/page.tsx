import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleController } from "@/controllers/article.controller";
import { ArticleView } from "@/components/article-view/ArticleView";
import { PostService } from "@/services/post.service";
import { SITE } from "@/utils/constants";
import { excerptFromHtml } from "@/utils/html";
import { socialImageUrl } from "@/utils/media";

export const revalidate = 300;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await PostService.detail(id);
  if (!post) return { title: "Post not found" };

  const description = excerptFromHtml(post.content, 160);
  const images =
    post.fileType === "image" && post.imageUrl ? [{ url: socialImageUrl(post.imageUrl), width: 1200, height: 630, alt: post.title }] : ["/image/logo.png"];
  return {
    title: post.title,
    description,
    alternates: { canonical: `/posts/${post.id}` },
    keywords: [post.category, "Nigeria news", SITE.name].filter(Boolean) as string[],
    openGraph: {
      type: "article",
      siteName: SITE.name,
      title: post.title,
      description,
      url: `/posts/${post.id}`,
      images,
      publishedTime: new Date(post.createdAt).toISOString(),
      section: post.category,
    },
    twitter: { card: "summary_large_image", title: post.title, description, images },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const data = await ArticleController.getPage(id);
  if (!data) notFound();
  const post = data.post;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: excerptFromHtml(post.content, 160),
    image: post.fileType === "image" && post.imageUrl ? [socialImageUrl(post.imageUrl)] : [`${SITE.url}/image/logo.png`],
    datePublished: new Date(post.createdAt).toISOString(),
    author: { "@type": "Person", name: post.publishBy || SITE.name },
    publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/image/logo.png` } },
    mainEntityOfPage: `${SITE.url}/posts/${post.id}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ArticleView data={data} />
    </>
  );
}

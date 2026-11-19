import type { Metadata } from "next";
import { ArticleView } from "@/components/article-view/ArticleView";
import { JsonLd } from "@/components/json-ld/JsonLd";
import { PostController } from "@/controllers/post.controller";
import { categoryLabel, articleJsonLd, breadcrumbJsonLd, metaDescription, pageMetadata, absoluteUrl } from "@/utils/seo";

export const dynamic = "force-dynamic";

type ArticlePageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await PostController.article(id);
  const post = data.post;
  if (!post) {
    return pageMetadata({ title: "Story not found", description: "This story is no longer available.", path: `/posts/${id}`, index: false });
  }
  return pageMetadata({
    title: post.title,
    description: metaDescription(post.content),
    path: `/posts/${post.id}`,
    image: post.imageUrl,
    type: "article",
    publishedTime: post.createdAt,
    authors: [post.PublishBy || "Glaj News"],
    section: categoryLabel(post.category),
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const data = await PostController.article(id);
  const post = data.post;
  return (
    <>
      {post ? (
        <JsonLd
          data={[
            articleJsonLd(post),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: categoryLabel(post.category), path: `/category/${post.category}` },
              { name: post.title, path: `/posts/${post.id}` },
            ]),
          ]}
        />
      ) : null}
      <ArticleView data={data} url={absoluteUrl(`/posts/${id}`)} />
    </>
  );
}

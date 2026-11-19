import type { Metadata } from "next";
import { CategoryView } from "@/components/category-view/CategoryView";
import { JsonLd } from "@/components/json-ld/JsonLd";
import { PostController } from "@/controllers/post.controller";
import { breadcrumbJsonLd, categoryLabel, pageMetadata } from "@/utils/seo";

export const dynamic = "force-dynamic";

type CategoryPageProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = decodeURIComponent((await params).category);
  const label = categoryLabel(category);
  return pageMetadata({
    title: `${label} News`,
    description: `Read the latest ${label.toLowerCase()} stories on Glaj News.`,
    path: `/category/${category}`,
    section: label,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent((await params).category);
  const data = await PostController.category(category);
  const label = categoryLabel(category);
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: label, path: `/category/${category}` },
        ])}
      />
      <CategoryView data={data} />
    </>
  );
}

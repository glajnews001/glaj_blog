import type { Metadata } from "next";
import { CategoryController } from "@/controllers/category.controller";
import { CategoryView } from "@/components/category-view/CategoryView";

export const revalidate = 60;

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const title = `${CategoryController.titleFor(category)} News`;
  return { title, description: `Latest ${title.toLowerCase()} from Glaj News.` };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const data = await CategoryController.getPage(category);
  return <CategoryView data={data} />;
}

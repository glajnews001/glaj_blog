import { PostService } from "@/services/post.service";
import { SITE_NAME } from "@/utils/constants";
import { categoryLabel, absoluteUrl } from "@/utils/seo";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const posts = (await PostService.list()).filter((post) => new Date(post.createdAt).getTime() >= cutoff);
  const items = posts
    .map((post) => {
      const image = post.imageUrl ? `<news:image>${escapeXml(absoluteUrl(post.imageUrl))}</news:image>` : "";
      return `<url>
        <loc>${absoluteUrl(`/posts/${post.id}`)}</loc>
        <news:news>
          <news:publication>
            <news:name>${SITE_NAME}</news:name>
            <news:language>en</news:language>
          </news:publication>
          <news:publication_date>${new Date(post.createdAt).toISOString()}</news:publication_date>
          <news:title>${escapeXml(post.title)}</news:title>
          <news:keywords>${escapeXml(categoryLabel(post.category))}</news:keywords>
        </news:news>
        ${image}
      </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
    ${items}
  </urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}

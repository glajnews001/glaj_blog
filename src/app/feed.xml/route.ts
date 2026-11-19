import { PostService } from "@/services/post.service";
import { SITE_NAME } from "@/utils/constants";
import { metaDescription, siteUrl, absoluteUrl } from "@/utils/seo";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = (await PostService.list()).slice(0, 50);
  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/posts/${post.id}`);
      const image = post.imageUrl
        ? `<enclosure url="${escapeXml(absoluteUrl(post.imageUrl))}" type="image/jpeg" />`
        : "";
      return `<item>
        <title>${escapeXml(post.title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
        <category>${escapeXml(post.category)}</category>
        <description>${escapeXml(metaDescription(post.content))}</description>
        ${image}
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>${SITE_NAME}</title>
      <link>${siteUrl()}</link>
      <description>Latest stories from ${SITE_NAME}</description>
      <language>en</language>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
}

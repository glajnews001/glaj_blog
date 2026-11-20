import type { Metadata } from "next";
import type { PostView } from "@/models/post.model";
import { CATEGORIES, SITE_DESCRIPTION, SITE_NAME, SOCIAL_LINKS } from "@/utils/constants";
import { stripHtml } from "@/utils/html";

export function siteUrl() {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "https://glajblog.vercel.app").trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

export function absoluteUrl(path: string) {
  if (!path) return siteUrl();
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function metaDescription(html: string, fallback = SITE_DESCRIPTION) {
  const text = stripHtml(html || "");
  if (!text) return fallback;
  if (text.length <= 158) return text;
  const cut = text.slice(0, 158);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function categoryLabel(key: string) {
  return CATEGORIES.find((item) => item.key === key)?.title || key.replace(/-/g, " ");
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  index?: boolean;
  publishedTime?: string;
  authors?: string[];
  section?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const image = input.image ? absoluteUrl(input.image) : absoluteUrl("/image/logo.svg");
  const index = input.index !== false;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: { index, follow: true, googleBot: { index, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: input.type || "website",
      url,
      siteName: SITE_NAME,
      title: input.title,
      description: input.description,
      locale: "en_NG",
      images: [{ url: image, alt: input.title }],
      publishedTime: input.publishedTime,
      authors: input.authors,
      section: input.section,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
    keywords: [SITE_NAME, "Nigeria news", input.section, input.title].filter(Boolean) as string[],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/image/logo.svg"),
    },
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.x, SOCIAL_LINKS.instagram, SOCIAL_LINKS.linkedin],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    publisher: { "@type": "NewsMediaOrganization", name: SITE_NAME, url: siteUrl() },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl()}/news/{search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(post: PostView) {
  const url = absoluteUrl(`/posts/${post.id}`);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: metaDescription(post.content),
    image: post.imageUrl ? [absoluteUrl(post.imageUrl)] : [absoluteUrl("/image/logo.svg")],
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    articleSection: categoryLabel(post.category),
    keywords: categoryLabel(post.category),
    author: {
      "@type": "Person",
      name: post.PublishBy || SITE_NAME,
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/image/logo.svg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

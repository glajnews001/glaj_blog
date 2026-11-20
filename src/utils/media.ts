/**
 * Adds Cloudinary delivery transforms (auto format / quality / width) to a
 * Cloudinary image URL. Any other URL is returned unchanged.
 */
export function optimizeImageUrl(url: string, width = 800): string {
  const marker = "/image/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;
  if (/\/image\/upload\/[^/]*(f_auto|q_auto|w_\d+)/.test(url)) return url;
  return url.replace(marker, `${marker}f_auto,q_auto,w_${width}/`);
}

export const isCloudinaryUrl = (url: string, cloudName: string | undefined) =>
  Boolean(cloudName) && url.startsWith(`https://res.cloudinary.com/${cloudName}/`);

/**
 * Social-preview image (1200x630 JPEG). Facebook, WhatsApp, X and LinkedIn all
 * read JPEG reliably and ignore oversized or exotic formats.
 */
export function socialImageUrl(url: string): string {
  const marker = "/image/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;
  return url.replace(marker, `${marker}c_fill,g_auto,w_1200,h_630,q_auto,f_jpg/`);
}

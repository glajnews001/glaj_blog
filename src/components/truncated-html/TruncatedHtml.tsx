import { excerpt } from "@/utils/html";

export function TruncatedHtml({ html, maxLength }: { html?: string | null; maxLength?: number }) {
  const value = html || "";
  if (maxLength) {
    return <p className="text-[0.95rem] leading-6 text-black">{excerpt(value, maxLength)}</p>;
  }
  return <div className="article-body text-[1.05rem] leading-7 text-black" dangerouslySetInnerHTML={{ __html: value }} />;
}

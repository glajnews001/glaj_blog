import { cn } from "@/utils/cn";

type RichContentProps = { html: string; className?: string };

/** Renders article HTML (sanitised when it was saved) with the editor's formatting. */
export function RichContent({ html, className }: RichContentProps) {
  return <div className={cn("rich-content", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

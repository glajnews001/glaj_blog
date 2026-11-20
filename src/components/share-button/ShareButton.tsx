import type { ReactNode } from "react";

type ShareButtonProps = { href: string; label: string; color: string; children: ReactNode };

/** Round, brand-coloured share link that opens in a new tab. */
export function ShareButton({ href, label, color, children }: ShareButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      title={`Share on ${label}`}
      style={{ backgroundColor: color }}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-base text-white no-underline transition-opacity hover:opacity-80"
    >
      {children}
    </a>
  );
}

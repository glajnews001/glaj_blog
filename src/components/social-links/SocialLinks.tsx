import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { SOCIAL_LINKS } from "@/utils/constants";
import { cn } from "@/utils/cn";

type SocialLinksProps = {
  /** "bar" is the compact top-bar style, "footer" the larger round buttons. */
  variant?: "bar" | "footer";
  className?: string;
};

export function SocialLinks({ variant = "bar", className }: SocialLinksProps) {
  const footer = variant === "footer";
  const item = cn(
    "inline-flex items-center justify-center text-white transition-colors hover:text-gold",
    footer ? "mb-2.5 mr-2.5 h-10 w-10 rounded-full text-xl" : "mr-2 text-xl",
  );
  const rel = "noopener noreferrer";

  return (
    <div className={cn("flex items-center", className)}>
      <a href={SOCIAL_LINKS.facebook} className={item} aria-label="Facebook" target="_blank" rel={rel}>
        <TiSocialFacebook />
      </a>
      <a href={SOCIAL_LINKS.x} className={item} aria-label="X" target="_blank" rel={rel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/image/x.svg" alt="" className={footer ? "h-[30px]" : "h-3.5"} />
      </a>
      <a href={SOCIAL_LINKS.instagram} className={item} aria-label="Instagram" target="_blank" rel={rel}>
        <TiSocialInstagram />
      </a>
      <a href={SOCIAL_LINKS.linkedin} className={item} aria-label="LinkedIn" target="_blank" rel={rel}>
        <TiSocialLinkedin />
      </a>
    </div>
  );
}

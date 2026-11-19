import { TiSocialFacebook, TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { CATEGORIES, SOCIAL_LINKS } from "@/utils/constants";
import { FooterColumn } from "@/components/footer-column/FooterColumn";

const newsLinks = CATEGORIES.filter((item) => !["article", "career"].includes(item.key));
const opinionLinks = CATEGORIES.filter((item) => ["eye-witness", "article", "career"].includes(item.key));

export function Footer() {
  return (
    <footer className="bg-[#151515] px-4 py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap">
        <FooterColumn title="News" links={newsLinks.map((item) => ({ href: item.href, label: item.title }))} />
        <FooterColumn
          title="get help"
          links={[
            { href: "/contact", label: "Contact Us" },
            { href: "/contact", label: "Support" },
          ]}
        />
        <FooterColumn title="Opinion" links={opinionLinks.map((item) => ({ href: item.href, label: item.title }))} />
        <div className="mb-8 w-full px-4 sm:w-1/2 lg:w-1/4">
          <h4 className="relative mb-8 text-lg font-medium capitalize">
            follow us
            <span className="absolute bottom-[-10px] left-0 h-0.5 w-12 bg-[#E91E63]" />
          </h4>
          <div className="flex gap-3 text-xl">
            <a href={SOCIAL_LINKS.facebook} className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-[goldenrod]" aria-label="Facebook">
              <TiSocialFacebook />
            </a>
            <a href={SOCIAL_LINKS.x} className="flex h-10 w-10 items-center justify-center" aria-label="X">
              <img src="/image/x.svg" alt="" className="h-5 w-5" />
            </a>
            <a href={SOCIAL_LINKS.instagram} className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-[goldenrod]" aria-label="Instagram">
              <TiSocialInstagram />
            </a>
            <a href={SOCIAL_LINKS.linkedin} className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:text-[goldenrod]" aria-label="LinkedIn">
              <TiSocialLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

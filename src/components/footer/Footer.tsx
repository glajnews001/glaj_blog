import { FooterColumn } from "@/components/footer-column/FooterColumn";
import { SocialLinks } from "@/components/social-links/SocialLinks";

const newsLinks = [
  { href: "/category/politics", label: "Politics" },
  { href: "/category/business", label: "Business" },
  { href: "/category/sport", label: "Sport" },
  { href: "/category/entertainment", label: "Entertainment" },
  { href: "/category/eye-witness", label: "Eye-witness" },
  { href: "/category/foreign", label: "Foreign" },
  { href: "/category/education", label: "Education" },
  { href: "/category/extra", label: "Extra" },
];

const helpLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/contact", label: "Support" },
];

const opinionLinks = [
  { href: "/category/eye-witness", label: "Eye-witness" },
  { href: "/category/article", label: "Article" },
  { href: "/category/career", label: "Career" },
];

export function Footer() {
  return (
    <footer className="bg-footer py-12 tablet:py-20">
      <div className="mx-auto flex flex-wrap">
        <FooterColumn title="News" links={newsLinks} />
        <FooterColumn title="Get help" links={helpLinks} />
        <FooterColumn title="Opinion" links={opinionLinks} />
        <FooterColumn title="Follow us">
          <SocialLinks variant="footer" className="flex-wrap" />
        </FooterColumn>
      </div>
    </footer>
  );
}

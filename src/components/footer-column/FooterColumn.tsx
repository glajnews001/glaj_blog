import Link from "next/link";

export function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="mb-8 w-full px-4 sm:w-1/2 lg:w-1/4">
      <h4 className="relative mb-8 text-lg font-medium capitalize">
        {title}
        <span className="absolute bottom-[-10px] left-0 h-0.5 w-12 bg-[#E91E63]" />
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link href={link.href} className="text-base font-light text-[#ddd] capitalize hover:pl-2 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

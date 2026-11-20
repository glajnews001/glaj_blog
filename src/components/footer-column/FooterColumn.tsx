import Link from "next/link";
import type { ReactNode } from "react";

export type FooterLink = { href: string; label: string };

type FooterColumnProps = {
  title: string;
  links?: FooterLink[];
  children?: ReactNode;
};

export function FooterColumn({ title, links, children }: FooterColumnProps) {
  return (
    <div className="mb-[30px] w-full px-[15px] min-[575px]:w-1/2 min-[768px]:mb-0 min-[768px]:w-1/4">
      <h4 className="relative mb-[35px] text-lg font-medium capitalize text-white before:absolute before:-bottom-2.5 before:left-0 before:h-0.5 before:w-[50px] before:bg-[#e91e63] before:content-['']">
        {title}
      </h4>
      {links && (
        <ul className="m-0 list-none p-0">
          {links.map((link) => (
            <li key={`${link.href}-${link.label}`} className="[&:not(:last-child)]:mb-2.5">
              <Link
                href={link.href}
                className="block text-base font-light capitalize text-[#ddd] no-underline transition-all duration-300 hover:pl-[7px] hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}

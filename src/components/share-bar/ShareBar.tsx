"use client";

import { FaFacebook, FaLinkedin, FaPinterest, FaReddit, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function ShareBar({ url, title, image }: { url: string; title: string; image?: string }) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  const links = [
    { href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, label: "Facebook", icon: <FaFacebook /> },
    { href: `https://pinterest.com/pin/create/button/?url=${encoded}&media=${encodeURIComponent(image || "")}&description=${text}`, label: "Pinterest", icon: <FaPinterest /> },
    { href: `https://www.reddit.com/submit?url=${encoded}&title=${text}`, label: "Reddit", icon: <FaReddit /> },
    { href: `https://wa.me/?text=${encodeURIComponent(`${title} - Check out this news on Glaj News: ${url}`)}`, label: "WhatsApp", icon: <FaWhatsapp /> },
    { href: `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`, label: "X", icon: <FaXTwitter /> },
    { href: `https://t.me/share/url?url=${encoded}&text=${text}`, label: "Telegram", icon: <FaTelegram /> },
    { href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`, label: "LinkedIn", icon: <FaLinkedin /> },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4">
      <h2 className="pr-3 text-xl">Social Share :</h2>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#01017a] text-sm text-white">
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

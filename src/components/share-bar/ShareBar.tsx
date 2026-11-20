import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaRedditAlien,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ShareButton } from "@/components/share-button/ShareButton";
import { SITE } from "@/utils/constants";

type ShareBarProps = { url: string; title: string; imageUrl?: string };

export function ShareBar({ url, title, imageUrl }: ShareBarProps) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const message = encodeURIComponent(`${title} - Check out this news on ${SITE.name}: ${url}`);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-4">
      <h2 className="m-0 text-2xl">Social Share :</h2>
      <div className="flex flex-wrap gap-2.5">
        <ShareButton label="Facebook" color="#3b5998" href={`https://www.facebook.com/sharer/sharer.php?u=${u}`}>
          <FaFacebookF />
        </ShareButton>
        <ShareButton
          label="Pinterest"
          color="#cb2027"
          href={`https://pinterest.com/pin/create/button/?url=${u}&media=${encodeURIComponent(imageUrl ?? "")}&description=${t}`}
        >
          <FaPinterestP />
        </ShareButton>
        <ShareButton label="Reddit" color="#ff4500" href={`https://www.reddit.com/submit?url=${u}&title=${t}`}>
          <FaRedditAlien />
        </ShareButton>
        <ShareButton label="WhatsApp" color="#25d366" href={`https://wa.me/?text=${message}`}>
          <FaWhatsapp />
        </ShareButton>
        <ShareButton label="X" color="#000" href={`https://twitter.com/intent/tweet?url=${u}&text=${t}`}>
          <FaXTwitter />
        </ShareButton>
        <ShareButton label="Telegram" color="#0088cc" href={`https://t.me/share/url?url=${u}&text=${t}`}>
          <FaTelegramPlane />
        </ShareButton>
        <ShareButton
          label="LinkedIn"
          color="#007fb1"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
        >
          <FaLinkedinIn />
        </ShareButton>
      </div>
    </div>
  );
}

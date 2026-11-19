import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/utils/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Glaj News",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#002e5f",
    lang: "en",
    icons: [{ src: "/image/logo.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

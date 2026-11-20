export const SITE = {
  name: "Glaj News",
  title: "Glaj News - News in one place",
  description:
    "Glaj News brings you the latest politics, sport, business, entertainment, education and foreign news in one place.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://glajnews.com").replace(/\/$/, ""),
  adClient: "ca-pub-7832400333464323",
} as const;

export const AD_SLOTS = {
  homeTop: "6701540410",
  homeMiddle: "5196887055",
  post: "8752988689",
  categoryTop: "4707848185",
  categoryMiddle: "1031993914",
  categoryEmpty: "7330142093",
} as const;

export type CategoryDef = { slug: string; label: string };

/** Categories shown in the navigation bar, in order. */
export const NAV_CATEGORIES: CategoryDef[] = [
  { slug: "politics", label: "Politics" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "business", label: "Business" },
  { slug: "sport", label: "Sport" },
  { slug: "foreign", label: "Foreign" },
  { slug: "eye-witness", label: "Eye witness" },
  { slug: "education", label: "Education" },
  { slug: "extra", label: "Extra" },
  { slug: "article", label: "Article" },
  { slug: "career", label: "Career" },
];

/** Categories that get their own block on the home page, in order. */
export const HOME_SECTIONS: CategoryDef[] = [
  { slug: "politics", label: "Politics" },
  { slug: "sport", label: "Sport" },
  { slug: "education", label: "Education" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "business", label: "Business" },
  { slug: "foreign", label: "Foreign" },
  { slug: "eye-witness", label: "Eye-witness" },
  { slug: "extra", label: "Extra" },
  { slug: "article", label: "Article" },
  { slug: "career", label: "Career" },
];

/** Categories offered in the "create post" form. */
export const POST_CATEGORIES: CategoryDef[] = [
  { slug: "sport", label: "Sport" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "politics", label: "Politics" },
  { slug: "eye-witness", label: "Eye-witness" },
  { slug: "business", label: "Business" },
  { slug: "foreign", label: "Foreign" },
  { slug: "education", label: "Education" },
  { slug: "extra", label: "Extra" },
  { slug: "article", label: "Article" },
  { slug: "career", label: "Career" },
];

/** Categories that get a row on the video gallery page. */
export const VIDEO_SECTIONS: CategoryDef[] = [
  { slug: "politics", label: "Politics" },
  { slug: "sport", label: "Sport" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "business", label: "Business" },
];

/**
 * Stored values for the blog type. "Normal " (with the trailing space) is the
 * value the original site wrote for "Latest News", so it is kept for compatibility.
 */
export const BLOG_TYPE = {
  TRENDING: "Trending",
  LATEST: "Normal ",
  NORMAL: "Not-Normal",
} as const;

export const BLOG_TYPE_OPTIONS = [
  { value: BLOG_TYPE.TRENDING, label: "Trending" },
  { value: BLOG_TYPE.LATEST, label: "Latest News" },
  { value: BLOG_TYPE.NORMAL, label: "Normal" },
];

export const FILE_TYPE = { IMAGE: "image", VIDEO: "video" } as const;
export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];

export const ROLE = { SUPER_ADMIN: "super_admin", ADMIN: "admin" } as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100081678427449",
  x: "https://twitter.com/GlajNews15279?t=Jy5JRJcK2QQP4O2jfS_8yw&s=09",
  instagram: "https://www.instagram.com/invites/contact/?i=n3px60k8t1go&utm_content=tkbelb3",
  linkedin: "https://www.linkedin.com/in/glaj-news-06b9462a9",
} as const;

export const UPLOAD_LIMITS = {
  imageBytes: 10 * 1024 * 1024,
  videoBytes: 100 * 1024 * 1024,
} as const;

export const PAGE_SIZE = { admin: 20, category: 100, search: 100 } as const;

export const SESSION_COOKIE = "glaj_session";
export const SESSION_DAYS = 7;

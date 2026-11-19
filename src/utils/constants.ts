export const SITE_NAME = "Glaj-news";
export const SITE_DESCRIPTION = "News in one place";

export const CATEGORIES = [
  { key: "politics", title: "Politics", href: "/category/politics" },
  { key: "entertainment", title: "Entertainment", href: "/category/entertainment" },
  { key: "business", title: "Business", href: "/category/business" },
  { key: "sport", title: "Sport", href: "/category/sport" },
  { key: "foreign", title: "Foreign", href: "/category/foreign" },
  { key: "eye-witness", title: "Eye witness", href: "/category/eye-witness" },
  { key: "education", title: "Education", href: "/category/education" },
  { key: "extra", title: "Extra", href: "/category/extra" },
  { key: "article", title: "Article", href: "/category/article" },
  { key: "career", title: "Career", href: "/category/career" },
  { key: "documentary", title: "Documentary", href: "/category/documentary" },
] as const;

export const HOME_SECTIONS = [
  { key: "politics", title: "Politics", href: "/category/politics" },
  { key: "sport", title: "Sport", href: "/category/sport" },
  { key: "education", title: "Education", href: "/category/education" },
  { key: "entertainment", title: "Entertainment", href: "/category/entertainment" },
  { key: "business", title: "Business", href: "/category/business" },
  { key: "foreign", title: "Foreign", href: "/category/foreign" },
  { key: "eye-witness", title: "Eye witness", href: "/category/eye-witness" },
  { key: "extra", title: "Extra", href: "/category/extra" },
  { key: "article", title: "Article", href: "/category/article" },
  { key: "career", title: "Career", href: "/category/career" },
  { key: "documentary", title: "Documentary", href: "/category/documentary" },
] as const;

export const BLOG_TYPES = [
  { value: "Trending", label: "Trending" },
  { value: "Normal ", label: "Latest News" },
  { value: "Not-Normal", label: "Normal" },
] as const;

export const FILE_TYPES = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
] as const;

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=100081678427449",
  x: "https://twitter.com/GlajNews15279?t=Jy5JRJcK2QQP4O2jfS_8yw&s=09",
  instagram: "https://www.instagram.com/invites/contact/?i=n3px60k8t1go&utm_content=tkbelb3",
  linkedin: "https://www.linkedin.com/in/glaj-news-06b9462a9",
} as const;

export const AD_CLIENT = "ca-pub-7832400333464323";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const SESSION_COOKIE = "glaj_session";

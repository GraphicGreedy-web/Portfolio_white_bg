export const SITE_NAME = "Graphic Greedy";
export const SITE_URL = "https://graphicgreedyportfolio.vercel.app";
export const SITE_LOCALE = "en_IN";
export const SITE_LANGUAGE = "en";
export const SITE_DESCRIPTION =
  "Graphic Greedy is a graphic design portfolio for logo design, visual communication, brand storytelling, video editing, and creative direction.";
export const SITE_EMAIL = "workwithgraphicgreedy@gmail.com";
export const SITE_SOCIAL_IMAGE = `${SITE_URL}/social-preview.svg`;
export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, nofollow, noarchive, nosnippet";
export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || "";
export const TWITTER_HANDLE = import.meta.env.VITE_TWITTER_HANDLE || "";

export const defaultKeywords = [
  "graphic designer portfolio",
  "logo design portfolio",
  "visual communication designer",
  "video editing portfolio",
  "creative direction portfolio",
  "brand identity designer",
  "performance marketing creatives",
];

export const buildCanonicalUrl = (path = "/") =>
  `${SITE_URL}${path === "/" ? "" : path}`;

export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

export const buildBrandPath = (brandId: string, title?: string) =>
  `/logo-designing/${brandId}${title ? `/${toSlug(title)}` : ""}`;

export const buildVisualPath = (visualId: string, title?: string) =>
  `/visual-communication/${visualId}${title ? `/${toSlug(title)}` : ""}`;

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export const buildBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: buildCanonicalUrl(item.path),
  })),
});

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: SITE_LANGUAGE,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    email: SITE_EMAIL,
  },
});

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: SITE_EMAIL,
  image: SITE_SOCIAL_IMAGE,
  logo: SITE_SOCIAL_IMAGE,
  sameAs: [
    "https://instagram.com/graphic_greedy",
    "https://linkedin.com",
  ],
});

export const buildPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  jobTitle: "Graphic Designer",
  description:
    "Graphic designer focused on logo design, visual communication, video editing, and creative direction.",
  email: SITE_EMAIL,
  url: SITE_URL,
  image: SITE_SOCIAL_IMAGE,
});

export const buildCollectionSchema = ({
  name,
  description,
  path,
  keywords = [],
}: {
  name: string;
  description: string;
  path: string;
  keywords?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name,
  description,
  url: buildCanonicalUrl(path),
  keywords: keywords.join(", "),
});

export const buildContactPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Graphic Greedy",
  description:
    "Contact Graphic Greedy for logo design, visual communication, video editing, and creative direction projects.",
  url: buildCanonicalUrl("/contact"),
  mainEntity: {
    "@type": "Person",
    name: SITE_NAME,
    email: SITE_EMAIL,
  },
});

export const buildImageWorkSchema = ({
  title,
  description,
  image,
  path,
  type = "CreativeWork",
}: {
  title: string;
  description: string;
  image?: string;
  path: string;
  type?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": type,
  name: title,
  description,
  image,
  url: buildCanonicalUrl(path),
  creator: {
    "@type": "Person",
    name: SITE_NAME,
  },
});

export const buildVideoCollectionSchema = ({
  videos,
}: {
  videos: Array<{ title: string; description?: string; thumbnail?: string; link?: string }>;
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Videos",
  description:
    "Video editing and motion storytelling portfolio featuring brand films, promotional cuts, and creative video work.",
  url: buildCanonicalUrl("/videos"),
  hasPart: videos
    .filter((video) => video.link || video.thumbnail)
    .map((video) => ({
      "@type": "VideoObject",
      name: video.title,
      description:
        video.description ||
        `${video.title} from the Graphic Greedy video editing portfolio.`,
      thumbnailUrl: video.thumbnail,
      embedUrl: video.link,
    })),
});

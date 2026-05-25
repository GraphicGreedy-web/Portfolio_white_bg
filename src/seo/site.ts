export const SITE_NAME = "Graphic Greedy";
export const SITE_URL = "https://graphicgreedyportfolio.vercel.app";
export const SITE_LOCALE = "en_IN";
export const SITE_DESCRIPTION =
  "Graphic Greedy is a graphic design portfolio for logo design, visual communication, brand storytelling, video editing, and creative direction.";
export const SITE_EMAIL = "workwithgraphicgreedy@gmail.com";
export const SITE_SOCIAL_IMAGE = `${SITE_URL}/social-preview.svg`;
export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex, nofollow, noarchive, nosnippet";

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
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: SITE_NAME,
    email: SITE_EMAIL,
  },
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

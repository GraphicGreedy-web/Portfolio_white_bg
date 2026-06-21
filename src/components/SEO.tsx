import { useEffect } from "react";
import {
  buildCanonicalUrl,
  DEFAULT_ROBOTS,
  GOOGLE_SITE_VERIFICATION,
  NOINDEX_ROBOTS,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_SOCIAL_IMAGE,
  SITE_URL,
  TWITTER_HANDLE,
} from "../seo/site";

type SeoProps = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  robots?: string;
  type?: string;
  schema?: Array<Record<string, unknown>>;
};

const ensureMetaTag = (selector: string, attribute: "name" | "property", value: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, value);
    document.head.appendChild(tag);
  }

  return tag;
};

const ensureLinkTag = (rel: string) => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  return tag;
};

export default function SEO({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = SITE_SOCIAL_IMAGE,
  robots = DEFAULT_ROBOTS,
  type = "website",
  schema = [],
}: SeoProps) {
  useEffect(() => {
    const fullTitle =
      title === SITE_NAME || title.endsWith(`| ${SITE_NAME}`)
        ? title
        : `${title} | ${SITE_NAME}`;
    const canonical = buildCanonicalUrl(path);
    const resolvedImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;
    document.documentElement.lang = "en";

    ensureMetaTag('meta[name="description"]', "name", "description").content =
      description;
    ensureMetaTag('meta[name="robots"]', "name", "robots").content = robots;
    ensureMetaTag('meta[name="author"]', "name", "author").content = SITE_NAME;
    ensureMetaTag('meta[name="language"]', "name", "language").content = "en";
    ensureMetaTag('meta[name="theme-color"]', "name", "theme-color").content =
      "#111827";
    ensureMetaTag(
      'meta[name="format-detection"]',
      "name",
      "format-detection"
    ).content = "telephone=no";
    if (GOOGLE_SITE_VERIFICATION) {
      ensureMetaTag(
        'meta[name="google-site-verification"]',
        "name",
        "google-site-verification"
      ).content = GOOGLE_SITE_VERIFICATION;
    }
    ensureMetaTag('meta[property="og:type"]', "property", "og:type").content = type;
    ensureMetaTag('meta[property="og:title"]', "property", "og:title").content =
      fullTitle;
    ensureMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description"
    ).content = description;
    ensureMetaTag('meta[property="og:url"]', "property", "og:url").content =
      canonical;
    ensureMetaTag(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name"
    ).content = SITE_NAME;
    ensureMetaTag(
      'meta[property="og:locale"]',
      "property",
      "og:locale"
    ).content = SITE_LOCALE;
    ensureMetaTag('meta[property="og:image"]', "property", "og:image").content =
      resolvedImage;
    ensureMetaTag(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt"
    ).content = fullTitle;
    ensureMetaTag('meta[name="twitter:card"]', "name", "twitter:card").content =
      "summary_large_image";
    if (TWITTER_HANDLE) {
      ensureMetaTag('meta[name="twitter:site"]', "name", "twitter:site").content =
        TWITTER_HANDLE;
      ensureMetaTag(
        'meta[name="twitter:creator"]',
        "name",
        "twitter:creator"
      ).content = TWITTER_HANDLE;
    }
    ensureMetaTag(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title"
    ).content = fullTitle;
    ensureMetaTag(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description"
    ).content = description;
    ensureMetaTag(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image"
    ).content = resolvedImage;

    ensureLinkTag("canonical").href = canonical;
    ensureLinkTag("manifest").href = "/manifest.json";
    ensureLinkTag("alternate").setAttribute("type", "application/rss+xml");
    ensureLinkTag("alternate").setAttribute("title", `${SITE_NAME} Updates`);
    ensureLinkTag("alternate").href = "/feed.xml";
    ensureLinkTag("icon").href = "/favicon.svg";
    ensureLinkTag("apple-touch-icon").href = "/icon-192.svg";

    const priorScripts = document.head.querySelectorAll(
      'script[data-managed-seo="true"]'
    );
    priorScripts.forEach((script) => script.remove());

    schema.forEach((entry) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.managedSeo = "true";
      script.text = JSON.stringify(entry);
      document.head.appendChild(script);
    });

    return () => {
      document.head
        .querySelectorAll('script[data-managed-seo="true"]')
        .forEach((script) => script.remove());
    };
  }, [description, image, path, robots, schema, title, type]);

  return null;
}

export const noindexRobots = NOINDEX_ROBOTS;

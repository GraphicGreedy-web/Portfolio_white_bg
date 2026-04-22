import { useEffect, useState } from "react";
import SmartImage from "./SmartImage";

type PortfolioMediaProps = {
  src: string;
  alt: string;
  className?: string;
};

const INSTAGRAM_HOSTS = ["instagram.com", "www.instagram.com"];

export const isInstagramPostUrl = (src: string) => {
  try {
    const url = new URL(src);
    return INSTAGRAM_HOSTS.includes(url.hostname);
  } catch {
    return false;
  }
};

export const getInstagramEmbedUrl = (src: string) => {
  const trimmedSrc = src.endsWith("/") ? src.slice(0, -1) : src;
  return `${trimmedSrc}/embed/captioned`;
};

const getInstagramThumbnailUrl = (src: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) return "";

  return `${apiUrl}/api/instagram/thumbnail?url=${encodeURIComponent(src)}`;
};

export default function PortfolioMedia({
  src,
  alt,
  className = "",
}: PortfolioMediaProps) {
  const [instagramThumbnail, setInstagramThumbnail] = useState("");

  useEffect(() => {
    if (!isInstagramPostUrl(src)) return;

    const thumbnailUrl = getInstagramThumbnailUrl(src);
    if (!thumbnailUrl) return;

    let isMounted = true;
    setInstagramThumbnail("");

    fetch(thumbnailUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Thumbnail request failed");
        return response.json();
      })
      .then((data) => {
        if (isMounted) setInstagramThumbnail(data.image || "");
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [src]);

  if (isInstagramPostUrl(src)) {
    return (
      <SmartImage
        src={instagramThumbnail}
        alt={alt}
        className={className}
      />
    );
  }

  return <SmartImage src={src} alt={alt} className={className} />;
}

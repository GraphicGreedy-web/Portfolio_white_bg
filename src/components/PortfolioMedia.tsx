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

export default function PortfolioMedia({
  src,
  alt,
  className = "",
}: PortfolioMediaProps) {
  if (isInstagramPostUrl(src)) {
    return (
      <iframe
        src={getInstagramEmbedUrl(src)}
        title={alt}
        className={className}
        loading="lazy"
        allowTransparency={true}
      />
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

import { Link, useParams } from "react-router-dom";
import PortfolioMedia, {
  isInstagramPostUrl,
} from "../components/PortfolioMedia";
import { getSingleBrandHook } from "../hooks/fetchHook.js";
import SEO, { noindexRobots } from "../components/SEO";
import {
  buildBrandPath,
  buildBreadcrumbSchema,
  buildImageWorkSchema,
} from "../seo/site";
function BrandDesignCard() {
  const { brandId } = useParams();
  const singleBrand = getSingleBrandHook(brandId);
  const canonicalPath =
    brandId && singleBrand?.title
      ? buildBrandPath(brandId, singleBrand.title)
      : brandId
        ? `/logo-designing/${brandId}`
        : "/logo-designing";

  if (singleBrand === undefined) {
    return (
      <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
        <SEO
          title="Logo Design Project"
          description="Loading a logo design project from the Graphic Greedy portfolio."
          path={brandId ? `/logo-designing/${brandId}` : "/logo-designing"}
          robots={noindexRobots}
        />
        <div className="max-w-5xl mx-auto py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Brand Preview
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900">
            Loading image...
          </h1>
        </div>
      </div>
    );
  }

  if (!singleBrand) {
    return (
      <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
        <SEO
          title="Logo Design Project Not Found"
          description="This logo design project could not be found."
          path={brandId ? `/logo-designing/${brandId}` : "/logo-designing"}
          robots={noindexRobots}
        />
        <div className="max-w-5xl mx-auto py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Brand Preview
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900">
            Image not found
          </h1>
          <Link
            to="/logo-designing"
            className="mt-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Logo Designing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
      <SEO
        title={`${singleBrand.title || "Logo Design"} Portfolio Project`}
        description={`View ${singleBrand.title || "this logo design project"} from the Graphic Greedy logo design portfolio, including branding-focused visual identity work.`}
        path={canonicalPath}
        image={singleBrand.image}
        schema={[
          buildImageWorkSchema({
            title: singleBrand.title || "Logo design project",
            description: `${singleBrand.title || "Logo design project"} from the Graphic Greedy portfolio.`,
            image: singleBrand.image,
            path: canonicalPath,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Logo Designing", path: "/logo-designing" },
            {
              name: singleBrand.title || "Logo Design Project",
              path: canonicalPath,
            },
          ]),
        ]}
      />
      <div className="max-w-6xl mx-auto py-12 lg:py-16">
        <Link
          to="/logo-designing"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to Logo Designing
        </Link>

        <div className="mt-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Brand Preview
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900">
            {singleBrand.title || "Untitled Brand"}
          </h1>
          {isInstagramPostUrl(singleBrand.image) && (
            <a
              href={singleBrand.image}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900 hover:text-gray-900"
            >
              Open on Instagram
            </a>
          )}
        </div>

        <div className="mt-10 rounded-[2rem] border border-gray-200 bg-gray-50 p-4 lg:p-8 shadow-sm">
          {singleBrand.image ? (
            <PortfolioMedia
              src={singleBrand.image}
              alt={singleBrand.title || "Brand image"}
              className="mx-auto min-h-[420px] w-full rounded-[1.5rem] bg-white"
            />
          ) : (
            <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] bg-white text-gray-500">
              Image not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrandDesignCard;

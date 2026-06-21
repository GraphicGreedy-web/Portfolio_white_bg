import { Link, useParams } from "react-router-dom";
import { getSingleVisualCommHook } from "../hooks/fetchHook.js";
import SmartImage from "../components/SmartImage";
import SEO, { noindexRobots } from "../components/SEO";
import {
  buildBreadcrumbSchema,
  buildImageWorkSchema,
  buildVisualPath,
} from "../seo/site";

interface Poster {
  _id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

export default function VisualCommunicationCard() {
  const { visualId } = useParams();
  const poster = getSingleVisualCommHook(visualId) as Poster | null | undefined;
  const canonicalPath =
    visualId && poster?.title
      ? buildVisualPath(visualId, poster.title)
      : visualId
        ? `/visual-communication/${visualId}`
        : "/visual-communication";

  if (poster === undefined) {
    return (
      <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
        <SEO
          title="Visual Communication Project"
          description="Loading a visual communication project from the Graphic Greedy portfolio."
          path={visualId ? `/visual-communication/${visualId}` : "/visual-communication"}
          robots={noindexRobots}
        />
        <div className="max-w-5xl mx-auto py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Visual Preview
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900">
            Loading image...
          </h1>
        </div>
      </div>
    );
  }

  if (!poster) {
    return (
      <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
        <SEO
          title="Visual Communication Project Not Found"
          description="This visual communication project could not be found."
          path={visualId ? `/visual-communication/${visualId}` : "/visual-communication"}
          robots={noindexRobots}
        />
        <div className="max-w-5xl mx-auto py-16 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Visual Preview
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900">
            Image not found
          </h1>
          <Link
            to="/visual-communication"
            className="mt-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back to Visual Communication
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 px-6 lg:px-12">
      <SEO
        title={`${poster.title || "Visual Communication"} Portfolio Project`}
        description={
          poster.description ||
          `View ${poster.title || "this visual communication project"} from the Graphic Greedy portfolio, featuring poster design and visual storytelling work.`
        }
        path={canonicalPath}
        image={poster.image}
        schema={[
          buildImageWorkSchema({
            title: poster.title || "Visual communication project",
            description:
              poster.description ||
              `${poster.title || "Visual communication project"} from the Graphic Greedy portfolio.`,
            image: poster.image,
            path: canonicalPath,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Visual Communication", path: "/visual-communication" },
            {
              name: poster.title || "Visual Communication Project",
              path: canonicalPath,
            },
          ]),
        ]}
      />
      <div className="max-w-6xl mx-auto py-12 lg:py-16">
        <Link
          to="/visual-communication"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Back to Visual Communication
        </Link>

        <div className="mt-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            {poster.category || "Visual Preview"}
          </p>
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900">
            {poster.title || "Untitled Visual"}
          </h1>
          {poster.description && (
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              {poster.description}
            </p>
          )}
        </div>

        <div className="mt-10 rounded-[2rem] border border-gray-200 bg-gray-50 p-4 lg:p-8 shadow-sm">
          {poster.image ? (
            <SmartImage
              src={poster.image}
              alt={poster.title || "Visual communication image"}
              className="mx-auto max-h-[78vh] w-full rounded-[1.5rem] bg-white object-contain"
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

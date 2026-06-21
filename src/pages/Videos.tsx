import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { getVideoHook } from "../hooks/fetchHook.js";
import SmartImage from "../components/SmartImage";
import CollectionLoader from "../components/CollectionLoader";
import SEO from "../components/SEO";
import {
  buildBreadcrumbSchema,
  buildVideoCollectionSchema,
} from "../seo/site";
interface Video {
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  link?: string;
}
export default function Videos() {
  const videos = getVideoHook() as Video[];
  if (!videos.length) {
    return (
      <>
        <SEO
          title="Video Editing Portfolio"
          description="See video editing work from Graphic Greedy, including brand films, promotional edits, motion storytelling, and social media video content."
          path="/videos"
          schema={[
            buildVideoCollectionSchema({ videos: [] }),
            buildBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Videos", path: "/videos" },
            ]),
          ]}
        />
        <CollectionLoader
          title="Videos"
          description="Cinematic storytelling through motion design, brand films, and video content that captivates and engages audiences."
          cardClassName="aspect-video rounded-2xl"
          count={6}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <SEO
        title="Video Editing Portfolio"
        description="See video editing work from Graphic Greedy, including brand films, promotional edits, motion storytelling, and social media video content."
        path="/videos"
        schema={[
          buildVideoCollectionSchema({
            videos: videos.map((video) => ({
              title: video.title,
              thumbnail: video.thumbnail,
              link: video.link,
            })),
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Videos", path: "/videos" },
          ]),
        ]}
      />
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
            Videos
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Cinematic storytelling through motion design, brand films, and video
            content that captivates and engages audiences.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videos.map((video, index) => (
              <button
                key={video._id}
                type="button"
                onClick={() => {
                  if (video.link) {
                    window.open(video.link, "_blank", "noopener,noreferrer");
                  }
                }}
                aria-label={
                  video.link
                    ? `Watch ${video.title}`
                    : `${video.title} video preview`
                }
                className="group relative aspect-video rounded-2xl overflow-hidden bg-gray-100 hover:scale-[1.02] transition-all duration-500"
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <SmartImage
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                    <Play
                      size={24}
                      className="text-gray-900 ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-full">
                    {video.duration}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/80 text-sm mb-1">{video.category}</p>
                  <h3 className="text-white text-lg font-serif font-bold">
                    {video.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                Video Production Services
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From concept to final cut, we create compelling video content
                that tells your brand's story with impact and authenticity.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Brand Films & Commercials",
                  "Motion Graphics & Animation",
                  "Social Media Content",
                  "Event Coverage",
                  "Product Videos",
                  "Corporate Communications",
                ].map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium"
              >
                Start a Video Project
              </Link>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <SmartImage
                src={videos[0]?.thumbnail || ""}
                alt="Video production"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

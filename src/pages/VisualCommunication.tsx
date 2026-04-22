import { useNavigate } from "react-router-dom";
import { getVisualCommHook } from "../hooks/fetchHook.js";
import SmartImage from "../components/SmartImage";
interface Poster {
  _id: string;
  title: string;
  category: string;
  image: string;
}

export default function VisualCommunication() {
  const navigate = useNavigate();
  const posters = getVisualCommHook() as Poster[];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
            Visual Communication
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Powerful visual narratives through posters, prints, and editorial
            design. Each piece tells a story and commands attention.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {posters.map((poster, index) => (
              <button
                key={poster._id}
                onClick={() => navigate(`/visual-communication/${poster._id}`)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 hover:scale-[1.02] transition-all duration-500"
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <SmartImage
                  src={poster.image}
                  alt={poster.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/80 text-sm mb-1">
                    {poster.category}
                  </p>
                  <h3 className="text-white text-lg font-serif font-bold">
                    {poster.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Need Custom Visual Design?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Let's create compelling visuals that capture attention and
            communicate your message effectively.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium"
          >
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
}

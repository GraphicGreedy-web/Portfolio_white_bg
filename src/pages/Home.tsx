import { Link } from "react-router-dom";
import {
  ChevronDown,
  Palette,
  Layers,
  Film,
  TrendingUp,
  Video,
  Pen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useFeatures } from "../hooks/variableHook.js";
import PortfolioMedia from "../components/PortfolioMedia";
export default function Home() {
  const { videos, brands, visuals } = useFeatures();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: Palette,
      title: "Search Engine Optimization",
      description: "Proper Search to get your website at top",
    },
    {
      icon: Pen,
      title: "Logo Design",
      description: "Distinctive logos that capture brand essence",
    },
    // {
    //   icon: Layers,
    //   title: "Brand Identity",
    //   description: "Complete visual systems for cohesive brands",
    // },
    {
      icon: Film,
      title: "Visual Communication",
      description: "Compelling posters and visual narratives",
    },
    {
      icon: TrendingUp,
      title: "Performance Marketing",
      description: "Strategic designs that drive results",
    },
    {
      icon: Video,
      title: "Video Editing",
      description: "Cinematic editing",
    },
  ];

  const featuredWorks = [
    brands[0] && {
      ...brands[0],
      image: brands[0].image,
      link: `/logo-designing/${brands[0]._id}`,
    },
    visuals[0] && {
      ...visuals[0],
      image: visuals[0].image,
      link: `/visual-communication/${visuals[0]._id}`,
    },
    videos[0] && {
      ...videos[0],
      image: videos[0].thumbnail,
      link: videos[0].link || "/videos",
    },
  ].filter(Boolean);
  if (!featuredWorks.length) {
    return (
      <div className="hero-startup-loader">
        <div className="hero-startup-loader__mark" />
        <p className="hero-startup-loader__eyebrow">Graphic Greedy</p>
        <h1 className="hero-startup-loader__title">Loading portfolio</h1>
      </div>
    );
  }
  console.log("feayres: ", featuredWorks);
  return (
    <div className="min-h-screen bg-white">
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-tight mb-6">
            Graphic Greedy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Creating premium visual experiences that elevate brands and
            captivate audiences through thoughtful design and strategic
            creativity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/logo-designing"
              className="px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium text-decoration-none"
            >
              View Portfolio
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105 font-medium text-decoration-none"
            >
              About Me
            </Link>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              Featured Work
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A selection of recent projects showcasing brand design, visual
              identity, and creative direction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {featuredWorks.map((work, index) => (
              <Link
                key={work._id}
                to={work.link}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] transition-all duration-500 hover:scale-[1.02]"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <PortfolioMedia
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/80 text-sm mb-2">{work.category}</p>
                  <h3 className="text-white text-2xl font-serif font-bold">
                    {work.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
              What We Do
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive design services to bring your brand vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group p-8 rounded-2xl border-2 border-gray-100 hover:border-gray-900 transition-all duration-500 hover:shadow-xl"
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-500">
                  <service.icon
                    size={24}
                    className="text-gray-900 group-hover:text-white transition-colors duration-500"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            Let's Create Something Extraordinary
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Ready to elevate your brand? Get in touch and let's discuss your
            project.
          </p>
          <Link
            to="/contact"
            className="underline-none inline-block px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}

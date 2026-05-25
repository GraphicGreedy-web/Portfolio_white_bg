import { Link } from 'react-router-dom';
import { Award, Users, Zap, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import {
  buildBreadcrumbSchema,
  buildPersonSchema,
} from '../seo/site';

export default function About() {
  const skills = [
    // 'Brand Identity Design',
    'Logo Design',
    'Visual Communication',
   //'Typography',
   //'Color Theory',
  //'Motion Design',
    'Video Editing',
   //'Creative Direction',
    'Performance Marketing',
  ];

  const tools = [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Premiere Pro',
    'Meta ads manager',
    'Google adsense',
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to delivering exceptional quality in every project, no matter the scale.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Pushing creative boundaries while staying true to timeless design principles.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with clients to bring their vision to life through partnership.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Driven by a genuine love for design and creating meaningful visual experiences.',
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <SEO
        title="About Graphic Greedy"
        description="Learn about Graphic Greedy, a graphic designer specializing in logo design, visual communication, creative direction, performance marketing creatives, and video editing."
        path="/about"
        schema={[
          buildPersonSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
                About Me
              </h1>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  I'm a graphic designer specializing in visual communication, and creative direction. With a passion for crafting distinctive visual experiences, I help brands tell their stories through thoughtful and strategic design.
                </p>
                <p>
                  My approach combines timeless design principles with contemporary aesthetics, creating work that resonates with audiences and stands the test of time. Every project is an opportunity to push creative boundaries while maintaining clarity and purpose.
                </p>
                <p>
                  Over the years, I've had the privilege of working with diverse clients across industries, from ambitious startups to established brands, helping them find their visual voice and connect with their audiences in meaningful ways.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0 grid place-items-center p-10 text-center">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-white/50">
                      Design Studio
                    </p>
                    <h2 className="mt-5 text-4xl font-serif font-bold">
                      Strategy, identity, and visual storytelling.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-12 text-center">
            Design Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8">
                Skills & Expertise
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="px-4 py-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8">
                Tools
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <div
                    key={tool}
                    className="px-4 py-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-gray-700 font-medium">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Have a project in mind? I'd love to hear about it and explore how we can bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-medium"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

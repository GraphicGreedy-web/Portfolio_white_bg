import { useNavigate } from 'react-router-dom';
import { getBrandHook } from "../hooks/fetchHook.js";
import PortfolioMedia from "../components/PortfolioMedia";
interface Logo {
  _id: string;
  title: string;
  image: string;
  variations: string[];
  colors: string[];
  typography: string;
  mockups: string[];
}

export default function BrandDesigning() {
  const navigate = useNavigate();
  // const logos: Logo[] = [
  //   {
  //     id: 1,
  //     title: 'Minimal Tech Co.',
  //     image: 'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     variations: [
  //       'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
  //       'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //     colors: ['#000000', '#FFFFFF', '#F5F5F5'],
  //     typography: 'Inter, Sans-serif',
  //     mockups: [
  //       'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
  //       'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Artisan Coffee',
  //     image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     variations: [
  //       'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //     colors: ['#6B4423', '#E8D5C4', '#2C1810'],
  //     typography: 'Playfair Display, Serif',
  //     mockups: [
  //       'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: 'Urban Studio',
  //     image: 'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     variations: [
  //       'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //     colors: ['#1A1A1A', '#E63946', '#FFFFFF'],
  //     typography: 'Montserrat, Sans-serif',
  //     mockups: [
  //       'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: 'Eco Brand',
  //     image: 'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     variations: [
  //       'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //     colors: ['#2D5016', '#A8D5BA', '#F4F4F4'],
  //     typography: 'Lato, Sans-serif',
  //     mockups: [
  //       'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //   },
  // ];
  const logos: Logo[] = getBrandHook();
  // const brandIdentities = [
  //   {
  //     id: 1,
  //     title: 'Luxe Fashion House',
  //     description: 'A sophisticated brand identity for a high-end fashion retailer, combining timeless elegance with contemporary minimalism.',
  //     story: 'Luxe Fashion House approached us to create a brand that would resonate with discerning customers seeking quality and exclusivity.',
  //     colors: ['#000000', '#FFFFFF', '#D4AF37'],
  //     typography: 'Playfair Display for headings, Inter for body text',
  //     image: 'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=1200',
  //     mockups: [
  //       'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  //       'https://images.pexels.com/photos/7841440/pexels-photo-7841440.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Velocity Tech',
  //     description: 'A dynamic brand identity for a cutting-edge technology startup focused on AI and machine learning solutions.',
  //     story: 'Velocity Tech needed a brand that conveyed innovation, speed, and reliability in the competitive tech landscape.',
  //     colors: ['#0A0E27', '#00E5FF', '#FFFFFF'],
  //     typography: 'Inter for all typography with various weights',
  //     image: 'https://images.pexels.com/photos/7991309/pexels-photo-7991309.jpeg?auto=compress&cs=tinysrgb&w=1200',
  //     mockups: [
  //       'https://images.pexels.com/photos/6077447/pexels-photo-6077447.jpeg?auto=compress&cs=tinysrgb&w=800',
  //       'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  //     ],
  //   },
  // ];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
            Brand Designing
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Crafting distinctive brand identities that resonate with audiences and stand the test of time. Every brand has a story—we help you tell it beautifully.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Logo Design / Brand Identity
            </h2>
            <p className="text-gray-600 text-lg">
              Iconic marks that capture the essence of your brand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {logos.map((logo) => (
              <button
                key={logo._id}
                onClick={() => navigate(`/brand-designing/${logo._id}`)}
                // onClick={() => setSelectedLogo(logo)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-gray-100 hover:border-gray-900 transition-all duration-500 hover:scale-[1.02]"
              >
                <PortfolioMedia
                  src={logo.image}
                  alt={logo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p className="text-white font-serif text-xl font-bold">
                    View Details
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
              Brand Identity
            </h2>
            <p className="text-gray-600 text-lg">
              Complete visual systems that define and elevate brands
            </p>
          </div>

          <div className="space-y-24">
            {brandIdentities.map((brand, index) => (
              <div
                key={brand.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                <div className="flex-1">
                  <img
                    src={brand.image}
                    alt={brand.title}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl lg:text-4xl font-serif font-bold">
                    {brand.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {brand.description}
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                      Brand Story
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {brand.story}
                    </p>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                      Color Palette
                    </h4>
                    <div className="flex gap-3">
                      {brand.colors.map((color) => (
                        <div
                          key={color}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-2">
                      Typography
                    </h4>
                    <p className="text-gray-600">{brand.typography}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {brand.mockups.map((mockup, idx) => (
                      <img
                        key={idx}
                        src={mockup}
                        alt={`${brand.title} mockup ${idx + 1}`}
                        className="w-full rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* {selectedLogo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setSelectedLogo(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedLogo(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-8">
                {selectedLogo.title}
              </h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                    Primary Logo
                  </h3>
                  <img
                    src={selectedLogo.image}
                    alt={selectedLogo.title}
                    className="w-full rounded-xl"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                    Variations
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLogo.variations.map((variation, idx) => (
                      <img
                        key={idx}
                        src={variation}
                        alt={`Variation ${idx + 1}`}
                        className="w-full rounded-xl"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                    Color Palette
                  </h3>
                  <div className="flex gap-4">
                    {selectedLogo.colors.map((color) => (
                      <div key={color} className="text-center">
                        <div
                          className="w-16 h-16 rounded-lg border-2 border-gray-200 mb-2"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs font-mono text-gray-600">{color}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">
                    Typography
                  </h3>
                  <p className="text-gray-600">{selectedLogo.typography}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                    Mockups
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLogo.mockups.map((mockup, idx) => (
                      <img
                        key={idx}
                        src={mockup}
                        alt={`Mockup ${idx + 1}`}
                        className="w-full rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const navigation = [
    { path: '/', label: 'Home' },
    { path: '/logo-designing', label: 'Logo Designing' },
    { path: '/visual-communication', label: 'Visual Communication' },
    { path: '/videos', label: 'Videos' },
    { path: '/about', label: 'About Me' },
    { path: '/contact', label: 'Contact' },
  ];

  const expertise = [
    'Graphic Designing',
    'Performance Marketing',
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/graphic_greedy', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:workwithgraphicgreedy@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl lg:text-3xl font-serif font-bold mb-4">
              Graphic Greedy
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Crafting premium visual identities and brand experiences for forward-thinking companies and creators.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase mb-6">
              Expertise
            </h4>
            <ul className="space-y-3">
              {expertise.map((item) => (
                <li key={item} className="text-gray-400 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <div className="flex items-center gap-4" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

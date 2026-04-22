import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/brand-designing', label: 'Brand Designing' },
    { path: '/visual-communication', label: 'Visual Communication' },
    { path: '/videos', label: 'Videos' },
    { path: '/about', label: 'About Me' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-15">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link
            to="/"
            className="text-xl lg:text-2xl font-serif font-bold tracking-tight hover:opacity-70 transition-opacity text-decoration-none text-dark"
          >
            Portfolio
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide relative group transition-colors text-decoration-none text-dark ${
                  location.pathname === link.path ? 'text-gray-900' : 'text-gray-600'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full text-decoration-none text-dark ${
                    location.pathname === link.path ? 'w-full' : ''
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/cms/login"
              className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 text-decoration-none"
            >
              CMS
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-decoration-none text-dark"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen &&
        createPortal(
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-bar">
            <Link
              to="/"
              className="mobile-menu-logo"
            >
              Portfolio
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mobile-menu-close"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          <div className="mobile-menu-links">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-menu-link ${
                location.pathname === link.path ? 'mobile-menu-link-active' : ''
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/cms/login"
            className="mobile-menu-cms"
            style={{ transitionDelay: `${navLinks.length * 50}ms` }}
          >
            CMS
          </Link>
          </div>
          </div>,
          document.body
        )}
    </header>
  );
}

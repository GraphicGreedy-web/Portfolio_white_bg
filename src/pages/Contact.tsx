import { Mail, Instagram, Linkedin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { submitContactRoute } from '../api';
import SEO from '../components/SEO';
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
} from '../seo/site';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Logo Design',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'workwithgraphicgreedy@gmail.com',
      href: 'mailto:workwithgraphicgreedy@gmail.com',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: '@graphic_greedy',
      href: 'https://instagram.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Graphic Greedy',
      href: 'https://linkedin.com',
    },
    // {
    //   icon: Twitter,
    //   label: 'Twitter',
    //   value: '@designer',
    //   href: 'https://twitter.com',
    // },
  ];

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    window.clearTimeout((window as Window & { __contactToastTimer?: number }).__contactToastTimer);
    (window as Window & { __contactToastTimer?: number }).__contactToastTimer = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitContactRoute(formData);
      if (res.data?.success) {
        setFormData({
          name: '',
          email: '',
          projectType: 'Logo Design',
          message: '',
        });
        showToast('success', res.data.message);
      } else {
        showToast('error', res.data?.message || 'Could not send message.');
      }
    } catch (error: any) {
      showToast('error', error?.response?.data?.message || 'Could not send message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-24">
      <SEO
        title="Contact Graphic Greedy"
        description="Contact Graphic Greedy for logo design, visual communication, video editing, and creative direction projects."
        path="/contact"
        schema={[
          buildContactPageSchema(),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <h1 className="sr-only">Contact Graphic Greedy</h1>
      {toast && (
        <div className={`fixed right-6 top-28 z-[90] flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl ${
          toast.type === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
            : 'border-red-200 bg-red-50 text-red-900'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}
      {/* <section className="py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6">
            Let's Connect
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have a project in mind or just want to chat about design? I'm always open to new opportunities and collaborations.
          </p>
        </div>
      </section> */}

      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you. Feel free to reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{info.label}</p>
                      <p className="text-gray-900 font-medium">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl font-serif font-bold mb-6">
                Send a Message
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    id="project"
                    name="projectType"
                    value={formData.projectType}
                    onChange={(event) => setFormData({ ...formData, projectType: event.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors"
                  >
                    <option>Logo Design</option>
                    <option>Visual Communication</option>
                    <option>Video Production</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 lg:py-24 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            I'm currently available for freelance projects and collaborations. If you're looking for a designer who can bring your vision to life with creativity and precision, let's connect.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/logo-designing"
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-gray-900 transition-all duration-300 hover:scale-105 font-medium"
            >
              View Portfolio
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-gray-900 transition-all duration-300 hover:scale-105 font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Products', to: '/products' },
    { label: 'Living Room', to: '/products?category=living' },
    { label: 'Bedroom', to: '/products?category=bedroom' },
    { label: 'Dining', to: '/products?category=dining' },
    { label: 'Office', to: '/products?category=office' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Our Story', to: '/about' },
    { label: 'Sustainability', to: '/sustainability' },
    { label: 'Press', to: '/press' },
  ],
  Support: [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Shipping & Returns', to: '/shipping' },
    { label: '5-Year Warranty', to: '/warranty' },
    { label: 'FAQ', to: '/faq' },
  ],
};

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

const Footer = () => (
  <footer className="bg-primary text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-14">
        {/* Brand block */}
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="inline-block text-2xl font-serif font-bold tracking-tight">
            FURNIT<span className="text-accent">.</span>
          </Link>
          <p className="mt-4 text-stone-400 text-sm leading-relaxed max-w-xs">
            Creating beautiful, functional spaces with sustainable design and premium craftsmanship since 2009.
          </p>

          {/* Social icons */}
          <div className="mt-7 flex items-center gap-2.5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 border border-stone-700 flex items-center justify-center text-stone-400 hover:border-accent hover:text-accent transition-colors duration-200"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-5">
              {heading}
            </h3>
            <ul className="space-y-3">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-stone-400 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
        <p>© 2026 FURNIT. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

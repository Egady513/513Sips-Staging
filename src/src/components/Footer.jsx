import { Link } from 'react-router-dom'
import { 
  Wine, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Heart
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      { name: 'Golden Standard', path: '/services' },
      { name: 'The Signature', path: '/services' },
      { name: 'Uniquely Yours', path: '/services' },
      { name: 'Pricing Calculator', path: '/pricing' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
    ]
  }

  return (
    <footer className="bg-[#0A1628] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#CA8A04] flex items-center justify-center">
                <span className="text-white font-bold text-lg font-['Bodoni_Moda']">513</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Bodoni_Moda'] font-bold text-xl tracking-tight">Sips</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#CA8A04] font-medium -mt-1">Mobile Bar</span>
              </div>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              Premium mobile bar service in Cincinnati. Bringing unforgettable experiences 
              to weddings, corporate events, and private parties since 2024.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/513sips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#CA8A04] flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com/513sips" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#CA8A04] flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="mailto:hello@513sips.com"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#CA8A04] flex items-center justify-center transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Bodoni_Moda'] font-bold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-['Bodoni_Moda'] font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Bodoni_Moda'] font-bold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:513-322-2645" className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors">
                  <Phone size={16} />
                  <span>(513) 322-2645</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@513sips.com" className="flex items-center gap-3 text-white/60 hover:text-[#D4AF37] transition-colors">
                  <Mail size={16} />
                  <span>hello@513sips.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Hyde Park, Cincinnati, OH 45208</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 liquid-glass-dark p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-['Bodoni_Moda'] text-2xl font-bold mb-2">
                Ready to Elevate Your Event?
              </h3>
              <p className="text-white/60">
                Get a custom quote tailored to your celebration.
              </p>
            </div>
            <Link 
              to="/contact" 
              className="btn-luxury inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span>Get a Quote</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {currentYear} 513 Sips. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-[#CA8A04]" fill="#CA8A04" /> in Cincinnati
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  to={link.path} 
                  className="text-white/40 hover:text-white/60 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

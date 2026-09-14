import { Link } from 'react-router-dom'
import { Droplets, Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.18 8.18 0 0 0 4.76 1.52V6.77a4.83 4.83 0 0 1-1-.08z" />
    </svg>
  )
}

const footerLinks = {
  Company: [
    { label: 'About Us & Story', to: '/about' },
    { label: 'Our Promise', to: '/about' },
    { label: 'Leadership & Team', to: '/about' },
    { label: 'Media Gallery', to: '/media' },
    { label: 'Contact Us', to: '/contact' },
  ],
  Products: [
    { label: '75cl Bottle', to: '/products' },
    { label: '50cl Bottle', to: '/products' },
    { label: '33cl Bottle', to: '/products' },
    { label: '19 Liters Jar', to: '/products' },
    { label: '50cl Sachet', to: '/products' },
  ],
  Support: [
    { label: 'Order Tracking', to: '/contact' },
    { label: 'Delivery Areas', to: '/contact' },
    { label: 'FAQs', to: '/contact' },
    { label: 'Distributor Program', to: '/contact' },
    { label: 'Bulk Orders', to: '/contact' },
  ],
}

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/share/18ypzE551e/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/supertoppwater?stkn=aDdseXh3bmx4OWYw', label: 'Instagram' },
  { icon: TiktokIcon, href: 'https://www.tiktok.com/@supertopp.water?_r=1&_t=ZS-99jboMDbAKV', label: 'Tiktok' },
]

const certBadges = ['Purity Guaranteed', 'Safety First', '7-Stage Purification', 'Reverse Osmosis (Stage 4)', 'Mineral Balancing (Stage 5)', 'Affordable Hydration']

export function Footer() {
  return (
    <footer className="bg-[#060f1c] border-t border-white/8 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative">
                <Droplets className="w-7 h-7 text-[#4DD0E1]" />
                <div className="absolute inset-0 bg-[#4DD0E1]/20 rounded-full blur-md" />
              </div>
              <div>
                <span
                  className="text-white font-extrabold text-xl tracking-[0.15em]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  SUPER<span className="text-[#4DD0E1]">TOPP</span>
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Born from a Need. Driven by Purity. Pure, safe, quality drinking water accessible and affordable to every household.
            </p>
            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Phone, text: '+2347068611884' },
                { icon: Mail, text: 'jomachnigltd@gmail.com' },
                { icon: MapPin, text: 'Alagbaka GRA Extension, Akure, Nigeria' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-[#4DD0E1] flex-shrink-0" />
                  <span className="text-white/50 text-sm">{text}</span>
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#4DD0E1] hover:border-[#4DD0E1]/50 hover:bg-[#4DD0E1]/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4
                className="text-white font-bold text-sm tracking-widest uppercase mb-5"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-white/45 hover:text-[#4DD0E1] text-sm transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="mt-12 pt-8 border-t border-white/8">
          <p className="text-white/30 text-xs tracking-widest uppercase text-center mb-5">
            Certified & Trusted
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {certBadges.map(cert => (
              <span
                key={cert}
                className="px-4 py-1.5 rounded-full border border-[#4DD0E1]/25 text-[#4DD0E1]/70 text-xs tracking-wide"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs font-medium">
            © {new Date().getFullYear()} SuperTopp. Purity for Freshness.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a
                key={item}
                href="#"
                className="text-white/25 hover:text-white/60 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, ShoppingCart } from 'lucide-react'
import superLogo from '../../images/super_logo.webp'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About', end: false },
  { to: '/products', label: 'Products', end: false },
  { to: '/media', label: 'Media', end: false },
  { to: '/contact', label: 'Contact', end: false },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-100 shadow-sm ${
        scrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" onClick={() => setOpen(false)}>
          <img
            src={superLogo}
            alt="SuperTopp Logo"
            className="h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors duration-300 relative group ${
                  isActive ? 'text-[#1565C0]' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-[#1565C0] to-transparent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/products"
            className="text-slate-600 hover:text-[#1565C0] transition-colors duration-300 p-2"
            aria-label="View products"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <a
            href="https://wa.me/+2347068611884?text=Hi%2C%20I'd%20like%20to%20order%20SUPER%20TOPP%20water!"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-gradient-to-r from-[#4DD0E1] to-[#26C6DA] text-[#0B1F35] px-4 py-1.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-[#4DD0E1]/30 transition-all duration-300 hover:scale-105"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? 'text-[#1565C0] bg-[#1565C0]/5'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href="https://wa.me/+2347068611884?text=Hi%2C%20I'd%20like%20to%20order%20SUPER%20TOPP%20water!"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-gradient-to-r from-[#4DD0E1] to-[#26C6DA] text-[#0B1F35] py-3 rounded-xl text-sm font-bold text-center"
                onClick={() => setOpen(false)}
              >
                Order on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

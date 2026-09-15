import { useState } from 'react'
import { motion } from 'motion/react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import {
  Phone, Mail, MapPin, MessageCircle, Clock, Truck,
  ChevronDown, ChevronUp, CheckCircle2, Send
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  type: string
  message: string
}

const faqs = [
  {
    q: 'Where do you deliver?',
    a: 'We currently deliver within Akure, Ondo State, Nigeria — and we are expanding to more cities soon. Same-day delivery is available in Akure for orders placed before 2PM.',
  },
  {
    q: 'How do I place a bulk or corporate order?',
    a: 'For bulk orders (50+ units) or corporate accounts, contact us via WhatsApp or email. We offer dedicated account managers, custom delivery schedules, and volume-based pricing. Most corporate setups are completed within 48 hours.',
  },
  {
    q: 'Are your bottles recyclable?',
    a: 'All our bottles are made from food-grade BPA-Free PET and HDPE plastics, which are fully recyclable. Our 19L dispenser bottles are collected, sanitized, and refilled — a closed-loop system that reduces plastic waste by up to 90%.',
  },
  {
    q: 'Do you offer dispenser rental?',
    a: 'Yes. When you subscribe to our 19L delivery program (minimum 4 refills/month), we install a hot & cold water dispenser at your location at no extra charge. Maintenance and sanitization are included.',
  },
  {
    q: 'What is your return and quality policy?',
    a: 'If any product fails our quality expectations when received, we replace it the same day — guaranteed. You can report quality issues via WhatsApp and our team responds within 30 minutes during business hours.',
  },
  {
    q: 'How quickly do you deliver?',
    a: 'Same-day delivery is available in Akure for orders placed before 2PM. As we expand to more cities, next-day delivery will be available in those areas. Corporate accounts with recurring orders get priority scheduling.',
  },
  {
    q: 'How do I become a distributor?',
    a: 'Our distributor program accepts applications from individuals and businesses with local distribution capacity. Fill out our interest form above or WhatsApp us. We offer exclusive territories, favorable margins, and full marketing support.',
  },
]

const deliveryCities = [
  'Akure',
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 1200))
    console.log('Form data:', data)
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — SuperTopp</title>
        <meta name="description" content="Get in touch with SuperTopp. Order water, ask about distribution, or reach our team. Purity for Freshness." />
      </Helmet>

      <main className="overflow-hidden">
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-[#0B1F35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&h=900&fit=crop&auto=format)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F35]/85 via-[#003C8F]/70 to-[#0a1929]" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, #4DD0E1 0%, transparent 50%)' }} />
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 pb-20" style={{ paddingTop: 'max(8rem, calc(var(--navbar-h, 80px) + 3rem))' }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">Get In Touch</span>
              <h1
                className="text-5xl lg:text-6xl font-black text-white mt-3 mb-6 max-w-xl leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                We'd Love to Hear From You
              </h1>
              <p className="text-white/70 text-lg max-w-lg font-medium">
                Whether it's your first order or you're building a distribution empire — we're here, fast, and ready.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ FORM + INFO ═══ */}
        <section className="bg-[#0a1929] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Form — wider */}
            <motion.div {...fadeUp()} className="lg:col-span-3">
              <h2
                className="text-2xl font-black text-white mb-8"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Send Us a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-[#4DD0E1]/10 border border-[#4DD0E1]/30 p-10 text-center"
                >
                  <CheckCircle2 className="w-14 h-14 text-[#4DD0E1] mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
                  <p className="text-white/55">We'll get back to you within 30 minutes during business hours.</p>
                </motion.div>
              ) : (
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 lg:p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-white/70 text-sm font-medium block mb-2">Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-white/30 focus:outline-none focus:border-[#4DD0E1]/60 focus:bg-white/8 transition-all duration-300"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="text-white/70 text-sm font-medium block mb-2">Email Address *</label>
                        <input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                          })}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-white/30 focus:outline-none focus:border-[#4DD0E1]/60 focus:bg-white/8 transition-all duration-300"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-white/70 text-sm font-medium block mb-2">Phone Number</label>
                        <input
                          {...register('phone')}
                          type="tel"
                          placeholder="+234 706 861 1884"
                          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-white/30 focus:outline-none focus:border-[#4DD0E1]/60 focus:bg-white/8 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="text-white/70 text-sm font-medium block mb-2">Inquiry Type</label>
                        <select
                          {...register('type', { required: 'Please select a type' })}
                          className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white focus:outline-none focus:border-[#4DD0E1]/60 transition-all duration-300 appearance-none"
                          style={{ colorScheme: 'dark' }}
                        >
                          <option value="" className="bg-[#0B1F35]">Select type</option>
                          <option value="order" className="bg-[#0B1F35]">Place an Order</option>
                          <option value="corporate" className="bg-[#0B1F35]">Corporate Account</option>
                          <option value="distributor" className="bg-[#0B1F35]">Distributor Inquiry</option>
                          <option value="dispenser" className="bg-[#0B1F35]">Dispenser Program</option>
                          <option value="support" className="bg-[#0B1F35]">Customer Support</option>
                          <option value="other" className="bg-[#0B1F35]">Other</option>
                        </select>
                        {errors.type && <p className="text-red-400 text-xs mt-1">{errors.type.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="text-white/70 text-sm font-medium block mb-2">Subject *</label>
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="How can we help you?"
                        className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-white/30 focus:outline-none focus:border-[#4DD0E1]/60 focus:bg-white/8 transition-all duration-300"
                      />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    <div>
                      <label className="text-white/70 text-sm font-medium block mb-2">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'At least 20 characters' } })}
                        rows={5}
                        placeholder="Tell us about your order, question, or inquiry in detail..."
                        className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder-white/30 focus:outline-none focus:border-[#4DD0E1]/60 focus:bg-white/8 transition-all duration-300 resize-none"
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit — visually separated from fields */}
                    <div className="pt-3 border-t border-white/8">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-bold text-[#0B1F35] text-base disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.03] hover:shadow-xl hover:shadow-[#4DD0E1]/25 active:scale-[0.98] transition-all duration-300"
                        style={{ background: 'linear-gradient(135deg, #4DD0E1 0%, #26C6DA 100%)' }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-[#0B1F35]/30 border-t-[#0B1F35] animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>

            {/* Info sidebar */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-2 space-y-6">
              {/* Contact cards */}
              {[
                {
                  icon: MessageCircle,
                  label: 'WhatsApp (Fastest)',
                  value: ' 07068611884',
                  desc: 'Available 6AM–10PM daily',
                  href: 'https://wa.me/+2347068611884',
                  accent: '#25D366',
                },
                {
                  icon: Phone,
                  label: 'Phone',
                  value: '+2347068611884',
                  desc: 'Mon–Sat, 8AM–6PM',
                  href: 'tel:+2347068611884',
                  accent: '#4DD0E1',
                },
                {
                  icon: Mail,
                  label: 'Email',
                  value: 'jomachnigltd@gmail.com',
                  desc: 'Response within 2 hours',
                  href: 'mailto:jomachnigltd@gmail.com',
                  accent: '#4DD0E1',
                },
                {
                  icon: MapPin,
                  label: 'Head Office',
                  value: 'Plot 8/9 off Solomon Crescent, By Police Post, Alagbaka GRA Extension',
                  desc: 'Akure, Ondo State',
                  href: '#',
                  accent: '#4DD0E1',
                },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#4DD0E1]/30 hover:bg-white/8 transition-all duration-400 group block"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}35` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <div>
                    <div className="text-white/50 text-xs tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-white font-semibold text-sm">{item.value}</div>
                    <div className="text-white/35 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </a>
              ))}

              {/* Business hours */}
              <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#4DD0E1]" />
                  <span className="text-white font-semibold text-sm">Business Hours</span>
                </div>
                <div className="space-y-2">
                  {[
                    { day: 'Monday – Friday', time: '8:00 AM – 6:00 PM' },
                    { day: 'Saturday', time: '9:00 AM – 4:00 PM' },
                    { day: 'Sunday', time: 'Closed' },
                  ].map(h => (
                    <div key={h.day} className="flex justify-between text-xs">
                      <span className="text-white/50">{h.day}</span>
                      <span className="text-[#4DD0E1]/80">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ MAP ═══ */}
        <section className="bg-[#0B1F35] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()}>
              <h2
                className="text-2xl font-black text-white mb-6"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Find Us
              </h2>
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0a1929] h-72 lg:h-96 flex items-center justify-center">
                <iframe
                  title="SuperTopp Location"
                  src="https://maps.google.com/maps?q=Solomon+crescent,+Alagbaka,+Akure+340106,+Ondo,+Nigeria&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ DELIVERY COVERAGE ═══ */}
        <section className="bg-[#EAF9FF] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <span className="text-[#1565C0] text-sm font-bold tracking-[0.25em] uppercase">Delivery Network</span>
              <h2
                className="text-3xl lg:text-4xl font-black text-[#0B1F35] mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                We Cover Akure city
              </h2>
              <p className="text-[#0B1F35]/55 mt-3 max-w-lg mx-auto">
                Expanding every month. Same-day delivery in major cities.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-3">
              {deliveryCities.map((city, i) => (
                <div
                  key={city}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1565C0]/15 shadow-sm"
                >
                  <Truck className="w-3.5 h-3.5 text-[#1565C0]" />
                  <span className="text-[#0B1F35] text-sm font-medium">{city}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1565C0]/10 border border-[#1565C0]/30">
                <span className="text-[#1565C0] text-sm font-semibold"> more cities to come</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ FAQs ═══ */}
        <section className="bg-[#0B1F35] py-24">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">FAQ</span>
              <h2
                className="text-4xl font-black text-white mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Frequently Asked Questions
              </h2>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.06)}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors duration-200"
                  >
                    <span className="text-white font-semibold text-sm">{faq.q}</span>
                    {openFaq === i
                      ? <ChevronUp className="w-5 h-5 text-[#4DD0E1] flex-shrink-0" />
                      : <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/8 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ WHATSAPP CTA ═══ */}
        <section className="bg-gradient-to-br from-[#003C8F] to-[#0B1F35] py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <motion.div {...fadeUp()}>
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2
                className="text-3xl lg:text-4xl font-black text-white mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Prefer to Order on WhatsApp?
              </h2>
              <p className="text-white/55 mb-8">
                Our team responds within minutes. Order, ask questions, or get support — all on WhatsApp.
              </p>
              <a
                href="https://wa.me/+2347068611884?text=Hi%20SUPER%20TOPP%2C%20I'd%20like%20to%20place%20an%20order!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-green-500 text-white font-bold hover:bg-green-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ceo from '../../images/ceo.webp'
import gm from '../../images/gm.webp'
import pm from '../../images/pm.webp'
import cfo from '../../images/cfo.jpeg'
import { Award, Leaf, Users, ShieldCheck, Heart, Droplets, ArrowRight, CheckCircle2, Sparkles, UserCheck, X, ZoomIn } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

interface TeamMember {
  name: string
  role: string
  desc: string
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Oludayomi Babatunde Johnson',
    role: 'Managing Director (MD)',
    desc: 'Visionary leader behind SuperTopp, driven by a personal commitment to safe and pure drinking water for every home.',
    image: ceo,
  },
  {
    name: 'Oludayomi Fayoke Comfort',
    role: 'General Manager (GM)',
    desc: 'Oversees operational excellence, quality management, and organizational strategy to maintain gold-standard service.',
    image: gm,
  },
  {
    name: 'Oladehinde Oluwafemi Emmanuel',
    role: 'Production Manager',
    desc: 'Manages multi-stage purification protocols, factory operations, and strict quality control compliance.',
    image: pm,
  },
  {
    name: 'Effa, Imaobong Effiong',
    role: 'Chief Financial Officer (CFO)',
    desc: 'Drives financial stewardship, strategic investment, and sustainable growth for the brand.',
    image: cfo,
  },
]

const principles = [
  { title: 'PURITY', desc: 'Free from harmful contaminants and meticulously filtered at every stage.', icon: Droplets },
  { title: 'SAFETY', desc: 'Rigorous quality controls ensuring water that meets international standards.', icon: ShieldCheck },
  { title: 'QUALITY', desc: 'Uncompromising dedication to excellence from source to final delivery.', icon: Award },
  { title: 'AFFORDABILITY', desc: 'Ensuring clean, healthy water is accessible to every household.', icon: Heart },
]

export function About() {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string
    name: string
    role: string
    desc: string
  } | null>(null)

  return (
    <>
      <Helmet>
        <title>About Us — SuperTopp</title>
        <meta name="description" content="Born from a Need. Driven by Purity. Discover the story, promise, and leadership of SuperTopp." />
      </Helmet>

      <main className="overflow-hidden">
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-[#0B1F35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop&auto=format)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F35]/85 via-[#003C8F]/70 to-[#0B1F35]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">OUR STORY</span>
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mt-3 mb-6 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Born from a Need. <br />
                <span className="text-[#4DD0E1]">Driven by Purity.</span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed">
                Every meaningful brand begins with a reason. For SuperTopp, that reason was deeply personal.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ OUR STORY DETAILED ═══ */}
        <section className="bg-[#EAF9FF] py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story image & founder card */}
            <motion.div {...fadeUp(0)} className="lg:col-span-5 relative">
              <div
                className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#1565C0] shadow-2xl relative cursor-pointer group"
                onClick={() =>
                  setLightboxImage({
                    src: ceo,
                    name: 'Oludayomi Babatunde Johnson',
                    role: 'Managing Director (MD)',
                    desc: 'Visionary leader behind SuperTopp, driven by a personal commitment to safe and pure drinking water for every home.',
                  })
                }
              >
                <img
                  src={ceo}
                  alt="Oludayomi Babatunde Johnson - Director of SuperTopp"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F35] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ZoomIn className="w-5 h-5 text-[#4DD0E1]" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-[#4DD0E1] text-xs font-bold tracking-widest uppercase mb-1">Director / MD</div>
                  <div className="text-xl font-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Oludayomi Babatunde Johnson
                  </div>
                  <div className="text-white/70 text-xs mt-1">SuperTopp</div>
                </div>
              </div>
            </motion.div>

            {/* Main story text */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-7 space-y-6 text-[#0B1F35]">
              <span className="text-[#1565C0] text-sm font-bold tracking-[0.25em] uppercase">The Beginning</span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F35] leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                A Personal Journey That Sparked a Vision
              </h2>

              <p className="text-[#0B1F35]/75 text-base lg:text-lg leading-relaxed">
                Following the relocation of the Director and his family to the Western part of the country, an unexpected health experience changed their perspective forever. Within a short period, members of the family began experiencing serious health challenges. Their search for answers led to a discovery that was both unsettling and revealing—the water they had been consuming was contributing to their health concerns.
              </p>

              <blockquote className="border-l-4 border-[#1565C0] pl-6 my-6 py-2 bg-white/70 rounded-r-2xl shadow-sm">
                <p className="text-[#1565C0] font-bold text-lg sm:text-xl italic leading-relaxed">
                  "If accessing truly clean, safe, and reliable drinking water could be this difficult, how many other families were facing the same reality?"
                </p>
              </blockquote>

              <p className="text-[#0B1F35]/75 text-base lg:text-lg leading-relaxed">
                That question became the beginning of a vision.
              </p>

              <p className="text-[#0B1F35]/75 text-base lg:text-lg leading-relaxed">
                What started as a personal search for water that was pure, safe, and free from harmful contaminants evolved into a commitment to provide a better standard of drinking water for families and communities.
              </p>

              <p className="text-[#0B1F35]/80 font-semibold text-base lg:text-lg leading-relaxed">
                After extensive research, exploration, and a clear understanding of the need for dependable, high-quality drinking water, SuperTopp was born.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ MORE THAN WATER. A COMMITMENT TO WELL-BEING. ═══ */}
        <section className="bg-[#0B1F35] py-20 lg:py-28 text-white relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">MORE THAN WATER</span>
              <h2
                className="text-4xl sm:text-5xl font-black text-white mt-3 mb-6 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                A Commitment to Well-Being
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                At SuperTopp, we understand that water is more than a product. It is an essential part of life, health, family, and everyday well-being.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                {...fadeUp(0.1)}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#003C8F]/60 to-[#1565C0]/40 border border-white/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#4DD0E1]/20 border border-[#4DD0E1]/30 flex items-center justify-center mb-6">
                  <Droplets className="w-6 h-6 text-[#4DD0E1]" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Our Simple Yet Profound Purpose
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Our purpose is simple yet profound: to make pure, safe, quality drinking water accessible and affordable to every household.
                </p>
              </motion.div>

              <motion.div
                {...fadeUp(0.2)}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#1565C0]/40 to-[#003C8F]/60 border border-white/10"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#4DD0E1]/20 border border-[#4DD0E1]/30 flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-[#4DD0E1]" />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Purity is Not a Privilege
                </h3>
                <p className="text-white/70 leading-relaxed">
                  We believe that purity should never be a privilege reserved for a few. Every individual and every family deserves the assurance that the water they consume meets the highest standards of safety and quality.
                </p>
              </motion.div>
            </div>

            {/* Principles Cards */}
            <motion.div {...fadeUp(0.3)} className="text-center mb-8">
              <p className="text-white/60 text-sm tracking-widest uppercase mb-2">Our Guiding Pillars</p>
              <h3 className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                PURITY. SAFETY. QUALITY. AFFORDABILITY.
              </h3>
              <p className="text-white/55 text-sm mt-3 max-w-2xl mx-auto">
                These are more than words to us. They are the principles upon which SuperTopp was built.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  {...fadeUp(i * 0.1)}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#4DD0E1]/40 hover:bg-white/10 transition-all duration-300 group"
                >
                  <p.icon className="w-8 h-8 text-[#4DD0E1] mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {p.title}
                  </h4>
                  <p className="text-white/60 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto text-center bg-white/5 p-8 rounded-3xl border border-white/10">
              <p className="text-white/80 leading-relaxed">
                We continuously invest in our processes, people, and standards to ensure that every drop of SuperTopp represents the quality we promise.
              </p>
              <p className="text-[#4DD0E1] font-bold text-lg mt-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Because when it comes to something as fundamental as water, there should be no compromise.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ OUR PROMISE ═══ */}
        <section className="bg-[#EAF9FF] py-20 lg:py-28 relative">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-14">
              <span className="text-[#1565C0] text-sm font-bold tracking-[0.25em] uppercase">TRUST & DEDICATION</span>
              <h2
                className="text-4xl sm:text-5xl font-black text-[#0B1F35] mt-3 mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                OUR PROMISE
              </h2>
              <p className="text-[#0B1F35]/70 text-lg max-w-2xl mx-auto">
                At SuperTopp, we are not simply in the business of producing and distributing water. We are in the business of creating confidence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
              {[
                { title: 'Careful Production', desc: 'Confidence that the water entering your home is produced with care.' },
                { title: 'Quality & Safety', desc: 'Confidence that quality and safety remain at the heart of our processes.' },
                { title: 'Family Trust', desc: 'Confidence that what you give your family is worthy of their trust.' },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  {...fadeUp(i * 0.1)}
                  className="bg-white p-7 rounded-2xl border border-[#1565C0]/10 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#1565C0] mb-4" />
                  <h3 className="text-[#0B1F35] font-bold text-lg mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {c.title}
                  </h3>
                  <p className="text-[#0B1F35]/65 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.2)} className="bg-[#0B1F35] text-white p-10 rounded-3xl shadow-xl text-center space-y-6">
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                Our commitment extends beyond the bottle, sachet, or dispenser. It extends to the families we serve, the communities we touch, and the healthier future we aspire to help build.
              </p>

              <div className="pt-4 border-t border-white/10 max-w-md mx-auto space-y-2">
                <p className="text-[#4DD0E1] text-xs font-bold tracking-widest uppercase">Every drop carries our promise.</p>
                <div className="text-white font-semibold text-sm flex flex-col sm:flex-row items-center justify-center gap-3">
                  <span>✦ A promise of purity</span>
                  <span className="hidden sm:inline">|</span>
                  <span>✦ A promise of quality</span>
                  <span className="hidden sm:inline">|</span>
                  <span>✦ A promise you can trust</span>
                </div>
              </div>

              <div className="pt-4">
                <span className="inline-block bg-gradient-to-r from-[#4DD0E1] to-[#26C6DA] text-[#0B1F35] px-6 py-2.5 rounded-full font-black text-sm tracking-wider uppercase shadow-md">
                  SuperTopp - Purity for Freshness.
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ LEADERSHIP & TEAM ═══ */}
        <section className="bg-[#0B1F35] py-20 lg:py-28 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-16">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">LEADERSHIP & TEAM</span>
              <h2
                className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Meet Our Leadership Team
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-base">
                Dedicated professionals steering SuperTopp toward excellence, safety, and community impact.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member.name}
                  {...fadeUp(i * 0.1)}
                  className={`bg-white/5 p-7 rounded-2xl border border-white/10 hover:border-[#4DD0E1]/40 hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group ${
                    member.image ? 'cursor-pointer' : ''
                  }`}
                  onClick={() =>
                    member.image &&
                    setLightboxImage({
                      src: member.image,
                      name: member.name,
                      role: member.role,
                      desc: member.desc,
                    })
                  }
                >
                  <div>
                    {member.image ? (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#4DD0E1]/40 mb-5 shadow-lg shadow-black/40 group-hover:border-[#4DD0E1] group-hover:scale-105 transition-all duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-5 h-5 text-[#4DD0E1] drop-shadow" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4DD0E1]/20 to-[#1565C0]/30 border border-[#4DD0E1]/30 flex items-center justify-center mb-5">
                        <UserCheck className="w-7 h-7 text-[#4DD0E1]" />
                      </div>
                    )}
                    <div className="text-[#4DD0E1] text-xs font-bold tracking-widest uppercase mb-1">
                      {member.role}
                    </div>
                    <h3
                      className="text-white font-bold text-lg mb-3"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-white/55 text-xs leading-relaxed mb-4">
                      {member.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="bg-gradient-to-r from-[#003C8F] to-[#0B1F35] py-20 text-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div {...fadeUp()}>
              <h2
                className="text-3xl sm:text-4xl font-black mb-6"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Experience Purity for Freshness Today
              </h2>
              <p className="text-white/70 text-base mb-8 max-w-xl mx-auto">
                Explore our products or contact our team to learn more about how SuperTopp can serve your household or organization.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/products"
                  className="px-8 py-3.5 rounded-full bg-[#4DD0E1] text-[#0B1F35] font-bold text-sm hover:bg-white transition-all duration-300"
                >
                  View Products
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══ LEADERSHIP IMAGE LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-lg p-4 sm:p-6"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden bg-[#0B1F35] border border-white/20 shadow-2xl flex flex-col my-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative flex-1 bg-black/60 flex items-center justify-center overflow-hidden p-3 min-h-[40vh] max-h-[70vh]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.name}
                  className="w-full h-full max-h-[65vh] object-contain rounded-2xl"
                />
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-[#4DD0E1] hover:text-[#0B1F35] transition-all duration-300 text-white shadow-xl"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-[#0B1F35] border-t border-white/10 flex flex-col shrink-0">
                <span className="text-[#4DD0E1] text-xs font-black tracking-widest uppercase">
                  {lightboxImage.role}
                </span>
                <h3 className="text-white font-black text-xl lg:text-2xl mt-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {lightboxImage.name}
                </h3>
                {lightboxImage.desc && (
                  <p className="text-white/70 text-sm mt-2 leading-relaxed">{lightboxImage.desc}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


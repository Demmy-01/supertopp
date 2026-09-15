import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Helmet } from 'react-helmet-async'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import CountUp from 'react-countup'
import {
  ArrowRight, Droplets, Shield, Award, Zap, Leaf, Star,
  ChevronDown, CheckCircle2, Phone, MessageCircle, Brain, Heart, Sparkles
} from 'lucide-react'
import { WaterCanvas } from '../components/WaterCanvas'
import waterSplashIi from '../../images/water_splash_ii.webp'
import bigBottle from '../../images/big_bottle.webp'
import smallBottle from '../../images/small_bottle.webp'
import smallPack from '../../images/small_pack.webp'
import dispenser from '../../images/dispenser.webp'
import sachete from '../../images/sachete.webp'
import hydration from '../../images/hydration.webp'
import idea from '../../images/idea.webp'
import heroBg from '../../images/hero-bg.png'
import emptyBottle33cl from '../../images/empty-bottle.png'
import emptyBottle50cl from '../../images/empty-bottle-50cl.png'
import emptyBottle75cl from '../../images/empty-bottle-75cl.png'
import 'swiper/css'
import 'swiper/css/pagination'

/* ─── shared animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

/* ─── SVG bottle ─── */
function BottleSVG({ size = '500ml', accent = '#4DD0E1' }: { size?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 100 280" className="w-full h-full drop-shadow-2xl" aria-hidden>
      <defs>
        <linearGradient id={`bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1565C0" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#003C8F" stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`shine-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="50%" stopColor="white" stopOpacity="0.08" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`water-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1565C0" stopOpacity="0.3" />
        </linearGradient>
        <filter id={`glow-${size}`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* shadow */}
      <ellipse cx="50" cy="276" rx="28" ry="4" fill={accent} opacity="0.15" />
      {/* cap */}
      <rect x="36" y="6" width="28" height="20" rx="4" fill={accent} />
      <rect x="33" y="22" width="34" height="7" rx="2" fill={accent} opacity="0.7" />
      {/* neck */}
      <path d="M36 29 Q34 50 22 62 L78 62 Q66 50 64 29 Z" fill={`url(#bg-${size})`} />
      {/* body */}
      <rect x="14" y="62" width="72" height="205" rx="10" fill={`url(#bg-${size})`} />
      {/* water level */}
      <rect x="15" y="140" width="70" height="127" rx="0" fill={`url(#water-${size})`} clipPath="inset(0 0 0 0 round 0 0 10px 10px)" />
      {/* shine */}
      <rect x="14" y="62" width="22" height="205" rx="10" fill={`url(#shine-${size})`} />
      {/* label bg */}
      <rect x="19" y="85" width="62" height="110" rx="5" fill="rgba(255,255,255,0.07)" />
      <rect x="19" y="85" width="62" height="1" fill="rgba(255,255,255,0.25)" />
      <rect x="19" y="195" width="62" height="1" fill="rgba(255,255,255,0.25)" />
      {/* label content */}
      <rect x="24" y="96" width="52" height="3" rx="1.5" fill={accent} opacity="0.8" />
      <text x="50" y="120" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Manrope,sans-serif" letterSpacing="2">SUPERTOPP</text>
      <text x="50" y="134" textAnchor="middle" fill={accent} fontSize="6" fontWeight="600" fontFamily="Inter,sans-serif" letterSpacing="1">PURE WATER</text>
      <rect x="28" y="144" width="44" height="1" rx="0.5" fill="rgba(255,255,255,0.15)" />
      <text x="50" y="162" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="500" fontFamily="Inter,sans-serif">{size}</text>
      {/* accent stripe */}
      <rect x="19" y="172" width="62" height="4" rx="2" fill={accent} opacity="0.5" />
      {/* bottom label line */}
      <rect x="24" y="183" width="52" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
    </svg>
  )
}

/* ─── Purification step card ─── */
function PurStep({ n, title, desc, icon: Icon }: { n: number; title: string; desc: string; icon: React.ElementType }) {
  return (
    <motion.div
      {...fadeUp(n * 0.08)}
      className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-[#4DD0E1]/40 hover:bg-[#4DD0E1]/5 transition-all duration-500"
    >
      <div className="absolute -top-3 -left-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#4DD0E1] to-[#1565C0] flex items-center justify-center text-[#0B1F35] text-xs font-black">
        {n}
      </div>
      <Icon className="w-7 h-7 text-[#4DD0E1] mb-4" />
      <h3 className="text-white font-bold text-base mb-2">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

const purSteps = [
  { title: 'Source Selection', desc: 'Deep underground aquifers rigorously tested for raw water quality.', icon: Leaf },
  { title: 'Sediment Filtration', desc: 'Multi-layer filtration removes physical particles down to 5 microns.', icon: Shield },
  { title: 'Reverse Osmosis', desc: 'High-pressure semi-permeable membranes eliminate 99.9% of contaminants.', icon: Droplets },
  { title: 'Mineral Balancing', desc: 'Essential minerals balanced at precisely optimal ratios.', icon: CheckCircle2 },
  { title: 'UV Sterilization', desc: 'Ultraviolet light destroys all microbial organisms instantly.', icon: Zap },
  { title: 'Ozonation', desc: 'Food-grade ozone provides the final disinfection barrier.', icon: Sparkles },
  { title: 'Quality Certification', desc: 'Every batch lab-tested before leaving our facility.', icon: Award },
]

const benefits = [
  { icon: Shield, title: '100% Pure', desc: 'Zero contaminants — verified by independent lab analysis.' },
  { icon: Droplets, title: 'Advanced RO Filtration', desc: 'Purified through 6-stage Reverse Osmosis system.' },
  { icon: CheckCircle2, title: 'Purity & Safety', desc: 'Consistently safe water worthy of your family\'s trust.' },
  { icon: Leaf, title: 'BPA-Free Packaging', desc: 'Food-grade materials safe for you and the planet.' },
  { icon: Zap, title: 'Quality Controlled', desc: 'Rigorous quality controls from treatment to delivery.' },
  { icon: Award, title: 'Hygienically Sealed', desc: 'Meeting the highest standards of safety and quality.' },
]

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Certified Nutritionist',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    text: "I've recommended SuperTopp Waters to every client. The purity is exceptional — you can taste the fresh difference. My clients feel healthier and energized.",
    stars: 5,
  },
  {
    name: 'James Odhiambo',
    role: 'CEO, NexGen Technologies',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    text: "We switched our entire office to SuperTopp Waters 19L jars. The quality is consistent, delivery always on time, and everyone loves the water.",
    stars: 5,
  },
  {
    name: 'Dr. Amara Diallo',
    role: 'Sports Medicine Physician',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format',
    text: "As a physician, drinking water safety matters enormously. SuperTopp Waters' 6-stage RO process ensures safe, clean hydration.",
    stars: 5,
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Wellness Studio Owner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format',
    text: "Pure water for a healthier lifestyle. SuperTopp Waters delivers on its promise of purity for freshness every single day.",
    stars: 5,
  },
]

const products = [
  { size: '75cl', label: '75cl Bottle', accent: '#4DD0E1', image: bigBottle },
  { size: '50cl', label: '50cl Bottle', accent: '#26C6DA', image: smallBottle },
  { size: '33cl', label: '33cl Bottle', accent: '#00BCD4', image: smallPack },
  { size: '19 Liters', label: '19 Liters Jar', accent: '#1565C0', image: dispenser },
  { size: '50cl', label: '50cl Sachet', accent: '#4DD0E1', image: sachete },
]

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <Helmet>
        <title>SuperTopp Waters  Purity for Freshness</title>
        <meta name="description" content="SuperTopp Born from a Need. Driven by Purity. Pure, safe, quality drinking water accessible and affordable to every household." />
      </Helmet>

      <main className="overflow-hidden">
        {/* ═══ HERO ═══ */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0B1F35]"
          style={{ clipPath: 'inset(0)' }}
        >
          {/* Fixed background image — clip-path on parent makes this iOS-compatible parallax */}
          <div className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark gradient overlay for text readability & warm ambiance */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F35]/85 via-[#0B1F35]/70 to-[#0a1929]/95" />

          {/* Subtle water canvas effect */}
          <WaterCanvas className="opacity-30" />

          <div className="max-w-7xl mx-auto px-6 pt-36 pb-20 lg:pt-40 lg:pb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
            {/* Left: Content block */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#80DEEA] animate-pulse" />
                <span className="text-[#80DEEA] text-xs font-semibold tracking-[0.2em] uppercase">
                  Purity for Freshness
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                SuperTopp
                <span className="block text-2xl sm:text-3xl font-medium text-[#80DEEA] tracking-normal mt-3">
                  Purity for Freshness.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
              >
                Born from a Need. Driven by Purity. Making pure, safe, quality drinking water accessible and affordable to every household.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link
                  to="/products"
                  className="group flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#0B1F35] text-sm bg-gradient-to-r from-[#80DEEA] to-[#26C6DA] shadow-lg shadow-[#80DEEA]/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#80DEEA]/30 transition-all duration-300"
                >
                  Explore Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/25 bg-white/5 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/15 hover:border-white/40 hover:-translate-y-1 transition-all duration-300"
                >
                  Our Story
                </Link>
              </motion.div>


            </div>

            {/* Right: Floating bottle visual layer with scroll depth animation */}
            <div className="flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.3 },
                  scale: { duration: 0.8, delay: 0.3 },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative"
              >
                {/* Soft ambient radial glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-25 blur-3xl scale-125"
                  style={{ background: 'radial-gradient(circle, #80DEEA, transparent 70%)' }}
                />
                <div className="relative w-56 h-80 lg:w-72 lg:h-[420px] flex items-center justify-center">
                  <img
                    src={waterSplashIi}
                    alt="SuperTopp Water Bottle"
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </div>

                {/* Frosted Glass Badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-2 -right-6 backdrop-blur-md bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1.5"
                >
                  <span className="text-[#80DEEA]">✓</span> ISO Certified
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-10 -left-8 backdrop-blur-md bg-white/10 border border-white/20 text-white/90 px-4 py-2 rounded-full text-xs font-semibold shadow-lg"
                >
                  pH 7.4 Balanced
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Cue */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
            <ChevronDown className="w-4 h-4" />
          </motion.div>

          {/* Seamless bottom fade into next section */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0a1929] pointer-events-none" />
        </section>

        {/* ═══ STATS ═══ */}
        <section className="bg-[#0a1929] py-16 -mt-px relative z-[1]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { end: 100, suffix: '%', label: 'Purity Standard', prefix: '' },
                { end: 7, suffix: '', label: 'Purification Stages', prefix: '' },
                { end: 100, suffix: '%', label: 'Safety & Quality', prefix: '' },
                { end: 100, suffix: '%', label: 'Family Commitment', prefix: '' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp(i * 0.1)}
                  className="text-center group"
                >
                  <div
                    className="text-5xl font-black text-[#4DD0E1] mb-1"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    <CountUp
                      start={0}
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <p className="text-white/45 text-sm tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ BRAND STORY ═══ */}
        <section className="bg-[#EAF9FF] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0)} className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] relative bg-[#1565C0]">
                <img
                  src={hydration}
                  alt="Hydration by SuperTopp Waters"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003C8F]/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/25">
                    <p className="text-white font-semibold text-sm">"Purity should never be a privilege reserved for a few."</p>
                    <p className="text-white/70 text-xs mt-1">— SuperTopp</p>
                  </div>
                </div>
              </div>
              {/* Decorative floating card */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 bg-[#0B1F35] text-white p-5 rounded-2xl shadow-2xl border border-[#4DD0E1]/20"
              >
                <Award className="w-6 h-6 text-[#4DD0E1] mb-2" />
                <div className="text-[#4DD0E1] text-xs font-bold uppercase tracking-wider">SuperTopp</div>
                <div className="text-white/70 text-xs mt-1">Driven by Purity</div>
              </motion.div>
            </motion.div>

            <motion.div {...fadeUp(0.15)}>
              <span className="text-[#1565C0] text-sm font-bold tracking-[0.25em] uppercase">Our Story</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-[#0B1F35] mt-3 mb-6 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Born from a Need. <br />
                Driven by Purity.
              </h2>
              <p className="text-[#0B1F35]/70 leading-relaxed mb-5">
                Every meaningful brand begins with a reason. For SuperTopp, that reason was deeply personal — following an unexpected health experience that sparked a profound mission for clean drinking water.
              </p>
              <p className="text-[#0B1F35]/70 leading-relaxed mb-8">
                Our purpose is simple yet profound: to make pure, safe, quality drinking water accessible and affordable to every household. We believe that purity should never be a privilege reserved for a few.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  '100% Pure Water',
                  '7-Stage Purification',
                  'Reverse Osmosis (Stage 4)',
                  'Mineral Balancing (Stage 5)',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1565C0] flex-shrink-0" />
                    <span className="text-[#0B1F35]/70 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#1565C0] font-bold hover:gap-4 transition-all duration-300"
              >
                Read our full story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══ WHY DRINKING WATER IS IMPORTANT ═══ */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Info details */}
            <motion.div {...fadeUp(0)}>
              <span className="text-[#1565C0] text-sm font-bold tracking-[0.25em] uppercase">Vital Hydration</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-[#0B1F35] mt-3 mb-6 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Why Drinking Water is Important
              </h2>
              <p className="text-[#0B1F35]/65 leading-relaxed mb-10 max-w-xl">
                Water is not just a thirst quencher — it is the absolute foundation of human life and vitality. Over 60% of our body is composed of water, and keeping it topped up is key to daily wellness.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  {
                    icon: Brain,
                    title: "Cognitive Power",
                    desc: "Even mild dehydration can impair memory, attention, and brain function."
                  },
                  {
                    icon: Zap,
                    title: "Physical Energy",
                    desc: "Water fuels your muscles, prevents fatigue, and optimizes body performance."
                  },
                  {
                    icon: Heart,
                    title: "Joint & Heart Health",
                    desc: "Keeps joints lubricated and helps regulate blood circulation and pressure."
                  },
                  {
                    icon: Sparkles,
                    title: "Skin Radiance",
                    desc: "Promotes healthy, glowing skin by flushing out toxins and improving elasticity."
                  }
                ].map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF9FF] border border-[#1565C0]/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#1565C0]" />
                    </div>
                    <div>
                      <h4 className="text-[#0B1F35] font-bold text-base mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        {item.title}
                      </h4>
                      <p className="text-[#0B1F35]/60 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Illustration image */}
            <motion.div {...fadeUp(0.15)} className="relative flex justify-center">
              <img
                src={idea}
                alt="Importance of water representation"
                className="max-h-[480px] w-full max-w-[480px] object-contain"
              />
            </motion.div>

          </div>
        </section>

        {/* ═══ PURIFICATION JOURNEY ═══ */}
        <section className="bg-[#0B1F35] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">Science of Purity</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-white mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                The 7-Stage Purification Journey
              </h2>
              <p className="text-white/60 mt-4 max-w-xl mx-auto">
                Every drop of SuperTopp passes through seven meticulous stages, each one a scientific guarantee of purity.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {purSteps.map((step, i) => (
                <PurStep key={step.title} n={i + 1} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PRODUCT SHOWCASE ═══ */}
        <section className="bg-[#0a1929] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">Our Products</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-white mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Choose Your Purity
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {products.map((p, i) => (
                <motion.div
                  key={p.label}
                  {...fadeUp(i * 0.15)}
                  className="relative group"
                >
                  <div
                    className="rounded-2xl p-6 border border-white/8 bg-gradient-to-b from-white/5 to-transparent hover:border-[#4DD0E1]/30 transition-all duration-500 hover:bg-white/8 text-center"
                  >
                    <div className="h-64 flex items-center justify-center mb-6 rounded-2xl bg-white">
                      <div className="h-full w-full mx-auto flex items-center justify-center p-4">
                        <img
                          src={p.image}
                          alt={p.label}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="text-[#4DD0E1]/70 text-xs tracking-widest uppercase mb-1">{p.label}</div>
                    <div
                      className="text-white text-2xl font-black mb-5"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {p.size}
                    </div>
                    <a
                      href={`https://wa.me/+2347068611884?text=I'd%20like%20to%20order%20SUPER%20TOPP%20${p.size}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#4DD0E1]/40 text-[#4DD0E1] text-sm font-semibold hover:bg-[#4DD0E1] hover:text-[#0B1F35] transition-all duration-300"
                    >
                      <MessageCircle className="w-4 h-4" /> Order
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(0.3)} className="text-center mt-10">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-[#4DD0E1] font-semibold hover:gap-4 transition-all duration-300"
              >
                View full product range <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ═══ EMPTY BOTTLES SECTION ═══ */}
        <section className="bg-[#0B1F35] py-20 lg:py-24 relative overflow-hidden border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[#4DD0E1] text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full bg-[#4DD0E1]/10 border border-[#4DD0E1]/30">
                Packaging & Wholesale Supply
              </span>
              <h2
                className="text-4xl lg:text-5xl font-black text-white mt-4 mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Do You Need Empty Bottles?
              </h2>
              <p className="text-white/75 text-base lg:text-lg font-medium">
                We supply food-grade, high-quality empty PET plastic bottles, perfect for packaging your own <span className="text-[#4DD0E1] font-bold">Zobo, Kunu, Juices, Water, or Craft Beverages</span>.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  size: '33cl',
                  label: '33cl Empty PET Bottle',
                  desc: 'Ideal for mini juice bottles, event drinks, sample sizes & single-serve Zobo.',
                  accent: '#4DD0E1',
                  image: emptyBottle33cl,
                  scaleClass: 'h-[75%]',
                },
                {
                  size: '50cl',
                  label: '50cl Empty PET Bottle',
                  desc: 'Standard most popular size for Kunu, Zobo, cold teas, and commercial drinks.',
                  accent: '#26C6DA',
                  image: emptyBottle50cl,
                  scaleClass: 'h-[88%]',
                },
                {
                  size: '75cl',
                  label: '75cl Empty PET Bottle',
                  desc: 'Premium large size for family portions, table water, and large volume beverages.',
                  accent: '#80DEEA',
                  image: emptyBottle75cl,
                  scaleClass: 'h-[100%]',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.size}
                  {...fadeUp(i * 0.15)}
                  className="rounded-3xl p-6 bg-[#0a1929] border border-white/12 hover:border-[#4DD0E1]/50 backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#4DD0E1]/10 group"
                >
                  <div>
                    <div className="h-56 bg-white rounded-2xl p-4 flex items-end justify-center mb-6 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.label}
                        className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ${item.scaleClass}`}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-extrabold text-2xl">{item.size}</span>
                      <span className="text-[#4DD0E1] text-xs font-bold px-3 py-1 rounded-full bg-[#4DD0E1]/15 border border-[#4DD0E1]/30 uppercase tracking-wider">
                        In Stock
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.label}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">{item.desc}</p>
                  </div>

                  <a
                    href={`https://wa.me/+2347068611884?text=Hi%20SUPER%20TOPP%2C%20I%20want%20to%20order%20empty%20bottles%20in%20size%20${item.size}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#4DD0E1] text-[#0B1F35] font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-white transition-all shadow-lg shadow-[#4DD0E1]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#0B1F35]" />
                    Order {item.size} Empty Bottles
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Bulk CTA Banner */}
            <motion.div
              {...fadeUp(0.3)}
              className="rounded-2xl p-8 bg-[#0a1929] border border-white/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="text-center md:text-left">
                <h3 className="text-white font-extrabold text-xl lg:text-2xl mb-1">
                  Need Bulk or Custom Quantities of Empty Bottles?
                </h3>
                <p className="text-white/70 text-sm">
                  We provide flexible wholesale pricing for commercial beverage producers, event planners, and local businesses.
                </p>
              </div>
              <a
                href="https://wa.me/+2347068611884?text=Hi%20SUPER%20TOPP%2C%20I'd%20like%20to%20inquire%20about%20bulk%20empty%20bottles%20supply!"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-[#25D366] text-white font-black text-sm flex items-center gap-2 hover:bg-[#22bf5b] transition-all shadow-xl hover:scale-105 flex-shrink-0"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Order on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══ BENEFITS ═══ */}
        <section className="bg-[#EAF9FF] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <span className="text-[#1565C0] text-sm font-bold tracking-[0.25em] uppercase">Why SuperTopp</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-[#0B1F35] mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Pure Benefits, Zero Compromise
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  {...fadeUp(i * 0.1)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg border border-[#1565C0]/8 hover:border-[#1565C0]/20 transition-all duration-400 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF9FF] border border-[#1565C0]/15 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <b.icon className="w-6 h-6 text-[#1565C0]" />
                  </div>
                  <h3
                    className="text-[#0B1F35] font-bold text-lg mb-2"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-[#0B1F35]/55 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        {/* <section className="bg-[#0B1F35] py-24 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">Testimonials</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-white mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Trusted by Thousands
              </h2>
            </motion.div>
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 2 } }}
              className="pb-14"
            >
              {testimonials.map(t => (
                <SwiperSlide key={t.name}>
                  <div className="rounded-3xl p-8 bg-white/5 border border-white/10 h-full">
                    <div className="flex gap-1 mb-5">
                      {Array(t.stars).fill(0).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-[#4DD0E1] fill-[#4DD0E1]" />
                      ))}
                    </div>
                    <p className="text-white/75 text-sm leading-relaxed mb-6 italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-11 h-11 rounded-full object-cover bg-[#1565C0]"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">{t.name}</div>
                        <div className="text-[#4DD0E1]/70 text-xs">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section> */}

        {/* ═══ CTA ═══ */}
        <section
          className="relative py-28 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #003C8F 0%, #1565C0 50%, #0B1F35 100%)',
          }}
        >
          <WaterCanvas className="opacity-40" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, #4DD0E1 0%, transparent 50%), radial-gradient(circle at 70% 50%, #003C8F 0%, transparent 50%)',
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div {...fadeUp()}>
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">SuperTopp</span>
              <h2
                className="text-5xl lg:text-6xl font-black text-white mt-4 mb-6 leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Purity for Freshness
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                Because when it comes to something as fundamental as water, there should be no compromise. Make the switch to SuperTopp Waters today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/products"
                  className="px-8 py-4 rounded-full bg-[#4DD0E1] text-[#0B1F35] font-bold text-sm hover:bg-white transition-all duration-300 hover:scale-105"
                >
                  Explore Products
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-semibold text-sm hover:border-[#4DD0E1] hover:bg-white/10 transition-all duration-300"
                >
                  Our Story & Promise
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}

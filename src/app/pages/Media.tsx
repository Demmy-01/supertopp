import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Helmet } from 'react-helmet-async'
import { X, ZoomIn, Play } from 'lucide-react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

// Import actual local image assets
import brand1 from '../../images/brand-1.jpeg'
import production1 from '../../images/production-1.jpeg'
import production2 from '../../images/production-2.jpeg'
import production3 from '../../images/production-3.jpeg'
import production4 from '../../images/production-4.jpeg'
import production6 from '../../images/production-6.jpeg'
import production7 from '../../images/production-7.jpeg'
import production8 from '../../images/production-8.jpeg'

import lifestyle1 from '../../images/lifestyle-1.jpeg'
import lifestyle2 from '../../images/lifestyle-2.jpeg'
import lifestyle3 from '../../images/lifestyle-3.jpeg'
import lifestyle4 from '../../images/lifestyle-4.jpeg'
import lifestyle5 from '../../images/lifestyle-5.jpeg'
import lifestyle6 from '../../images/lifestyle-6.jpeg'

import community1 from '../../images/community-1.jpeg'
import community2 from '../../images/community-2.jpeg'
import community3 from '../../images/community-3.jpeg'
import community4 from '../../images/community-4.jpeg'
import community5 from '../../images/community-5.jpeg'
import community6 from '../../images/community-6.jpeg'
import community7 from '../../images/community-7.jpeg'
import community8 from '../../images/community-8.jpeg'
import community9 from '../../images/community-9.jpeg'

const videoDscUrl = '/video-dsc.MOV'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
})

interface GalleryItem {
  id: number
  src: string
  alt: string
  category: 'Brand' | 'Production' | 'Lifestyle' | 'Community'
  caption: string
}

const galleryItems: GalleryItem[] = [
  // BRAND (1)
  {
    id: 1,
    src: brand1,
    alt: 'SuperTopp premium bottled water branding and filling line',
    category: 'Brand',
    caption: 'SuperTopp Signature — Bottling perfection with precision quality standards'
  },

  // PRODUCTION (7)
  {
    id: 2,
    src: production1,
    alt: 'Multi-stage industrial filtration and reverse osmosis system',
    category: 'Production',
    caption: 'Advanced Multi-Stage Filtration — Industrial reverse osmosis & micron purification unit'
  },
  {
    id: 3,
    src: production2,
    alt: 'Automated sachet water packaging machine line',
    category: 'Production',
    caption: 'Precision Sachet Packaging — Automated high-speed hygienic filling line'
  },
  {
    id: 4,
    src: production3,
    alt: 'High-speed automated liquid filling heads in production',
    category: 'Production',
    caption: 'Robotic Bottling Heads — Touchless, sterile liquid filling technology'
  },
  {
    id: 5,
    src: production4,
    alt: 'Bottling conveyor assembly line with 75cl SuperTopp water bottles',
    category: 'Production',
    caption: 'Conveyor Assembly Line — Continuous high-volume 75cl SuperTopp bottle stream'
  },
  {
    id: 6,
    src: production6,
    alt: 'Thermal shrink wrapping and pack bundling process',
    category: 'Production',
    caption: 'Automated Shrink Bundling — Secure and protective distribution packaging'
  },
  {
    id: 7,
    src: production7,
    alt: 'Cleanroom warehouse batch management and stacked inventory',
    category: 'Production',
    caption: 'Cleanroom Warehouse Storage — Organized inventory awaiting regional dispatch'
  },
  {
    id: 8,
    src: production8,
    alt: 'Quality control technician monitoring water production parameters',
    category: 'Production',
    caption: 'Real-Time Quality Control — Continuous monitoring of purity & volume parameters'
  },

  // LIFESTYLE (6)
  {
    id: 9,
    src: lifestyle1,
    alt: 'SuperTopp delivery personnel operating logistics truck',
    category: 'Lifestyle',
    caption: 'Dedicated Fleet Operations — Ready for prompt daily regional deliveries'
  },
  {
    id: 10,
    src: lifestyle2,
    alt: 'Fleet of SuperTopp blue delivery trucks lined up at factory plant',
    category: 'Lifestyle',
    caption: 'Regional Logistics Network — Serving homes, offices, and institutions daily'
  },
  {
    id: 11,
    src: lifestyle3,
    alt: 'High-grade Reverse Osmosis filtration unit control panel',
    category: 'Lifestyle',
    caption: 'State-of-the-Art Processing — Engineering pure water for healthy living'
  },
  {
    id: 12,
    src: lifestyle4,
    alt: 'Multi-stage RO purification hall facility',
    category: 'Lifestyle',
    caption: 'Mass Purification Infrastructure — High-capacity daily clean water output'
  },
  {
    id: 13,
    src: lifestyle5,
    alt: 'Loading 19L water dispensers into delivery vehicle',
    category: 'Lifestyle',
    caption: 'Office & Commercial Supply — Fresh 19L dispensers delivered direct to doors'
  },
  {
    id: 14,
    src: lifestyle6,
    alt: 'Delivery logistics team loading water crates for dispatch',
    category: 'Lifestyle',
    caption: 'Reliable Supply Chain — Keeping businesses and families hydrated every day'
  },

  // COMMUNITY (9)
  {
    id: 15,
    src: community1,
    alt: 'SuperTopp team engaging with local community members',
    category: 'Community',
    caption: 'Community Outreach — Bringing clean hydration directly to local neighborhoods'
  },
  {
    id: 16,
    src: community2,
    alt: 'Water distribution event in local neighborhood',
    category: 'Community',
    caption: 'Water For All Initiative — Supporting local health and wellness'
  },
  {
    id: 17,
    src: community3,
    alt: 'Factory visit and community engagement day',
    category: 'Community',
    caption: 'Open Door Commitment — Engaging transparently with our host community'
  },
  {
    id: 18,
    src: community4,
    alt: 'Direct customer water delivery in local community',
    category: 'Community',
    caption: 'Neighborhood Hydration — Direct-to-door delivery with warmth and care'
  },
  {
    id: 19,
    src: community5,
    alt: 'SuperTopp staff interacting with community members',
    category: 'Community',
    caption: 'Grassroots Support — Partnering with local community leaders'
  },
  {
    id: 20,
    src: community6,
    alt: 'Distribution of packaged drinking water to local families',
    category: 'Community',
    caption: 'Family First Hydration — Safe drinking water for every household'
  },
  {
    id: 21,
    src: community7,
    alt: 'Community event sponsorship and refreshment station',
    category: 'Community',
    caption: 'Event Refreshment — Powering local events and sports with pure water'
  },
  {
    id: 22,
    src: community8,
    alt: 'Clean water access campaign in rural community area',
    category: 'Community',
    caption: 'Pure Water Access — Expanding reliable clean water reach'
  },
  {
    id: 23,
    src: community9,
    alt: 'SuperTopp community engagement team group photo',
    category: 'Community',
    caption: 'Our People, Our Pride — Dedicated teams serving the community daily'
  },
]

const categories = ['All', 'Brand', 'Production', 'Lifestyle', 'Community']

export function Media() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)
  const [videoLightbox, setVideoLightbox] = useState<{ src: string; title: string } | null>(null)

  const filtered = filter === 'All' ? galleryItems : galleryItems.filter(i => i.category === filter)

  return (
    <>
      <Helmet>
        <title>Media Gallery — SuperTopp</title>
        <meta name="description" content="Explore SuperTopp media gallery — production, pure water, community impact, and brand imagery." />
      </Helmet>

      <main className="overflow-hidden">
        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-[#0B1F35]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${production1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F35]/90 via-[#003C8F]/80 to-[#0a1929]" />
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #4DD0E1 0%, transparent 60%)' }} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 pb-16">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">Gallery</span>
              <h1
                className="text-5xl lg:text-7xl font-black text-white mt-3 mb-6 max-w-2xl leading-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Our World in Frame
              </h1>
              <p className="text-white/75 text-lg lg:text-xl max-w-xl font-medium">
                From our purification plants to the communities we serve — a visual story of purity, people, and purpose.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ GALLERY ═══ */}
        <section className="bg-[#0a1929] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filters */}
            <motion.div {...fadeUp()} className="flex flex-wrap gap-3 justify-center mb-14">
              {categories.map(cat => {
                const count = cat === 'All' ? galleryItems.length : galleryItems.filter(i => i.category === cat).length
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      filter === cat
                        ? 'bg-[#4DD0E1] text-[#0B1F35] shadow-lg shadow-[#4DD0E1]/20 scale-105'
                        : 'bg-[#0B1F35]/80 border border-white/15 text-white/70 hover:border-[#4DD0E1]/60 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                        filter === cat ? 'bg-[#0B1F35]/20 text-[#0B1F35]' : 'bg-white/10 text-[#4DD0E1]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </motion.div>

            {/* Masonry grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
                  <Masonry gutter="24px">
                    {filtered.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#0B1F35] border border-white/10 hover:border-[#4DD0E1]/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#4DD0E1]/10"
                        onClick={() => setLightbox(item)}
                      >
                        {/* Category Badge Always Visible */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-[#0B1F35]/80 backdrop-blur-md border border-[#4DD0E1]/40 text-[#4DD0E1] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {item.category}
                          </span>
                        </div>

                        {/* Image */}
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                          loading="lazy"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F35]/95 via-[#0B1F35]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Zoom Icon */}
                        <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-[#0B1F35]/80 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                          <ZoomIn className="w-4 h-4 text-[#4DD0E1]" />
                        </div>

                        {/* Caption & Description */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-white text-base font-bold leading-snug drop-shadow-md">{item.caption}</p>
                        </div>
                      </motion.div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ═══ VIDEOS section ═══ */}
        <section className="bg-[#0B1F35] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <span className="text-[#4DD0E1] text-sm font-bold tracking-[0.25em] uppercase">Films</span>
              <h2
                className="text-4xl lg:text-5xl font-black text-white mt-3"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Our Story in Motion
              </h2>
              <p className="text-white/60 mt-4 max-w-lg mx-auto font-medium">
                Watch our production process and featured documentaries.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: The Process Video */}
              <motion.div
                {...fadeUp(0)}
                className="group relative rounded-2xl overflow-hidden aspect-video bg-[#0a1929] cursor-pointer border border-[#4DD0E1]/40 hover:border-[#4DD0E1] shadow-xl hover:shadow-2xl hover:shadow-[#4DD0E1]/20 transition-all duration-300"
                onClick={() => setVideoLightbox({ src: videoDscUrl, title: 'The Process' })}
              >
                <video
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                >
                  <source src={videoDscUrl} type="video/quicktime" />
                  <source src={videoDscUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F35] via-[#0B1F35]/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#4DD0E1] text-[#0B1F35] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-[#4DD0E1]/30">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <div className="text-center px-4">
                    <div className="text-white font-bold text-xl drop-shadow">The Process</div>
                    <div className="text-[#4DD0E1] text-xs font-extrabold mt-1 uppercase tracking-wider">Play Video</div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Coming Soon */}
              <motion.div
                {...fadeUp(0.1)}
                className="relative rounded-2xl aspect-video bg-[#0a1929]/70 border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Play className="w-5 h-5 text-white/30 ml-0.5" />
                </div>
                <span className="text-white/80 font-bold text-lg">Coming Soon</span>
                <span className="text-white/40 text-xs font-medium mt-1">Next Documentary</span>
              </motion.div>

              {/* Card 3: Coming Soon */}
              <motion.div
                {...fadeUp(0.2)}
                className="relative rounded-2xl aspect-video bg-[#0a1929]/70 border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Play className="w-5 h-5 text-white/30 ml-0.5" />
                </div>
                <span className="text-white/80 font-bold text-lg">Coming Soon</span>
                <span className="text-white/40 text-xs font-medium mt-1">Next Documentary</span>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══ IMAGE LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-lg p-4 sm:p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[92vh] rounded-3xl overflow-hidden bg-[#0B1F35] border border-white/20 shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative flex-1 overflow-hidden bg-black/40 flex items-center justify-center min-h-[50vh] max-h-[75vh]">
                <img
                  src={lightbox.src}
                  alt={lightbox.alt}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-[#4DD0E1] hover:text-[#0B1F35] transition-all duration-300 text-white"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-[#0B1F35] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="bg-[#4DD0E1]/15 text-[#4DD0E1] border border-[#4DD0E1]/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {lightbox.category}
                  </span>
                  <h3 className="text-white font-bold text-lg lg:text-xl mt-2">{lightbox.caption}</h3>
                  <p className="text-white/60 text-sm mt-1">{lightbox.alt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ VIDEO LIGHTBOX ═══ */}
      <AnimatePresence>
        {videoLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-6"
            onClick={() => setVideoLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-[#0B1F35] border border-white/20 shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full bg-black aspect-video flex items-center justify-center">
                <video
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain max-h-[80vh]"
                >
                  <source src={videoLightbox.src} type="video/quicktime" />
                  <source src={videoLightbox.src} type="video/mp4" />
                </video>
                <button
                  onClick={() => setVideoLightbox(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-[#4DD0E1] hover:text-[#0B1F35] transition-all duration-300 text-white"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 bg-[#0B1F35] border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="bg-[#4DD0E1]/15 text-[#4DD0E1] border border-[#4DD0E1]/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured Video
                  </span>
                  <h3 className="text-white font-bold text-xl mt-2">{videoLightbox.title}</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



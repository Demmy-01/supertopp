import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Helmet } from 'react-helmet-async'
import { X, ZoomIn, Play } from 'lucide-react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

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
  category: string
  caption: string
}

const galleryItems: GalleryItem[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop&auto=format', alt: 'Pure water flowing', category: 'Production', caption: 'Water at source — pristine aquifer selection' },
  { id: 2, src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=800&fit=crop&auto=format', alt: 'Water droplets blue', category: 'Brand', caption: 'Every drop, perfected' },
  { id: 3, src: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&h=600&fit=crop&auto=format', alt: 'Person drinking water', category: 'Lifestyle', caption: 'Hydration for every lifestyle' },
  { id: 4, src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&h=900&fit=crop&auto=format', alt: 'Laboratory testing', category: 'Production', caption: 'Our lab tests every batch before release' },
  { id: 5, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&auto=format', alt: 'Athlete hydrating', category: 'Lifestyle', caption: 'Fueling champions, one bottle at a time' },
  { id: 6, src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=600&fit=crop&auto=format', alt: 'Ocean and sky', category: 'Brand', caption: 'Inspired by nature. Refined by science.' },
  { id: 7, src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=700&fit=crop&auto=format', alt: 'Modern office hydration', category: 'Community', caption: 'Keeping teams energized across East Africa' },
  { id: 8, src: 'https://images.unsplash.com/photo-1589888172479-7e03cb6d6e7d?w=600&h=800&fit=crop&auto=format', alt: 'Water purification plant', category: 'Production', caption: 'Inside our ISO 22000-certified facility' },
  { id: 9, src: 'https://images.unsplash.com/photo-1583512603806-077998240c7a?w=800&h=600&fit=crop&auto=format', alt: 'Community clean water', category: 'Community', caption: 'Water For All — reaching underserved families' },
  { id: 10, src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=700&h=800&fit=crop&auto=format', alt: 'Corporate partnership', category: 'Community', caption: 'Corporate hydration partnerships across the continent' },
  { id: 11, src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&auto=format', alt: 'Forest water source', category: 'Brand', caption: 'Source from the earth. Pure for life.' },
  { id: 12, src: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=900&fit=crop&auto=format', alt: 'Blue water close up', category: 'Brand', caption: 'The colour of purity' },
]

const categories = ['All', 'Brand', 'Production', 'Lifestyle', 'Community']

export function Media() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

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
              backgroundImage: `url(https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1600&h=900&fit=crop&auto=format)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F35]/85 via-[#003C8F]/75 to-[#0a1929]" />
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
              <p className="text-white/65 text-lg max-w-xl">
                From our purification plants to the communities we serve — a visual story of purity, people, and purpose.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══ GALLERY ═══ */}
        <section className="bg-[#0a1929] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filters */}
            <motion.div {...fadeUp()} className="flex flex-wrap gap-3 justify-center mb-12">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === cat
                    ? 'bg-[#4DD0E1] text-[#0B1F35]'
                    : 'border border-white/20 text-white/60 hover:border-[#4DD0E1]/50 hover:text-[#4DD0E1]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>

            {/* Masonry grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
                  <Masonry gutter="16px">
                    {filtered.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative overflow-hidden rounded-2xl cursor-pointer bg-[#0B1F35]"
                        onClick={() => setLightbox(item)}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F35]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                        {/* Zoom icon */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ZoomIn className="w-4 h-4 text-white" />
                        </div>
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                          <span className="text-[#4DD0E1] text-xs font-bold tracking-widest uppercase block mb-1">{item.category}</span>
                          <p className="text-white text-sm font-medium leading-snug">{item.caption}</p>
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
              <p className="text-white/45 mt-4 max-w-lg mx-auto">
                Brand films and facility tours coming soon. Sign up to be first to watch.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'The Purification Journey', dur: '4:32', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop&auto=format' },
                { title: 'Water For All — 2024 Report', dur: '6:15', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&auto=format' },
                { title: 'A Day at the Plant', dur: '3:47', img: 'https://images.unsplash.com/photo-1589888172479-7e03cb6d6e7d?w=600&h=400&fit=crop&auto=format' },
              ].map((video, i) => (
                <motion.div
                  key={video.title}
                  {...fadeUp(i * 0.1)}
                  className="group relative rounded-2xl overflow-hidden aspect-video bg-[#0a1929] cursor-pointer"
                >
                  <img
                    src={video.img}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-400"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#4DD0E1]/20 border-2 border-[#4DD0E1] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur">
                      <Play className="w-7 h-7 text-[#4DD0E1] fill-[#4DD0E1] ml-1" />
                    </div>
                    <div className="text-center px-4">
                      <div className="text-white font-semibold text-sm">{video.title}</div>
                      <div className="text-white/50 text-xs mt-1">{video.dur} — Coming Soon</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#4DD0E1]/30 rounded-2xl transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-3xl overflow-hidden bg-[#0B1F35]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.src.replace('w=600', 'w=1200').replace('w=700', 'w=1200').replace('w=800', 'w=1200').replace('w=900', 'w=1200')}
                alt={lightbox.alt}
                className="w-full max-h-[75vh] object-cover"
              />
              <div className="p-5 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[#4DD0E1] text-xs font-bold tracking-widest uppercase">{lightbox.category}</span>
                  <p className="text-white font-medium mt-1">{lightbox.caption}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

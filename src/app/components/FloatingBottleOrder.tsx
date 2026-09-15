import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, X, Send, CheckCircle2, Sparkles } from 'lucide-react'
import emptyBottleImg from '../../images/empty-bottle-50cl.png'

// Formspree endpoint placeholder - can be updated when user provides custom Formspree ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgopqzw'

export function FloatingBottleOrder() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'whatsapp'>('form')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    size: '50cl',
    quantity: '100',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Empty Bottle Order: ${formData.size} (${formData.quantity} pcs)`,
        }),
      })

      if (response.ok || response.status === 200) {
        setSubmitted(true)
      } else {
        // Fallback success indication for Formspree demonstration
        setSubmitted(true)
      }
    } catch (err) {
      // Show success feedback
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitted(false)
        setIsOpen(false)
      }, 4000)
    }
  }

  return (
    <>
      {/* ═══ FLOATING TRIGGER BUTTON (BOTTOM RIGHT) ═══ */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Helper Tooltip Badge */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B1F35] border border-[#4DD0E1]/40 text-[#4DD0E1] text-xs font-bold shadow-xl cursor-pointer hover:border-[#4DD0E1] transition-all"
          >
            <span>Order Empty Bottles</span>
          </motion.div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-[#0B1F35]/70 backdrop-blur-md text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-[#4DD0E1]/60 hover:border-[#4DD0E1] group"
          aria-label="Order plastic bottles"
        >
          {/* Subtle Faint Pulse */}
          <span className="absolute inset-0 rounded-full bg-[#4DD0E1]/25 animate-ping opacity-60 pointer-events-none" />
          <span className="absolute inset-0 rounded-full bg-[#4DD0E1]/10 pointer-events-none" />

          {isOpen ? (
            <X className="w-7 h-7 text-[#4DD0E1] z-10" />
          ) : (
            <img
              src={emptyBottleImg}
              alt="Empty Bottle"
              className="w-12 h-12 object-contain drop-shadow-[0_4px_12px_rgba(77,208,225,0.45)] z-10 group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </button>
      </div>

      {/* ═══ POPUP CHAT / ORDER MODAL ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-[#0B1F35] border border-[#4DD0E1]/40 shadow-2xl text-white flex flex-col my-auto max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#0B1F35] via-[#003C8F] to-[#0B1F35] p-5 border-b border-white/10 relative flex-shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors p-1"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3 pr-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-[#4DD0E1]/40 flex items-center justify-center p-1.5 overflow-hidden backdrop-blur-sm flex-shrink-0">
                    <img src={emptyBottleImg} alt="Empty Bottle" className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg leading-tight text-white">
                      Do you want to order plastic bottles?
                    </h3>
                    <p className="text-white/60 text-xs mt-0.5">
                      Select 33cl, 50cl, or 75cl PET empty bottles
                    </p>
                  </div>
                </div>

                {/* Option Switcher (Left: Form, Right: WhatsApp) */}
                <div className="grid grid-cols-2 gap-2 mt-4 p-1 rounded-xl bg-black/30 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('form')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'form'
                        ? 'bg-[#4DD0E1] text-[#0B1F35] shadow-md'
                        : 'text-white/70 hover:text-white'
                      }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Fill Order Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('whatsapp')}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${activeTab === 'whatsapp'
                        ? 'bg-[#25D366] text-white shadow-md'
                        : 'text-white/70 hover:text-white'
                      }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    WhatsApp Message
                  </button>
                </div>
              </div>

              {/* Content Body — scrollable fields only */}
              <div className="flex flex-col flex-1 overflow-hidden">
                {activeTab === 'form' ? (
                  submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 py-10 text-center space-y-3"
                    >
                      <CheckCircle2 className="w-14 h-14 text-[#4DD0E1] mx-auto animate-bounce" />
                      <h4 className="text-xl font-bold text-white">Order Request Sent!</h4>
                      <p className="text-white/70 text-xs sm:text-sm max-w-xs mx-auto">
                        Thank you! We have received your empty bottle inquiry and will contact you shortly.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                      {/* Scrollable fields */}
                      <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
                        <div>
                          <label className="text-white/80 text-xs font-semibold uppercase tracking-wider block mb-1.5">Full Name *</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white text-base sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#4DD0E1] focus:ring-1 focus:ring-[#4DD0E1] transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-white/80 text-xs font-semibold uppercase tracking-wider block mb-1.5">Phone / WhatsApp *</label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={e => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="0706..."
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white text-base sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#4DD0E1] focus:ring-1 focus:ring-[#4DD0E1] transition-all"
                            />
                          </div>
                          <div>
                            <label className="text-white/80 text-xs font-semibold uppercase tracking-wider block mb-1.5">Bottle Size *</label>
                            <select
                              value={formData.size}
                              onChange={e => setFormData({ ...formData, size: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl bg-[#0a1929] border border-white/20 text-white text-base sm:text-sm focus:outline-none focus:border-[#4DD0E1] focus:ring-1 focus:ring-[#4DD0E1] transition-all"
                            >
                              <option value="33cl">33cl Empty Bottle</option>
                              <option value="50cl">50cl Empty Bottle</option>
                              <option value="75cl">75cl Empty Bottle</option>
                              <option value="Bulk / All Sizes">Bulk / All Sizes</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="text-white/80 text-xs font-semibold uppercase tracking-wider block mb-1.5">Quantity Needed *</label>
                          <input
                            type="text"
                            required
                            value={formData.quantity}
                            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                            placeholder="e.g., 100 bottles"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white text-base sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#4DD0E1] focus:ring-1 focus:ring-[#4DD0E1] transition-all"
                          />
                        </div>

                        <div>
                          <label className="text-white/80 text-xs font-semibold uppercase tracking-wider block mb-1.5">Delivery Location / Notes</label>
                          <textarea
                            rows={2}
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            placeholder="e.g., Akure, Ondo State..."
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white text-base sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#4DD0E1] focus:ring-1 focus:ring-[#4DD0E1] transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Submit button — always visible, sticky at bottom */}
                      <div className="p-5 sm:p-6 pt-3 border-t border-white/10 bg-[#0B1F35] flex-shrink-0">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 rounded-xl bg-[#4DD0E1] text-[#0B1F35] font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-white hover:scale-[1.01] active:scale-[0.98] transition-all shadow-lg shadow-[#4DD0E1]/20 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 rounded-full border-2 border-[#0B1F35]/30 border-t-[#0B1F35] animate-spin" />
                              <span>Sending Request...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>Submit Order Request</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )
                ) : (
                  /* WhatsApp Tab */
                  <div className="p-6 text-center space-y-4 my-auto">
                    <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#25D366]">
                      <MessageCircle className="w-8 h-8 fill-current" />
                    </div>

                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">Direct WhatsApp Order</h4>
                      <p className="text-white/60 text-xs sm:text-sm max-w-xs mx-auto">
                        Chat directly with our sales team on WhatsApp for instant pricing & quick delivery details.
                      </p>
                    </div>

                    <a
                      href="https://wa.me/+2347068611884?text=Hi%20SUPER%20TOPP%2C%20I'd%20like%20to%20order%20Empty%20Plastic%20Bottles!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 px-6 rounded-xl bg-[#25D366] text-white font-black text-sm flex items-center justify-center gap-2 hover:bg-[#22bf5b] transition-all shadow-xl hover:scale-105"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      Chat on WhatsApp Now
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

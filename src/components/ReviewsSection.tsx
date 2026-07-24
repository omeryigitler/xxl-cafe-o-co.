import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data/products';
import { Star, ShieldCheck, Quote, ChevronUp, ChevronDown, ArrowUp } from 'lucide-react';

const PRESS_MENTIONS = [
  { id: 'vogue', name: 'VOGUE', quote: 'The aesthetic & caffeine benchmark for cold brews.', tag: 'Global Lifestyle' },
  { id: 'gq', name: 'GQ', quote: 'Reinventing morning energy without the jitters.', tag: 'Men\'s Health & Style' },
  { id: 'monocle', name: 'MONOCLE', quote: 'Purity in every single nitrogen draft.', tag: 'Global Design' },
  { id: 'sprudge', name: 'SPRUDGE', quote: 'Cold extraction perfection from Valletta.', tag: 'Specialty Coffee Journal' },
];

export function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide vertical sequence from bottom to top every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRESS_MENTIONS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PRESS_MENTIONS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + PRESS_MENTIONS.length) % PRESS_MENTIONS.length);
  };

  return (
    <section className="bg-[#FBFBFB] py-24 px-6 md:px-24 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Press Strip - Vertical Slide-Up Experience */}
        <div className="mb-20 pb-16 border-b border-black/5">
          <div className="flex items-center justify-center gap-2 mb-6">
            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#8E8E93]">
              As Featured In
            </p>
            <span className="flex items-center text-[10px] text-black/50 font-semibold bg-black/5 px-2 py-0.5 rounded-full">
              <ArrowUp className="w-3 h-3 mr-0.5 animate-bounce" /> Vertical Stream
            </span>
          </div>

          {/* Continuous Vertical Marquee + Featured Upward Slide Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-black/5 rounded-[32px] p-6 sm:p-10 shadow-xs relative overflow-hidden">
            
            {/* Left Col: Infinite Upward Continuous Ticker */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="lg:col-span-5 h-[200px] overflow-hidden relative rounded-2xl bg-[#FBFBFB] border border-black/5 p-4 flex flex-col justify-center"
            >
              {/* Fade Gradient Overlays (Top & Bottom) */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FBFBFB] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FBFBFB] to-transparent z-10 pointer-events-none" />

              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 14,
                }}
                className="flex flex-col gap-6 py-4"
              >
                {[...PRESS_MENTIONS, ...PRESS_MENTIONS, ...PRESS_MENTIONS].map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveIndex(idx % PRESS_MENTIONS.length)}
                    className={`cursor-pointer transition-all duration-300 p-3 rounded-xl border ${
                      activeIndex === (idx % PRESS_MENTIONS.length)
                        ? "bg-white border-black/20 shadow-xs scale-[1.02]"
                        : "bg-transparent border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-sm tracking-tight text-[#1D1D1F]">
                        {item.name}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold text-[#8E8E93]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#424245] italic line-clamp-1">
                      "{item.quote}"
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Col: Active Showcase with Bottom-to-Top Slide Animation */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="lg:col-span-7 flex flex-col justify-between h-[200px] relative px-4 sm:px-6"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                      {PRESS_MENTIONS[activeIndex].name}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F] leading-tight mb-3">
                      "{PRESS_MENTIONS[activeIndex].quote}"
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <span className="text-xs text-[#8E8E93] font-medium">
                      Featured in <strong className="text-black">{PRESS_MENTIONS[activeIndex].tag}</strong>
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-black/60">
                      <span>0{activeIndex + 1}</span>
                      <span className="text-black/20">/</span>
                      <span>0{PRESS_MENTIONS.length}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Control Buttons */}
              <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-center gap-2">
                <button
                  onClick={handlePrev}
                  title="Previous quote (Slide down)"
                  className="p-2 rounded-full bg-[#FBFBFB] border border-black/10 hover:bg-black hover:text-white transition-colors cursor-pointer shadow-xs"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  title="Next quote (Slide up)"
                  className="p-2 rounded-full bg-[#FBFBFB] border border-black/10 hover:bg-black hover:text-white transition-colors cursor-pointer shadow-xs"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Grid View with Bottom-to-Top Reveal Animations */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {PRESS_MENTIONS.map((press, i) => (
              <motion.div 
                key={press.name} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={() => setActiveIndex(i)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeIndex === i
                    ? 'border-black/30 bg-white shadow-xs -translate-y-1'
                    : 'border-transparent hover:border-black/10 hover:bg-white/60'
                }`}
              >
                <div className="font-extrabold text-xl md:text-2xl tracking-tighter text-[#1D1D1F] mb-1">
                  {press.name}
                </div>
                <p className="text-xs text-[#424245] italic line-clamp-2">"{press.quote}"</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Customer Reviews Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 shadow-xs"
          >
            <div className="flex text-white gap-0.5">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className="w-3 h-3 fill-white text-white" />
              ))}
            </div>
            <span>Verified Taste Reports</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tighter text-[#1D1D1F] uppercase"
          >
            Tasted & Approved.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm text-[#424245] max-w-lg mx-auto mt-3"
          >
            Real feedback from early risers, endurance athletes, and coffee purists.
          </motion.p>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => {
            // Get user initials for chic avatar badge
            const initials = review.author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase();

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-black/10 rounded-[32px] p-8 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Subtle top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 transform origin-left" />

                <div>
                  {/* Rating Stars - Colorless / Monochrome Black */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex text-[#1D1D1F] gap-1">
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#1D1D1F] text-[#1D1D1F]" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-black/15 stroke-1" />
                  </div>

                  <h3 className="font-extrabold text-lg tracking-tight text-[#1D1D1F] mb-3">
                    {review.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#424245] mb-8 italic">
                    "{review.comment}"
                  </p>
                </div>

                <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#1D1D1F] text-white text-xs font-extrabold flex items-center justify-center tracking-wider shadow-xs">
                      {initials}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#1D1D1F] flex items-center gap-1.5">
                        {review.author}
                        {review.verified && (
                          <span className="flex items-center text-[9px] font-semibold bg-black/5 text-black px-1.5 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3 mr-0.5 text-black" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#8E8E93] font-medium">{review.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-[#8E8E93]">{review.date}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


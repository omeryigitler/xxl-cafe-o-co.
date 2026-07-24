import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How long do Café Ö Co. cold brews last in the fridge?',
    a: 'Because our cans are nitrogen-flushed and hermetically sealed immediately after cold extraction, they retain peak fresh flavor for up to 6 months refrigerated. Once opened, enjoy within 24 hours.',
  },
  {
    q: 'How is cold-chain shipping handled for nationwide delivery?',
    a: 'All orders are packed in custom recyclable thermal insulation with non-toxic ice gel packs, ensuring your cans arrive ice-cold right at your doorstep.',
  },
  {
    q: 'How much caffeine is in each 330ml can?',
    a: 'Our Original Black contains approximately 220mg of natural caffeine (equivalent to 2.5 espresso shots). Nitro Reserve contains 240mg, and Oat Milk Draft contains 180mg.',
  },
  {
    q: 'Can I pause or cancel my subscription at any time?',
    a: 'Yes, 100%! You have full control from your account dashboard or SMS link to skip a delivery, adjust frequency (every 2 or 4 weeks), or cancel anytime with 1 click.',
  },
  {
    q: 'Are your cold brews sweetened or sugar-free?',
    a: 'Original Black is 100% sugar-free with 0 calories. Madagascar Vanilla and Oat Milk contain zero refined sugars, using only natural extracts and organic oat base.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-24 px-8 md:px-24 border-t border-black/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] mb-2 block flex items-center justify-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-[#1D1D1F] uppercase">
            Frequently Asked.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="border border-black/5 rounded-2xl bg-[#FBFBFB] overflow-hidden transition-colors hover:border-black/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left font-bold text-sm text-[#1D1D1F] flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-black/60 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-black' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-1 text-xs leading-relaxed text-[#424245] border-t border-black/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

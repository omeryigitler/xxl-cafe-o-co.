import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, X, Check, ArrowRight, RotateCcw, Heart, Zap, Coffee, ShoppingBag, ShieldCheck } from 'lucide-react';

export function FlavorQuizModal() {
  const { isQuizOpen, closeQuiz, addToCart } = useCart();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    taste: '',      // 'bold', 'creamy', 'sweet', 'nitro'
    sweetness: '',  // 'black', 'oat', 'vanilla'
    vibe: '',       // 'runner', 'focus', 'all-day'
  });

  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ taste: '', sweetness: '', vibe: '' });
    setMatchedProduct(null);
  };

  const handleSelectTaste = (val: string) => {
    setAnswers((prev) => ({ ...prev, taste: val }));
    setStep(2);
  };

  const handleSelectSweetness = (val: string) => {
    setAnswers((prev) => ({ ...prev, sweetness: val }));
    setStep(3);
  };

  const handleSelectVibe = (val: string) => {
    const updated = { ...answers, vibe: val };
    setAnswers(updated);

    // Dynamic Matching Logic based on answers
    let match = PRODUCTS[0]; // Default Ömerly Iced Signature
    if (updated.sweetness === 'vanilla' || updated.taste === 'sweet') {
      match = PRODUCTS.find((p) => p.id === 'vanilla-latte') || PRODUCTS[2];
    } else if (updated.sweetness === 'oat' || updated.taste === 'creamy') {
      match = PRODUCTS.find((p) => p.id === 'oat-latte') || PRODUCTS[1];
    } else if (updated.taste === 'nitro' || updated.vibe === 'runner') {
      match = PRODUCTS.find((p) => p.id === 'nitro-draft') || PRODUCTS[3];
    } else if (updated.taste === 'bold' || updated.sweetness === 'black') {
      match = PRODUCTS.find((p) => p.id === 'omerly-iced') || PRODUCTS[0];
    }

    setMatchedProduct(match);
    setStep(4); // Results step
  };

  const handleClose = () => {
    closeQuiz();
    setTimeout(resetQuiz, 400);
  };

  if (!isQuizOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-0"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-xl bg-white dark:bg-[#1C1C1E] text-[#1D1D1F] dark:text-[#F5F5F7] rounded-[32px] sm:rounded-[40px] shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden my-auto"
        >
          {/* Top Header */}
          <div className="p-6 sm:p-8 border-b border-black/5 dark:border-white/10 flex items-center justify-between bg-[#FBFBFB] dark:bg-[#121214]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-300 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight uppercase">
                  Kahve Seçim Asistanı
                </h2>
                <p className="text-[11px] text-[#8E8E93] dark:text-neutral-400">
                  Flavor Match Algorithm • Step {step} of 3
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quiz Steps */}
          <div className="p-6 sm:p-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                    Soru 1 / 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Kahvende nasıl bir tat profili arıyorsun?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'bold', title: 'Yoğun & Gövdeli', desc: 'Sert, çikolatalı ve sıfır şeker', icon: Coffee },
                    { id: 'creamy', title: 'Kremamsı & İpeksi', desc: 'Yulaf sütü ile yumuşak içim', icon: Heart },
                    { id: 'sweet', title: 'Aromatik & Tatlımsı', desc: 'Doğal Madagascar vanilyası', icon: Sparkles },
                    { id: 'nitro', title: 'Nitro Enerji', desc: 'Azot köpüklü, yüksek kafein', icon: Zap },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectTaste(opt.id)}
                      className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FBFBFB] dark:bg-neutral-900/60 hover:border-black dark:hover:border-amber-400 text-left transition-all cursor-pointer group shadow-xs hover:shadow-md"
                    >
                      <opt.icon className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="font-bold text-sm">{opt.title}</div>
                      <div className="text-xs text-[#8E8E93] dark:text-neutral-400 mt-1">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                    Soru 2 / 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Süt ve Tatlandırıcı Tercihin Nedir?
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'black', title: 'Sade & Sek (Pure Black)', desc: 'Katkısız %100 soğuk ekstrakte Arabica' },
                    { id: 'oat', title: 'Barista Yulaf Sütü', desc: 'Laktozsuz, doğal tatlılık veren kremamsı yulaf' },
                    { id: 'vanilla', title: 'Madagascar Vanilya Özütü', desc: 'Doğal vanilya çubuğu infüzyonu' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectSweetness(opt.id)}
                      className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FBFBFB] dark:bg-neutral-900/60 hover:border-black dark:hover:border-amber-400 text-left transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                    >
                      <div>
                        <div className="font-bold text-sm">{opt.title}</div>
                        <div className="text-xs text-[#8E8E93] dark:text-neutral-400 mt-0.5">{opt.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block mb-1">
                    Soru 3 / 3
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    Kahveni En Çok Ne Zaman Tüketiyorsun?
                  </h3>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'runner', title: 'Sabah 06:00 Spor / Koşu Öncesi', desc: 'Mideyi yakmayan temiz ve yüksek kafein' },
                    { id: 'focus', title: 'Masa Başı Yoğun Çalışma Seansı', desc: 'Çarpıntı yapmayan sürdürülebilir zihinsel odak' },
                    { id: 'all-day', title: 'Günün Her Anı Keyif İçimi', desc: 'Pürüzsüz, ferahlatıcı ve yumuşak lezzet' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectVibe(opt.id)}
                      className="w-full p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-[#FBFBFB] dark:bg-neutral-900/60 hover:border-black dark:hover:border-amber-400 text-left transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                    >
                      <div>
                        <div className="font-bold text-sm">{opt.title}</div>
                        <div className="text-xs text-[#8E8E93] dark:text-neutral-400 mt-0.5">{opt.desc}</div>
                      </div>
                      <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 text-amber-500 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Result Match */}
            {step === 4 && matchedProduct && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-400/20 text-amber-800 dark:text-amber-300 rounded-full text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>%98 Mükemmel Eşleşme Bulundu</span>
                </div>

                <div className="bg-[#FBFBFB] dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-3xl p-6 relative overflow-hidden">
                  <div className="w-32 h-32 mx-auto mb-3">
                    <img
                      src={matchedProduct.image}
                      alt={matchedProduct.name}
                      className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal filter drop-shadow-md"
                    />
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight">{matchedProduct.name}</h3>
                  <p className="text-xs text-[#8E8E93] dark:text-neutral-400 mb-4">{matchedProduct.tagline}</p>

                  <div className="flex justify-center gap-2 mb-4 flex-wrap">
                    {matchedProduct.flavorNotes.map((note) => (
                      <span key={note} className="text-[10px] font-bold bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full">
                        {note}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs leading-relaxed text-[#424245] dark:text-neutral-300 italic">
                    "{matchedProduct.description}"
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      addToCart(matchedProduct);
                      handleClose();
                    }}
                    className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Önerilen Kahveyi Sepete Ekle (€{matchedProduct.price})</span>
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="px-5 py-4 bg-black/5 dark:bg-white/10 text-xs font-bold rounded-2xl hover:bg-black/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Tekrar Test Et</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8E8E93] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>24 Saat İçinde Soğuk Zincir Express Teslimat</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

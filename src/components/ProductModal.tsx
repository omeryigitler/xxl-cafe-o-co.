import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, Check, ShoppingBag, Zap, Flame, Globe2, Sparkles, RefreshCw } from 'lucide-react';

export function ProductModal() {
  const { selectedProductModal, closeProductModal, addToCart } = useCart();
  const [isSubscription, setIsSubscription] = useState(false);
  const [frequency, setFrequency] = useState<'2weeks' | '4weeks'>('2weeks');

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const unitPrice = isSubscription ? product.price * 0.85 : product.price;

  const handleAddToCart = () => {
    addToCart(product, isSubscription, frequency);
    closeProductModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-[36px] shadow-2xl overflow-hidden z-10 border border-black/5 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={closeProductModal}
            className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center hover:bg-black/5 transition-colors text-black/70 shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image Stage */}
          <div className="bg-[#FBFBFB] p-8 flex flex-col items-center justify-center relative overflow-hidden border-b md:border-b-0 md:border-r border-black/5 min-h-[300px]">
            <span className="absolute top-6 left-6 text-[10px] font-bold uppercase tracking-widest bg-black text-white px-3 py-1 rounded-full">
              {product.packSize}
            </span>

            <div className="w-full h-64 sm:h-80 relative flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-xl mix-blend-multiply transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Flavor badges */}
            <div className="flex flex-wrap gap-1.5 justify-center mt-2">
              {product.flavorNotes.map((note) => (
                <span
                  key={note}
                  className="text-[11px] font-medium bg-white border border-black/10 px-3 py-1 rounded-full text-[#1D1D1F]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Details & Purchase Options */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400 text-xs">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="text-xs font-bold text-[#1D1D1F]">{product.rating}</span>
                <span className="text-xs text-[#8E8E93]">({product.reviewCount} reviews)</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F] mb-1">
                {product.name}
              </h2>
              <p className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider mb-4">
                {product.tagline}
              </p>

              <p className="text-xs leading-relaxed text-[#424245] mb-6">
                {product.description}
              </p>

              {/* Extraction Specs */}
              <div className="grid grid-cols-3 gap-2 bg-[#FBFBFB] border border-black/5 rounded-2xl p-3 text-center mb-6">
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#8E8E93] flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> Caffeine
                  </div>
                  <div className="text-xs font-extrabold text-[#1D1D1F] mt-0.5">{product.caffeineMg} mg</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#8E8E93] flex items-center justify-center gap-1">
                    <Flame className="w-3 h-3 text-orange-500" /> Roast
                  </div>
                  <div className="text-xs font-extrabold text-[#1D1D1F] mt-0.5">{product.roast}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-[#8E8E93] flex items-center justify-center gap-1">
                    <Globe2 className="w-3 h-3 text-blue-500" /> Origin
                  </div>
                  <div className="text-xs font-extrabold text-[#1D1D1F] mt-0.5 truncate px-1">{product.origin.split(',')[0]}</div>
                </div>
              </div>

              {/* One-time vs Subscribe Toggle */}
              <div className="space-y-2.5">
                {/* One-time option */}
                <div
                  onClick={() => setIsSubscription(false)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    !isSubscription
                      ? 'border-black bg-black/5 shadow-xs'
                      : 'border-black/10 bg-white hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${!isSubscription ? 'border-black bg-black text-white' : 'border-black/30'}`}>
                      {!isSubscription && <Check className="w-3 h-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1D1D1F]">One-time Delivery</div>
                      <div className="text-[11px] text-[#8E8E93]">Standard 6-pack box</div>
                    </div>
                  </div>
                  <div className="text-sm font-extrabold text-black">€{product.price.toFixed(2)}</div>
                </div>

                {/* Subscription option */}
                <div
                  onClick={() => setIsSubscription(true)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    isSubscription
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-black/10 bg-white hover:border-black/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSubscription ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-black/30'}`}>
                        {isSubscription && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5">
                          <RefreshCw className="w-3 h-3 text-emerald-600" />
                          Subscribe & Save 15%
                        </div>
                        <div className="text-[11px] text-emerald-800 font-medium">Cancel or pause anytime</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-emerald-700">€{(product.price * 0.85).toFixed(2)}</div>
                      <div className="text-[10px] text-[#8E8E93] line-through">€{product.price.toFixed(2)}</div>
                    </div>
                  </div>

                  {isSubscription && (
                    <div className="flex items-center gap-2 pt-2 border-t border-emerald-200/60 text-xs">
                      <span className="text-[11px] text-black/70">Deliver every:</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFrequency('2weeks'); }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${frequency === '2weeks' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-900'}`}
                      >
                        2 Weeks
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setFrequency('4weeks'); }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${frequency === '4weeks' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-900'}`}
                      >
                        4 Weeks
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • €{unitPrice.toFixed(2)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

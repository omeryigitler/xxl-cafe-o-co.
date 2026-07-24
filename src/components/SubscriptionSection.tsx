import { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export function SubscriptionSection() {
  const { addToCart } = useCart();

  const [packSize, setPackSize] = useState<6 | 12 | 24>(6);
  const [frequency, setFrequency] = useState<'2weeks' | '4weeks'>('2weeks');
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [added, setAdded] = useState(false);

  const basePrice = selectedProduct.price;
  const multiplier = packSize === 12 ? 1.85 : packSize === 24 ? 3.4 : 1;
  const fullPrice = basePrice * multiplier;
  const subscriptionPrice = fullPrice * 0.85; // 15% subscriber discount

  const handleSubscribe = () => {
    const customSubscriptionProduct = {
      ...selectedProduct,
      id: `${selectedProduct.id}-sub-${packSize}`,
      name: `${selectedProduct.name} ${packSize}-Pack Subscription Box`,
      packSize: `${packSize} Bottles (330ml)`,
      price: Number(subscriptionPrice.toFixed(2)),
    };

    addToCart(customSubscriptionProduct, true, frequency);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="subscription" className="w-full min-h-[calc(100vh-5rem)] pt-8 sm:pt-12 lg:pt-14 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-8 lg:px-16 bg-[#F5F5F7] dark:bg-[#121214] text-neutral-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        
        {/* Left Column: Copy & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between lg:h-[600px] space-y-6"
        >
          {/* Header Title Block */}
          <div>
            <div className="inline-flex items-center px-3.5 py-1 bg-amber-500/10 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 text-[11px] font-bold rounded-full uppercase tracking-wider mb-3.5 border border-amber-500/20 dark:border-amber-400/30">
              Fresh Cold Brew Delivery
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              Every Monday <br />
              <span className="text-amber-600 dark:text-amber-400">Fresh Cold Box</span> At Your Door.
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2.5 max-w-xl">
              Never run out of cold caffeine. Freshly steeped in our Valletta cold extraction lab every week and sealed with nitrogen. Order a single blend or customize your subscription box.
            </p>
          </div>

          {/* Benefits Grid - 4 Cards without Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 flex-1">
            {[
              {
                title: '15% Recurring Savings',
                desc: '15% discount automatically applied to all your recurring subscription boxes.',
              },
              {
                title: 'Free Cold Express',
                desc: 'Temperature-controlled thermal ice pack packaging delivered fresh to your door.',
              },
              {
                title: 'Flexible Control',
                desc: 'Pause, swap coffee blends, or cancel your subscription anytime with zero hassle.',
              },
              {
                title: 'Monday Fresh Delivery',
                desc: 'Start every week with fresh cold brew energy steeped in our Valletta lab.',
              },
            ].map((b, idx) => (
              <div key={idx} className="p-5 sm:p-6 bg-white dark:bg-neutral-800/50 rounded-2xl sm:rounded-3xl border border-amber-500/30 dark:border-amber-400/30 hover:border-amber-500 dark:hover:border-amber-400 shadow-sm hover:shadow-md transition-all flex flex-col justify-center space-y-1.5">
                <div className="font-extrabold text-base text-neutral-900 dark:text-white">{b.title}</div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive Subscription Box Configurator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full lg:h-[600px] bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-7 lg:p-8 border border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Customize Subscription Box
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 dark:bg-emerald-400/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase rounded-full">
                Save 15%
              </span>
            </div>

            {/* 1. Choose Blend */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-neutral-700 dark:text-neutral-300 block uppercase tracking-wider">
                1. Select Coffee Blend
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.slice(0, 4).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      selectedProduct.id === prod.id
                        ? 'bg-amber-500/15 border-amber-500 dark:border-amber-400 text-amber-950 dark:text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <img src={prod.image} alt={prod.name} className="w-6 h-8 object-contain" />
                    <div className="min-w-0">
                      <div className="font-bold text-xs leading-tight text-neutral-900 dark:text-white truncate">{prod.name}</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">{prod.packSize}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Pack Size */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-neutral-700 dark:text-neutral-300 block uppercase tracking-wider">
                2. Box Size (Bottles)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { size: 6, label: "6-Pack", tag: "Standard" },
                  { size: 12, label: "12-Pack", tag: "+5% Extra" },
                  { size: 24, label: "24-Pack", tag: "Marathon" },
                ].map((p) => (
                  <button
                    key={p.size}
                    onClick={() => setPackSize(p.size as any)}
                    className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                      packSize === p.size
                        ? 'bg-amber-500/15 border-amber-500 dark:border-amber-400 text-amber-950 dark:text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{p.label}</div>
                    <div className="text-[9px] text-neutral-500 dark:text-neutral-400 mt-0.5">{p.tag}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Delivery Frequency */}
            <div className="space-y-2">
              <label className="text-[11px] font-extrabold text-neutral-700 dark:text-neutral-300 block uppercase tracking-wider">
                3. Delivery Frequency
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFrequency('2weeks')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    frequency === '2weeks'
                      ? 'bg-amber-500/15 border-amber-500 dark:border-amber-400 text-amber-950 dark:text-white font-bold shadow-xs'
                      : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  Every 2 Weeks
                </button>
                <button
                  onClick={() => setFrequency('4weeks')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                    frequency === '4weeks'
                      ? 'bg-amber-500/15 border-amber-500 dark:border-amber-400 text-amber-950 dark:text-white font-bold shadow-xs'
                      : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                  }`}
                >
                  Every Month (4 Weeks)
                </button>
              </div>
            </div>

            {/* Price Calculation Box */}
            <div className="bg-neutral-50 dark:bg-white/5 p-3.5 rounded-2xl border border-black/5 dark:border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-neutral-500 dark:text-neutral-400 block tracking-wider">
                  Subscription Price (15% Off)
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-neutral-900 dark:text-white">
                    €{subscriptionPrice.toFixed(2)}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 line-through">
                    €{fullPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-right text-[11px] text-emerald-600 dark:text-emerald-400 font-extrabold">
                Save €{(fullPrice - subscriptionPrice).toFixed(2)} / box
              </div>
            </div>
          </div>

          {/* Subscribe Action Button */}
          <div>
            <button
              onClick={handleSubscribe}
              className="w-full py-3.5 px-6 bg-black dark:bg-amber-400 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-amber-300 transition-all rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-98 group"
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-950" />
                  <span>Subscription Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Subscribe & Save 15%</span>
                  <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-transform duration-300" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 mt-2.5 tracking-wider">
              No commitment • Pause, swap or cancel anytime
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


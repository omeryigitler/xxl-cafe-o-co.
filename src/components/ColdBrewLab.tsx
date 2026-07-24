import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import labImg from '../assets/images/yeni-lab-1.png';
import glassImg from '../assets/images/yeni-bardak,png.png';
import { Zap, Thermometer, Clock, Sparkles, ShoppingBag, CheckCircle2, ArrowRight, X, FlaskConical, Droplets, Sliders } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export function ColdBrewLab() {
  const { isLabOpen, closeLab, addToCart } = useCart();
  
  // Custom Extraction Parameters
  const [steepHours, setSteepHours] = useState(24);
  const [temp, setTemp] = useState(3);
  const [grind, setGrind] = useState<'coarse' | 'extra-coarse' | 'micro'>('coarse');
  const [origin, setOrigin] = useState<'ethiopia' | 'colombia' | 'guatemala'>('ethiopia');
  const [nitroLevel, setNitroLevel] = useState<number>(100); // 0%, 50%, 100%
  const [added, setAdded] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLab();
    };
    if (isLabOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLabOpen, closeLab]);

  // Calculate dynamic extraction stats
  const caffeineMg = Math.round(150 + (steepHours - 12) * 7 + (temp === 2 ? 10 : 0));
  const acidity = (6.3 - (steepHours / 30) * 0.5).toFixed(1);
  const smoothnessPercent = Math.min(100, Math.round(75 + (steepHours / 24) * 20));
  const bodyStrength = steepHours > 24 ? 'Bold & Velvety' : 'Crisp & Clean';

  // Dynamic Bean Origin Details
  const origins = {
    ethiopia: { name: 'Yirgacheffe, Ethiopia', notes: 'Jasmine, Bergamot, Bright Citrus', roast: 'Light-Medium' },
    colombia: { name: 'Huila High Valley, Colombia', notes: 'Dark Chocolate, Caramel, Roasted Hazelnut', roast: 'Medium-Dark' },
    guatemala: { name: 'Antigua Volcanic, Guatemala', notes: 'Toasted Almond, Cocoa Nib, Vanilla Bean', roast: 'Medium' },
  };

  // Determine recommended standard product or custom batch
  const recommendedProduct = steepHours >= 24 ? PRODUCTS[0] : PRODUCTS[1];

  const handleOrderCustomBatch = () => {
    // Create a custom product matching user parameters
    const customItem = {
      ...recommendedProduct,
      id: `custom-lab-${steepHours}h-${origin}-${nitroLevel}`,
      name: `Custom Lab Batch (${steepHours}h ${nitroLevel > 0 ? 'Nitro' : 'Cold Brew'})`,
      description: `${steepHours} hours steep at ${temp}°C using ${origins[origin].name}. ${nitroLevel}% Nitro injection.`,
      price: recommendedProduct.price + (nitroLevel === 100 ? 1.0 : 0),
    };
    addToCart(customItem);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      closeLab();
    }, 1200);
  };

  return (
    <section id="lab" className="w-full min-h-[calc(100vh-5rem)] pt-8 sm:pt-12 lg:pt-14 pb-20 sm:pb-28 lg:pb-36 px-4 sm:px-8 lg:px-16 bg-[#F5F5F7] dark:bg-[#121214] text-neutral-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
        
        {/* Left Column: Heading, Info & Recipe Parameter Controls */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-between lg:h-[600px] space-y-6"
        >
          {/* Header Title Block */}
          <div>
            <div className="inline-flex items-center px-3.5 py-1 bg-amber-500/10 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 text-[11px] font-bold rounded-full uppercase tracking-wider mb-3.5 border border-amber-500/20 dark:border-amber-400/30">
              Café Ö Extraction Lab v2.4
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight">
              Simulate Cold <br />
              <span className="text-amber-600 dark:text-amber-400">Extraction Chemistry</span>
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mt-2.5 max-w-xl">
              Engineer your custom cold brew batch. Select single-origin beans, adjust steeping hours, water temperature, and nitrogen pressure in real-time.
            </p>
          </div>

          {/* Interactive Recipe Parameters - Uncarded on background */}
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                Recipe Parameters
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 font-semibold">
                Target: {origins[origin].name.split(',')[0]}
              </span>
            </div>

            {/* 1. Bean Origin Selection */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-neutral-700 dark:text-neutral-300 block uppercase tracking-wider">
                Single-Origin Bean
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'ethiopia', label: 'Ethiopia', detail: 'Floral & Citrus' },
                  { id: 'colombia', label: 'Colombia', detail: 'Chocolate & Caramel' },
                  { id: 'guatemala', label: 'Guatemala', detail: 'Cocoa & Almond' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setOrigin(b.id as any)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      origin === b.id
                        ? 'bg-amber-500/15 border-amber-500 dark:border-amber-400 text-amber-950 dark:text-white font-bold shadow-xs'
                        : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600'
                    }`}
                  >
                    <div className="text-xs font-bold">{b.label}</div>
                    <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">{b.detail}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Steeping Duration Slider */}
            <div className="space-y-1.5 bg-white dark:bg-neutral-800/30 p-3 rounded-2xl border border-black/10 dark:border-white/10">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  Steeping Duration
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-300 text-xs font-extrabold">{steepHours} Hours</span>
              </div>
              <input
                type="range"
                min={12}
                max={36}
                step={2}
                value={steepHours}
                onChange={(e) => setSteepHours(Number(e.target.value))}
                className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500 dark:accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 dark:text-neutral-400 font-mono pt-0.5">
                <span>12h (Light)</span>
                <span>24h (Ö Signature)</span>
                <span>36h (Max Extraction)</span>
              </div>
            </div>

            {/* 3 & 4. Filtered Water Temp & Nitrogen Injection side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 3. Ice Water Temperature */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Thermometer className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    Filtered Water Temp
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-300 text-xs font-extrabold">{temp}°C</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 3, 5].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemp(t)}
                      className={`py-2 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
                        temp === t
                          ? 'bg-blue-500/15 border-blue-500 dark:border-blue-400 text-blue-900 dark:text-blue-200 font-bold shadow-xs'
                          : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {t}°C
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Nitrogen Pressure Injection Level */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 uppercase tracking-wider">
                    <Droplets className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    Nitrogen Pressure
                  </span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-300 text-xs font-extrabold">{nitroLevel}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, label: '0%' },
                    { val: 50, label: '50%' },
                    { val: 100, label: '100%' },
                  ].map((n) => (
                    <button
                      key={n.val}
                      onClick={() => setNitroLevel(n.val)}
                      className={`py-2 text-xs font-mono rounded-xl border transition-all cursor-pointer ${
                        nitroLevel === n.val
                          ? 'bg-cyan-500/15 border-cyan-500 dark:border-cyan-400 text-cyan-900 dark:text-cyan-200 font-bold shadow-xs'
                          : 'bg-white dark:bg-neutral-800/50 border-black/10 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
                      }`}
                    >
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Column: Card on the right - exactly identical sizing & structure with Subscription section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full lg:h-[600px] bg-white dark:bg-[#1C1C1E] text-neutral-900 dark:text-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-7 lg:p-8 border border-black/10 dark:border-white/10 shadow-2xl flex flex-col justify-between space-y-4"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Calculated Yield Metrics
              </span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-50 dark:bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 mb-1" />
                <div>
                  <span className="text-2xl font-black font-mono text-neutral-900 dark:text-white block">{caffeineMg} mg</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5 block">Natural Caffeine</span>
                </div>
              </div>

              <div className="bg-neutral-50 dark:bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-black/5 dark:border-white/10 flex flex-col justify-between">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono mb-1">{acidity} pH</div>
                <div>
                  <span className="text-2xl font-black font-mono text-neutral-900 dark:text-white block">Low Acid</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 dark:text-neutral-400 mt-0.5 block">Stomach Friendly</span>
                </div>
              </div>
            </div>

            {/* Tasting Profile Meter */}
            <div className="bg-neutral-50 dark:bg-white/5 p-3.5 sm:p-4 rounded-2xl border border-black/5 dark:border-white/10 space-y-2.5">
              <h4 className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Tasting Notes Profile</h4>
              
              <div className="space-y-2.5 text-xs">
                <div>
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-1">
                    <span>Smoothness</span>
                    <span className="text-neutral-900 dark:text-white font-mono font-bold">{smoothnessPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 dark:bg-amber-400 rounded-full transition-all duration-300" style={{ width: `${smoothnessPercent}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-1">
                    <span>Body Texture</span>
                    <span className="text-neutral-900 dark:text-white font-mono font-bold">{bodyStrength}</span>
                  </div>
                  <p className="text-xs text-amber-800 dark:text-amber-200 italic font-medium bg-amber-500/10 dark:bg-amber-400/10 p-2 rounded-xl border border-amber-500/20 dark:border-amber-400/20">
                    "{origins[origin].notes}"
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Showcase Box */}
            <div className="flex items-center gap-3 bg-neutral-50 dark:bg-white/5 p-3 rounded-2xl border border-black/5 dark:border-white/10">
              <img src={glassImg} alt="Cold Brew Glass" className="w-8 h-10 object-contain" />
              <div className="text-xs min-w-0">
                <div className="font-bold text-neutral-900 dark:text-white text-xs truncate">{origins[origin].name.split(',')[0]} Nitro Batch</div>
                <div className="text-neutral-500 dark:text-neutral-400 text-[10px] mt-0.5">{steepHours}h Cold Brewed • {temp}°C • {nitroLevel}% Nitro</div>
              </div>
            </div>
          </div>

          {/* Order Action Button */}
          <div>
            <button
              onClick={handleOrderCustomBatch}
              className="w-full py-3.5 px-6 bg-black dark:bg-amber-400 text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-amber-300 transition-all rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl active:scale-98 group"
            >
              {added ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 dark:text-emerald-950" />
                  <span>Added Custom Batch to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order Custom Batch (€{recommendedProduct.price + (nitroLevel === 100 ? 1 : 0)})</span>
                  <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-transform duration-300" />
                </>
              )}
            </button>
            <p className="text-center text-[10px] uppercase font-bold text-neutral-400 dark:text-neutral-500 mt-2.5 tracking-wider">
              Freshly brewed & nitrogen-sealed to order • Valletta Lab
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

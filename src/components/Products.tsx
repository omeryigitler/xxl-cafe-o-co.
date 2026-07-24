import { useState } from "react";
import { motion } from "motion/react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import { ShoppingBag, Eye, Zap, Star } from "lucide-react";

export function Products() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { addToCart, openProductModal } = useCart();

  const filteredProducts = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <section id="shop" className="bg-white dark:bg-[#0F0F10] py-28 px-6 sm:px-12 md:px-24 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] dark:text-neutral-400 mb-3 block"
          >
            Cold Extraction Series
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 uppercase"
          >
            The Collection.
          </motion.h2>
          <p className="text-[14px] leading-relaxed text-[#424245] dark:text-neutral-300 max-w-xl mx-auto">
            Slow-steeped for 24 hours in ice-cold filtered water. Delivered direct to your door in thermal cold packs.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All Cold Brews" },
              { id: "black", label: "Pure Black" },
              { id: "oat", label: "Oat Milk Draft" },
              { id: "flavored", label: "Madagascar Vanilla" },
              { id: "nitro", label: "Nitro Reserve" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                    : "bg-[#FBFBFB] dark:bg-[#1C1C1E] text-black/70 dark:text-white/80 border border-black/5 dark:border-white/10 hover:border-black/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product, i: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FBFBFB] dark:bg-[#1A1A1C] border border-black/5 dark:border-white/10 rounded-[32px] p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group relative"
            >
              {/* Badges top */}
              <div className="flex items-center justify-between w-full z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 text-black dark:text-white px-2.5 py-1 rounded-full">
                  {product.packSize}
                </span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {product.caffeineMg}mg
                </span>
              </div>

              {/* Product Image Stage */}
              <div 
                onClick={() => openProductModal(product)}
                className="w-full h-56 my-4 relative flex items-center justify-center p-2 cursor-pointer group-hover:scale-105 transition-transform duration-500"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-md" 
                />
                
                {/* Hover Quick view overlay */}
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2">
                  <span className="px-4 py-2 bg-white dark:bg-black text-black dark:text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-black dark:text-white text-[11px]">{product.rating}</span>
                  <span className="text-[#8E8E93] dark:text-neutral-400 text-[10px]">({product.reviewCount})</span>
                </div>

                <h3 
                  onClick={() => openProductModal(product)}
                  className="text-lg font-bold tracking-tight text-[#1D1D1F] dark:text-white hover:underline cursor-pointer mb-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-[#424245] dark:text-neutral-400 mb-4 min-h-[32px] line-clamp-2">
                  {product.tagline}
                </p>

                {/* Flavor tags */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {product.flavorNotes.map((note) => (
                    <span key={note} className="text-[10px] bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/10 px-2 py-0.5 rounded-md text-[#8E8E93] dark:text-neutral-300">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#1D1D1F] dark:text-white">€{product.price.toFixed(2)}</span>
                  <span className="text-[10px] text-[#8E8E93] dark:text-neutral-400 block">/ 6-pack box</span>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="px-4 py-2.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold tracking-widest uppercase rounded-full hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>Add</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

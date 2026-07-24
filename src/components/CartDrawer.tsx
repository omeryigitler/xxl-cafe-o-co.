import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    finalSubtotal,
    promoCode,
    promoMessage,
    applyPromoCode,
    removePromoCode,
    freeShippingThreshold,
    openCheckout,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  const neededForFreeShipping = Math.max(0, freeShippingThreshold - finalSubtotal);
  const freeShippingProgress = Math.min(100, (finalSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FBFBFB] z-50 shadow-2xl flex flex-col justify-between overflow-hidden border-l border-black/5"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-black">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-[#1D1D1F]">Your Cold Brew Cart</h2>
                  <p className="text-xs text-[#8E8E93]">Direct from the Valletta Cold Lab</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-black/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-neutral-100 px-6 py-3 border-b border-black/5 text-xs text-[#1D1D1F]">
              <div className="flex items-center justify-between mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-black" />
                  {neededForFreeShipping > 0 ? (
                    <>Add <strong className="font-bold">€{neededForFreeShipping.toFixed(2)}</strong> for Free Cold Express Shipping</>
                  ) : (
                    <span className="text-emerald-700 font-bold">You unlocked FREE Cold Express Shipping! 🎉</span>
                  )}
                </span>
                <span className="text-[11px] text-black/60 font-semibold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-black/5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#8E8E93]">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-30 stroke-1" />
                  <p className="text-base font-semibold text-[#1D1D1F] mb-1">Your cart is empty</p>
                  <p className="text-xs max-w-xs mb-6">Explore our cold brew collection to stock your fridge with clean energy.</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 bg-black text-white text-xs font-bold rounded-full uppercase tracking-wider hover:opacity-80 transition-opacity"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const unitPrice = item.isSubscription ? item.product.price * 0.85 : item.product.price;
                  return (
                    <div key={`${item.product.id}-${item.isSubscription}`} className="pt-4 first:pt-0 flex gap-4">
                      <div className="w-20 h-20 bg-white border border-black/5 rounded-2xl flex items-center justify-center p-2 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-sm text-[#1D1D1F]">{item.product.name}</h3>
                            <button
                              onClick={() => removeFromCart(item.product.id, item.isSubscription)}
                              className="text-black/30 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs text-[#8E8E93] mt-0.5">
                            {item.product.packSize}
                            {item.isSubscription && (
                              <span className="ml-2 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                                Subscribe -15% ({item.frequency === '2weeks' ? 'Every 2w' : 'Monthly'})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-black/10 rounded-full bg-white px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.isSubscription, item.quantity - 1)}
                              className="p-1 hover:text-black text-black/60 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold px-2.5 min-w-[20px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.isSubscription, item.quantity + 1)}
                              className="p-1 hover:text-black text-black/60 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-sm text-[#1D1D1F]">
                            €{(unitPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Promo & Summary Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-black/5 dark:border-white/10 bg-white dark:bg-[#1C1C1E] space-y-4">
                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. FIRSTBREW, NITRO20)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 bg-neutral-100 dark:bg-neutral-800 border border-black/5 dark:border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white text-black dark:text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold text-xs rounded-xl hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Active Promo Code Pill or Error */}
                {promoCode && (
                  <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-2 rounded-xl flex items-center justify-between font-medium">
                    <span className="font-bold">Coupon {promoCode} Applied</span>
                    <button
                      onClick={removePromoCode}
                      className="text-[10px] underline text-rose-600 dark:text-rose-400 font-bold ml-2 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoMessage && !promoCode && (
                  <div className={`text-xs px-3 py-1.5 rounded-lg ${promoMessage.type === 'error' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {promoMessage.text}
                  </div>
                )}

                {/* Subtotal lines */}
                <div className="space-y-1.5 text-xs text-[#424245] dark:text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-black dark:text-white">€{subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                      <span>Promo Discount ({promoCode})</span>
                      <span>-€{discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Cold Express Shipping</span>
                    <span>{neededForFreeShipping === 0 ? <strong className="text-emerald-700 dark:text-emerald-400">FREE</strong> : '€4.50'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#1D1D1F] dark:text-white pt-2 border-t border-black/5 dark:border-white/10">
                    <span>Total</span>
                    <span>€{(finalSubtotal + (neededForFreeShipping === 0 ? 0 : 4.5)).toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={openCheckout}
                  className="w-full py-3.5 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Proceed to Checkout (€{(finalSubtotal + (neededForFreeShipping === 0 ? 0 : 4.5)).toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8E8E93] dark:text-neutral-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Thermal Cold Shipping Guarantee • 256-Bit SSL</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

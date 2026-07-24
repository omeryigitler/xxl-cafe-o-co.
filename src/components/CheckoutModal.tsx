import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, CreditCard, Lock, Sparkles, MapPin, Truck } from 'lucide-react';

export function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, discountAmount, finalSubtotal, promoCode, clearCart } = useCart();

  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Ömer Yigitler',
    email: 'yigitleromer@gmail.com',
    address: 'Republic Street 45',
    city: 'Valletta',
    postalCode: 'VLT 1115',
    country: 'Malta',
    cardNumber: '4242 •••• •••• 4242',
    paymentMethod: 'applepay',
  });

  const deliveryFee = finalSubtotal >= 70 ? 0 : 4.5;
  const grandTotal = finalSubtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      clearCart();
    }, 1800);
  };

  const resetAndClose = () => {
    setStep('details');
    closeCheckout();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden z-10 border border-black/5"
          >
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-black/5 flex items-center justify-between bg-[#FBFBFB]">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold tracking-tighter text-xl text-[#1D1D1F]">CAFÉ Ö CO.</span>
                <span className="text-xs bg-black text-white font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Express Checkout
                </span>
              </div>
              <button
                onClick={resetAndClose}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors text-black/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Details */}
            {step === 'details' && (
              <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Shipping & Payment */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8E8E93] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-black" />
                      Cold Express Shipping Address
                    </h3>

                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#FBFBFB] border border-black/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FBFBFB] border border-black/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <input
                      type="text"
                      required
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#FBFBFB] border border-black/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#FBFBFB] border border-black/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-[#FBFBFB] border border-black/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#8E8E93] pt-2 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-black" />
                      Payment Method
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'applepay' })}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          formData.paymentMethod === 'applepay'
                            ? 'border-black bg-black text-white shadow-sm'
                            : 'border-black/10 bg-[#FBFBFB] text-black hover:border-black/30'
                        }`}
                      >
                         Pay
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                          formData.paymentMethod === 'card'
                            ? 'border-black bg-black text-white shadow-sm'
                            : 'border-black/10 bg-[#FBFBFB] text-black hover:border-black/30'
                        }`}
                      >
                        Credit Card
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Order Summary */}
                  <div className="bg-[#FBFBFB] border border-black/5 rounded-2xl p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#8E8E93] mb-4">Order Summary</h3>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                        {items.map((item) => (
                          <div key={item.product.id} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold bg-black/5 px-1.5 py-0.5 rounded text-[10px]">{item.quantity}x</span>
                              <span className="font-medium text-[#1D1D1F]">{item.product.name}</span>
                            </div>
                            <span className="font-semibold text-black">
                              €{((item.isSubscription ? item.product.price * 0.85 : item.product.price) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-black/5 mt-4 pt-3 space-y-2 text-xs text-[#424245]">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-emerald-700 font-semibold">
                            <span>Promo Discount ({promoCode})</span>
                            <span>-€{discountAmount.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            <Truck className="w-3 h-3 text-black" />
                            Cold Express Shipping
                          </span>
                          <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `€${deliveryFee.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-sm font-extrabold text-[#1D1D1F] pt-2 border-t border-black/5">
                          <span>Total</span>
                          <span>€{grandTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 mt-6 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay €{grandTotal.toFixed(2)}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8E8E93]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your payment is processed securely. Free returns within 14 days.</span>
                </div>
              </form>
            )}

            {/* Step 2: Processing state */}
            {step === 'processing' && (
              <div className="py-20 px-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <h3 className="text-lg font-bold text-[#1D1D1F]">Securing your cold brew batch...</h3>
                <p className="text-xs text-[#8E8E93]">Preparing cold-chain temperature packaging from our Valletta lab.</p>
              </div>
            )}

            {/* Step 3: Success state */}
            {step === 'success' && (
              <div className="py-16 px-8 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full mb-3">
                    <Sparkles className="w-3.5 h-3.5" /> Order Confirmed #OECO-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#1D1D1F] tracking-tight">Your Cold Brew is on the Way!</h3>
                  <p className="text-xs text-[#424245] mt-2 max-w-md mx-auto leading-relaxed">
                    We’ve dispatched your receipt to <strong>{formData.email}</strong>. Your cold-insulated package will arrive within 24-48 hours. Keep it refrigerated immediately upon arrival.
                  </p>
                </div>

                <div className="bg-[#FBFBFB] border border-black/5 rounded-2xl p-4 text-xs max-w-sm w-full text-left space-y-1">
                  <div className="font-bold text-black mb-1">Shipping Details</div>
                  <div>Recipient: {formData.fullName}</div>
                  <div>Destination: {formData.address}, {formData.city}</div>
                  <div>Estimated Arrival: Tomorrow before 12:00 PM</div>
                </div>

                <button
                  onClick={resetAndClose}
                  className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:opacity-80 transition-opacity"
                >
                  Return to Store
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

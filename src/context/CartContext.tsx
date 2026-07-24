import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  currentView: 'home' | 'locations' | 'subscription' | 'lab';
  setCurrentView: (view: 'home' | 'locations' | 'subscription' | 'lab') => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isLabOpen: boolean;
  openLab: () => void;
  closeLab: () => void;
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  isSubscriptionOpen: boolean;
  openSubscription: () => void;
  closeSubscription: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  promoCode: string | null;
  discountRate: number;
  promoMessage: { type: 'success' | 'error'; text: string } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  addToCart: (product: Product, isSubscription?: boolean, frequency?: '2weeks' | '4weeks') => void;
  removeFromCart: (productId: string, isSubscription: boolean) => void;
  updateQuantity: (productId: string, isSubscription: boolean, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  finalSubtotal: number;
  freeShippingThreshold: number;
  selectedProductModal: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 70; // Euros

// Supported promo codes map
const PROMO_CODES: Record<string, number> = {
  FIRSTBREW: 0.15, // 15% OFF
  NITRO20: 0.20,   // 20% OFF
  COLDBREW10: 0.10, // 10% OFF
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cafe_o_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('cafe_o_theme');
      return (saved === 'dark' || saved === 'light') ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [currentView, setCurrentView] = useState<'home' | 'locations' | 'subscription' | 'lab'>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const changeView = (view: 'home' | 'locations' | 'subscription' | 'lab') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Promo code state
  const [promoCode, setPromoCode] = useState<string | null>(() => {
    return localStorage.getItem('cafe_o_promo');
  });
  const [discountRate, setDiscountRate] = useState<number>(() => {
    const saved = localStorage.getItem('cafe_o_promo');
    return saved && PROMO_CODES[saved.toUpperCase()] ? PROMO_CODES[saved.toUpperCase()] : 0;
  });
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cafe_o_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('cafe_o_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const openLab = () => {
    setIsLabOpen(true);
    changeView('lab');
  };
  const closeLab = () => setIsLabOpen(false);

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  const openSubscription = () => {
    setIsSubscriptionOpen(true);
    changeView('subscription');
  };
  const closeSubscription = () => setIsSubscriptionOpen(false);

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const openProductModal = (product: Product) => setSelectedProductModal(product);
  const closeProductModal = () => setSelectedProductModal(null);

  const applyPromoCode = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (PROMO_CODES[formatted]) {
      const rate = PROMO_CODES[formatted];
      setPromoCode(formatted);
      setDiscountRate(rate);
      localStorage.setItem('cafe_o_promo', formatted);
      setPromoMessage({
        type: 'success',
        text: `Coupon "${formatted}" applied! ${rate * 100}% Discount`,
      });
      showToast(`Promo ${formatted} Applied (${rate * 100}% Off)`);
      return true;
    } else {
      setPromoMessage({
        type: 'error',
        text: 'Invalid promo code. Hint: Try FIRSTBREW or NITRO20!',
      });
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscountRate(0);
    setPromoMessage(null);
    localStorage.removeItem('cafe_o_promo');
  };

  const addToCart = (product: Product, isSubscription = false, frequency: '2weeks' | '4weeks' = '2weeks') => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.isSubscription === isSubscription
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      }
      return [...prev, { product, quantity: 1, isSubscription, frequency }];
    });
    showToast(`Added ${product.name} to cart`);
    openCart();
  };

  const removeFromCart = (productId: string, isSubscription: boolean) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.isSubscription === isSubscription)));
  };

  const updateQuantity = (productId: string, isSubscription: boolean, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, isSubscription);
      return;
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id === productId && i.isSubscription === isSubscription) {
          return { ...i, quantity: qty };
        }
        return i;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = item.isSubscription ? item.product.price * 0.85 : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountAmount = subtotal * discountRate;
  const finalSubtotal = subtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        items,
        currentView,
        setCurrentView: changeView,
        isCartOpen,
        openCart,
        closeCart,
        isLabOpen,
        openLab,
        closeLab,
        isQuizOpen,
        openQuiz,
        closeQuiz,
        isSubscriptionOpen,
        openSubscription,
        closeSubscription,
        theme,
        toggleTheme,
        promoCode,
        discountRate,
        promoMessage,
        applyPromoCode,
        removePromoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discountAmount,
        finalSubtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        selectedProductModal,
        openProductModal,
        closeProductModal,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

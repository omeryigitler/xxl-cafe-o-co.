import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Story } from './components/Story';
import { ColdBrewLab } from './components/ColdBrewLab';
import { Products } from './components/Products';
import { SubscriptionSection } from './components/SubscriptionSection';
import { Locations } from './components/Locations';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { Toast } from './components/Toast';

function AppContent() {
  const { currentView } = useCart();

  return (
    <main className="bg-[#FBFBFB] dark:bg-[#0F0F10] min-h-screen text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300">
      <Navbar />

      {currentView === 'home' && (
        <>
          <Hero />
          <Products />
          <div id="features">
            <Features />
          </div>
          <div id="story">
            <Story />
          </div>
          <div id="reviews">
            <ReviewsSection />
          </div>
          <FAQSection />
        </>
      )}

      {currentView === 'locations' && (
        <div className="pt-20 sm:pt-24 min-h-screen">
          <Locations />
        </div>
      )}

      {currentView === 'subscription' && (
        <div className="pt-20 sm:pt-24 min-h-screen">
          <SubscriptionSection />
        </div>
      )}

      {currentView === 'lab' && (
        <div className="pt-20 sm:pt-24 min-h-screen">
          <ColdBrewLab />
        </div>
      )}

      <Footer />

      {/* Overlays & Feature Modals */}
      <CartDrawer />
      <CheckoutModal />
      <ProductModal />
      <Toast />
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}



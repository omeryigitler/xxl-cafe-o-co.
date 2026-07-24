import { useState, useEffect } from "react";
import logoImg from "../assets/images/cafeoco-logo (x).png";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Sun, Moon } from "lucide-react";

export function Navbar() {
  const { openCart, openLab, currentView, setCurrentView, theme, toggleTheme, totalItems } = useCart();
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'locations' | 'subscription' | 'lab', targetHash?: string) => {
    setCurrentView(view);
    if (targetHash) {
      setTimeout(() => {
        const el = document.querySelector(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 transition-all duration-500 ease-in-out ${
      isAtTop ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      <div className="max-w-7xl mx-auto bg-white/95 dark:bg-[#18181A]/95 text-neutral-900 dark:text-[#F5F5F7] border border-black/10 dark:border-white/10 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-lg">
        
        {/* Brand Logo & Name */}
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-2.5 group cursor-pointer">
          <img 
            src={logoImg} 
            alt="CAFÉ Ö CO." 
            className="w-7 h-7 object-contain group-hover:scale-105 transition-transform" 
          />
          <span className="text-sm sm:text-base font-black tracking-tight text-neutral-900 dark:text-white uppercase">
            CAFÉ Ö CO.
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-extrabold tracking-widest uppercase text-neutral-800 dark:text-neutral-200">
          <button 
            onClick={() => handleNavClick('home', '#shop')} 
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer ${
              currentView === 'home' ? 'text-amber-600 dark:text-amber-400 font-black' : ''
            }`}
          >
            Collection
          </button>
          <button 
            onClick={() => handleNavClick('home', '#features')} 
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            Process
          </button>
          <button 
            onClick={() => handleNavClick('home', '#story')} 
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            Our Story
          </button>
          <button 
            onClick={() => handleNavClick('lab')} 
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer ${
              currentView === 'lab' ? 'text-amber-600 dark:text-amber-400 font-black' : ''
            }`}
          >
            Lab
          </button>
          <button 
            onClick={() => handleNavClick('subscription')} 
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer ${
              currentView === 'subscription' ? 'text-amber-600 dark:text-amber-400 font-black' : ''
            }`}
          >
            Subscription
          </button>
          <button 
            onClick={() => handleNavClick('locations')} 
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer ${
              currentView === 'locations' ? 'text-amber-600 dark:text-amber-400 font-black' : ''
            }`}
          >
            Locations
          </button>
        </nav>

        {/* Actions & Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            className="relative p-2 sm:px-3.5 sm:py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center gap-1.5 hover:opacity-90 transition-all cursor-pointer shadow-xs"
            title="Open Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] font-extrabold uppercase tracking-wider">Cart</span>
            {totalItems > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 bg-amber-400 text-black text-[10px] font-black rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}




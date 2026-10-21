import React, { useState } from "react";
import logoImg from "../assets/images/cafeoco-logo (x).png";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { setCurrentView } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

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
    <footer className="bg-white dark:bg-[#121214] px-8 md:px-16 py-16 border-t border-black/5 dark:border-white/10 text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Newsletter banner */}
        <div className="bg-[#FBFBFB] dark:bg-[#1C1C1E] border border-black/5 dark:border-white/10 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] dark:text-neutral-400 mb-2 block">
              The Morning Briefing
            </span>
            <h3 className="text-2xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white uppercase mb-2">
              Get 15% off your first cold brew box.
            </h3>
            <p className="text-xs text-[#424245] dark:text-neutral-300">
              Subscribe for early access to limited nitro drops, laboratory updates, and athletic event sponsorships.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-6 py-3.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You're subscribed! Use code <strong>FIRSTBREW</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-neutral-800 border border-black/10 dark:border-white/10 rounded-full px-5 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white flex-1 text-black dark:text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold rounded-full uppercase tracking-wider hover:opacity-80 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-4">
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <img src={logoImg} alt="CAFÉ Ö CO." className="w-8 h-8 object-contain" />
              <span className="text-xl font-extrabold tracking-tight">CAFÉ Ö CO.</span>
            </div>
            <p className="text-xs text-[#8E8E93] dark:text-neutral-400 max-w-xs leading-relaxed">
              Hyper-caffeinated, 24-hour slow-steeped cold brew. Extracted at Republic Street 45, Valletta, Malta.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#8E8E93] dark:text-neutral-400 tracking-widest mb-3 block">Collection</span>
              <ul className="space-y-2 font-semibold">
                <li><button onClick={() => handleNavClick('home', '#shop')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Original Black</button></li>
                <li><button onClick={() => handleNavClick('home', '#shop')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Oat Milk Draft</button></li>
                <li><button onClick={() => handleNavClick('home', '#shop')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Madagascar Vanilla</button></li>
                <li><button onClick={() => handleNavClick('home', '#shop')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Nitro Reserve</button></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-[#8E8E93] dark:text-neutral-400 tracking-widest mb-3 block">Company</span>
              <ul className="space-y-2 font-semibold">
                <li><button onClick={() => handleNavClick('home', '#story')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Our Story</button></li>
                <li><button onClick={() => handleNavClick('lab')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Extraction Lab</button></li>
                <li><button onClick={() => handleNavClick('locations')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Flagship Locations</button></li>
                <li><button onClick={() => handleNavClick('subscription')} className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300 cursor-pointer">Subscriptions</button></li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-[#8E8E93] dark:text-neutral-400 tracking-widest mb-3 block">Social</span>
              <ul className="space-y-2 font-semibold">
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300">Instagram</a></li>
                <li><a href="https://strava.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300">Strava Club</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-black dark:hover:text-white text-black/70 dark:text-neutral-300">TikTok</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="pt-8 border-t border-black/5 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-bold tracking-[0.15em] text-[#8E8E93] dark:text-neutral-400 uppercase gap-4">
          <p>&copy; {new Date().getFullYear()} CAFÉ Ö CO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Cold Shipping Guarantee</a>
          </div>
        </div>

      </div>
    
      <div className="relative z-10 w-full px-4 pt-6 text-center">
        <a href="https://omeryigitler.com" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] max-w-full flex-wrap items-center justify-center gap-x-1 text-xs leading-relaxed underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white">
          <span>Designed &amp; developed by</span> <span className="font-medium">Ömer YİĞİTLER</span><span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </footer>
  );
}

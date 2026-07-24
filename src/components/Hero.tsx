import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import coffeeImg from "../assets/images/yeni-bardak,png.png";
import iceCubeImg from "../assets/images/yeni-ice.png";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Coffee cup animations
  const cupScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1.35]);
  const cupY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const cupOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  // Ice cube 1 animations (Top Left - Mid Foreground)
  const ice1Y = useTransform(scrollYProgress, [0, 1], ["-5%", "110%"]);
  const ice1X = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const ice1Rotate = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Ice cube 2 animations (Top Right - Background Depth, moves slower)
  const ice2Y = useTransform(scrollYProgress, [0, 1], ["-5%", "80%"]);
  const ice2X = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const ice2Rotate = useTransform(scrollYProgress, [0, 1], [30, -100]);

  // Ice cube 3 animations (Bottom Left - Macro Camera Depth)
  const ice3Y = useTransform(scrollYProgress, [0, 1], ["5%", "-100%"]);
  const ice3X = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const ice3Rotate = useTransform(scrollYProgress, [0, 1], [-20, 180]);

  // Ice cube 4 animations (Mid-Left Background - Blurred depth)
  const ice4Y = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);
  const ice4X = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const ice4Rotate = useTransform(scrollYProgress, [0, 1], [-15, 140]);

  // Ice cube 5 animations (Bottom Right Foreground - Clear & crisp)
  const ice5Y = useTransform(scrollYProgress, [0, 1], ["10%", "-90%"]);
  const ice5X = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const ice5Rotate = useTransform(scrollYProgress, [0, 1], [10, -150]);

  // Big background text ("FUEL YOUR MORNING"): Stays fully visible initially, then fades out smoothly between 150px and 550px
  const bgTextY = useTransform(scrollY, [0, 150, 550], ["0px", "0px", "-40px"]);
  const bgTextOpacity = useTransform(scrollY, [0, 150, 550], [1, 1, 0]);

  // Subtitle text ("Designed for the early risers..."): Stays fully visible for initial scroll (0-100px), then fades out smoothly across 100px to 450px
  const subtitleY = useTransform(scrollY, [0, 100, 450], ["0px", "0px", "-25px"]);
  const subtitleOpacity = useTransform(scrollY, [0, 100, 450], [1, 1, 0]);

  // "Scroll to explore" hint: Disappears INSTANTLY on first scroll movement (0-15px)
  const scrollHintOpacity = useTransform(scrollY, [0, 15], [1, 0]);
  const scrollHintY = useTransform(scrollY, [0, 15], [0, 10]);

  return (
    <div ref={containerRef} className="relative h-[250vh] sm:h-[300vh] bg-[#FBFBFB] dark:bg-[#0F0F10] transition-colors duration-300">
      <div className="sticky top-0 h-[100dvh] h-screen w-full overflow-hidden flex items-center justify-center px-4 sm:px-6">
        
        {/* Background Typography */}
        <motion.div 
          style={{ y: bgTextY, opacity: bgTextOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 select-none px-4"
        >
          <h1 className="text-[16vw] sm:text-[15vw] leading-[0.9] font-extrabold tracking-tighter text-black dark:text-white opacity-[0.06] sm:opacity-[0.05] uppercase text-center">
            Fuel Your
          </h1>
          <h1 className="text-[16vw] sm:text-[15vw] leading-[0.9] font-extrabold tracking-tighter text-black dark:text-white opacity-[0.06] sm:opacity-[0.05] uppercase text-center">
            Morning.
          </h1>
        </motion.div>

        {/* Subtitle / Tagline */}
        <motion.div 
          style={{ y: subtitleY, opacity: subtitleOpacity }}
          className="absolute bottom-14 sm:bottom-16 left-4 right-4 md:left-12 md:right-auto max-w-xs sm:max-w-sm mx-auto md:mx-0 text-center md:text-left pointer-events-none z-10"
        >
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-[#3A3A3C] dark:text-neutral-300 font-normal">
            Designed for the <span className="text-black dark:text-white font-semibold">early risers</span> and the <span className="text-black dark:text-white font-semibold">high performers</span>. The ultimate cold brew experience.
          </p>
        </motion.div>

        {/* Scroll Indicator - Disappears INSTANTLY on first scroll; Arrow on a new line below text */}
        <motion.div 
          style={{ opacity: scrollHintOpacity, y: scrollHintY }}
          className="absolute bottom-3 left-0 right-0 text-center pointer-events-none z-10 flex flex-col items-center justify-center"
        >
          <motion.div 
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center justify-center gap-1 text-black/50 dark:text-white/60 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase"
          >
            <span>Scroll to explore</span>
            <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Elements Container */}
        <div className="relative w-full max-w-sm sm:max-w-2xl md:max-w-4xl aspect-square flex items-center justify-center z-10 pointer-events-none">
          
          {/* Main Coffee Cup */}
          <motion.div 
            style={{ scale: cupScale, y: cupY, opacity: cupOpacity }}
            className="relative w-56 sm:w-76 md:w-[420px] aspect-[3/4] z-20 mix-blend-multiply flex items-center justify-center"
          >
            <img 
              src={coffeeImg} 
              alt="Café Ö Co. Iced Coffee" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Ice Cubes - Scaled strictly in 6:5:5:3:3 ratios relative to each other */}
          
          {/* Ice 1: Sol üst (Top Left) - Size Ratio 5 */}
          <motion.div 
            style={{ y: ice1Y, x: ice1X, rotate: ice1Rotate }}
            className="absolute top-[19%] left-[16%] sm:left-[22%] md:left-[24%] w-[60px] sm:w-[90px] md:w-[150px] aspect-square z-30 mix-blend-multiply opacity-90 pointer-events-none"
          >
            <img src={iceCubeImg} alt="" className="w-full h-full object-contain filter drop-shadow-md" />
          </motion.div>

          {/* Ice 2: Top Right - Size Ratio 3 (25% More Visible Blurred Background) */}
          <motion.div 
            style={{ y: ice2Y, x: ice2X, rotate: ice2Rotate }}
            className="absolute top-[24%] right-[18%] sm:right-[24%] md:right-[26%] w-[36px] sm:w-[54px] md:w-[90px] aspect-square z-10 mix-blend-multiply opacity-80 pointer-events-none"
          >
            <img src={iceCubeImg} alt="" className="w-full h-full object-contain filter blur-[1px] md:blur-[1.5px]" />
          </motion.div>

          {/* Ice 3: Sol alt (Bottom Left) - Size Ratio 6 (Largest Macro Foreground) */}
          <motion.div 
            style={{ y: ice3Y, x: ice3X, rotate: ice3Rotate }}
            className="absolute bottom-[17%] left-[17%] sm:left-[22%] md:left-[23%] w-[72px] sm:w-[108px] md:w-[180px] aspect-square z-40 pointer-events-none"
          >
            <img 
              src={iceCubeImg} 
              alt="" 
              className="w-full h-full object-contain mix-blend-multiply opacity-95 filter drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)]" 
            />
          </motion.div>

          {/* Ice 4: Mid-Left - Size Ratio 3 (25% More Visible Blurred Background) */}
          <motion.div 
            style={{ y: ice4Y, x: ice4X, rotate: ice4Rotate }}
            className="absolute top-[42%] left-[13%] sm:left-[19%] md:left-[21%] w-[36px] sm:w-[54px] md:w-[90px] aspect-square z-10 mix-blend-multiply opacity-75 pointer-events-none"
          >
            <img src={iceCubeImg} alt="" className="w-full h-full object-contain filter blur-[1px] md:blur-[1.5px]" />
          </motion.div>

          {/* Ice 5: Sağ alt (Bottom Right) - Size Ratio 5 */}
          <motion.div 
            style={{ y: ice5Y, x: ice5X, rotate: ice5Rotate }}
            className="absolute bottom-[21%] right-[14%] sm:right-[19%] md:right-[21%] w-[60px] sm:w-[90px] md:w-[150px] aspect-square z-30 mix-blend-multiply opacity-90 pointer-events-none"
          >
            <img src={iceCubeImg} alt="" className="w-full h-full object-contain filter drop-shadow-md" />
          </motion.div>

        </div>
      </div>
    </div>
  );
}

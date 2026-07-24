import { motion } from "motion/react";
import runningImg from "../assets/images/running_track_dawn_1784775635928.jpg";
import iceCubeImg from "../assets/images/yeni-ice.png";

export function Features() {
  return (
    <section className="bg-[#FBFBFB] py-20 lg:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#1D1D1F] leading-none mb-8 uppercase">
                Pure energy. <br/> Zero crash.
              </h2>
              <p className="text-[14px] leading-relaxed text-[#424245] mb-12 max-w-lg">
                Sourced from high-altitude single estates, our cold brew is slow-steeped for 24 hours. The result? A smooth, hyper-caffeinated elixir that powers your hardest workouts and longest days.
              </p>
              
              <div className="flex flex-col space-y-6">
                {[
                  { num: "01", text: "Slow-steeped 24 hours" },
                  { num: "02", text: "2x caffeine, naturally" },
                  { num: "03", text: "Zero sugar, zero bitterness" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.3 + (index * 0.2), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex items-center space-x-6 border-b border-black/5 pb-6 cursor-pointer select-none"
                  >
                    {/* Ice Cube with number directly underneath */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center flex-shrink-0">
                      {/* Number badge (underneath ice cube) */}
                      <span className="text-[13px] sm:text-[14px] font-extrabold tracking-wider text-black/80 z-0 transition-all duration-300 group-hover:scale-110">
                        {item.num}
                      </span>
                      
                      {/* Larger Ice Cube (Layered on top of number) */}
                      <img 
                        src={iceCubeImg} 
                        alt="Ice cube overlay" 
                        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-85 pointer-events-none z-10 transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-100 filter drop-shadow-md" 
                      />
                    </div>

                    {/* Text that grows/scales under the ice cube on hover */}
                    <div className="relative overflow-visible">
                      <div className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-[#1D1D1F] transition-all duration-300 origin-left group-hover:scale-110 group-hover:translate-x-2 group-hover:text-black">
                        {item.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-square lg:aspect-[4/5] rounded-[40px] shadow-sm overflow-hidden flex items-start justify-center border border-black/5"
            >
              <img 
                src={runningImg} 
                alt="Running Track at Dawn" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
              <div className="text-center p-8 sm:p-12 pt-10 sm:pt-14 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-4 text-white drop-shadow-md">"The pre-workout you actually look forward to drinking."</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">Health & Fitness Mag</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

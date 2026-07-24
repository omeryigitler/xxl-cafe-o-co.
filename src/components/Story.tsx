import { motion } from "motion/react";
import brewingImg from "../assets/images/coffee_brewing_1784777065574.jpg";

export function Story() {
  return (
    <section id="story" className="bg-white py-20 lg:py-32 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative aspect-square lg:aspect-[4/3] rounded-[40px] overflow-hidden border border-black/5"
        >
          <img 
            src={brewingImg} 
            alt="Cold brewing process" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E93] mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-[#1D1D1F] leading-none mb-8 uppercase">
            Obsessive <br /> Extraction.
          </h2>
          <p className="text-[14px] leading-relaxed text-[#424245] mb-6 max-w-lg">
            We didn't just want another cold brew. We wanted a precision-engineered performance beverage. It started in a garage with lab-grade filtration and a simple goal: maximum caffeine, zero bitterness.
          </p>
          <p className="text-[14px] leading-relaxed text-[#424245] max-w-lg">
            Today, every batch of Café Ö Co. is steep-timed to the second and temperature-controlled to preserve the delicate, energizing compounds that mass-market brands destroy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

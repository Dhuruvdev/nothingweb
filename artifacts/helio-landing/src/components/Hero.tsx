import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Lazy load the canvas for better initial TTI
const ParticleNetwork = lazy(() => import("./ParticleNetwork"));

interface HeroProps {
  onDemoClick: () => void;
}

export default function Hero({ onDemoClick }: HeroProps) {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <section className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden flex items-center bg-noise">
      
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="text-left max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs font-medium text-white/80">Helio v2.0 is now available</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.1]"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">Intelligence</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white/90 to-white/40">in Motion</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/60 mb-10 max-w-lg leading-relaxed"
            >
              Experience AI that evolves with every interaction—learning, adapting, and flowing like the world around you.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={onDemoClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={onDemoClick}
                className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-transparent border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
              >
                Try Demo
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden hidden md:block"
          >
            {/* The canvas handles its own high-performance rendering */}
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-pulse" />
              </div>
            }>
              <ParticleNetwork />
            </Suspense>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

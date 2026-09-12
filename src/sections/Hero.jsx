import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CircuitBoard, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-scroll';
import Button from '../components/ui/Button';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <motion.div style={{ y: glowY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.42)_62%,rgba(2,6,23,0.9)_100%)]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -50 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/20 bg-white/5 backdrop-blur-sm text-sm text-blue-300 mb-6 drop-shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Technology solutions for real-world business growth
            </motion.div>

            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.3rem] font-black leading-[0.82] tracking-[-0.08em] mb-6 text-white"
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={prefersReducedMotion ? false : { y: 32, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="block"
                >
                  GL
                </motion.span>
              </span>
              <span className="text-gradient block overflow-hidden">
                <motion.span
                  initial={prefersReducedMotion ? false : { y: 40, opacity: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.22 }}
                  className="block"
                >
                  SOLUTIONS
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl"
            >
              We help businesses turn complexity into clarity through modern technology, smarter workflows, and digital products built for growth.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link to="contact" smooth={true} duration={100} offset={-80}>
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 group shadow-[0_18px_35px_rgba(59,130,246,0.25)]">
                  Start a Project <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="solutions" smooth={true} duration={100} offset={-80}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Solutions
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {['Strategy', 'Build', 'Scale', 'Trust'].map((item, index) => (
                <div key={item} className="group">
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-1 transition-colors group-hover:text-blue-300">{item}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {['Problem clarity', 'Practical systems', 'Modern workflows', 'Reliable delivery'][index]}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[620px] flex items-center justify-center"
            style={{ y: heroY }}
          >
            <div className="relative w-full max-w-[540px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-2xl" />

              {!prefersReducedMotion && (
                <>
                  <motion.div
                    style={{ y: cardY }}
                    animate={{ y: [0, -18, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-8 right-10 p-6 rounded-2xl border border-white/10 bg-slate-900/80 shadow-[0_20px_60px_rgba(15,23,42,0.8)] backdrop-blur-md"
                  >
                    <CircuitBoard className="text-blue-400 mb-2" size={32} />
                    <div className="h-2 w-20 bg-slate-700 rounded mb-2" />
                    <div className="h-2 w-16 bg-slate-600 rounded" />
                  </motion.div>

                  <motion.div
                    style={{ y: cardY }}
                    animate={{ y: [0, 18, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-20 left-4 p-5 rounded-2xl border border-white/10 bg-slate-900/80 z-10 flex items-center gap-4 shadow-[0_18px_40px_rgba(15,23,42,0.7)]"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center justify-center text-white">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Reliable</h5>
                      <p className="text-xs text-gray-400">Across every stage</p>
                    </div>
                  </motion.div>
                </>
              )}

              <motion.div
                style={{ rotate: -4, y: cardY }}
                className="absolute inset-8 rounded-[28px] border border-white/10 bg-slate-950/80 flex flex-col overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.7)]"
              >
                <div className="h-8 bg-slate-900 border-b border-white/10 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="ml-4 h-4 w-32 bg-white/5 rounded text-[10px] text-gray-500 flex items-center px-2">GL Solutions</div>
                </div>
                <div className="p-4 flex-grow flex flex-col gap-3 bg-black/20 overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">GL</span>
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold text-white">Growth Systems</div>
                        <div className="text-[8px] text-gray-400">Technology overview</div>
                      </div>
                    </div>
                    <Sparkles className="text-blue-300" size={14} />
                  </div>

                  <div className="w-full relative h-[100px] rounded-lg bg-gradient-to-r from-blue-950/60 to-cyan-950/40 border border-white/5 overflow-hidden flex flex-col justify-center px-4">
                    <div className="text-[10px] uppercase tracking-wider text-cyan-300 font-medium mb-1">Digital infrastructure</div>
                    <div className="text-lg font-bold text-white tracking-tight">Clearer operations</div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[88%]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-[9px] text-gray-400 mb-1">Automation</div>
                      <div className="text-sm font-bold text-white">Workflow</div>
                    </div>

                    <div className="p-2.5 rounded-lg border border-white/10 bg-white/5">
                      <div className="text-[9px] text-gray-400 mb-1">Design</div>
                      <div className="text-sm font-bold text-white">Product UX</div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2">
                    <Rocket className="text-blue-300" size={18} />
                    <span className="text-sm text-blue-200">Growth-focused delivery</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

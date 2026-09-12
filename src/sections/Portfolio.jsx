import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, CheckCircle2, ArrowRight, MapPin, Clock3, Sparkles, Star } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const projects = [
  {
    title: 'Brew Haven Coffee Shop',
    description: 'A cozy, premium website for a local coffee shop complete with a digital menu, location details, and a modern aesthetic.',
    longDescription: 'Brew Haven is a conceptual project designed for local artisanal coffee shops. The goal was to create a warm, inviting digital presence that perfectly maps to the physical ambiance of a premium cafe. It features an integrated menu system, dynamic opening hours, and a gallery for interior shots.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Tailwind CSS', 'Framer Motion'],
    features: ['Fully responsive menu layout', 'Online table reservation form', 'Instagram feed integration', 'Interactive Google Maps location'],
    accent: 'amber',
    type: 'cafe',
    demo: 'https://startbootstrap.com/previews/business-casual'
  },
  {
    title: 'Urban Bite Restaurant',
    description: 'A dark-themed restaurant landing page showcasing the menu, ambient photography, and booking CTA.',
    longDescription: 'A sleek, modern, and dark-themed web experience for fine-dining restaurants. The design prioritizes high-quality food photography and elegant typography to entice visitors. It includes a streamlined reservation system built right into the landing page.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    tech: ['HTML/CSS', 'JavaScript', 'Bootstrap'],
    features: ['Dark mode luxury aesthetic', 'Smooth parallax scrolling', 'Integrated booking system', 'Sticky reservation CTA'],
    accent: 'rose',
    type: 'restaurant',
    demo: 'https://technext.github.io/restaurantly/'
  },
  {
    title: 'Creative Personal Portfolio',
    description: 'A stylish and dynamic personal portfolio designed for a freelance creative director.',
    longDescription: 'This portfolio template is built for creatives who want their work to take center stage. Featuring large, bold typography, subtle glassmorphism effects, and distinct project case study pages, it is designed to convert visitors into freelance clients.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Vite', 'Tailwind'],
    features: ['Masonry grid project gallery', 'Animated skills charting', 'Contact form with validation', 'Downloadable resume button'],
    accent: 'cyan',
    type: 'portfolio',
    demo: 'https://technext.github.io/kross/'
  },
  {
    title: 'Luxe Fashion Store',
    description: 'A high-end frontend e-commerce layout showcasing clothing collections with elegant hover animations.',
    longDescription: 'An elegant, minimalistic e-commerce storefront designed for boutique fashion brands. The layout focuses on large product imagery and an intuitive shopping cart experience, ensuring a frictionless path to purchase for customers.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Redux', 'Tailwind CSS'],
    features: ['Product filtering and sorting', 'Shopping cart state management', 'Quick view product modals', 'Newsletter subscription popup'],
    accent: 'violet',
    type: 'fashion',
    demo: 'https://technext.github.io/cozastore/'
  },
  {
    title: 'Green Leaf Local Shop',
    description: 'A responsive single-page website for a local organic food shop to increase foot traffic and community awareness.',
    longDescription: 'Designed for local grocers and organic markets, this website aims to connect the physical store with the local community online. It highlights fresh daily produce, store philosophy, and community events.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
    tech: ['HTML', 'Vanilla CSS', 'JS'],
    features: ['Daily fresh produce slider', 'Newsletter integration for local deals', 'Store philosophy section', 'Mobile-first robust design'],
    accent: 'emerald',
    type: 'grocery',
    demo: 'https://technext.github.io/ogani/'
  },
  {
    title: 'TechNova Startup',
    description: 'A sleek SaaS business website featuring pricing tables, feature grids, and trust indicators.',
    longDescription: 'TechNova is the ultimate blueprint for SaaS startups looking to launch quickly. The design is engineered for conversion, featuring prominent calls-to-action, trust-building client sections, animated feature highlights, and clear pricing tier cards.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    features: ['Interactive pricing toggle (Monthly/Yearly)', 'Client testimonial carousel', 'Animated feature illustrations', 'Performance optimized load times'],
    accent: 'blue',
    type: 'saas',
    demo: 'https://technext.github.io/rapid/'
  }
];

function DemoPreview({ project }) {
  const accentClass = {
    amber: 'from-amber-500/30 to-orange-500/10 border-amber-400/30 text-amber-200',
    rose: 'from-rose-500/30 to-pink-500/10 border-rose-400/30 text-rose-200',
    cyan: 'from-cyan-500/30 to-sky-500/10 border-cyan-400/30 text-cyan-200',
    violet: 'from-violet-500/30 to-fuchsia-500/10 border-violet-400/30 text-violet-200',
    emerald: 'from-emerald-500/30 to-lime-500/10 border-emerald-400/30 text-emerald-200',
    blue: 'from-blue-500/30 to-indigo-500/10 border-blue-400/30 text-blue-200'
  }[project.accent || 'blue'];

  const shellBase = 'rounded-2xl border bg-black/40 backdrop-blur-sm';

  if (project.type === 'cafe') {
    return (
      <div className="space-y-4">
        <div className={`p-4 border ${accentClass} rounded-2xl`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Brew Haven</p>
              <h3 className="text-3xl font-semibold text-white">Morning rituals</h3>
            </div>
            <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">Open daily</div>
          </div>
          <div className="grid md:grid-cols-[1.4fr_0.8fr] gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-amber-100/20 to-orange-200/10 p-5 min-h-[170px]">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Specialty menu</p>
              <h4 className="mt-4 text-2xl font-semibold text-white">Signature pours</h4>
              <div className="mt-6 flex gap-3 text-sm text-white/80">
                <span className="rounded-full border border-white/15 px-3 py-1">Latte</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Cold brew</span>
                <span className="rounded-full border border-white/15 px-3 py-1">Sweet roll</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-black/30 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Location</p>
                <p className="mt-2 text-white font-medium">12 Maple Street</p>
                <p className="text-sm text-white/70">Mon–Sun • 7:00 – 19:00</p>
              </div>
              <button className="w-full rounded-xl bg-white text-slate-900 py-3 font-medium">Reserve table</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {['Espresso', 'Citrus Matcha', 'Brioche'].map((item, i) => (
            <div key={i} className={`${shellBase} p-3 border-white/10`}>
              <div className="h-20 rounded-xl bg-gradient-to-br from-amber-400/30 to-orange-500/10" />
              <p className="mt-3 text-sm text-white/80">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (project.type === 'restaurant') {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-red-950/40 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Urban Bite</p>
              <h3 className="text-3xl font-semibold text-white">Seasonal dining</h3>
            </div>
            <button className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">Book now</button>
          </div>
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            {['Mains', 'Desserts', 'Cocktails'].map((label, i) => (
              <div key={i} className="rounded-2xl bg-white/5 p-3 border border-white/10">
                <div className="h-20 rounded-xl bg-gradient-to-br from-red-400/20 to-orange-300/10" />
                <p className="mt-3 text-white font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className={`${shellBase} p-4 border-white/10`}>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Chef pick</p>
            <p className="mt-2 text-xl text-white">Charred citrus salmon</p>
            <p className="mt-2 text-sm text-gray-300">Crisp greens, roasted fennel, herb aioli.</p>
          </div>
          <div className={`${shellBase} p-4 border-white/10`}>
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Tonight</p>
            <p className="mt-2 text-xl text-white">Live jazz lounge</p>
            <p className="mt-2 text-sm text-gray-300">7:30 PM • Candlelit dining experience</p>
          </div>
        </div>
      </div>
    );
  }

  if (project.type === 'portfolio') {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Creative portfolio</p>
              <h3 className="text-3xl font-semibold text-white">Selected work</h3>
            </div>
            <button className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">Book a call</button>
          </div>
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="h-36 rounded-xl bg-gradient-to-br from-cyan-300/20 via-slate-700 to-slate-800" />
              <p className="mt-4 text-xl text-white">Campaign identity system</p>
              <p className="mt-2 text-sm text-gray-300">Brand storytelling, digital concepting, and portfolio presentation.</p>
            </div>
            <div className="space-y-3">
              {['Strategy', 'Art Direction', 'Motion'].map((tag) => (
                <div key={tag} className="rounded-xl border border-white/10 bg-black/30 p-3 text-white/80">{tag}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.type === 'fashion') {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-950/70 via-slate-950 to-fuchsia-900/40 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Luxe edit</p>
              <h3 className="text-3xl font-semibold text-white">New season</h3>
            </div>
            <div className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">Curated</div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {['Outerwear', 'Essentials', 'Accessories'].map((label, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="h-28 rounded-xl bg-gradient-to-br from-violet-400/20 to-pink-400/10" />
                <p className="mt-3 text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (project.type === 'grocery') {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950/70 via-slate-950 to-lime-900/40 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">Green Leaf</p>
              <h3 className="text-3xl font-semibold text-white">Fresh picks</h3>
            </div>
            <button className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">Shop today</button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-medium">Organic produce</p>
              <p className="text-sm text-gray-300 mt-2">Local greens, fruit baskets, pantry staples.</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-white font-medium">Market story</p>
              <p className="text-sm text-gray-300 mt-2">Freshest picks from nearby growers and producers.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/70 via-slate-950 to-indigo-900/40 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/60">TechNova</p>
            <h3 className="text-3xl font-semibold text-white">Product growth</h3>
          </div>
          <div className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">SaaS</div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="text-white font-medium">Launch dashboard</p>
            <div className="mt-4 h-28 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/10" />
          </div>
          <div className="space-y-3">
            {['Customer insights', 'Automations', 'Analytics'].map((label) => (
              <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-3 text-white/80">{label}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading 
          title="Selected work samples" 
          subtitle="Conceptual examples of the kinds of digital experiences we design and build for growth-focused teams."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -6, rotateX: 1.5 }}
              className="group rounded-[28px] overflow-hidden border border-white/5 bg-black/20 shadow-[0_30px_80px_rgba(9,12,18,0.45)] relative flex flex-col h-full transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white shadow-xl backdrop-blur-md">
                    Open Demo
                  </span>
                </div>
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="secondary" className="shadow-lg backdrop-blur-md">
                    Demo Project
                  </Badge>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-blue-200/80">0{index + 1}</span>
                  <Sparkles size={14} className="text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-[0.12em] bg-surface px-2 py-1 rounded text-gray-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs py-2"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Case
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs py-2 group/btn"
                    onClick={() => setSelectedProject(project)}
                  >
                    Open Demo <ArrowRight size={14} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 24 }}
              transition={{ duration: 0.22 }}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className="relative w-full max-w-5xl max-h-[92vh] bg-slate-950/95 border border-white/10 rounded-[30px] shadow-[0_30px_120px_rgba(2,6,23,0.9)] overflow-hidden z-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="ml-2 text-sm text-white/75">{selectedProject.title}</div>
                </div>

                <button 
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close preview"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-64px)]">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <Badge variant="primary" className="mb-3 bg-blue-500/15 text-blue-200 border-blue-500/30">Interactive Concept Preview</Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedProject.title}</h2>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedProject(null)}>
                    Close Preview
                  </Button>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-[#0a0f1f] p-4 shadow-inner shadow-blue-950/20">
                  <DemoPreview project={selectedProject} />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-[1.5fr_0.9fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Project Overview</h4>
                      <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-gray-300">
                            <CheckCircle2 size={18} className="text-green-400 mr-3 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 h-fit">
                    <h4 className="font-semibold text-white mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {selectedProject.tech.map((t, i) => (
                        <span key={i} className="text-xs uppercase tracking-[0.12em] bg-black/40 px-3 py-2 rounded-xl text-blue-200 border border-blue-500/20">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-3 text-sm text-gray-300">
                      <div className="flex items-center gap-2"><MapPin size={14} className="text-blue-300" /> Conceptual experience direction</div>
                      <div className="flex items-center gap-2"><Clock3 size={14} className="text-blue-300" /> Built for premium digital storytelling</div>
                      <div className="flex items-center gap-2"><Star size={14} className="text-blue-300" /> Responsive interactive mockup</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;

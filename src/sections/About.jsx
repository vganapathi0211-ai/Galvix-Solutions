import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Smartphone, Zap, Monitor, MessageSquare, HeartHandshake } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';

const features = [
  {
    title: 'Business-first thinking',
    description: 'We anchor technical decisions in business goals so every build supports a clear outcome.',
    icon: Layers,
    color: 'text-blue-400'
  },
  {
    title: 'Responsive experiences',
    description: 'Interfaces are designed to work cleanly across devices without sacrificing clarity or performance.',
    icon: Smartphone,
    color: 'text-pink-400'
  },
  {
    title: 'Practical automation',
    description: 'We use automation where it removes friction, improves accuracy, and helps teams move faster.',
    icon: Zap,
    color: 'text-amber-400'
  },
  {
    title: 'Scalable architecture',
    description: 'Our technical choices aim for clarity, maintainability, and future flexibility as the business grows.',
    icon: Monitor,
    color: 'text-green-400'
  },
  {
    title: 'Clear communication',
    description: 'We keep stakeholders informed with transparent milestones, practical updates, and focused execution.',
    icon: MessageSquare,
    color: 'text-purple-400'
  },
  {
    title: 'Trust-driven partnership',
    description: 'We work with teams as a practical extension of their product and operations capabilities.',
    icon: HeartHandshake,
    color: 'text-red-400'
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_42%)]" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeading
          title="About GL Solutions"
          subtitle="GL Solutions is a technology partner for teams that need practical digital systems, well-designed experiences, and cleaner ways to operate."
          index={1}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-10 items-start mt-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-white/10 bg-slate-950/60 p-8 lg:p-10"
          >
            <p className="text-sm uppercase tracking-[0.22em] text-blue-300 mb-7">Why we exist</p>
            <h3 className="text-4xl md:text-5xl font-black tracking-[-0.06em] text-white leading-none mb-6">
              We build digital systems that move businesses forward.
            </h3>
            <p className="text-lg text-slate-300 leading-relaxed">
              Every decision is shaped around clarity, momentum, and execution. We turn complex goals into focused product and operations decisions that are easier to trust and easier to scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full flex flex-col group border border-white/10 bg-slate-950/45 hover:border-blue-400/30 transition-all duration-300">
                    <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center mb-6 shadow-lg ${feature.color}`}>
                      <Icon size={28} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

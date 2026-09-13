import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-scroll';
import { navItems } from '../../data/siteContent';

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="home" smooth={true} duration={100} offset={-80} className="flex items-center gap-3 mb-6 cursor-pointer inline-flex">
              <img
                src="/logo.png"
                alt="GALVIX Solutions Logo"
                className="h-12 w-12 rounded-xl object-contain border border-blue-400/30 bg-white/5 p-0.5"
              />
              <span className="text-lg font-semibold tracking-[0.2em] text-white">GALVIX SOLUTIONS</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              We design and build technology systems that help businesses make smarter decisions, improve operations, and grow with confidence.
            </p>
            <div className="flex z-10 space-x-4">
              <motion.a whileHover={{ y: -3 }} href="mailto:galvixsolutions@gmail.com" className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-blue-500/20 transition-all">
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={100}
                    offset={-80}
                    className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="mailto:galvixsolutions@gmail.com" className="hover:text-blue-400 transition-colors inline-flex items-center gap-2">
                  galvixsolutions@gmail.com <ArrowUpRight size={14} />
                </a>
              </li>
              <li>
                <a href="tel:+918489968612" className="hover:text-blue-400 transition-colors">+91 84899 68612</a>
              </li>
              <li>Remote-first delivery</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} GALVIX Solutions. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Technology solutions for real-world business growth.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

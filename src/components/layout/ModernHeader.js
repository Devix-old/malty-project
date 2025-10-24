'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChefHat, Menu, X, Sparkles, Heart, BookOpen, Home, Search } from 'lucide-react';

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [0, 10]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Hem', href: '/', icon: Home },
    { name: 'Recept', href: '/recept', icon: BookOpen },
    { name: 'Kategorier', href: '/kategorier', icon: Sparkles },
    { name: 'Blogg', href: '/blogg', icon: Heart },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-pink-100' 
          : 'bg-white/80 backdrop-blur-md'
      }`}
      style={{ opacity: headerOpacity }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          
          {/* Logo - Dessert Style */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Logo Icon */}
              <div className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 p-3 rounded-2xl shadow-lg">
                <ChefHat className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Logo Text - Dessert Font Style */}
            <div className="flex flex-col">
              <motion.h1
                className="text-2xl lg:text-3xl font-black tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB923C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 20px rgba(236, 72, 153, 0.3)',
                }}
                whileHover={{ scale: 1.02 }}
              >
                Bakstunden
              </motion.h1>
              <motion.p
                className="text-xs lg:text-sm font-medium text-pink-600"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  letterSpacing: '0.15em',
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Sötsakens Värld ✨
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors duration-300"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  <item.icon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {item.name}
                  
                  {/* Animated Underline */}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 group-hover:w-full transition-all duration-300 rounded-full" />
                  
                  {/* Sparkle on Hover */}
                  <motion.span
                    className="absolute -top-1 -right-1 text-pink-500 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: 0 }}
                    whileHover={{ scale: 1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✨
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Search & CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Button */}
            <motion.button
              className="group relative p-3 bg-white/80 hover:bg-white border border-pink-200 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden overflow-hidden"
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-6 bg-white/95 backdrop-blur-xl border-t border-pink-100">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
                  style={{
                    fontFamily: "'Crimson Text', serif",
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              </motion.div>
            ))}
            
            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 20 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/recept"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-bold rounded-full shadow-lg"
                style={{
                  fontFamily: "'Inter', sans-serif",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="w-4 h-4" />
                Börja Baka
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}


'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, ChefHat, Search, Menu, X } from 'lucide-react';clear
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState } from 'react';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/ui/SearchBar';
import Tag from '@/components/ui/Tag';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import SocialProof from '@/components/home/SocialProof';
import PopularThisWeek from '@/components/home/PopularThisWeek';
import SeasonalInspiration from '@/components/home/SeasonalInspiration';
import AuthorsSection from '@/components/home/AuthorsSection';
import CategoryCarousel from '@/components/home/CategoryCarousel';
import { useRouter } from 'next/navigation';

export default function HomeClient({ 
  collections, 
  popularTags, 
  totalRecipes,
  featuredRecipes,
  allRecipes,
  articles,
  authors
}) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Embla Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Add the two new categories with the specified images
  const allCategories = [
    ...collections,
    {
      slug: 'vafflor',
      title: 'Våfflor',
      image: '/images/vafflor-bakgrund-transparent.png'
    },
    {
      slug: 'pannkakor',
      title: 'Pannkakor', 
      image: '/images/pannkakor-bakgrund-transparent.png'
    }
  ];

  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/recept?q=${encodeURIComponent(query)}`);
    }
  };

  const faqs = [
    {
      question: 'Hur skalar jag recept till fler portioner?',
      answer: 'Varje recept har en portionsräknare där du enkelt kan öka eller minska antalet portioner. Ingredienserna anpassas automatiskt.',
    },
    {
      question: 'Kan jag skriva ut recept?',
      answer: 'Ja! Varje recept har en utskriftsknapp som ger dig en formaterad version perfekt för papper.',
    },
    {
      question: 'Är recepten anpassade för svensk marknad?',
      answer: 'Absolut! Alla våra recept använder ingredienser som finns i svenska butiker och måtten är i det metriska systemet.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Unified First Screen - Header + Hero + Carousel */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Unified Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
          {/* Floating Blobs */}
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/40 to-rose-300/40 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl"
            animate={{
              x: [-100, 100, -100],
              y: [-50, 50, -50],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Static Background Dots - Performance Optimized */}
          {[
            { color: 'from-pink-400 to-rose-400', size: 'w-3 h-3', left: '5%', top: '15%' },
            { color: 'from-purple-400 to-pink-400', size: 'w-4 h-4', left: '15%', top: '35%' },
            { color: 'from-orange-400 to-yellow-400', size: 'w-2.5 h-2.5', left: '25%', top: '10%' },
            { color: 'from-rose-400 to-pink-400', size: 'w-3.5 h-3.5', left: '35%', top: '45%' },
            { color: 'from-pink-400 to-purple-400', size: 'w-3 h-3', left: '45%', top: '20%' },
            { color: 'from-orange-400 to-rose-400', size: 'w-2 h-2', left: '55%', top: '60%' },
            { color: 'from-purple-400 to-orange-400', size: 'w-4 h-4', left: '65%', top: '25%' },
            { color: 'from-pink-400 to-orange-400', size: 'w-2.5 h-2.5', left: '75%', top: '50%' },
            { color: 'from-rose-400 to-purple-400', size: 'w-3 h-3', left: '85%', top: '30%' },
            { color: 'from-yellow-400 to-pink-400', size: 'w-2 h-2', left: '10%', top: '70%' },
            { color: 'from-pink-400 to-yellow-400', size: 'w-3.5 h-3.5', left: '30%', top: '80%' },
            { color: 'from-purple-400 to-rose-400', size: 'w-2.5 h-2.5', left: '50%', top: '85%' },
            { color: 'from-orange-400 to-purple-400', size: 'w-4 h-4', left: '70%', top: '75%' },
            { color: 'from-rose-400 to-orange-400', size: 'w-3 h-3', left: '90%', top: '65%' },
            { color: 'from-pink-400 to-rose-400', size: 'w-2 h-2', left: '95%', top: '40%' },
          ].map((dot, index) => (
            <div
              key={index}
              className={`absolute ${dot.size} rounded-full bg-gradient-to-br ${dot.color} opacity-40 z-20`}
              style={{
                left: dot.left,
                top: dot.top,
              }}
            />
          ))}
        </div>

        {/* Header - Top Part */}
        <div className="relative h-20 lg:h-24 flex items-center justify-center z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between">
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
                {[
                  { name: 'Hem', href: '/', icon: '🏠' },
                  { name: 'Recept', href: '/recept', icon: '📖' },
                  { name: 'Kategorier', href: '/kategorier', icon: '✨' },
                  { name: 'Om Bakstunden', href: '/om', icon: '🍰' },
                ].map((item, index) => (
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
                      <span className="text-lg">{item.icon}</span>
                      {item.name}
                      
                      {/* Animated Underline */}
                      <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 group-hover:w-full transition-all duration-300 rounded-full" />
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
        </div>

        {/* Mobile Menu Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -50 }}
          transition={{ duration: 0.3 }}
          className={`lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl border-b border-pink-100 pb-4 ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <nav className="flex flex-col items-center gap-4 px-4 pt-4">
            {[
              { name: 'Hem', href: '/', icon: '🏠' },
              { name: 'Recept', href: '/recept', icon: '📖' },
              { name: 'Kategorier', href: '/kategorier', icon: '✨' },
              { name: 'Om Bakstunden', href: '/om', icon: '🍰' },
            ].map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition-colors duration-300 text-lg font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            <Link
              href="/recept"
              className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Börja Baka
            </Link>
          </nav>
        </motion.div>

        {/* Hero Content - Middle Part */}
        <div className="relative h-[30vh] sm:h-[32vh] lg:h-[35vh] flex items-center justify-center z-30">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 leading-[1.1] font-playfair"
                style={{
                  background: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #FB923C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
                  letterSpacing: '-0.02em',
                }}
              >
                Låt Oss Baka Något Sött
              </h1>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <Button
                  onClick={() => router.push('/recept')}
                  className="bg-[#C8B6FF] hover:bg-[#B5A0FF] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wider font-inter text-shadow-button filter-drop-shadow-button"
                >
                  SENASTE RECEPTEN
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Spacing between Hero and Carousel */}
        <div className="relative h-[8vh] sm:h-[6vh] lg:h-[5vh] flex items-center justify-center z-30">
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-pink-300 via-rose-300 to-orange-300 rounded-full opacity-60"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Carousel Content - Bottom Part */}
        <div className="relative h-[35vh] sm:h-[32vh] lg:h-[28vh] flex items-center px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24 z-30">
          <div className="max-w-7xl mx-auto w-full">
            {/* Carousel Container */}
            <div className="relative">
              {/* Modern Navigation Arrows - Left */}
              <motion.button
                onClick={scrollPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 group"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous categories"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] blur-xl opacity-0 group-hover:opacity-60"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Button */}
                  <div className="relative rounded-full p-4 transition-all duration-300 cursor-pointer">
                    <motion.div
                      animate={{ x: [-2, 2, -2] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#FF7A7A] transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
              
              {/* Modern Navigation Arrows - Right */}
              <motion.button
                onClick={scrollNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 group"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next categories"
              >
                <div className="relative">
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C8B6FF] to-[#E5D4FF] blur-xl opacity-0 group-hover:opacity-60"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Button */}
                  <div className="relative rounded-full p-4 transition-all duration-300 cursor-pointer">
                    <motion.div
                      animate={{ x: [-2, 2, -2] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#C8B6FF] transition-colors" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              {/* Embla Carousel */}
              <div className="overflow-hidden px-12 sm:px-16" ref={emblaRef}>
                <div className="flex sm:gap-10 md:gap-12 lg:gap-16">
                  {allCategories.map((collection, index) => (
              <motion.div
                key={collection.slug}
                      className="flex-[0_0_70%] xs:flex-[0_0_50%] sm:flex-[0_0_35%] md:flex-[0_0_28%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/kategorier/${collection.slug}`}
                        className="block group"
                      >
                        <motion.div
                          whileHover={{ y: -10 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                          {/* Card - Transparent */}
                          <div className="relative rounded-3xl p-6 transition-all duration-500 overflow-hidden">

                            {/* Category Image */}
                            <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-orange-100/50 via-pink-100/50 to-purple-100/50 rounded-full p-4 group-hover:from-pink-200/70 group-hover:via-rose-200/70 group-hover:to-orange-200/70 transition-all duration-500">
                  <motion.div
                                whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={collection.image}
                      alt={collection.title}
                                  width={160}
                                  height={160}
                                  className="max-w-full max-h-full object-contain drop-shadow-lg"
                    />
                  </motion.div>
                            </div>

                  {/* Category Name */}
                  <h3 
                              className="relative text-base md:text-lg lg:text-xl font-bold text-gray-800 transition-colors duration-300"
                              style={{ 
                                fontFamily: "'Crimson Text', serif",
                              }}
                  >
                              <span className="group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {collection.title}
                              </span>
                  </h3>

                            {/* Animated underline */}
                            <motion.div
                              className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-full mt-2 mx-auto"
                              initial={{ width: 0 }}
                              whileHover={{ width: '70%' }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                </Link>
              </motion.div>
            ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes - NEW SECTION */}
      <FeaturedRecipes recipes={featuredRecipes} />


      {/* Popular This Week - NEW SECTION */}
      <PopularThisWeek recipes={allRecipes} />

      {/* Popular Tags/Categories */}
      
      <section className="py-32 px-12 md:px-16 lg:px-20 xl:px-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] bg-clip-text text-transparent font-playfair"
            >
              Utforska efter kategori
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Hitta inspiration bland våra mest populära receptkategorier
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {popularTags.map((tag, index) => (
              <motion.div
                key={tag.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/kategorier/${tag.slug}`}
                  className="group block relative aspect-[4/3] overflow-hidden transition-all duration-300 transform hover:scale-105"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={tag.image}
                      alt={tag.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Minimal Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent group-hover:from-black/90 transition-all duration-300"></div>

                  {/* Content - Bottom Positioned */}
                  <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="p-3 flex items-end justify-between gap-2">
                      {/* Title - Bottom Left */}
                      <h3 className="text-sm md:text-base font-semibold text-white drop-shadow-lg flex-1 font-inter-system">
                        {tag.name}
                      </h3>

                      {/* Badge - Far Right */}
                      <span className="px-2 py-0.5 bg-white/50 opacity-95 backdrop-blur-sm text-gray-900 text-xs font-semibold whitespace-nowrap ml-auto font-inter-system">
                        {tag.count}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/60 transition-all duration-300"></div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/recept')}
              className="group border-[#FF7A7A] text-[#FF7A7A] hover:bg-[#FF7A7A] hover:text-white"
            >
              Se alla recept
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Seasonal Inspiration - NEW SECTION */}
      <SeasonalInspiration recipes={allRecipes} />


      {/* Social Proof - NEW SECTION */}
      <SocialProof totalRecipes={totalRecipes} />

      {/* About Preview */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FFB4B4]/20 to-[#A8E6CF]/20 dark:from-gray-900 dark:to-gray-800">
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Välkommen till Bakstunden
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Vi är passionerade dessertälskare som älskar att dela med oss av våra favoritrecept. 
              Hos oss hittar du allt från klassiska svenska desserter till moderna favoriter, 
              alla testade och godkända. Vårt mål är att göra dessertbakning roligt, enkelt och tillgängligt för alla.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/om')}
              className="bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] hover:shadow-lg"
            >
              Läs mer om oss
            </Button>
          </motion.div>
        </div>
      </section>


      {/* Authors Section - NEW SECTION */}
      <AuthorsSection authors={authors} />

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Vanliga frågor
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
              >
                <summary className="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[#FF7A7A] ml-4">+</span>
                </summary>
                <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Redo att börja baka desserter?
            </h2>
            <p className="text-xl mb-8 opacity-95">
              Utforska våra hundratals dessertrecept och hitta din nästa favoritdessert idag.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push('/recept')}
              className="bg-white text-[#FF7A7A] hover:bg-gray-100"
            >
              Se alla recept
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* HB Agency Ad */}
      <div id='hbagency_space_241543'></div>

    </div>
  );
}

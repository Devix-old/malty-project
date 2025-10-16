'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/ui/SearchBar';
import Tag from '@/components/ui/Tag';
import FeaturedRecipes from '@/components/home/FeaturedRecipes';
import Newsletter from '@/components/home/Newsletter';
import BlogPreview from '@/components/home/BlogPreview';
import SocialProof from '@/components/home/SocialProof';
import PopularThisWeek from '@/components/home/PopularThisWeek';
import SeasonalInspiration from '@/components/home/SeasonalInspiration';
import AuthorsSection from '@/components/home/AuthorsSection';
import Header from '@/components/layout/Header';
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

  // Hero section with cookie background
  const heroImage = '/images/nygräddade-kakor-med-strössel-hero-banner.webp';

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
      {/* Hero Section with Cookie Background */}
      <section className="relative h-[35vh] min-h-[300px] max-h-[500px] overflow-hidden">
        {/* Cookie Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fresh baked cookies with sprinkles"
                className="w-full h-full object-cover"
              />
          {/* Professional brightness and light overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/15"></div>
          <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"></div>
          {/* Top shadow for header clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
          {/* Subtle vignette for focus */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent" 
               style={{ boxShadow: 'inset 0 0 100px rgba(255,255,255,0.3), inset 0 0 200px rgba(255,255,255,0.1)' }}></div>
        </div>

        {/* Header Overlay */}
        <div className="absolute inset-0">
          <Header />
        </div>

        {/* Centered Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 mt-8">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 leading-[1.1] lowercase"
                style={{ 
                  fontFamily: "'Inter', 'Poppins', 'Montserrat', sans-serif",
                  textShadow: '0 2px 4px rgba(255,255,255,0.9), 0 4px 8px rgba(255,255,255,0.7), 0 8px 16px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)',
                  letterSpacing: '-0.02em',
                  filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.8))'
                }}
              >
                låt oss baka något sött
              </h1>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <Button
                  onClick={() => router.push('/recept')}
                  className="bg-[#C8B6FF] hover:bg-[#B5A0FF] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wider"
                  style={{ 
                    fontFamily: "'Inter', 'Poppins', 'Montserrat', sans-serif",
                    boxShadow: '0 2px 8px rgba(200, 182, 255, 0.5), 0 4px 16px rgba(200, 182, 255, 0.3), 0 8px 32px rgba(200, 182, 255, 0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                    filter: 'drop-shadow(0 1px 2px rgba(200, 182, 255, 0.4))'
                  }}
                >
                  SENASTE RECEPTEN
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Top Categories Showcase */}
      <section className="py-8 px-4 bg-gradient-to-b from-[#FFF8F3] via-[#FFF5EE] to-white">
        <div className="max-w-7xl mx-auto">
          {/* Category Circles Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <Link
                  href={`/kategorier/${collection.slug}`}
                  className="block"
                >
                  {/* Free-form Image */}
                  <motion.div
                    className="relative w-40 h-40 md:w-48 md:h-48 mx-auto mb-3 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>

                  {/* Category Name */}
                  <h3 
                    className="text-base md:text-lg font-medium text-gray-800 group-hover:text-[#FF7A7A] transition-colors duration-300"
                    style={{ 
                      fontFamily: "'Inter', 'Poppins', 'Montserrat', sans-serif"
                    }}
                  >
                    {collection.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes - NEW SECTION */}
      <FeaturedRecipes recipes={featuredRecipes} />

      {/* Collections - Curated Recipe Collections */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] bg-clip-text text-transparent"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                Utvalda samlingar
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Kurerade receptsamlingar för olika tillfällen
              </p>
            </motion.div>
          </div>

          {/* Collections Grid - Large Image Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/kategorier/${collection.slug}`}
                  className="group block relative h-[450px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Professional Bottom Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>

                  {/* Content - Bottom Aligned */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between gap-3 mb-4">
                      {/* Title - Bottom Left */}
                      <h3 
                        className="text-2xl md:text-3xl font-bold text-white flex-1"
                        style={{ 
                          fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
                          textShadow: '0 2px 15px rgba(0,0,0,0.7)',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {collection.title}
                      </h3>

                      {/* Recipe Count Badge - Far Right */}
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs md:text-sm font-bold rounded-full shadow-lg whitespace-nowrap ml-auto">
                        {collection.recipes}
                      </span>
                    </div>

                    {/* Description */}
                    <p 
                      className="text-white/85 text-sm md:text-base leading-relaxed mb-3"
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        textShadow: '0 1px 8px rgba(0,0,0,0.6)'
                      }}
                    >
                      {collection.description}
                    </p>

                    {/* Arrow Link */}
                    <div className="flex items-center gap-2 text-white/90 group-hover:text-white group-hover:gap-3 transition-all">
                      <span className="text-sm font-medium">Utforska samlingen</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular This Week - NEW SECTION */}
      <PopularThisWeek recipes={allRecipes} />

      {/* Popular Tags/Categories */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              Utforska efter kategori
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Hitta inspiration bland våra mest populära receptkategorier
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                  className="group block relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={tag.image}
                      alt={tag.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Minimal Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-black/85 transition-all duration-300"></div>

                  {/* Content - Bottom Positioned */}
                  <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="p-4 flex items-end justify-between gap-3">
                      {/* Title - Bottom Left */}
                      <h3 className="text-lg md:text-xl font-semibold text-white drop-shadow-lg flex-1" style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}>
                        {tag.name}
                      </h3>

                      {/* Badge - Far Right */}
                      <span className="px-3 py-1.5 bg-white/40 opacity-90 backdrop-blur-sm text-gray-900 text-xs md:text-sm font-bold rounded-full shadow-lg whitespace-nowrap ml-auto" style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}>
                        {tag.count}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-2xl transition-all duration-300"></div>
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


      {/* Blog Preview - NEW SECTION */}
      <BlogPreview articles={articles} />

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
              Välkommen till Malty
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

      {/* Newsletter - NEW SECTION */}
      <Newsletter />

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
    </div>
  );
}

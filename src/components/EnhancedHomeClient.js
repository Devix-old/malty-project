'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight, Utensils, Heart, Globe, Zap } from 'lucide-react';
import RecipeCard from '@/components/recipe/RecipeCard';
import { getAllCategories } from '@/lib/categories';

export default function EnhancedHomeClient({
  popularCategories,
  totalRecipes,
  featuredRecipes,
  allRecipes,
  articles,
  authors
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const allCategories = getAllCategories();

  // Auto-sliding hero images
  const heroImages = [
    {
        src: '/images/kyckling-i-kramig-svampsas-recept.webp',
        alt: 'Kyckling i krämig svampsås',
        title: 'Våra godaste kycklingrecept',
        subtitle: 'Enkla, saftiga och fulla av smak – perfekta till både vardag och helg.',
        positionClass: 'object-right object-center md:object-center'
      },
      {
        src: '/images/amerikanska-pannkakor-med-banan-och-blabar.webp',
        alt: 'Amerikanska pannkakor med banan och blåbär',
        title: 'Fluffiga amerikanska pannkakor',
        subtitle: 'Söta, mjuka och perfekta till helgfrukosten.',
        positionClass: 'object-right object-bottom md:object-[center_80%]'
      },
      {
        src: '/images/fika-och-bakning-svensk-stil.webp',
        alt: 'Bakning och fika',
        title: 'Njut av stunden med bakning och fika',
        subtitle: 'Vardagsmys eller helglyx – alltid något gott att dela.',
        positionClass: 'object-right object-center md:object-[center_80%]'
      }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const quickAccessItems = [
    {
      title: 'Pannkakor recept',
      description: 'Fluffiga och goda',
      href: '/kategorier/pannkakor-recept',
      color: 'from-yellow-400 to-orange-500',
      image: '/images/pannkakor-recept.webp'
    },
    {
      title: 'Kycklingfärs recept',
      description: 'Enkla och mätta',
      href: '/kategorier/kycklingfars-recept',
      color: 'from-orange-400 to-red-500',
      image: '/images/kycklingfarsbiffar-med-potatis-och-lingon.webp'
    },
    {
      title: 'Kyckling recept',
      description: 'Hälsosam och god',
      href: '/kategorier/kyckling-recept',
      color: 'from-amber-400 to-yellow-500',
      image: '/images/kyckling-recept.webp'
    },
    {
      title: 'Pasta recept',
      description: 'Italienska favoriter',
      href: '/kategorier/pasta-recept',
      color: 'from-red-400 to-pink-500',
      image: '/images/pasta-recept-kyckling-svampsas.webp'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImages[currentSlide].src}
            alt={heroImages[currentSlide].alt}
            fill
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${heroImages[currentSlide].positionClass || 'hero-mobile-right-desktop-center'}`}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {heroImages[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {heroImages[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/recept"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
                >
                  Upptäck alla recept
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/snabbmat"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
                >
                  Snabbmat
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Mest sökta recept
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Populära recept som andra älskar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 group">
                    {/* Image with elegant title overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Elegant gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Professional title at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-2xl">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Minimal action section */}
                    <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        <span>Utforska recept</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Recipes */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Utvalda recept
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Våra mest populära och älskade recept
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.slice(0, 8).map((recipe, index) => (
              <motion.div
                key={recipe.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RecipeCard 
                  recipe={recipe} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/recept"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Se alla recept
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Populära kategorier
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Upptäck recept baserat på dina preferenser
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link
                  href={`/kategorier/${category.slug}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-32">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.count}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">{totalRecipes}</div>
              <div className="text-purple-200">Recept</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">12</div>
              <div className="text-purple-200">Kategorier</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-purple-200">Svenska recept</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

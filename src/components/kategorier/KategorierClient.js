'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChefHat, ArrowRight, Sparkles, Clock, Users } from 'lucide-react';
import { CategoryPageAd } from '@/components/ads/AdPlacements';
import Tag from '../ui/Tag';
import { cn } from '@/lib/utils/cn';

export default function KategorierClient({ categories }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF5EE]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.03, 0.06, 0.03],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#6FCF97] to-[#A8E6CF] rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <ChefHat className="w-5 h-5 text-[#FF7A7A]" />
              <span className="text-[#FF7A7A] font-semibold">Utforska våra kategorier</span>
            </motion.div>

            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] bg-clip-text text-transparent font-playfair"
            >
              Receptkategorier
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hitta inspiration bland våra noggrant kurerade kategorier. Från snabb vardagsmat till imponerande festmat.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.article
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group bg-white dark:bg-gray-800 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 rounded-2xl shadow-lg hover:shadow-xl"
              >
                <Link href={`/kategorier/${category.slug}`} className="block">
                  <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-3 right-3 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl">
                      {category.icon}
                    </div>
                  </div>

                  <div className="pt-4 px-4 pb-4">
                    <h3 
                      className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FF7A7A] transition-colors font-inter-system tracking-tight"
                    >
                      {category.name}
                    </h3>

                    <p 
                      className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 font-inter"
                    >
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-4 h-4" />
                        <span>{category.count} recept</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#FF7A7A] font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Utforska kategori</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Page Ad */}
      <CategoryPageAd />

      {/* CTA Section */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] rounded-3xl p-12 text-center overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Hittar du inte det du söker?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Använd vår sökfunktion för att hitta exakt det recept du letar efter
              </p>
              <Link
                href="/recept"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF7A7A] font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Sök bland alla recept
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}



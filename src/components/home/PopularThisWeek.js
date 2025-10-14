'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Eye, Star, Clock } from 'lucide-react';

export default function PopularThisWeek({ recipes }) {
  // Get top rated recipes or fallback to first 6
  const popularRecipes = recipes
    ? recipes
        .filter(r => r.ratingAverage)
        .sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0))
        .slice(0, 6)
    : [];

  if (popularRecipes.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-[#FFF8F3] dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFA07A] to-[#FFB4B4] text-white rounded-full text-sm font-semibold shadow-lg">
              <TrendingUp className="w-4 h-4" />
              Mest populära
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            Populärt den här veckan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Våra läsares absoluta favoriter just nu
          </p>
        </motion.div>

        {/* Recipes Grid - Mix of Large and Small Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularRecipes.map((recipe, index) => {
            // First recipe is featured (larger)
            const isFeatured = index === 0;
            
            return (
              <motion.div
                key={recipe.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
              >
                <Link
                  href={`/recept/${recipe.slug}`}
                  className="group block h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`relative ${isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden bg-gray-200 dark:bg-gray-700`}>
                    {recipe.heroImage?.src ? (
                      <Image
                        src={recipe.heroImage.src}
                        alt={recipe.heroImage.alt || recipe.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFA07A] to-[#FFB4B4]">
                        <span className="text-white text-4xl">🔥</span>
                      </div>
                    )}
                    
                    {/* Trending Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white text-xs font-bold rounded-full shadow-lg">
                        <TrendingUp className="w-3 h-3" />
                        #{index + 1}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    {recipe.ratingAverage && (
                      <div className="absolute top-4 right-4">
                        <span className="flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full shadow-lg">
                          <Star className="w-3 h-3 fill-[#FFA07A] text-[#FFA07A]" />
                          {recipe.ratingAverage}
                          {recipe.ratingCount && (
                            <span className="text-gray-500">({recipe.ratingCount})</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={`p-${isFeatured ? '8' : '6'}`}>
                    <h3 className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-lg'} font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FFA07A] transition-colors line-clamp-2`}>
                      {recipe.title}
                    </h3>
                    
                    {isFeatured && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {recipe.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.totalTimeMinutes || 30} min</span>
                      </div>
                      {recipe.category && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                          {recipe.category}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/recept"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFA07A] to-[#FFB4B4] text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Se alla trendande recept
            <Eye className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


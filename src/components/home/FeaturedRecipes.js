'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, TrendingUp, Star } from 'lucide-react';

export default function FeaturedRecipes({ recipes }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-[#FFF8F3] to-white dark:from-gray-900 dark:to-gray-800">
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
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7A7A]/10 text-[#FF7A7A] rounded-full text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              Senaste recepten
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] bg-clip-text text-transparent"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            Nya favoriter att upptäcka
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Fräscha recept testade till perfektion. Hitta din nästa favorit här!
          </p>
        </motion.div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.slice(0, 6).map((recipe, index) => (
            <motion.div
              key={recipe.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/recept/${recipe.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
                  {recipe.heroImage?.src ? (
                    <Image
                      src={recipe.heroImage.src}
                      alt={recipe.heroImage.alt || recipe.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A]">
                      <span className="text-white text-4xl">🍽️</span>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  {recipe.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full shadow-lg">
                        {recipe.category}
                      </span>
                    </div>
                  )}

                  {/* Rating Badge */}
                  {recipe.ratingAverage && (
                    <div className="absolute top-4 right-4">
                      <span className="flex items-center gap-1 px-3 py-1.5 bg-[#FF7A7A] text-white text-xs font-bold rounded-full shadow-lg">
                        <Star className="w-3 h-3 fill-white" />
                        {recipe.ratingAverage}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FF7A7A] transition-colors line-clamp-2">
                    {recipe.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {recipe.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.totalTimeMinutes || recipe.cookTimeMinutes || 30} min</span>
                    </div>
                    {recipe.servings && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} port</span>
                      </div>
                    )}
                    {recipe.difficulty && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        recipe.difficulty === 'Lätt' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : recipe.difficulty === 'Medel'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/recept"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Se alla recept
            <TrendingUp className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


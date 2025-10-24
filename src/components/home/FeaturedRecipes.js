'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, Star } from 'lucide-react';

export default function FeaturedRecipes({ recipes }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 xl:px-20 bg-white dark:bg-gray-950">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header - Minimal & Clean */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-sm font-medium text-[#FF7A7A] mb-2 tracking-wide uppercase">
            Senaste recepten
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
            Nya favoriter att upptäcka
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Fräscha recept testade till perfektion
          </p>
        </motion.div>

        {/* Recipe Grid - Improved spacing and layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {recipes.slice(0, 8).map((recipe, index) => (
            <motion.div
              key={`${recipe.slug}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <Link
                href={`/recept/${recipe.slug}`}
                className="group block h-full"
              >
                <article className="h-full flex flex-col">
                  {/* Image Container - 4:3 ratio with subtle hover */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 rounded-lg">
                    {recipe.heroImage?.src ? (
                      <Image
                        src={recipe.heroImage.src}
                        alt={recipe.heroImage.alt || recipe.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                        <span className="text-gray-400 text-5xl">🍽️</span>
                      </div>
                    )}
                    
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Minimal badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      {recipe.category && (
                        <span className="px-2.5 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-medium rounded shadow-sm">
                          {recipe.category}
                        </span>
                      )}
                      {recipe.ratingAverage && (
                        <span className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-medium rounded shadow-sm ml-auto">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {recipe.ratingAverage}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#FF7A7A] transition-colors duration-200">
                      {recipe.title}
                    </h3>
                    
                    {/* Excerpt */}
                    {recipe.excerpt && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                        {recipe.excerpt}
                      </p>
                    )}

                    {/* Meta Info - Clean horizontal layout */}
                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{recipe.totalTimeMinutes || recipe.cookTimeMinutes || 30} min</span>
                        </div>
                        {recipe.servings && (
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4" />
                            <span>{recipe.servings}</span>
                          </div>
                        )}
                        {recipe.difficulty && (
                          <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            recipe.difficulty === 'Lätt' 
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                              : recipe.difficulty === 'Medel'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                          }`}>
                            {recipe.difficulty}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Understated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="/recept"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            Se alla recept
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Snowflake, Gift, ArrowRight } from 'lucide-react';

export default function SeasonalInspiration({ recipes }) {
  // Filter for seasonal recipes (baking, holiday-related, winter comfort food)
  const seasonalRecipes = recipes
    ? recipes.filter(r => 
        r.tags?.some(tag => 
          ['Höst', 'Bakning', 'Comfort food', 'Fest', 'Jul'].includes(tag)
        ) || 
        ['Bakning', 'Desserter', 'Grytor & Soppor'].includes(r.category)
      ).slice(0, 4)
    : [];

  if (seasonalRecipes.length === 0) return null;

  // Get current month for dynamic title
  const currentMonth = new Date().toLocaleDateString('sv-SE', { month: 'long' });
  const season = currentMonth.includes('dec') || currentMonth.includes('jan') || currentMonth.includes('feb') 
    ? '❄️ Vinter'
    : currentMonth.includes('mar') || currentMonth.includes('apr') || currentMonth.includes('maj')
    ? '🌸 Vår'
    : currentMonth.includes('jun') || currentMonth.includes('jul') || currentMonth.includes('aug')
    ? '☀️ Sommar'
    : '🍂 Höst';

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-[#FFB4B4] via-[#FFA07A] to-[#FF7A7A]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <Snowflake className="absolute top-20 left-10 w-24 h-24 text-white animate-pulse" />
        <Snowflake className="absolute bottom-20 right-20 w-32 h-32 text-white animate-pulse" style={{ animationDelay: '1s' }} />
        <Gift className="absolute top-40 right-10 w-20 h-20 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
              <Snowflake className="w-4 h-4" />
              Säsongens recept
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            Perfekt för {season}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Mysiga och värmande rätter som passar årstiden perfekt
          </p>
        </motion.div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/recept/${recipe.slug}`}
                className="group block h-full"
              >
                {/* Card with hover effect */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
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
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FFB4B4] to-[#FFA07A]">
                        <span className="text-white text-4xl">❄️</span>
                      </div>
                    )}
                    
                    {/* Seasonal Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#FF7A7A] text-xs font-bold rounded-full shadow-lg">
                        {season}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FF7A7A] transition-colors line-clamp-2">
                      {recipe.title}
                    </h3>
                    
                    {recipe.category && (
                      <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                        {recipe.category}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
            href="/kategorier/hostens-favoriter"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF7A7A] font-semibold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Utforska säsongsrecept
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


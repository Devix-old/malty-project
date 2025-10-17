'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CategoryHero({ category, image, description, recipeCount }) {
  // Map categories to beautiful images
  const categoryImages = {
    'Vegetariskt': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80',
    'Vardagsmat': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1600&q=80',
    'Bakning': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=80',
    'Pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1600&q=80',
    'Grillmat': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80',
    'Desserter': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1600&q=80',
    'Soppor': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1600&q=80',
    'Sallader': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=80',
    'Kyckling': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1600&q=80',
    'Fisk': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1600&q=80',
    'Snabb middag': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80',
    'Glutenfritt': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1600&q=80',
    'default': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&q=80',
  };

  const heroImage = image || categoryImages[category] || categoryImages.default;

  return (
    <section className="relative bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 shadow-2xl"
        >
          <Image
            src={heroImage}
            alt={category}
            fill
            className="object-cover"
          />
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </motion.div>

        {/* Title and Description Below Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 dark:text-white"
            style={{ 
              fontFamily: "'Playfair Display', 'Georgia', serif",
              letterSpacing: '-0.02em'
            }}
          >
            {category}
          </h1>
          
          {description && (
            <p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {description}
            </p>
          )}

          {recipeCount > 0 && (
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-semibold">
              <span className="text-2xl font-bold">{recipeCount}</span>
              <span>fantastiska recept</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}


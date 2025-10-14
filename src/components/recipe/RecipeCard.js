'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import Rating from '../ui/Rating';
import Tag from '../ui/Tag';
import { cn } from '@/lib/utils/cn';

export default function RecipeCard({ recipe, index = 0, className }) {
  const difficultyLabels = {
    'Lätt': 'Lätt',
    'Medel': 'Medel',
    'Avancerad': 'Avancerad',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        'group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1',
        className
      )}
    >
      <Link href={`/recept/${recipe.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-200 dark:bg-gray-700">
          {recipe.heroImage?.src ? (
            <Image
              src={recipe.heroImage.src}
              alt={recipe.heroImage.alt || recipe.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ChefHat className="w-16 h-16 text-gray-400" />
            </div>
          )}
          {recipe.category && (
            <div className="absolute top-3 left-3">
              <Tag variant="accent" size="sm">
                {recipe.category}
              </Tag>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 
            className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors"
            style={{ 
              fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
              letterSpacing: '-0.01em',
              fontWeight: 700
            }}
          >
            {recipe.title}
          </h3>

          {recipe.excerpt && (
            <p 
              className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {recipe.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{recipe.totalTimeMinutes} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{recipe.servings} port</span>
            </div>
            {recipe.difficulty && (
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span>{difficultyLabels[recipe.difficulty]}</span>
              </div>
            )}
          </div>

          {recipe.ratingAverage > 0 && (
            <Rating
              rating={recipe.ratingAverage}
              count={recipe.ratingCount}
              size="sm"
            />
          )}

          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {recipe.tags.slice(0, 3).map((tag) => (
                <Tag key={tag} size="sm">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}


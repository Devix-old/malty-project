import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Tag from '../ui/Tag';
import { formatDate } from '@/lib/utils/date';
import { cn } from '@/lib/utils/cn';

export default function BlogCard({ article, index = 0, className }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        'group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      <Link href={`/blogg/${article.slug}`} className="block">
        {article.heroImage?.src && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-200 dark:bg-gray-700">
            <Image
              src={article.heroImage.src}
              alt={article.heroImage.alt || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="p-5">
          {article.category && (
            <Tag variant="primary" size="sm" className="mb-3">
              {article.category}
            </Tag>
          )}

          <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {article.excerpt}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.publishedAt, 'd MMM yyyy')}</span>
            </div>
            {article.readingMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readingMinutes} min läsning</span>
              </div>
            )}
          </div>

          {article.author && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Av <span className="font-medium">{article.author}</span>
            </p>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {article.tags.slice(0, 3).map((tag) => (
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


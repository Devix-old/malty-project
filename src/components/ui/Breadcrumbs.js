import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export default function Breadcrumbs({ items, className }) {
  // Get the last item (recipe name) and parent items (category)
  const lastItem = items[items.length - 1];
  const parentItems = items.slice(0, -1);

  return (
    <nav aria-label="Brödsmulor" className={cn('w-full', className)}>
      {/* Desktop: Full breadcrumb in one line */}
      <div className="hidden md:flex items-center gap-2 text-sm">
        <Link
          href="/"
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex-shrink-0"
          aria-label="Startsida"
        >
          <Home className="w-4 h-4" />
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <div key={item.url || index} className="flex items-center gap-2 min-w-0">
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {isLast ? (
                <span 
                  className="text-gray-900 dark:text-gray-100 font-medium truncate" 
                  aria-current="page"
                  title={item.name}
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors truncate flex-shrink-0"
                  title={item.name}
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: Two-line layout - Home => Category on top, Recipe name below */}
      <div className="md:hidden flex flex-col gap-2">
        {/* First line: Home icon => Category */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex-shrink-0"
            aria-label="Startsida"
          >
            <Home className="w-4 h-4" />
          </Link>

          {parentItems.map((item, index) => (
            <div key={item.url || index} className="flex items-center gap-2 min-w-0">
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <Link
                href={item.url}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors truncate"
                title={item.name}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Second line: Recipe name */}
        <h2 
          className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-tight line-clamp-2"
          aria-current="page"
          title={lastItem.name}
        >
          {lastItem.name}
        </h2>
      </div>
    </nav>
  );
}


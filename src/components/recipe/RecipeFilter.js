'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { cn } from '@/lib/utils/cn';

export default function RecipeFilter({ filters, onFilterChange, categories, tags }) {
  const [isOpen, setIsOpen] = useState(false);

  const difficulties = ['Lätt', 'Medel', 'Avancerad'];
  const maxTimes = [
    { label: '15 min', value: 15 },
    { label: '30 min', value: 30 },
    { label: '45 min', value: 45 },
    { label: '1 timme', value: 60 },
    { label: '2 timmar', value: 120 },
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({});
    setIsOpen(false);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="relative"
      >
        <Filter className="w-4 h-4 mr-2" />
        Filtrera
        {activeFilterCount > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">
            {activeFilterCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-screen max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Filtrera recept</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  aria-label="Stäng filter"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori</label>
                  <select
                    value={filters.category || 'alla'}
                    onChange={(e) => handleFilterChange('category', e.target.value === 'alla' ? null : e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="alla">Alla kategorier</option>
                    {categories?.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Svårighetsgrad</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFilterChange('difficulty', null)}
                      className={cn(
                        'flex-1 px-3 py-2 text-sm rounded-lg border transition-colors',
                        !filters.difficulty
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                    >
                      Alla
                    </button>
                    {difficulties.map((diff) => (
                      <button
                        key={diff}
                        onClick={() => handleFilterChange('difficulty', diff)}
                        className={cn(
                          'flex-1 px-3 py-2 text-sm rounded-lg border transition-colors',
                          filters.difficulty === diff
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                        )}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Max Time Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">Max tillagningstid</label>
                  <div className="grid grid-cols-3 gap-2">
                    {maxTimes.map((time) => (
                      <button
                        key={time.value}
                        onClick={() => handleFilterChange('maxTime', filters.maxTime === time.value ? null : time.value)}
                        className={cn(
                          'px-3 py-2 text-sm rounded-lg border transition-colors',
                          filters.maxTime === time.value
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                        )}
                      >
                        {time.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    fullWidth
                  >
                    Rensa filter
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="primary"
                    fullWidth
                  >
                    Visa recept
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}


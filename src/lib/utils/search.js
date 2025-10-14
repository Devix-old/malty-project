/**
 * Client-side search utilities
 */

/**
 * Simple fuzzy search implementation
 */
export function fuzzyMatch(text, search) {
  const searchLower = search.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match
  if (textLower.includes(searchLower)) return true;
  
  // Fuzzy match - all characters present in order
  let searchIndex = 0;
  for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
    if (textLower[i] === searchLower[searchIndex]) {
      searchIndex++;
    }
  }
  
  return searchIndex === searchLower.length;
}

/**
 * Search through content items
 */
export function searchContent(items, query) {
  if (!query || query.trim() === '') return items;
  
  const searchTerm = query.trim();
  
  return items.filter(item => {
    // Search in title
    if (fuzzyMatch(item.title, searchTerm)) return true;
    
    // Search in excerpt
    if (item.excerpt && fuzzyMatch(item.excerpt, searchTerm)) return true;
    
    // Search in tags
    if (item.tags && item.tags.some(tag => fuzzyMatch(tag, searchTerm))) return true;
    
    // Search in category
    if (item.category && fuzzyMatch(item.category, searchTerm)) return true;
    
    return false;
  });
}

/**
 * Filter recipes by various criteria
 */
export function filterRecipes(recipes, filters) {
  let filtered = [...recipes];
  
  // Filter by category
  if (filters.category && filters.category !== 'alla') {
    filtered = filtered.filter(r => r.category === filters.category);
  }
  
  // Filter by difficulty
  if (filters.difficulty && filters.difficulty !== 'alla') {
    filtered = filtered.filter(r => r.difficulty === filters.difficulty);
  }
  
  // Filter by max time
  if (filters.maxTime) {
    filtered = filtered.filter(r => r.totalTimeMinutes <= parseInt(filters.maxTime));
  }
  
  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(r => 
      r.tags && filters.tags.some(tag => r.tags.includes(tag))
    );
  }
  
  // Filter by allergens (exclude recipes with specified allergens)
  if (filters.excludeAllergens && filters.excludeAllergens.length > 0) {
    filtered = filtered.filter(r => {
      if (!r.allergens) return true;
      return !filters.excludeAllergens.some(allergen => r.allergens.includes(allergen));
    });
  }
  
  return filtered;
}

/**
 * Sort recipes
 */
export function sortRecipes(recipes, sortBy = 'newest') {
  const sorted = [...recipes];
  
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    
    case 'rating':
      return sorted.sort((a, b) => (b.ratingAverage || 0) - (a.ratingAverage || 0));
    
    case 'quickest':
      return sorted.sort((a, b) => a.totalTimeMinutes - b.totalTimeMinutes);
    
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'sv'));
    
    default:
      return sorted;
  }
}

/**
 * Get unique values for filters
 */
export function getUniqueFilterValues(recipes, field) {
  const values = new Set();
  
  recipes.forEach(recipe => {
    if (Array.isArray(recipe[field])) {
      recipe[field].forEach(v => values.add(v));
    } else if (recipe[field]) {
      values.add(recipe[field]);
    }
  });
  
  return Array.from(values).sort();
}


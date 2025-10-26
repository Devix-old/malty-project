import { getAllContent } from '@/lib/mdx';
import { getAllCategories } from '@/lib/categories';

// Dynamic sitemap generation
export default async function sitemap() {
  const baseUrl = 'https://bakstunden.se';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/recept`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kategorier`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/om`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/maltider`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/snabbmat`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic routes - Recipes
  let recipeRoutes = [];
  try {
    const recipes = await getAllContent('recipes');
    recipeRoutes = recipes.map(recipe => ({
      url: `${baseUrl}/recept/${recipe.slug}`,
      lastModified: new Date(recipe.updatedAt || recipe.publishedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Error fetching recipes for sitemap:', error);
  }

  // Blog articles removed - /blogg page no longer exists

  // Category routes - dynamically generated from all 16 categories
  let categoryRoutes = [];
  try {
    const allCategories = getAllCategories();
    categoryRoutes = allCategories.map(category => ({
      url: `${baseUrl}/kategorier/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  return [
    ...staticRoutes,
    ...recipeRoutes,
    ...categoryRoutes,
  ].filter(Boolean); // Remove any undefined routes
}


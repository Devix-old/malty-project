import { getAllContent } from '@/lib/mdx';

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
      url: `${baseUrl}/blogg`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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

  // Dynamic routes - Blog articles
  let articleRoutes = [];
  try {
    const articles = await getAllContent('articles');
    articleRoutes = articles.map(article => ({
      url: `${baseUrl}/blogg/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || new Date()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  // Category routes
  const categoryRoutes = [
    {
      url: `${baseUrl}/kategorier/kladdkaka`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kategorier/chokladboll`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kategorier/appelpaj`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kategorier/cookies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kategorier/vafflor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kategorier/pannkakor`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kategorier/hostens-favoriter`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  return [
    ...staticRoutes,
    ...recipeRoutes,
    ...articleRoutes,
    ...categoryRoutes,
  ];
}


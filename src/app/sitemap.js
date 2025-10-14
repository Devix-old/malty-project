// Dynamic sitemap generation
export default async function sitemap() {
  const baseUrl = 'https://malty.se';

  // In production, these would be generated from your content
  // For now, returning structure
  
  const routes = [
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
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // In production, add all recipes:
  // const recipes = await getAllContent('recipes');
  // recipes.forEach(recipe => {
  //   routes.push({
  //     url: `${baseUrl}/recept/${recipe.slug}`,
  //     lastModified: new Date(recipe.updatedAt || recipe.publishedAt),
  //     changeFrequency: 'monthly',
  //     priority: 0.8,
  //   });
  // });

  // Same for articles, categories, tags, etc.

  return routes;
}


import { getAllContent } from '@/lib/mdx';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  // Load all recipes to calculate dynamic counts
  const allRecipes = await getAllContent('recipes');
  
  // Try to load articles (may not exist yet)
  let allArticles = [];
  try {
    allArticles = await getAllContent('articles');
  } catch (error) {
    // Articles don't exist yet, use empty array
    allArticles = [];
  }

  // Try to load authors (may not exist yet)
  let allAuthors = [];
  try {
    allAuthors = await getAllContent('authors');
  } catch (error) {
    // Authors don't exist yet, use empty array
    allAuthors = [];
  }

  // Get featured recipes first (prioritize featured: true)
  const featuredMarked = allRecipes
    .filter(r => r.featured === true)
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || 0);
      const dateB = new Date(b.publishedAt || 0);
      return dateB - dateA;
    });

  // If less than 12 featured, fill with latest non-featured recipes
  let featuredRecipes = [...featuredMarked];
  if (featuredRecipes.length < 12) {
    const nonFeatured = allRecipes
      .filter(r => !r.featured)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0);
        const dateB = new Date(b.publishedAt || 0);
        return dateB - dateA;
      });
    
    featuredRecipes.push(...nonFeatured.slice(0, 12 - featuredRecipes.length));
  }

  // Calculate recipe counts dynamically
  const collections = [
    {
      title: 'Höstens favoriter',
      description: 'Varma och mysiga rätter för hösten',
      image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80',
      slug: 'hostens-favoriter',
      recipes: allRecipes.filter(r => 
        r.tags && (r.tags.includes('Höst') || r.tags.includes('Comfort food') || r.category === 'Grytor & Soppor' || r.category === 'Bakning')
      ).length,
    },
    {
      title: 'Snabb vardagsmat',
      description: 'Klart på under 30 minuter',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
      slug: 'snabb-vardagsmat',
      recipes: allRecipes.filter(r => r.totalTimeMinutes <= 30).length,
    },
    {
      title: 'Vegetariska favoriter',
      description: 'Grönt och gott hela veckan',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80',
      slug: 'vegetariskt',
      recipes: allRecipes.filter(r => r.category === 'Vegetariskt' || (r.tags && r.tags.includes('Vegetariskt'))).length,
    },
  ];

  // Calculate tag counts dynamically
  const tagCounts = {};
  allRecipes.forEach(recipe => {
    if (recipe.tags) {
      recipe.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    }
  });

  const popularTags = [
    { name: 'Vardagsmat', slug: 'vardagsmat', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80' },
    { name: 'Vegetariskt', slug: 'vegetariskt', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
    { name: 'Bakning', slug: 'bakning', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80' },
    { name: 'Pasta', slug: 'pasta', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80' },
    { name: 'Grillmat', slug: 'grillmat', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80' },
    { name: 'Desserter', slug: 'desserter', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80' },
    { name: 'Soppor', slug: 'soppor', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80' },
    { name: 'Sallader', slug: 'sallader', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
    { name: 'Kyckling', slug: 'kyckling', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80' },
    { name: 'Fisk', slug: 'fisk', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80' },
    { name: 'Snabb middag', slug: 'snabb-vardagsmat', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80' },
    { name: 'Glutenfritt', slug: 'glutenfritt', image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80' },
  ].map(tag => ({
    ...tag,
    count: `${tagCounts[tag.name] || 0}+ recept`,
  }));

  return (
    <HomeClient 
      collections={collections}
      popularTags={popularTags}
      totalRecipes={allRecipes.length}
      featuredRecipes={featuredRecipes}
      allRecipes={allRecipes}
      articles={allArticles}
      authors={allAuthors}
    />
  );
}

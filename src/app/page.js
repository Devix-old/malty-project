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
      title: 'Kladdkaka',
      description: 'Sveriges mest älskade chokladkaka i alla varianter',
      image: '/images/lyxig-chokladkaka-slice-med-korsbar-och-chokladchips.png',
      slug: 'kladdkaka',
      recipes: allRecipes.filter(r => 
        r.tags && r.tags.includes('Kladdkaka')
      ).length,
    },
    {
      title: 'Cookies',
      description: 'Mjuka och knapriga kakor för alla tillfällen',
      image: '/images/utsokt-chokladchunk-kaka-sot-dessert.png',
      slug: 'cookies',
      recipes: allRecipes.filter(r => 
        r.tags && r.tags.includes('Cookies')
      ).length,
    },
    {
      title: 'Äppelpaj',
      description: 'Klassisk svensk äppelpaj med smuldeg och söta äpplen',
      image: '/images/utsokt-kirapaj-slice-sot-dessert-fotografi.png',
      slug: 'appelpaj',
      recipes: allRecipes.filter(r => 
        r.tags && r.tags.includes('Äppelpaj')
      ).length,
    },
    {
      title: 'Chokladboll',
      description: 'Klassiska no-bake favoriter och moderna varianter',
      image: '/images/utsokt-sortiment-gourmet-chokladtrumfer.png',
      slug: 'chokladboll',
      recipes: allRecipes.filter(r => 
        r.tags && r.tags.includes('Chokladboll')
      ).length,
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
    { name: 'Kladdkaka', slug: 'kladdkaka', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80' },
    { name: 'Chokladboll', slug: 'chokladboll', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80' },
    { name: 'Äppelpaj', slug: 'appelpaj', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80' },
    { name: 'Cookies', slug: 'cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80' },
    { name: 'Våfflor', slug: 'vafflor', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=80' },
    { name: 'Pannkakor', slug: 'pannkakor', image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&q=80' },
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

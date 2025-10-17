import { getAllContent } from '@/lib/mdx';
import HomeClient from '@/components/HomeClient';
import StructuredData from '@/components/seo/StructuredData';
import { generateWebsiteSchema, generateOrganizationSchema, generateItemListSchema } from '@/lib/seo';

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

  // If less than 8 featured, fill with latest non-featured recipes
  let featuredRecipes = [...featuredMarked];
  if (featuredRecipes.length < 8) {
    const nonFeatured = allRecipes
      .filter(r => !r.featured)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || 0);
        const dateB = new Date(b.publishedAt || 0);
        return dateB - dateA;
      });
    
    featuredRecipes.push(...nonFeatured.slice(0, 8 - featuredRecipes.length));
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
    { name: 'Kladdkaka', slug: 'kladdkaka', image: '/images/recipes/filips-basta-kladdkaka.webp' },
    { name: 'Chokladboll', slug: 'chokladboll', image: '/images/recipes/Chokladbolla.png' },
    { name: 'Äppelpaj', slug: 'appelpaj', image: '/images/recipes/knackig-appelpaj.png' },
    { name: 'Cookies', slug: 'cookies', image: '/images/recipes/nygräddade-kakor-med-chokladbitar.webp' },
    { name: 'Våfflor', slug: 'vafflor', image: '/images/recipes/belgiska-vafflor.webp' },
    { name: 'Pannkakor', slug: 'pannkakor', image: '/images/recipes/amerikanska-pannkakor-recept.webp' },
  ].map(tag => ({
    ...tag,
    count: `${tagCounts[tag.name] || 0}+ recept`,
  }));

  // Generate structured data
  const websiteSchema = generateWebsiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const recipeListSchema = generateItemListSchema(featuredRecipes.slice(0, 10), 'Recipe');

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />
      <StructuredData data={recipeListSchema} />
      
      <HomeClient 
        collections={collections}
        popularTags={popularTags}
        totalRecipes={allRecipes.length}
        featuredRecipes={featuredRecipes}
        allRecipes={allRecipes}
        articles={allArticles}
        authors={allAuthors}
      />
    </>
  );
}

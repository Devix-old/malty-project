import { getAllContent } from '@/lib/mdx';
import RecipeListingClient from '@/components/recipe/RecipeListingClient';
import { notFound } from 'next/navigation';

// Category mapping - slug to display name
const categoryMap = {
  'hostens-favoriter': 'Höstens favoriter',
  'snabb-vardagsmat': 'Snabb middag',
  'vegetariskt': 'Vegetariskt',
  'vardagsmat': 'Vardagsmat',
  'bakning': 'Bakning',
  'desserter': 'Desserter',
  'pasta': 'Pasta',
  'grillmat': 'Grillmat',
  'soppor': 'Grytor & Soppor',
  'sallader': 'Sallader',
  'kyckling': 'Kyckling',
  'fisk': 'Fisk & Skaldjur',
  'glutenfritt': 'Glutenfritt',
  'kott': 'Kött',
  'frukost': 'Frukost',
  'tillbehor': 'Tillbehör',
};

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categoryMap).map((slug) => ({
    slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryName = categoryMap[slug];
  
  if (!categoryName) {
    return {
      title: 'Kategori hittades inte',
    };
  }

  return {
    title: `${categoryName} - Recept`,
    description: `Upptäck alla våra ${categoryName.toLowerCase()} recept. Provlagade och godkända recept för alla tillfällen.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categoryName = categoryMap[slug];
  
  if (!categoryName) {
    notFound();
  }

  // Load all recipes
  const allRecipes = await getAllContent('recipes');
  
  // Filter recipes by category
  const categoryRecipes = allRecipes.filter(recipe => {
    // Special handling for collections (not real categories)
    if (slug === 'hostens-favoriter') {
      // Autumn favorites - soups, baking, comfort food
      return recipe.tags && (
        recipe.tags.includes('Höst') ||
        recipe.tags.includes('Comfort food') ||
        recipe.category === 'Grytor & Soppor' ||
        recipe.category === 'Bakning'
      );
    }
    
    if (slug === 'snabb-vardagsmat') {
      // Quick weekday meals - under 30 minutes
      return recipe.totalTimeMinutes <= 30;
    }
    
    // For regular categories: only match by category field, NOT by tags
    // This ensures each recipe appears only in its primary category
    return recipe.category === categoryName;
  });

  return (
    <RecipeListingClient 
      initialRecipes={categoryRecipes} 
      categoryName={categoryName}
      showHero={true}
    />
  );
}


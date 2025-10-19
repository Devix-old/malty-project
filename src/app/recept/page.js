import { getAllContent } from '@/lib/mdx';
import RecipeListingClient from '@/components/recipe/RecipeListingClient';
import { Suspense } from 'react';
import StructuredData from '@/components/seo/StructuredData';
import { generateItemListSchema } from '@/lib/seo';

export const metadata = {
  title: 'Alla recept',
  description: 'Utforska hundratals provlagade dessertrecept från Bakstunden. Från klassisk kladdkaka till moderna chokladvåfflor - hitta din nya favorit!',
  keywords: 'recept, bakning, dessert, kladdkaka, choklad, våfflor, pannkakor, svenska recept, matlagning, söta recept',
  openGraph: {
    title: 'Alla recept | Bakstunden',
    description: 'Utforska hundratals provlagade dessertrecept från Bakstunden. Från klassisk kladdkaka till moderna chokladvåfflor - hitta din nya favorit!',
    type: 'website',
  },
};

export default async function RecipesPage() {
  // Load all recipes from MDX files
  const recipes = await getAllContent('recipes');

  // Generate structured data for recipe listing
  const recipeListSchema = generateItemListSchema(recipes.slice(0, 20), 'Recipe');

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={recipeListSchema} />
      
      <Suspense>
        <RecipeListingClient initialRecipes={recipes} />
      </Suspense>
    </>
  );
}


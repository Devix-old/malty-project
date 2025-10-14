import { getAllContent } from '@/lib/mdx';
import RecipeListingClient from '@/components/recipe/RecipeListingClient';

export const metadata = {
  title: 'Alla recept',
  description: 'Utforska hundratals provlagade recept för alla tillfällen. Från snabba vardagsmiddagar till festmat.',
};

export default async function RecipesPage() {
  // Load all recipes from MDX files
  const recipes = await getAllContent('recipes');

  return <RecipeListingClient initialRecipes={recipes} />;
}


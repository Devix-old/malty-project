import { getAllContent } from '@/lib/mdx';
import RecipeListingClient from '@/components/recipe/RecipeListingClient';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Category mapping - slug to display name
const categoryMap = {
  'kladdkaka': 'Kladdkaka',
  'chokladboll': 'Chokladboll',
  'appelpaj': 'Äppelpaj',
  'cookies': 'Cookies',
  'vafflor': 'Våfflor',
  'pannkakor': 'Pannkakor',
  'hostens-favoriter': 'Höstens favoriter',
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
  
  // Filter recipes by category field
  const categoryRecipes = allRecipes.filter(recipe => {
    // Filter by category field for our dessert categories
    if (slug === 'kladdkaka') {
      return recipe.category === 'Kladdkaka';
    }
    
    if (slug === 'chokladboll') {
      return recipe.category === 'Chokladboll';
    }
    
    if (slug === 'appelpaj') {
      return recipe.category === 'Äppelpaj';
    }
    
    if (slug === 'cookies') {
      return recipe.category === 'Cookies';
    }
    
    if (slug === 'vafflor') {
      return recipe.category === 'Våfflor';
    }
    
    if (slug === 'pannkakor') {
      return recipe.category === 'Pannkakor';
    }
    
    if (slug === 'hostens-favoriter') {
      return recipe.tags && (
        recipe.tags.includes('Höst') || 
        recipe.tags.includes('Comfort food') ||
        recipe.tags.includes('Fest') ||
        recipe.tags.includes('Jul')
      );
    }
    
    return false;
  });

  return (
    <Suspense>
      <RecipeListingClient 
        initialRecipes={categoryRecipes} 
        categoryName={categoryName}
        showHero={true}
      />
    </Suspense>
  );
}


import { getAllContent } from '@/lib/mdx';
import KategorierClient from '@/components/kategorier/KategorierClient';

export const metadata = {
  title: 'Dessertkategorier - Hitta inspiration | Bakstunden',
  description: 'Utforska våra dessertkategorier: Kladdkaka, Chokladboll, Äppelpaj, Cookies, Våfflor och Pannkakor. Hitta ditt nästa favoritdessert!',
};

export default async function KategorierPage() {
  // Load all recipes
  const allRecipes = await getAllContent('recipes');

  // Define dessert categories with descriptions and images
  const categories = [
    {
      name: 'Kladdkaka',
      slug: 'kladdkaka',
      description: 'Sveriges mest älskade chokladkaka i alla varianter. Kladdig mitt och krispig topp.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=80',
      icon: '🍰',
    },
    {
      name: 'Chokladboll',
      slug: 'chokladboll',
      description: 'Klassiska no-bake favoriter och moderna varianter. Sveriges mest älskade fika-godis.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      icon: '🍫',
    },
    {
      name: 'Äppelpaj',
      slug: 'appelpaj',
      description: 'Klassisk svensk äppelpaj med smuldeg och söta äpplen. Servera varm med vaniljsås.',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1200&q=80',
      icon: '🥧',
    },
    {
      name: 'Cookies',
      slug: 'cookies',
      description: 'Krispiga cookies med massor av choklad. Perfekt balans mellan krispigt och mjukt.',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&q=80',
      icon: '🍪',
    },
    {
      name: 'Våfflor',
      slug: 'vafflor',
      description: 'Perfekta våfflor med krispig yta och mjuk mitt. En svensk klassiker för helger.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&q=80',
      icon: '🧇',
    },
    {
      name: 'Pannkakor',
      slug: 'pannkakor',
      description: 'Tunna, mjuka pannkakor som alla älskar. Klassisk svensk husmanskost för fika.',
      image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=1200&q=80',
      icon: '🥞',
    },
  ];

  // Calculate recipe count for each category
  const categoriesWithCounts = categories.map(category => {
    let count = 0;
    
    // Filter by tags for our dessert categories
    if (category.slug === 'kladdkaka') {
      count = allRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes('Kladdkaka')
      ).length;
    } else if (category.slug === 'chokladboll') {
      count = allRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes('Chokladboll')
      ).length;
    } else if (category.slug === 'appelpaj') {
      count = allRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes('Äppelpaj')
      ).length;
    } else if (category.slug === 'cookies') {
      count = allRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes('Cookies')
      ).length;
    } else if (category.slug === 'vafflor') {
      count = allRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes('Våfflor')
      ).length;
    } else if (category.slug === 'pannkakor') {
      count = allRecipes.filter(recipe => 
        recipe.tags && recipe.tags.includes('Pannkakor')
      ).length;
    }

    return {
      ...category,
      count,
    };
  }).filter(cat => cat.count > 0); // Only show categories with recipes

  return <KategorierClient categories={categoriesWithCounts} />;
}



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
      image: '/images/recipes/kladdkaka-godaste-och-harligaste.webp',
      icon: '🍰',
    },
    {
      name: 'Chokladboll',
      slug: 'chokladboll',
      description: 'Klassiska no-bake favoriter och moderna varianter. Sveriges mest älskade fika-godis.',
      image: '/images/recipes/Chokladbolla.png',
      icon: '🍫',
    },
    {
      name: 'Äppelpaj',
      slug: 'appelpaj',
      description: 'Klassisk svensk äppelpaj med smuldeg och söta äpplen. Servera varm med vaniljsås.',
      image: '/images/recipes/appelpaj-klassisk-svensk.webp',
      icon: '🥧',
    },
    {
      name: 'Cookies',
      slug: 'cookies',
      description: 'Krispiga cookies med massor av choklad. Perfekt balans mellan krispigt och mjukt.',
      image: '/images/recipes/amerikanska-pannkakor.webp',
      icon: '🍪',
    },
    {
      name: 'Våfflor',
      slug: 'vafflor',
      description: 'Perfekta våfflor med krispig yta och mjuk mitt. En svensk klassiker för helger.',
      image: '/images/recipes/belgiska-vafflor.webp',
      icon: '🧇',
    },
    {
      name: 'Pannkakor',
      slug: 'pannkakor',
      description: 'Tunna, mjuka pannkakor som alla älskar. Klassisk svensk husmanskost för fika.',
      image: '/images/recipes/amerikanska-pannkakor.webp',
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
  }); // Show all categories

  return <KategorierClient categories={categoriesWithCounts} />;
}



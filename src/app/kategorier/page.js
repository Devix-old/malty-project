import { getAllContent } from '@/lib/mdx';
import KategorierClient from '@/components/kategorier/KategorierClient';

export const metadata = {
  title: 'Receptkategorier - Hitta inspiration | Malty',
  description: 'Utforska våra receptkategorier: Vardagsmat, Desserter, Vegetariskt, Pasta, Bakning och mycket mer. Hitta ditt nästa favoritrecept!',
};

export default async function KategorierPage() {
  // Load all recipes
  const allRecipes = await getAllContent('recipes');

  // Define all categories with descriptions and images
  const categories = [
    {
      name: 'Vardagsmat',
      slug: 'vardagsmat',
      description: 'Snabba och enkla recept för varje dag. Perfekt för en stressig vardag när du vill ha god mat snabbt.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
      icon: '🍲',
    },
    {
      name: 'Vegetariskt',
      slug: 'vegetariskt',
      description: 'Gröna, färgglada och mättande vegetariska rätter. Från sallader till grytor.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      icon: '🥗',
    },
    {
      name: 'Desserter',
      slug: 'desserter',
      description: 'Söta godsaker för alla tillfällen. Från enkla kakor till imponerande tårtor.',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80',
      icon: '🍰',
    },
    {
      name: 'Pasta',
      slug: 'pasta',
      description: 'Italienska klassiker och moderna variationer. Från carbonara till lasagne.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80',
      icon: '🍝',
    },
    {
      name: 'Bakning',
      slug: 'bakning',
      description: 'Doftande bröd, saftiga kakor och krispiga småkakor. Allt du behöver för fikat.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
      icon: '🥖',
    },
    {
      name: 'Grillmat',
      slug: 'grillmat',
      description: 'Sommarens favoriter och året-runt-grillning. Från burgare till spett.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80',
      icon: '🔥',
    },
    {
      name: 'Soppor',
      slug: 'soppor',
      description: 'Värmande soppor för alla årstider. Comfort food när den är som bäst.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80',
      icon: '🍜',
    },
    {
      name: 'Sallader',
      slug: 'sallader',
      description: 'Fräscha och näringsrika sallader. Perfekt som huvudrätt eller tillbehör.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      icon: '🥬',
    },
    {
      name: 'Kyckling',
      slug: 'kyckling',
      description: 'Mångsidiga kycklingrätter från olika kökstyper. Alltid populärt!',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=80',
      icon: '🍗',
    },
    {
      name: 'Fisk & Skaldjur',
      slug: 'fisk',
      description: 'Havets läckerheter tillagade på bästa sätt. Nyttigt och gott.',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1200&q=80',
      icon: '🐟',
    },
    {
      name: 'Grytor & Soppor',
      slug: 'grytor-soppor',
      description: 'Långkok och värmande grytor. Perfekt för kalla dagar.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&q=80',
      icon: '🥘',
    },
    {
      name: 'Frukost',
      slug: 'frukost',
      description: 'Starta dagen rätt med näringsrika och goda frukosträtter.',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80',
      icon: '🥞',
    },
  ];

  // Calculate recipe count for each category
  const categoriesWithCounts = categories.map(category => {
    const count = allRecipes.filter(recipe => 
      recipe.category === category.name || 
      (recipe.tags && recipe.tags.includes(category.name))
    ).length;

    return {
      ...category,
      count,
    };
  }).filter(cat => cat.count > 0); // Only show categories with recipes

  return <KategorierClient categories={categoriesWithCounts} />;
}



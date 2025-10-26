import { getAllContent } from '@/lib/mdx';

export async function GET() {
  try {
    const recipes = await getAllContent('recipes');
    
    // Return only the data needed for search
    const searchData = recipes.map(recipe => ({
      slug: recipe.slug,
      title: recipe.title,
      excerpt: recipe.excerpt,
      tags: recipe.tags || [],
      category: recipe.category,
      difficulty: recipe.difficulty,
      totalTimeMinutes: recipe.totalTimeMinutes,
      ratingAverage: recipe.ratingAverage,
      ratingCount: recipe.ratingCount,
      heroImage: recipe.heroImage
    }));

    return Response.json(searchData);
  } catch (error) {
    console.error('Error loading recipes:', error);
    return Response.json([], { status: 500 });
  }
}

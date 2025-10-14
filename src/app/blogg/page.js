import { getAllContent } from '@/lib/mdx';
import BlogListingClient from '@/components/blog/BlogListingClient';

export const metadata = {
  title: 'Blogg - Tips, guider och inspiration | Malty',
  description: 'Upptäck våra expertguider, köksknep och matlagningstekniker. Lär dig nya färdigheter och bli en bättre kock.',
};

export default async function BlogPage() {
  // Load all articles
  let allArticles = [];
  try {
    allArticles = await getAllContent('articles');
  } catch (error) {
    console.error('Failed to load articles:', error);
    allArticles = [];
  }

  // Sort by publish date (newest first)
  const sortedArticles = allArticles.sort((a, b) => {
    const dateA = new Date(a.publishedAt || 0);
    const dateB = new Date(b.publishedAt || 0);
    return dateB - dateA;
  });

  // Get all unique categories
  const categories = [...new Set(allArticles.map(a => a.category).filter(Boolean))];

  return (
    <BlogListingClient 
      articles={sortedArticles}
      categories={categories}
    />
  );
}


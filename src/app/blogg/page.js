import { getAllContent } from '@/lib/mdx';
import BlogListingClient from '@/components/blog/BlogListingClient';
import StructuredData from '@/components/seo/StructuredData';
import { generateItemListSchema } from '@/lib/seo';

export const metadata = {
  title: 'Blogg - Tips, guider och inspiration',
  description: 'Upptäck våra expertguider, köksknep och bakningstekniker från Bakstunden. Lär dig nya färdigheter och bli en bättre kock med våra provade tips!',
  keywords: 'bakning tips, köksguider, matlagning, knivtekniker, bakning för nybörjare, svenska matguider',
  openGraph: {
    title: 'Blogg - Tips, guider och inspiration | Bakstunden',
    description: 'Upptäck våra expertguider, köksknep och bakningstekniker från Bakstunden. Lär dig nya färdigheter och bli en bättre kock med våra provade tips!',
    type: 'website',
  },
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

  // Generate structured data for blog listing
  const articleListSchema = generateItemListSchema(sortedArticles.slice(0, 20), 'Article');

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={articleListSchema} />
      
      <BlogListingClient 
        articles={sortedArticles}
        categories={categories}
      />
    </>
  );
}


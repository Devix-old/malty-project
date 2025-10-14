import { getContentBySlug, getAllContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const articles = await getAllContent('articles');
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getContentBySlug('articles', slug);

  if (!article) {
    return {
      title: 'Artikel hittades inte',
    };
  }

  const { frontmatter } = article;

  return {
    title: `${frontmatter.title} | Malty Blogg`,
    description: frontmatter.excerpt || 'Läs mer på Malty blogg',
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      authors: [frontmatter.author],
      images: frontmatter.heroImage?.src ? [frontmatter.heroImage.src] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const article = await getContentBySlug('articles', slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same category)
  const allArticles = await getAllContent('articles');
  const relatedArticles = allArticles
    .filter(a => 
      a.slug !== slug && 
      a.category === article.frontmatter.category
    )
    .slice(0, 3);

  // Pass frontmatter and content separately (content as string for client)
  return (
    <BlogDetailClient 
      frontmatter={article.frontmatter}
      content={article.content}
      slug={slug}
      relatedArticles={relatedArticles}
    />
  );
}


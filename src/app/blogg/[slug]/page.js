import { getContentBySlug, getAllContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import BlogDetailClient from '@/components/blog/BlogDetailClient';
import JsonLd from '@/components/seo/JsonLd';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

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
  const { generateMetadata } = await import('@/lib/seo');

  return generateMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.heroImage?.src,
    url: `/blogg/${slug}`,
    type: 'article',
    publishedTime: frontmatter.publishedAt,
    modifiedTime: frontmatter.updatedAt,
    author: frontmatter.author,
    tags: frontmatter.tags,
    keywords: frontmatter.tags?.join(', ') + ', matlagning, tips, guider, svenska mat',
  });
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

  // Generate structured data
  const articleSchema = generateArticleSchema(article.frontmatter);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Hem', url: '/' },
    { name: 'Blogg', url: '/blogg' },
    { name: article.frontmatter.title },
  ]);

  // Pass frontmatter and content separately (content as string for client)
  return (
    <>
      {/* JSON-LD SEO */}
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <BlogDetailClient 
        frontmatter={article.frontmatter}
        content={article.content}
        slug={slug}
        relatedArticles={relatedArticles}
      />
    </>
  );
}


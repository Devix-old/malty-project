import { getAllContent } from '@/lib/mdx';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';
import EnhancedCategoryClient from '@/components/kategorier/EnhancedCategoryClient';
import { notFound } from 'next/navigation';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Kategori hittades inte',
      description: 'Den begärda kategorin kunde inte hittas.'
    };
  }

  // Load recipes for metadata
  const allRecipes = await getAllContent('recipes');
  const filteredRecipes = allRecipes.filter(r => {
    return r.category === category.name || 
           (r.tags && r.tags.some(tag => 
             category.subcategories && category.subcategories.includes(tag)
           ));
  });

  return generateSiteMetadata({
    title: `${category.name} Recept - ${filteredRecipes.length}+ Goda Recept | Bakstunden`,
    description: `${category.description} Hitta de bästa ${category.name.toLowerCase()} recept med steg-för-steg instruktioner. ${filteredRecipes.length}+ testade recept för alla nivåer.`,
    url: `/kategorier/${slug}`,
    keywords: `${category.name.toLowerCase()}, ${category.name.toLowerCase()} recept, goda ${category.name.toLowerCase()}, hur man lagar ${category.name.toLowerCase()}, svenska ${category.name.toLowerCase()}, ${category.name.toLowerCase()} tips, enkla ${category.name.toLowerCase()}, snabba ${category.name.toLowerCase()}`,
  });
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  // Load all recipes
  const allRecipes = await getAllContent('recipes');
  
  // Filter recipes based on new category system
  const filteredRecipes = allRecipes.filter(r => {
    // Check if recipe belongs to this category
    return r.category === category.name || 
           (r.tags && r.tags.some(tag => 
             category.subcategories && category.subcategories.includes(tag)
           ));
  });

  // Get all categories for related categories section
  const allCategories = getAllCategories();

  // Calculate category stats
  const categoryStats = {
    avgTime: filteredRecipes.length > 0 
      ? filteredRecipes.reduce((sum, r) => sum + (r.totalTimeMinutes || 0), 0) / filteredRecipes.length
      : 0,
    avgRating: filteredRecipes.length > 0
      ? filteredRecipes.reduce((sum, r) => sum + (r.ratingAverage || 0), 0) / filteredRecipes.length
      : 0,
    easyRecipes: filteredRecipes.filter(r => r.difficulty?.toLowerCase() === 'lätt').length,
    quickRecipes: filteredRecipes.filter(r => (r.totalTimeMinutes || 0) < 30).length,
    popularRecipes: filteredRecipes.filter(r => (r.ratingAverage || 0) >= 4.5).length
  };

  // Generate JSON-LD structured data for category
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Recept`,
    description: category.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/kategorier/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Hem',
          item: process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Kategorier',
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/kategorier`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.name,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/kategorier/${slug}`
        }
      ]
    },
    numberOfItems: filteredRecipes.length,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: filteredRecipes.length,
      itemListElement: filteredRecipes.slice(0, 10).map((recipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: recipe.title,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'}/recept/${recipe.slug}`,
          image: recipe.heroImage?.src || recipe.heroImage,
          description: recipe.excerpt
        }
      }))
    }
  };

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Hur många ${category.name.toLowerCase()} recept finns det?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Vi har ${filteredRecipes.length} olika ${category.name.toLowerCase()} recept att välja mellan.`
        }
      },
      {
        '@type': 'Question',
        name: `Hur lång tid tar det att laga ${category.name.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Tiden varierar beroende på recept, men de flesta ${category.name.toLowerCase()} recept tar mellan 20-45 minuter att tillaga.`
        }
      },
      {
        '@type': 'Question',
        name: `Är ${category.name.toLowerCase()} recept lämpliga för nybörjare?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Ja! Vi har många enkla ${category.name.toLowerCase()} recept märkta som "Lätt" svårighetsgrad som är perfekta för nybörjare.`
        }
      }
    ]
  };

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={categorySchema} />
      <StructuredData data={faqSchema} />
      
      <EnhancedCategoryClient
        category={category}
        recipes={filteredRecipes}
        allCategories={allCategories}
        categoryStats={categoryStats}
      />
    </>
  );
}

// Generate static params for all categories
export async function generateStaticParams() {
  const { getAllCategories } = await import('@/lib/categories');
  const categories = getAllCategories();
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
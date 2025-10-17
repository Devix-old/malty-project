/**
 * SEO utility functions and JSON-LD schema generators
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://malty.se';
const SITE_NAME = 'Malty';
const SITE_DESCRIPTION = 'Sveriges bästa samling av recept och matlagningsguider. Hitta inspiration för vardagsmiddagar, bakning och festmat.';

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
  keywords,
  noindex = false,
  nofollow = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/images/og-default.jpg`;

  const metadata = {
    title: fullTitle,
    description: description || SITE_DESCRIPTION,
    keywords: keywords || 'recept, matlagning, bakning, svenska recept, matlagningsguider, bakning, dessert, middag, frukost',
    authors: author ? [{ name: author }] : undefined,
    creator: author || SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: description || SITE_DESCRIPTION,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || SITE_NAME,
        },
      ],
      locale: 'sv_SE',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || SITE_DESCRIPTION,
      images: [imageUrl],
      creator: '@malty',
      site: '@malty',
    },
    alternates: {
      canonical: fullUrl,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
    category: type === 'article' ? 'Food & Cooking' : 'Food & Cooking',
  };

  if (type === 'article' && publishedTime) {
    metadata.openGraph.publishedTime = publishedTime;
    if (modifiedTime) {
      metadata.openGraph.modifiedTime = modifiedTime;
    }
    if (author) {
      metadata.openGraph.authors = [author];
    }
    if (tags) {
      metadata.openGraph.tags = tags;
    }
  }

  return metadata;
}

/**
 * Generate Recipe JSON-LD schema
 */
export function generateRecipeSchema(recipe) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    image: recipe.heroImage?.src ? `${SITE_URL}${recipe.heroImage.src}` : undefined,
    author: {
      '@type': 'Person',
      name: recipe.author,
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe.updatedAt || recipe.publishedAt,
    prepTime: `PT${recipe.prepTimeMinutes}M`,
    cookTime: `PT${recipe.cookTimeMinutes}M`,
    totalTime: `PT${recipe.totalTimeMinutes}M`,
    recipeYield: `${recipe.servings} portioner`,
    recipeCategory: recipe.category,
    keywords: recipe.tags?.join(', '),
    aggregateRating: recipe.ratingAverage ? {
      '@type': 'AggregateRating',
      ratingValue: recipe.ratingAverage,
      ratingCount: recipe.ratingCount || 0,
    } : undefined,
  };

  // Add ingredients
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    schema.recipeIngredient = recipe.ingredients.flatMap(section => 
      section.items || []
    );
  }

  // Add instructions
  if (recipe.steps && recipe.steps.length > 0) {
    schema.recipeInstructions = recipe.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    }));
  }

  // Add nutrition
  if (recipe.nutrition && recipe.nutrition.length > 0) {
    const nutritionMap = {};
    recipe.nutrition.forEach(item => {
      nutritionMap[item.name] = item.value + (item.unit || '');
    });

    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: recipe.caloriesPerServing ? `${recipe.caloriesPerServing} kalorier` : undefined,
      ...nutritionMap,
    };
  }

  return schema;
}

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.heroImage?.src ? `${SITE_URL}${article.heroImage.src}` : undefined,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${article.slug}`,
    },
  };
}

/**
 * Generate Breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

/**
 * Generate Website JSON-LD schema with SearchAction
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/recept?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    description: SITE_DESCRIPTION,
    sameAs: [
      'https://instagram.com/malty',
      'https://pinterest.com/malty',
    ],
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate ItemList JSON-LD schema for listing pages
 */
export function generateItemListSchema(items, type = 'Recipe') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': type,
        name: item.title,
        url: `${SITE_URL}/${item.slug}`,
        image: item.heroImage?.src ? `${SITE_URL}${item.heroImage.src}` : undefined,
      },
    })),
  };
}


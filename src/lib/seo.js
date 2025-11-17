/**
 * SEO utility functions and JSON-LD schema generators
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se';
const SITE_NAME = 'Bakstunden';
const SITE_DESCRIPTION = 'Sveriges bästa samling av recept och matlagningsguider. Hitta inspiration för vardagsmiddagar, bakning och festmat.';

/**
 * MINOR #2: Generate keywords from title for better SEO
 * Simple keyword extraction from title when keywords are not provided
 */
function generateKeywordsFromTitle(title) {
  if (!title) return '';
  
  // Basic stopwords to filter
  const stopwords = new Set(['och', 'att', 'i', 'det', 'som', 'en', 'på', 'är', 'av', 'för', 'med', 'till', 'den', 'de', 'har', 'om', 'du', 'han', 'hon', 'vi', 'ni', 'så', 'här', 'där', 'gör', 'ska', 'kan', 'utan', 'eller', 'men', 'vad', 'hur', 'var', 'när', 'från', 'ut', 'in']);
  
  const keywords = title
    .toLowerCase()
    .split(/[\s–\-—]+/)
    .map(word => word.replace(/[.,!?;:()]/g, ''))
    .filter(word => word.length >= 4 && !stopwords.has(word));
  
  return keywords.length > 0 ? keywords.join(', ') : 'recept, matlagning, bakning';
}

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
  const fullTitle = title || SITE_NAME;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}/bak-stunden.png`;

  const metadata = {
    title: fullTitle,
    description: description || SITE_DESCRIPTION,
    // MINOR #2: Derive keywords from title if missing for better SEO
    keywords: keywords || (title ? generateKeywordsFromTitle(title) : 'recept, matlagning, bakning, svenska recept, matlagningsguider, bakning, dessert, middag, frukost'),
    authors: author ? [{ name: author }] : undefined,
    creator: author || SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    generator: 'Next.js',
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
          // MINOR #1: Only add dimensions if image metadata contains them
          // Don't send fake dimensions - let platforms auto-detect
          ...(image?.width && image?.height ? {
            width: image.width,
            height: image.height,
          } : {}),
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
      creator: '@bakstunden',
      site: '@bakstunden',
    },
    alternates: {
      canonical: fullUrl,
    },
    // Note: metadataBase should ONLY be set in root layout (src/app/layout.js)
    // Setting it here in route-level generateMetadata is ignored by Next.js
    // and can cause canonical/OG URL issues
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
    other: {
      'msapplication-TileColor': '#FF7A7A',
      'theme-color': '#FF7A7A',
      'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION,
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
 * MINOR #4: This function is outdated compared to generateEnhancedRecipeSchema() in recipe-seo.js
 * The new version has: better stopwords, better keyword generation, better step URLs, better image structure, better nutrition
 * Consider using generateEnhancedRecipeSchema() instead for new implementations
 */
export function generateRecipeSchema(recipe) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.excerpt,
    image: recipe.image?.src ? `${SITE_URL}${recipe.image.src}` : undefined,
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    author: {
      '@type': 'Person',
      name: recipe.author || 'Bakstunden Team',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/bak-stunden.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: recipe.publishedAt,
    dateModified: recipe.updatedAt || recipe.publishedAt,
    prepTime: recipe.prepTimeMinutes ? `PT${recipe.prepTimeMinutes}M` : undefined,
    cookTime: recipe.cookTimeMinutes ? `PT${recipe.cookTimeMinutes}M` : undefined,
    totalTime: recipe.totalTimeMinutes ? `PT${recipe.totalTimeMinutes}M` : undefined,
    // MINOR #6: Use English for recipeYield for international visibility
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    // MINOR #7: Don't default to 'Dessert' - use undefined if category missing
    recipeCategory: recipe.category || undefined,
    recipeCuisine: 'Swedish',
    // MINOR #5: Add mainEntityOfPage to reduce canonical mistakes
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/recept/${recipe.slug || ''}`,
    },
    keywords: recipe.tags?.join(', '),
    aggregateRating: recipe.ratingAverage ? {
      '@type': 'AggregateRating',
      ratingValue: recipe.ratingAverage,
      ratingCount: recipe.ratingCount || 0,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    recipeInstructions: (() => {
      // CRITICAL #2: Validate that steps exist and are not empty
      if (!recipe.steps || recipe.steps.length === 0) {
        // Provide fallback instruction if steps are missing
        return [{
          '@type': 'HowToStep',
          position: 1,
          text: recipe.excerpt || recipe.description || 'Se den fullständiga receptet'
        }];
      }
      return recipe.steps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title || `Steg ${index + 1}`,
        text: step.description,
      }));
    })(),
  };

  // Add ingredients
  if (recipe.ingredients && recipe.ingredients.length > 0) {
    schema.recipeIngredient = recipe.ingredients.flatMap(section => 
      section.items || []
    );
  }

  // Add nutrition
  // CRITICAL #3: Use standard Schema.org properties instead of dynamic properties
  // Google doesn't recognize dynamic properties - must use standard names
  if (recipe.nutrition && recipe.nutrition.length > 0) {
    // Helper function to find nutrition value by Swedish name
    const findNutrition = (swedishName) => {
      const item = recipe.nutrition.find(n => 
        n.name.toLowerCase() === swedishName.toLowerCase()
      );
      if (item) {
        const unit = item.unit || '';
        return `${item.value}${unit}`;
      }
      return undefined;
    };

    schema.nutrition = {
      '@type': 'NutritionInformation',
      calories: recipe.caloriesPerServing ? `${recipe.caloriesPerServing} calories` : findNutrition('Kalorier'),
      fatContent: findNutrition('Fett'),
      carbohydrateContent: findNutrition('Kolhydrater'),
      proteinContent: findNutrition('Protein'),
      sugarContent: findNutrition('Socker'),
      fiberContent: findNutrition('Fiber'),
      sodiumContent: findNutrition('Natrium'),
      // Remove undefined properties
    };
    
    // Remove undefined properties for cleaner schema
    Object.keys(schema.nutrition).forEach(key => {
      if (schema.nutrition[key] === undefined) {
        delete schema.nutrition[key];
      }
    });
  }

  // MINOR #10: Remove undefined properties for cleaner schema
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate Article JSON-LD schema
 */
export function generateArticleSchema(article) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image?.src ? `${SITE_URL}${article.image.src}` : undefined,
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      // MINOR #12: Add width/height to logo
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/bak-stunden.png`,
        width: 512,
        height: 512,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      // MINOR #8: Article URL structure - update if articles use different route
      // Currently assumes /[slug] but may need /artiklar/[slug] or /blog/[slug]
      '@id': `${SITE_URL}/${article.slug}`,
    },
  };

  // MINOR #10: Remove undefined properties
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate Breadcrumb JSON-LD schema
 * MINOR #9: URL logic matches recipe-seo.js breadcrumb generation
 */
export function generateBreadcrumbSchema(items) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };

  // MINOR #10: Remove undefined properties
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate Website JSON-LD schema with SearchAction
 */
export function generateWebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        // MINOR #11: Fix search path to match actual search page
        urlTemplate: `${SITE_URL}/sok?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // MINOR #10: Remove undefined properties
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/bak-stunden.png`,
      width: 512,
      height: 512,
    },
    description: SITE_DESCRIPTION,
    foundingDate: '2024',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@bakstunden.se',
    },
    sameAs: [
      'https://instagram.com/bakstunden',
      'https://pinterest.com/bakstunden',
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        // MINOR #11: Fix search path to match actual search page
        urlTemplate: `${SITE_URL}/sok?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // MINOR #10: Remove undefined properties
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(faqs) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // MINOR #10: Remove undefined properties
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}

/**
 * Generate ItemList JSON-LD schema for listing pages
 */
export function generateItemListSchema(items, type = 'Recipe') {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    // MINOR #3: Add inLanguage for multilingual sites
    inLanguage: 'sv-SE',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': type,
        name: item.title,
        url: `${SITE_URL}/${item.slug}`,
        image: item.image?.src ? `${SITE_URL}${item.image.src}` : undefined,
      },
    })),
  };

  // MINOR #10: Remove undefined properties
  Object.keys(schema).forEach(key => {
    if (schema[key] === undefined) {
      delete schema[key];
    }
  });

  return schema;
}


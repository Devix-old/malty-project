# 🔧 Technical SEO Implementation Guide

## Code Fixes & Enhancements

### 1. Enhanced Sitemap with Images

**File:** `src/app/sitemap.js`

```javascript
import { getAllContent } from '@/lib/mdx';
import { getAllCategories } from '@/lib/categories';

export default async function sitemap() {
  const baseUrl = 'https://bakstunden.se';

  // ... existing static routes ...

  // Enhanced recipe routes with images
  let recipeRoutes = [];
  try {
    const recipes = await getAllContent('recipes');
    recipeRoutes = recipes.map(recipe => {
      const priority = recipe.homepageFeatured ? 0.9 : 0.8;
      const changeFreq = recipe.updatedAt ? 'weekly' : 'monthly';
      
      return {
        url: `${baseUrl}/recept/${recipe.slug}`,
        lastModified: new Date(recipe.updatedAt || recipe.publishedAt || new Date()),
        changeFrequency: changeFreq,
        priority: priority,
        // Add image data for image sitemap
        images: recipe.heroImage?.src ? [
          {
            loc: `${baseUrl}${recipe.heroImage.src}`,
            title: recipe.heroImage.alt || recipe.title,
            caption: recipe.heroImage.alt || recipe.title,
          }
        ] : [],
      };
    });
  } catch (error) {
    console.error('Error fetching recipes for sitemap:', error);
  }

  return [
    ...staticRoutes,
    ...recipeRoutes,
    ...categoryRoutes,
  ].filter(Boolean);
}
```

### 2. Create Image Sitemap

**File:** `src/app/sitemap-images.xml` (create new)

```javascript
import { getAllContent } from '@/lib/mdx';

export default async function imagesSitemap() {
  const baseUrl = 'https://bakstunden.se';
  const recipes = await getAllContent('recipes');

  const imageEntries = recipes
    .filter(r => r.heroImage?.src)
    .map(recipe => ({
      loc: `${baseUrl}${recipe.heroImage.src}`,
      title: recipe.heroImage.alt || recipe.title,
      caption: recipe.heroImage.alt || recipe.title,
    }));

  return imageEntries;
}
```

### 3. Enhanced Recipe Schema with Images

**File:** `src/lib/seo/recipe-seo.js`

```javascript
// Update generateEnhancedRecipeSchema function

export function generateEnhancedRecipeSchema(recipe) {
  // ... existing code ...

  const schema = {
    // ... existing fields ...
    
    // Add image array (not just single image)
    image: recipe.heroImage?.src 
      ? [
          `${SITE_URL}${recipe.heroImage.src}`,
          // Add step images if available
          ...(recipe.steps?.filter(s => s.image).map(s => `${SITE_URL}${s.image}`) || [])
        ]
      : undefined,
    
    // Enhanced HowTo schema
    ...(recipe.steps?.length > 0 && {
      'howTo': {
        '@type': 'HowTo',
        name: `${recipe.title} - Steg-för-steg`,
        step: recipe.steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.title || `Steg ${index + 1}`,
          text: step.description,
          image: step.image ? `${SITE_URL}${step.image}` : undefined,
        })),
      }
    }),
  };

  return schema;
}
```

### 4. Alt Text Validation Function

**File:** `src/lib/seo/image-seo.js` (create new)

```javascript
/**
 * Generate SEO-optimized alt text for recipe images
 */
export function generateRecipeAltText(recipe, imageType = 'hero') {
  const { title, category, heroImage } = recipe;
  
  // Extract primary keyword from title (usually first 2-3 words)
  const primaryKeyword = title.split(' ').slice(0, 3).join(' ');
  
  // Build descriptive alt text
  let altText = `${primaryKeyword} recept`;
  
  if (imageType === 'hero') {
    // Add visual description
    altText += ` - ${heroImage?.alt || title}`;
    
    // Add serving context if available
    if (recipe.servings) {
      altText += ` serverad till ${recipe.servings} personer`;
    }
  }
  
  // Ensure length (optimal: 50-100 characters)
  return altText.length > 100 
    ? altText.substring(0, 97) + '...'
    : altText;
}
```

### 5. Enhanced Meta Description Generator

**File:** `src/lib/seo/recipe-seo.js`

```javascript
/**
 * Generate SEO-optimized recipe description for meta tags
 */
function generateRecipeDescription(excerpt = '', category = '', totalTimeMinutes = 0, servings = 0) {
  // If excerpt is good, use it but ensure optimal length
  if (excerpt && excerpt.length >= 120 && excerpt.length <= 160) {
    return excerpt;
  }
  
  // Build optimal meta description
  const parts = [];
  
  // Start with excerpt (first 80 chars)
  if (excerpt) {
    parts.push(excerpt.substring(0, 80));
  } else {
    parts.push(`Lär dig att laga ${category.toLowerCase()} med vårt`);
  }
  
  // Add time if available
  if (totalTimeMinutes > 0) {
    parts.push(`${totalTimeMinutes} min`);
  }
  
  // Add servings if available
  if (servings > 0) {
    parts.push(`${servings} portioner`);
  }
  
  // Add CTA
  parts.push('Prova receptet idag!');
  
  let description = parts.join(' | ');
  
  // Ensure optimal length (150-160 chars)
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  } else if (description.length < 120) {
    description += ' | Steg-för-steg guide med tips och variationer.';
  }
  
  return description;
}
```

### 6. Keyword Density Checker

**File:** `src/lib/seo/keyword-analysis.js` (create new)

```javascript
/**
 * Analyze keyword density and distribution in content
 */
export function analyzeKeywordDensity(content, primaryKeyword) {
  const words = content.toLowerCase().split(/\s+/);
  const keywordLower = primaryKeyword.toLowerCase();
  const keywordWords = keywordLower.split(' ');
  
  // Count exact phrase matches
  const phraseCount = (content.toLowerCase().match(new RegExp(keywordLower, 'g')) || []).length;
  
  // Count individual word matches
  const wordCounts = keywordWords.map(word => {
    return words.filter(w => w === word).length;
  });
  
  const totalWords = words.length;
  const density = (phraseCount / totalWords) * 100;
  
  return {
    phraseMatches: phraseCount,
    density: density.toFixed(2),
    optimal: density >= 1 && density <= 2, // 1-2% is optimal
    first100Words: content.substring(0, 500).toLowerCase().includes(keywordLower),
    last100Words: content.substring(content.length - 500).toLowerCase().includes(keywordLower),
  };
}
```

### 7. Enhanced Internal Linking Component

**File:** `src/components/seo/EnhancedInternalLinks.js` (create new)

```javascript
'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Smart internal linking component with contextual suggestions
 */
export default function EnhancedInternalLinks({ 
  currentRecipe, 
  relatedRecipes,
  categoryLinks,
  contextualSuggestions 
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Fler recept du kanske gillar
        </h2>
        
        {/* Related Recipes */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {relatedRecipes.slice(0, 3).map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/recept/${recipe.slug}`}
              className="block p-4 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold mb-2">{recipe.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {recipe.excerpt}
              </p>
            </Link>
          ))}
        </div>
        
        {/* Category Links */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Utforska kategorier</h3>
          <div className="flex flex-wrap gap-2">
            {categoryLinks.map((category) => (
              <Link
                key={category.slug}
                href={`/kategorier/${category.slug}`}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Contextual Suggestions */}
        {contextualSuggestions.map((suggestion, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{suggestion.title}</h3>
            <div className="flex flex-wrap gap-2">
              {suggestion.links.map((link) => (
                <Link
                  key={link.slug}
                  href={`/recept/${link.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### 8. Content Quality Validator

**File:** `src/lib/seo/content-validator.js` (create new)

```javascript
/**
 * Validate recipe content for SEO best practices
 */
export function validateRecipeContent(recipe) {
  const issues = [];
  const warnings = [];
  
  // Check word count
  const contentLength = recipe.content?.length || 0;
  if (contentLength < 300) {
    issues.push({
      type: 'content_length',
      severity: 'error',
      message: `Content too short: ${contentLength} words. Minimum: 300 words.`,
    });
  } else if (contentLength < 500) {
    warnings.push({
      type: 'content_length',
      severity: 'warning',
      message: `Content could be longer: ${contentLength} words. Optimal: 500-800 words.`,
    });
  }
  
  // Check H2 headings
  const h2Count = (recipe.content?.match(/^##\s+/gm) || []).length;
  if (h2Count < 2) {
    issues.push({
      type: 'headings',
      severity: 'error',
      message: `Not enough H2 headings: ${h2Count}. Minimum: 2 H2 headings.`,
    });
  }
  
  // Check primary keyword in title
  const title = recipe.title || '';
  const primaryKeyword = extractPrimaryKeyword(title);
  if (!title.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    issues.push({
      type: 'title_keyword',
      severity: 'error',
      message: `Primary keyword not in title: ${primaryKeyword}`,
    });
  }
  
  // Check alt text
  if (!recipe.heroImage?.alt || recipe.heroImage.alt.length < 30) {
    issues.push({
      type: 'alt_text',
      severity: 'error',
      message: 'Alt text missing or too short. Minimum: 30 characters.',
    });
  }
  
  // Check meta description length
  const excerpt = recipe.excerpt || '';
  if (excerpt.length < 120 || excerpt.length > 160) {
    warnings.push({
      type: 'meta_description',
      severity: 'warning',
      message: `Meta description length: ${excerpt.length}. Optimal: 150-160 characters.`,
    });
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    warnings,
    score: calculateScore(issues, warnings),
  };
}

function extractPrimaryKeyword(title) {
  // Extract first 2-3 words as primary keyword
  return title.split(' ').slice(0, 3).join(' ').toLowerCase();
}

function calculateScore(issues, warnings) {
  const maxScore = 100;
  const issuePenalty = 10;
  const warningPenalty = 2;
  
  return Math.max(0, maxScore - (issues.length * issuePenalty) - (warnings.length * warningPenalty));
}
```

### 9. Update robots.txt

**File:** `src/app/robots.txt`

```txt
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://bakstunden.se/sitemap.xml
Sitemap: https://bakstunden.se/sitemap-images.xml
Sitemap: https://bakstunden.se/stories-sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow all content pages
Allow: /recept/
Allow: /kategorier/
Allow: /om/
Allow: /stories/
```

### 10. Enhanced Category Page SEO

**File:** `src/app/kategorier/[slug]/page.js`

```javascript
// Enhance generateMetadata function

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Kategori hittades inte',
      description: 'Den begärda kategorin kunde inte hittas.'
    };
  }

  const allRecipes = await getAllContent('recipes');
  const filteredRecipes = allRecipes.filter(r => {
    return r.category === category.name || 
           (r.tags && r.tags.some(tag => 
             category.subcategories && category.subcategories.includes(tag)
           ));
  });

  // Enhanced title with primary keyword first
  const primaryKeyword = `${category.name} recept`;
  const title = `${primaryKeyword} - ${filteredRecipes.length}+ Goda Recept | Bakstunden`;
  
  // Enhanced description
  const description = `${category.description} Hitta de bästa ${category.name.toLowerCase()} recept med steg-för-steg instruktioner. ${filteredRecipes.length}+ testade recept för alla nivåer – enkla, snabba och goda!`;

  return generateSiteMetadata({
    title,
    description,
    url: `/kategorier/${slug}`,
    keywords: `${primaryKeyword}, ${category.name.toLowerCase()}, goda ${category.name.toLowerCase()}, hur man lagar ${category.name.toLowerCase()}, svenska ${category.name.toLowerCase()}, ${category.name.toLowerCase()} tips, enkla ${category.name.toLowerCase()}, snabba ${category.name.toLowerCase()}`,
  });
}
```

---

## Testing & Validation Tools

### 1. Schema Validation
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

### 2. SEO Validation Checklist Script

**File:** `scripts/validate-seo.js` (create new)

```javascript
#!/usr/bin/env node

import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { validateRecipeContent } from '../src/lib/seo/content-validator.js';

async function validateAllRecipes() {
  const recipesDir = join(process.cwd(), 'content', 'recipes');
  const files = await readdir(recipesDir);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));
  
  const results = [];
  
  for (const file of mdxFiles) {
    const filePath = join(recipesDir, file);
    const content = await readFile(filePath, 'utf-8');
    const { data, content: body } = matter(content);
    
    const validation = validateRecipeContent({
      ...data,
      content: body,
    });
    
    results.push({
      file,
      slug: data.slug,
      title: data.title,
      ...validation,
    });
  }
  
  // Report
  const validCount = results.filter(r => r.isValid).length;
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
  
  console.log('\n📊 SEO Validation Report\n');
  console.log(`Total recipes: ${results.length}`);
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Issues: ${totalIssues}`);
  console.log(`⚠️  Warnings: ${totalWarnings}\n`);
  
  // List recipes with issues
  const recipesWithIssues = results.filter(r => r.issues.length > 0);
  if (recipesWithIssues.length > 0) {
    console.log('Recipes with critical issues:\n');
    recipesWithIssues.forEach(r => {
      console.log(`  ❌ ${r.title} (${r.slug})`);
      r.issues.forEach(issue => {
        console.log(`     - ${issue.message}`);
      });
    });
  }
}

validateAllRecipes().catch(console.error);
```

---

## Implementation Priority

1. **Week 1:** Fix alt text, optimize meta descriptions
2. **Week 2:** Add H2 headings, fix keyword cannibalization
3. **Week 3:** Create image sitemap, enhance schemas
4. **Week 4:** Implement content validator, run validation

---

## Monitoring & Reporting

### Track These Metrics:
- Organic traffic (Search Console)
- Keyword rankings (Ahrefs/SEMrush)
- Core Web Vitals (PageSpeed Insights)
- Indexing status (Search Console Coverage)
- Click-through rate (Search Console Performance)

### Monthly Review:
- Run content validator on all recipes
- Check for duplicate content
- Review keyword rankings
- Analyze competitor content
- Update content based on search trends


import { getContentBySlug, getAllContent, getRelatedContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  ChefHat,
  Utensils,
  AlertCircle,
  Archive,
  Wine,
  Lightbulb,
  Flame,
  ArrowRight,
  Timer,
} from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Tag from '@/components/ui/Tag';
import IngredientsList from '@/components/recipe/IngredientsList';
import RecipeSteps from '@/components/recipe/RecipeSteps';
import RecipeCard from '@/components/recipe/RecipeCard';
import JsonLd from '@/components/seo/JsonLd';
import { generateRecipeSchema, generateBreadcrumbSchema } from '@/lib/seo';
import Header from '@/components/layout/Header';

// Generate static params
export async function generateStaticParams() {
  const recipes = await getAllContent('recipes');
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = await getContentBySlug('recipes', slug);

  if (!recipe) return { title: 'Recept hittades inte' };

  const { frontmatter } = recipe;
  const { generateMetadata } = await import('@/lib/seo');

  return generateMetadata({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.heroImage?.src,
    url: `/recept/${slug}`,
    type: 'article',
    publishedTime: frontmatter.publishedAt,
    modifiedTime: frontmatter.updatedAt,
    author: frontmatter.author,
    tags: frontmatter.tags,
    keywords:
      frontmatter.tags?.join(', ') +
      ', recept, bakning, svenska efterrätter, matlagning',
  });
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await getContentBySlug('recipes', slug);

  if (!recipe) notFound();

  const { frontmatter, content } = recipe;
  const relatedRecipes = await getRelatedContent(
    'recipes',
    slug,
    frontmatter.tags,
    frontmatter.category,
    6
  );

  // Schemas
  const recipeSchema = generateRecipeSchema(frontmatter);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Hem', url: '/' },
    { name: 'Recept', url: '/recept' },
    { name: frontmatter.title },
  ]);

  return (
    <>
      {/* JSON-LD SEO */}
      <JsonLd data={recipeSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* HEADER */}
      <Header />

      {/* 🧁 HERO SECTION */}
      {frontmatter.heroImage?.src && (
        <section className="relative w-full h-[70vh] min-h-[600px] max-h-[800px]">
          <Image
            src={frontmatter.heroImage.src}
            alt={frontmatter.heroImage.alt || frontmatter.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent"></div>

          {/* Category Badge - moved to bottom right */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8">
            <Link
              href={`/recept?category=${encodeURIComponent(frontmatter.category)}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-md text-gray-900 rounded-full text-sm font-semibold shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <ChefHat className="w-4 h-4" />
              {frontmatter.category}
            </Link>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <h1
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl"
                style={{ fontFamily: 'var(--font-crimson)', letterSpacing: '-0.01em' }}
              >
                {frontmatter.title}
              </h1>
              {frontmatter.excerpt && (
                <p
                  className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl leading-relaxed drop-shadow-lg"
                  style={{ fontFamily: 'var(--font-lora)' }}
                >
                  {frontmatter.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 🧭 BREADCRUMB SECTION */}
      <section className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Recept', url: '/recept' },
              { name: frontmatter.category, url: `/recept?category=${frontmatter.category}` },
              { name: frontmatter.title },
            ]}
          />
        </div>
      </section>

      {/* 📝 MAIN RECIPE CONTENT */}
      <article className="bg-gray-50 dark:bg-gray-950 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Removed BackButton */}

          {/* Blog intro */}
          {content && (
            <section className="mb-6">
              <div className="mx-auto">
                <div className="flex items-center gap-3 mb-8">
                </div>

                {/* Inline hero image */}
                {frontmatter.heroImage?.src && (
                  <div className="float-right ml-8 mb-6 w-full md:w-1/2 lg:w-2/5">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={frontmatter.heroImage.src}
                        alt={frontmatter.heroImage.alt || frontmatter.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-3 text-center">
                      {frontmatter.heroImage.alt || frontmatter.title}
                    </p>
                  </div>
                )}

                <div className="recipe-blog-content">
                  <MDXRemote source={content} />
                </div>

                <div className="clear-both"></div>
              </div>
            </section>
          )}

          {/* Recipe two-column layout */}
          <section className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 mb-16 lg:items-start">
            {/* Left column - Ingredients */}
            <aside className="space-y-6 recipe-ingredients-sticky">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-slate-400 to-slate-500 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <ChefHat className="w-6 h-6" />
                    Ingredienser
                  </h2>
                </div>
                <div className="p-6">
                  <IngredientsList
                    ingredients={frontmatter.ingredients}
                    defaultServings={frontmatter.servings}
                  />
                </div>
              </div>

              {/* Equipment */}
              {frontmatter.equipment?.length > 0 && (
                <div className="bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      Utrustning
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {frontmatter.equipment.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allergens */}
              {frontmatter.allergens?.length > 0 && (
                <div className="bg-white dark:bg-gray-900 p-6 border border-rose-200 dark:border-rose-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      Allergener
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {frontmatter.allergens.map((a, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full text-sm font-semibold border border-rose-200 dark:border-rose-800"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Right column - Steps and details */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-stone-400 to-stone-500 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Timer className="w-6 h-6" />
                    Så här gör du
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <RecipeSteps steps={frontmatter.steps} />
                </div>
              </div>
            </div>
          </section>

          {/* Related Recipes */}
          {relatedRecipes.length > 0 && (
            <section className="pt-12 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold mb-4">
                  Rekommenderat
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Fler recept du kanske gillar
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedRecipes.map((r, i) => (
                  <RecipeCard key={r.slug} recipe={r} index={i} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}

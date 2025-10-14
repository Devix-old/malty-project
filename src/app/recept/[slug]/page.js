import { getContentBySlug, getAllContent, getRelatedContent } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Clock, Users, ChefHat, Award, Flame, Utensils, AlertCircle, Archive, Wine, Lightbulb, ArrowRight, BookOpen, Timer } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Rating from '@/components/ui/Rating';
import Tag from '@/components/ui/Tag';
import IngredientsList from '@/components/recipe/IngredientsList';
import RecipeSteps from '@/components/recipe/RecipeSteps';
import RecipeCard from '@/components/recipe/RecipeCard';
import RecipeActions from '@/components/recipe/RecipeActions';
import JsonLd from '@/components/seo/JsonLd';
import { generateRecipeSchema, generateBreadcrumbSchema } from '@/lib/seo';

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = await getAllContent('recipes');
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const recipe = await getContentBySlug('recipes', slug);
  
  if (!recipe) {
    return {
      title: 'Recept hittades inte',
    };
  }

  const { frontmatter } = recipe;

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: frontmatter.heroImage?.src ? [{ url: frontmatter.heroImage.src }] : [],
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      tags: frontmatter.tags,
    },
  };
}

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = await getContentBySlug('recipes', slug);

  if (!recipe) {
    notFound();
  }

  const { frontmatter, content } = recipe;

  // Get related recipes
  const relatedRecipes = await getRelatedContent(
    'recipes',
    slug,
    frontmatter.tags,
    frontmatter.category,
    6
  );

  // Generate schemas
  const recipeSchema = generateRecipeSchema(frontmatter);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Hem', url: '/' },
    { name: 'Recept', url: '/recept' },
    { name: frontmatter.title },
  ]);

  const difficultyConfig = {
    'Lätt': {
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      textColor: 'text-emerald-700 dark:text-emerald-300',
    },
    'Medel': {
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      textColor: 'text-amber-700 dark:text-amber-300',
    },
    'Avancerad': {
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      textColor: 'text-rose-700 dark:text-rose-300',
    },
  };

  const difficulty = difficultyConfig[frontmatter.difficulty] || difficultyConfig['Medel'];

  return (
    <>
      {/* JSON-LD Schemas */}
      <JsonLd data={recipeSchema} />
      <JsonLd data={breadcrumbSchema} />

      <article className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Hero Section - Full Width */}
        {frontmatter.heroImage?.src && (
          <div className="relative w-full h-[70vh] min-h-[600px] max-h-[800px]">
            <Image
              src={frontmatter.heroImage.src}
              alt={frontmatter.heroImage.alt || frontmatter.title}
              fill
              className="object-cover"
              priority
            />
            {/* Refined gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8">
              <Link
                href={`/recept?category=${encodeURIComponent(frontmatter.category)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-md text-gray-900 rounded-full text-sm font-semibold shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <ChefHat className="w-4 h-4" />
                {frontmatter.category}
              </Link>
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
              <div className="max-w-7xl mx-auto">
                <h1 
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-2xl"
                  style={{ 
                    fontFamily: 'var(--font-crimson)',
                    letterSpacing: '-0.01em'
                  }}
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
          </div>
        )}

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
          {/* Quick Stats Bar - Floating card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-6">
              {/* Author & Date */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {frontmatter.author.charAt(0)}
                </div>
                <div>
                  <div 
                    className="font-semibold text-gray-900 dark:text-white text-lg"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {frontmatter.author}
                  </div>
                  <time 
                    dateTime={frontmatter.publishedAt}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {new Date(frontmatter.publishedAt).toLocaleDateString('sv-SE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Tid</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{frontmatter.totalTimeMinutes} min</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Portioner</div>
                    <div className="font-semibold text-gray-900 dark:text-white">{frontmatter.servings}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full ${difficulty.iconBg} flex items-center justify-center`}>
                    <Award className={`w-5 h-5 ${difficulty.iconColor}`} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Nivå</div>
                    <div className={`font-semibold ${difficulty.textColor}`}>{frontmatter.difficulty}</div>
                  </div>
                </div>

                {frontmatter.caloriesPerServing && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Kalorier</div>
                      <div className="font-semibold text-gray-900 dark:text-white">{frontmatter.caloriesPerServing}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating */}
              {frontmatter.ratingAverage > 0 && (
                <div className="ml-auto">
                  <Rating 
                    rating={frontmatter.ratingAverage} 
                    count={frontmatter.ratingCount}
                    size="lg"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <RecipeActions title={frontmatter.title} />
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { name: 'Recept', url: '/recept' },
                { name: frontmatter.category, url: `/recept?category=${frontmatter.category}` },
                { name: frontmatter.title },
              ]}
            />
          </div>

          {/* MDX Blog Content - 100% Dynamic from .mdx file */}
          {content && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 mb-8 border border-gray-100 dark:border-gray-800">
              <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 
                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    Om detta recept
                  </h2>
                </div>

                {/* Hero Image Float Right with Text Wrapping */}
                {frontmatter.heroImage?.src && (
                  <div className="float-right ml-8 mb-6 w-full md:w-1/2 lg:w-2/5">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
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

                {/* Pure MDX Content - All from .mdx file */}
                <div className="recipe-blog-content">
                  <MDXRemote source={content} />
                </div>

                {/* Clear float */}
                <div className="clear-both"></div>
              </div>
            </div>
          )}

          {/* Main Recipe Content - Two Column Layout */}
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 mb-12">
            {/* Left Sidebar - Ingredients (Sticky) */}
            <div>
              <div className="lg:sticky lg:top-8 space-y-6">
                {/* Ingredients Card */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
                    <h2 
                      className="text-2xl font-bold text-white flex items-center gap-2"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
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
                {frontmatter.equipment && frontmatter.equipment.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Utensils className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 
                        className="font-bold text-lg text-gray-900 dark:text-white"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
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
                {frontmatter.allergens && frontmatter.allergens.length > 0 && (
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-rose-200 dark:border-rose-900">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      </div>
                      <h3 
                        className="font-bold text-lg text-gray-900 dark:text-white"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        Allergener
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.allergens.map((allergen, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 rounded-full text-sm font-semibold border border-rose-200 dark:border-rose-800"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content - Instructions */}
            <div className="space-y-8">
              {/* Recipe Steps */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Timer className="w-6 h-6" />
                    Så här gör du
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <RecipeSteps steps={frontmatter.steps} />
                </div>
              </div>

              {/* Tips & Substitutions */}
              {(frontmatter.substitutions || frontmatter.notes || frontmatter.winePairing) && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-lg p-8 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Tips & Variationer
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {frontmatter.substitutions && frontmatter.substitutions.length > 0 && (
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                          Substitutioner
                        </h3>
                        <ul className="space-y-3">
                          {frontmatter.substitutions.map((sub, i) => (
                            <li 
                              key={i} 
                              className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                            >
                              <span className="text-amber-600 dark:text-amber-400 font-bold mt-1">→</span>
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {frontmatter.notes && (
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                          Viktigt att veta
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {frontmatter.notes}
                        </p>
                      </div>
                    )}

                    {frontmatter.winePairing && (
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                        <div className="flex items-start gap-3">
                          <Wine className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                              Vinmatchning
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">{frontmatter.winePairing}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Storage Info */}
              {frontmatter.storage && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Archive className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      Förvaring & Hållbarhet
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    {frontmatter.storage}
                  </p>
                </div>
              )}

              {/* Nutrition Information */}
              {frontmatter.nutrition && frontmatter.nutrition.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
                  <h2 
                    className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    <Flame className="w-6 h-6 text-orange-500" />
                    Näringsvärde per portion
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {frontmatter.nutrition.map((item, i) => (
                      <div key={i} className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50">
                        <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-1">
                          {item.value}
                          <span className="text-lg">{item.unit}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {item.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-gray-100 dark:border-gray-800">
              <h3 
                className="text-xl font-bold mb-4 text-gray-900 dark:text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Kategorier & Taggar
              </h3>
              <div className="flex flex-wrap gap-3">
                {frontmatter.tags.map((tag) => (
                  <Tag key={tag} href={`/recept?tag=${encodeURIComponent(tag)}`} size="lg">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Related Recipes Section */}
          {relatedRecipes.length > 0 && (
            <div className="mb-12 pt-12">
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
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Baserat på detta recept har vi valt ut dessa favoriter
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedRecipes.map((relatedRecipe, index) => (
                  <RecipeCard key={relatedRecipe.slug} recipe={relatedRecipe} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mb-12">
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative p-12 md:p-16 text-center">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-4">
                    Nyhetsbrev
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Få nya recept varje vecka
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                    Prenumerera på vårt nyhetsbrev och få de senaste recepten direkt i din inkorg
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        placeholder="Din e-postadress"
                        className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
                        aria-label="E-postadress"
                      />
                      <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                        Prenumerera
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore More Section */}
          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/recept"
                className="group bg-white dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🍳</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  Alla recept
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Utforska hela vår samling av recept
                </p>
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                  <span>Utforska</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/blogg"
                className="group bg-white dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Matguider
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Lär dig tekniker och tips från proffsen
                </p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  <span>Läs mer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/om"
                className="group bg-white dark:bg-gray-900 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-green-300 dark:hover:border-green-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">👋</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  Om Malty
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  Lär känna teamet bakom recepten
                </p>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm">
                  <span>Läs mer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

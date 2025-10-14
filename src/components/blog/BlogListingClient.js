'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar, ArrowRight, Sparkles, BookOpen, TrendingUp, Filter } from 'lucide-react';

export default function BlogListingClient({ articles, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Filter articles by category
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // Get featured article (newest)
  const featuredArticle = articles[0];
  const regularArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF5EE] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#6FCF97] to-[#A8E6CF] rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6"
            >
              <Sparkles className="w-5 h-5 text-[#FF7A7A]" />
              <span className="text-[#FF7A7A] font-semibold">Lär dig nya köksknep</span>
            </motion.div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Upptäck & Lär
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Guider, tips och tekniker från erfarna kockar. Bli bättre i köket varje dag.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 text-gray-600 mr-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrera:</span>
            </div>
            
            {['all', ...categories].map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white shadow-lg scale-105'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'
                }`}
              >
                {category === 'all' ? 'Alla artiklar' : category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="relative z-10 px-4 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-[#FF7A7A]" />
                <h2 className="text-2xl font-bold text-gray-900">Senaste artikeln</h2>
              </div>
              
              <Link href={`/blogg/${featuredArticle.slug}`} className="group block">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Side */}
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                      {featuredArticle.heroImage?.src ? (
                        <Image
                          src={featuredArticle.heroImage.src}
                          alt={featuredArticle.heroImage.alt || featuredArticle.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] flex items-center justify-center">
                          <BookOpen className="w-24 h-24 text-white/50" />
                        </div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Utvalda
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      {featuredArticle.category && (
                        <span className="inline-block px-4 py-1.5 bg-[#6FCF97]/10 text-[#6FCF97] text-sm font-semibold rounded-full mb-4 w-fit">
                          {featuredArticle.category}
                        </span>
                      )}
                      
                      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#FF7A7A] transition-colors leading-tight">
                        {featuredArticle.title}
                      </h3>
                      
                      <p className="text-lg text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(featuredArticle.publishedAt).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredArticle.readingMinutes || 5} min läsning</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-[#FF7A7A] font-semibold group-hover:gap-4 transition-all">
                        <span>Läs hela artikeln</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Articles Grid */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onMouseEnter={() => setHoveredCard(article.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link href={`/blogg/${article.slug}`} className="group block h-full">
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {article.heroImage?.src ? (
                          <Image
                            src={article.heroImage.src}
                            alt={article.heroImage.alt || article.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#6FCF97] to-[#A8E6CF] flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-white/50" />
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        {article.category && (
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-semibold rounded-full shadow-lg">
                              {article.category}
                            </span>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredCard === article.slug ? 1 : 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-[#FF7A7A]/90 to-transparent flex items-end justify-center pb-6"
                        >
                          <span className="text-white font-semibold flex items-center gap-2">
                            Läs mer
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF7A7A] transition-colors line-clamp-2 leading-tight">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                          {article.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{article.readingMinutes || 5} min</span>
                          </div>
                          <span>{new Date(article.publishedAt).toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Inga artiklar hittades</h3>
              <p className="text-gray-600 mb-6">Prova att välja en annan kategori</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Visa alla artiklar
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] rounded-3xl p-12 text-center overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Få nya guider direkt i inkorgen
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Prenumerera på vårt nyhetsbrev och få de bästa tipsen varje vecka
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF7A7A] font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Prenumerera nu
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


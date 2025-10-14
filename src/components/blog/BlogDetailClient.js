'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Clock, Calendar, ArrowLeft, Share2, Facebook, Twitter, 
  Linkedin, Link as LinkIcon, Check, BookOpen, User, 
  TrendingUp, ChevronRight, Sparkles
} from 'lucide-react';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import AuthorCard from '@/components/blog/AuthorCard';
import BlogContent from '@/components/blog/BlogContent';

export default function BlogDetailClient({ frontmatter, content, slug, relatedArticles }) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring animation for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for hero image
  const heroY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Share functionality
  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = frontmatter.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#FFF8F3] via-white to-[#FFF5EE] relative">
      {/* Reading Progress Bar */}
      <ReadingProgress progress={scrollYProgress} />

      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              scale: [0, Math.random() * 0.5 + 0.3, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-2 h-2 bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] rounded-full blur-sm"
          />
        ))}
      </div>

      {/* Back Button */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blogg"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF7A7A] transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Tillbaka till bloggen</span>
          </Link>
        </motion.div>
      </div>

      {/* Hero Section with Parallax */}
      <section className="relative z-10 pt-12 pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            {/* Category Badge */}
            {frontmatter.category && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-[#6FCF97] to-[#A8E6CF] text-white text-sm font-semibold rounded-full shadow-lg">
                  {frontmatter.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF7A7A] via-[#FFA07A] to-[#6FCF97] bg-clip-text text-transparent leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {frontmatter.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              {frontmatter.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{frontmatter.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(frontmatter.publishedAt).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{frontmatter.readingMinutes} min läsning</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image with Parallax */}
          {frontmatter.heroImage?.src && (
            <motion.div
              style={{ y: heroY, opacity: heroOpacity }}
              className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={frontmatter.heroImage.src}
                alt={frontmatter.heroImage.alt || frontmatter.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="relative z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Share & TOC */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Share Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-[#FF7A7A]" />
                    Dela artikeln
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] rounded-xl transition-all"
                    >
                      <Twitter className="w-5 h-5" />
                      <span className="font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] rounded-xl transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] rounded-xl transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="font-medium">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-600">Kopierad!</span>
                        </>
                      ) : (
                        <>
                          <LinkIcon className="w-5 h-5" />
                          <span className="font-medium">Kopiera länk</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Table of Contents */}
                <TableOfContents content={content} />
              </div>
            </div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-9 order-1 lg:order-2"
            >
              <article className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 md:p-12">
                <BlogContent content={content} />

                {/* Tags */}
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Taggar</h3>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full transition-colors cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Author Card */}
              <AuthorCard author={frontmatter.author} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="relative z-10 px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="w-6 h-6 text-[#FF7A7A]" />
                <h2 className="text-3xl font-bold text-gray-900">Relaterade artiklar</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((related, index) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/blogg/${related.slug}`} className="group block h-full">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                        {related.heroImage?.src && (
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={related.heroImage.src}
                              alt={related.heroImage.alt || related.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#FF7A7A] transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {related.excerpt}
                          </p>
                          <div className="flex items-center gap-2 text-[#FF7A7A] text-sm font-medium group-hover:gap-3 transition-all">
                            <span>Läs mer</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-r from-[#FF7A7A] to-[#6FCF97] rounded-3xl p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Gillande du artikeln?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Få fler guider och tips direkt i din inkorg
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF7A7A] font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Prenumerera på nyhetsbrevet
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


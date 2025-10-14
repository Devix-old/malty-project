'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

/**
 * EditorialSplitSection - Premium dual-section layout
 * 
 * HOW TO CUSTOMIZE:
 * - Colors: Modify CSS variables in the className strings
 * - Images: Replace image URLs in the sections array
 * - Copy: Edit title, description, buttonText in sections array
 * - Layout: Adjust grid-cols and padding values
 */

export default function EditorialSplitSection() {
  const sections = [
    {
      id: 'breakfast',
      layout: 'dark-left',
      background: '#2B3040', // --midnight
      textColor: 'white',
      eyebrow: 'RECEPT & TIPS',
      title: 'VAKNA GOTT MED FRUKOST',
      description: null,
      buttonText: 'FRUKOSTTIPS',
      buttonHref: '#',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80',
      imageAlt: 'Top-down breakfast with pancakes, berries, and granola bowl',
      mediaType: 'image',
    },
    {
      id: 'sustainability',
      layout: 'light-left',
      background: '#F2F3ED', // --paper
      textColor: 'dark',
      eyebrow: null,
      title: 'ARBETAR VARJE DAG FÖR EN BÄTTRE FRAMTID',
      description: [
        'Vi tror på hållbar matlagning med säsongens råvaror från lokala producenter.',
        'Varje recept är noggrant utvalt för att minimera matsvinn och maximera smak.',
      ],
      buttonText: 'LÄS MER OM VÅRT HÅLLBARHETSARBETE',
      buttonHref: '#',
      image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80',
      imageAlt: 'Sunrise over a misty field with a silhouette of a farmer',
      mediaType: 'video',
    },
  ];

  return (
    <div className="w-full">
      {sections.map((section, sectionIndex) => (
        <section
          key={section.id}
          aria-labelledby={section.id}
          className="relative"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Desktop: 50/50 Split | Mobile: Stack */}
            <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
              {/* Text Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`
                  flex items-center px-8 py-16 md:px-12 lg:px-16 xl:px-20
                  ${section.layout === 'dark-left' ? 'order-1' : 'order-1 lg:order-2'}
                `}
                style={{ backgroundColor: section.background }}
              >
                <div className="max-w-xl">
                  {/* Eyebrow */}
                  {section.eyebrow && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className={`
                        text-xs uppercase tracking-[0.2em] font-semibold mb-6
                        ${section.textColor === 'white' ? 'text-white/70' : 'text-gray-600'}
                      `}
                      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                    >
                      {section.eyebrow}
                    </motion.p>
                  )}

                  {/* Title */}
                  <motion.h1
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`
                      text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 md:mb-8
                      ${section.textColor === 'white' ? 'text-white' : 'text-gray-900'}
                    `}
                    style={{ 
                      fontFamily: "'Inter', 'Poppins', -apple-system, sans-serif",
                      letterSpacing: '-0.02em',
                      fontWeight: 800
                    }}
                  >
                    {section.title}
                  </motion.h1>

                  {/* Description Paragraphs */}
                  {section.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      className="space-y-4 mb-8"
                    >
                      {section.description.map((para, idx) => (
                        <p
                          key={idx}
                          className={`
                            text-base leading-relaxed
                            ${section.textColor === 'white' ? 'text-white/80' : 'text-gray-600'}
                          `}
                          style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
                        >
                          {para}
                        </p>
                      ))}
                    </motion.div>
                  )}

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <a
                      href={section.buttonHref}
                      className={`
                        inline-block px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-wide
                        transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                        ${section.textColor === 'white' 
                          ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl focus-visible:ring-white' 
                          : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl focus-visible:ring-gray-900'
                        }
                      `}
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem' }}
                    >
                      {section.buttonText}
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Media Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`
                  relative overflow-hidden
                  ${section.layout === 'dark-left' ? 'order-2' : 'order-2 lg:order-1'}
                `}
              >
                {section.mediaType === 'image' ? (
                  // Breakfast Hero Image
                  <div className="relative w-full h-full min-h-[400px] lg:min-h-full">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // Video Thumbnail with Play Button
                  <button
                    role="button"
                    aria-label="Play sustainability video"
                    className="relative w-full h-full min-h-[400px] lg:min-h-full group cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 focus-visible:ring-offset-4 transition-all"
                  >
                    {/* Video Thumbnail */}
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Subtle Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                        <Play 
                          className="w-10 h-10 md:w-12 md:h-12 text-gray-900 ml-1" 
                          fill="currentColor"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    {/* Hover Shadow Overlay */}
                    <div className="absolute inset-0 shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}


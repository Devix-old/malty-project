'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';
import { motion } from 'framer-motion';

export default function CategoryCarousel({ collections }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Add the two new categories with the specified images
  const allCategories = [
    ...collections,
    {
      slug: 'vafflor',
      title: 'Våfflor',
      image: '/images/vafflor-bakgrund-transparent.png'
    },
    {
      slug: 'pannkakor',
      title: 'Pannkakor', 
      image: '/images/pannkakor-bakgrund-transparent.png'
    }
  ];


  return (
    <section className="relative h-[50vh] sm:h-[45vh] lg:h-[40vh] px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24 flex items-center overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        {/* Floating Blobs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-300/40 to-rose-300/40 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-300/30 to-yellow-300/30 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating Animated Dots */}
        {[
          { color: 'from-pink-400 to-rose-400', size: 'w-3 h-3', left: '10%', top: '20%', duration: 15 },
          { color: 'from-purple-400 to-pink-400', size: 'w-4 h-4', left: '25%', top: '40%', duration: 18 },
          { color: 'from-orange-400 to-yellow-400', size: 'w-2.5 h-2.5', left: '45%', top: '15%', duration: 20 },
          { color: 'from-rose-400 to-pink-400', size: 'w-3.5 h-3.5', left: '65%', top: '35%', duration: 22 },
          { color: 'from-pink-400 to-purple-400', size: 'w-3 h-3', left: '80%', top: '25%', duration: 17 },
          { color: 'from-orange-400 to-rose-400', size: 'w-2 h-2', left: '30%', top: '70%', duration: 19 },
          { color: 'from-purple-400 to-orange-400', size: 'w-4 h-4', left: '70%', top: '65%', duration: 21 },
          { color: 'from-pink-400 to-orange-400', size: 'w-2.5 h-2.5', left: '90%', top: '50%', duration: 16 },
        ].map((dot, index) => (
          <motion.div
            key={index}
            className={`absolute ${dot.size} rounded-full bg-gradient-to-br ${dot.color} opacity-40 z-20`}
            style={{
              left: dot.left,
              top: dot.top,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-20, 20, -20],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto w-full z-30">
        {/* Carousel Container */}
        <div className="relative">
          {/* Modern Navigation Arrows - Left */}
          <motion.button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 group"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous categories"
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF7A7A] to-[#FFA07A] blur-xl opacity-0 group-hover:opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Button */}
              <div className="relative rounded-full p-4 transition-all duration-300 cursor-pointer">
                <motion.div
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-[#FF7A7A] transition-colors" />
                </motion.div>
              </div>
            </div>
          </motion.button>
          
          {/* Modern Navigation Arrows - Right */}
          <motion.button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 group"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next categories"
          >
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C8B6FF] to-[#E5D4FF] blur-xl opacity-0 group-hover:opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Button */}
              <div className="relative rounded-full p-4 transition-all duration-300 cursor-pointer">
                <motion.div
                  animate={{ x: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-[#C8B6FF] transition-colors" />
                </motion.div>
              </div>
            </div>
          </motion.button>

          {/* Embla Carousel */}
          <div className="overflow-hidden px-12 sm:px-16" ref={emblaRef}>
            <div className="flex gap-8 sm:gap-10 md:gap-12 lg:gap-16">
              {allCategories.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  className="flex-[0_0_70%] xs:flex-[0_0_50%] sm:flex-[0_0_35%] md:flex-[0_0_28%] lg:flex-[0_0_22%] xl:flex-[0_0_18%] text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/kategorier/${collection.slug}`}
                    className="block group"
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {/* Card - Transparent */}
                      <div className="relative rounded-3xl p-6 transition-all duration-500 overflow-hidden">

                        {/* Category Image */}
                        <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-48 md:h-48 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-orange-100/50 via-pink-100/50 to-purple-100/50 rounded-full p-4 group-hover:from-pink-200/70 group-hover:via-rose-200/70 group-hover:to-orange-200/70 transition-all duration-500">
                          <motion.div
                            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Image
                              src={collection.image}
                              alt={collection.title}
                              width={160}
                              height={160}
                              className="max-w-full max-h-full object-contain drop-shadow-lg"
                            />
                          </motion.div>
                        </div>

                        {/* Category Name */}
                        <h3 
                          className="relative text-base md:text-lg lg:text-xl font-bold text-gray-800 transition-colors duration-300"
                          style={{ 
                            fontFamily: "'Crimson Text', serif",
                          }}
                        >
                          <span className="group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-orange-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                            {collection.title}
                          </span>
                        </h3>

                        {/* Animated underline */}
                        <motion.div
                          className="h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 rounded-full mt-2 mx-auto"
                          initial={{ width: 0 }}
                          whileHover={{ width: '70%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    slidesToScroll: 1
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
    <section className="relative h-[60vh] sm:h-[55vh] lg:h-[50vh] px-12 md:px-16 lg:px-20 xl:px-24 flex items-center">

      <div className="relative max-w-7xl mx-auto w-full z-10">

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
          <div className="overflow-hidden px-16" ref={emblaRef}>
            <div className="flex gap-6 md:gap-8 lg:gap-10">
              {allCategories.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  className="flex-[0_0_45%] sm:flex-[0_0_30%] md:flex-[0_0_22%] lg:flex-[0_0_18%] text-center"
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
                      {/* Card */}
                      <div className="relative rounded-3xl p-6 transition-all duration-500 overflow-hidden">
                        {/* Gradient overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-[#FF7A7A]/10 via-transparent to-[#C8B6FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={false}
                        />

                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />

                        {/* Category Image */}
                        <div className="relative w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                          <motion.div
                            whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Image
                              src={collection.image}
                              alt={collection.title}
                              width={128}
                              height={128}
                              className="max-w-full max-h-full object-contain drop-shadow-lg"
                            />
                          </motion.div>
                        </div>

                        {/* Category Name */}
                        <h3 className="relative text-base md:text-lg font-semibold text-gray-800 group-hover:text-[#FF7A7A] transition-colors duration-300 font-inter">
                          {collection.title}
                        </h3>

                        {/* Animated underline */}
                        <motion.div
                          className="h-1 bg-gradient-to-r from-[#FF7A7A] to-[#C8B6FF] rounded-full mt-2 mx-auto"
                          initial={{ width: 0 }}
                          whileHover={{ width: '60%' }}
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

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^#{2,3}\s+(.+)$/gm;
    const matches = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[0].split('#').length - 1;
      const text = match[1].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      matches.push({ level, text, id });
    }

    setHeadings(matches);
  }, [content]);

  useEffect(() => {
    // Track scroll position and update active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all h2 and h3 elements
    const elements = document.querySelectorAll('.blog-content h2, .blog-content h3');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <List className="w-4 h-4 text-[#FF7A7A]" />
        Innehåll
      </h3>
      <nav>
        <ul className="space-y-2">
          {headings.map((heading, index) => (
            <li key={index}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-sm transition-all duration-200 hover:text-[#FF7A7A] block w-full ${
                  heading.level === 3 ? 'pl-4' : ''
                } ${
                  activeId === heading.id
                    ? 'text-[#FF7A7A] font-semibold'
                    : 'text-gray-600'
                }`}
              >
                <span className="hover:underline">{heading.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}


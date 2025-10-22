'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../ui/SearchBar';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Check if we're on the home page
  const isHomePage = pathname === '/';

  const navigation = [
    { name: 'Hem', href: '/' },
    { name: 'Recept', href: '/recept' },
    { name: 'Kategorier', href: '/kategorier' },
    { name: 'Om Bakstunden', href: '/om' },
  ];

  const handleSearch = (query) => {
    if (query.trim()) {
      router.push(`/recept?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className={`${isHomePage ? 'absolute' : 'relative bg-white shadow-sm'} top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Bakstunden startsida">
            <div className={`text-2xl md:text-3xl font-bold font-playfair ${isHomePage ? 'text-white drop-shadow-lg' : 'text-gray-900'} transition-colors`}>
              Bakstunden
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Huvudnavigering">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${isHomePage ? 'text-white hover:text-[#FFA07A] drop-shadow-lg' : 'text-gray-700 hover:text-[#FF7A7A]'} font-medium transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 ${isHomePage ? 'text-white hover:text-[#FFA07A] hover:bg-white/10' : 'text-gray-700 hover:text-[#FF7A7A] hover:bg-gray-100'} rounded-lg transition-colors`}
              aria-label="Sök"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isHomePage ? 'text-white hover:text-[#FFA07A] hover:bg-white/10' : 'text-gray-700 hover:text-[#FF7A7A] hover:bg-gray-100'} rounded-lg transition-colors`}
              aria-label="Meny"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-4"
            >
              <SearchBar onSearch={handleSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-white/20"
          >
            <nav className="px-4 py-4 space-y-2" aria-label="Mobilnavigering">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


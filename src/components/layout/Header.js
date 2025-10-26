'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Utensils, Clock, Home, Grid3X3 } from 'lucide-react';
import { getAllCategories, getAllMealTypes } from '@/lib/categories';
import EnhancedSearchBar from '@/components/ui/EnhancedSearchBar';

export default function Header({ recipes = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({});
  const pathname = usePathname();

  const allCategories = getAllCategories();
  const allMealTypes = getAllMealTypes();

  const navigationItems = [
    {
      label: 'Hem',
      href: '/',
      icon: Home
    },
    {
      label: 'Kategorier',
      href: '/kategorier',
      icon: Grid3X3
    },
    {
      label: 'Recept',
      href: '/recept',
      icon: Utensils,
      dropdown: allCategories.map(cat => ({
        label: cat.name,
        href: `/kategorier/${cat.slug}`,
        icon: cat.icon,
        description: cat.description
      }))
    },
    {
      label: 'Måltider',
      href: '/maltider',
      icon: Clock,
      dropdown: allMealTypes.map(meal => ({
        label: meal.name,
        href: `/maltider/${meal.key}`,
        icon: meal.icon
      }))
    },
    {
      label: 'Snabbmat',
      href: '/snabbmat',
      icon: Clock
    }
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const toggleMobileDropdown = (itemLabel) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Bakstunden
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {item.label}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          >
                            <span className="text-xl">{dropdownItem.icon}</span>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {dropdownItem.label}
                              </div>
                              {dropdownItem.description && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {dropdownItem.description}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Search */}
            <EnhancedSearchBar recipes={recipes} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <button
                      onClick={() => toggleMobileDropdown(item.label)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium ${
                        isActive(item.href)
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <span className="text-sm">
                        {mobileDropdowns[item.label] ? '−' : '+'}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                        isActive(item.href)
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                  
                  {/* Mobile Dropdown - Only show when clicked */}
                  {item.dropdown && mobileDropdowns[item.label] && (
                    <div className="ml-6 space-y-1">
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-purple-600 dark:text-purple-400 font-semibold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="text-sm">📋</span>
                        <span>Alla {item.label.toLowerCase()}</span>
                      </Link>
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.href}
                          href={dropdownItem.href}
                          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-sm">{dropdownItem.icon}</span>
                          <span>{dropdownItem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
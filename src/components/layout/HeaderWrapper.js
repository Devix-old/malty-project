'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import ModernHeader from './ModernHeader';

export default function HeaderWrapper() {
  const pathname = usePathname();
  
  // No header on home page (included in the unified section)
  if (pathname === '/') {
    return null;
  }
  
  // Use default Header for all other pages
  return <Header />;
}


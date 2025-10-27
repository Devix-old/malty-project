'use client';

import { useEffect, useState } from 'react';

export default function StructuredData({ data }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side after hydration
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      // Remove existing structured data with same data-id
      const dataId = data?.['@type'] || 'generic';
      const existingScripts = document.querySelectorAll(`script[data-id="${dataId}"]`);
      existingScripts.forEach(script => script.remove());

      // Add new structured data
      if (data && typeof data === 'object') {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-id', dataId);
        script.text = JSON.stringify(data, null, 0);
        document.head.appendChild(script);
      }
    } catch (error) {
      console.error('Error adding structured data:', error);
    }
  }, [data, isClient]);

  return null;
}

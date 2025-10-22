'use client';

import { useState, useEffect } from 'react';
import { useAdManager } from './AdManager';

export default function AdToggle() {
  const { adsEnabled, toggleAds } = useAdManager();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show toggle after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
        <div className="flex items-center justify-end">
          <button
            onClick={toggleAds}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              adsEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                adsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

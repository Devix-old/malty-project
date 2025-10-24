'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize consents object if not exists
    if (typeof window !== 'undefined') {
      window.consents = window.consents || {};
      window.dataLayer = window.dataLayer || [];
    }
    
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    
    // Initialize consents and analytics
    if (typeof window !== 'undefined') {
      window.consents = window.consents || {};
      window.consents.analytics = true;
      window.consents.marketing = true;
      
      // Trigger GTM consent update
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_update',
          consent: 'accepted'
        });
      }
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
    
    // Initialize consents with declined state
    if (typeof window !== 'undefined') {
      window.consents = window.consents || {};
      window.consents.analytics = false;
      window.consents.marketing = false;
      
      // Trigger GTM consent update
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_update',
          consent: 'declined'
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-xl"
        >
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Vi använder cookies</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vi använder cookies för att förbättra din upplevelse på vår webbplats. 
                Genom att fortsätta använda webbplatsen godkänner du vår användning av cookies. 
                Läs mer i vår{' '}
                <a href="/integritet" className="underline hover:text-purple-600">
                  integritetspolicy
                </a>
                .
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={handleDecline} variant="ghost" size="sm" className="flex-1 sm:flex-none">
                Avböj
              </Button>
              <Button onClick={handleAccept} variant="primary" size="sm" className="flex-1 sm:flex-none">
                Acceptera
              </Button>
            </div>
            <button
              onClick={handleDecline}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              aria-label="Stäng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


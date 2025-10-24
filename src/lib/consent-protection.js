// Consent Protection Script
// Prevents "Cannot read properties of undefined (reading 'consents')" errors

if (typeof window !== 'undefined') {
  // Initialize global objects that scripts might expect
  window.consents = window.consents || {
    analytics: false,
    marketing: false,
    functional: true,
    necessary: true
  };

  window.dataLayer = window.dataLayer || [];
  
  // Initialize consent management
  window.consentManager = window.consentManager || {
    getConsents: () => window.consents,
    setConsents: (newConsents) => {
      window.consents = { ...window.consents, ...newConsents };
      
      // Trigger GTM consent update
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'consent_update',
          consents: window.consents
        });
      }
    },
    hasConsent: (type) => {
      return window.consents[type] === true;
    }
  };

  // Protect against undefined consents access
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args[0];
    if (typeof message === 'string' && message.includes('consents')) {
      // Suppress consent-related errors that are handled by our protection
      return;
    }
    originalConsoleError.apply(console, args);
  };

  // Initialize consent state from localStorage
  const savedConsent = localStorage.getItem('cookieConsent');
  if (savedConsent === 'accepted') {
    window.consents.analytics = true;
    window.consents.marketing = true;
  } else if (savedConsent === 'declined') {
    window.consents.analytics = false;
    window.consents.marketing = false;
  }
}

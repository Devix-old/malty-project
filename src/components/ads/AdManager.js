'use client';

import { useEffect, useRef, useState } from 'react';

// Ad placement types
export const AD_TYPES = {
  IN_IMAGE: 'inimage',
  IN_PAGE: 'inpage', 
  INTERSTITIAL: 'interstitial',
  STICKY_FOOTER: 'sticky_footer',
  STICKY_LEFT: 'sticky_left'
};

// Ad configuration
const AD_CONFIG = {
  [AD_TYPES.IN_IMAGE]: {
    id: 'hbagency_space_241544',
    component: 'div',
    className: 'ad-in-image',
    lazy: true
  },
  [AD_TYPES.IN_PAGE]: {
    id: 'hbagency_space_241545',
    component: 'div',
    className: 'hb-ad-inpage',
    wrapper: 'hb-ad-inner',
    lazy: true
  },
  [AD_TYPES.INTERSTITIAL]: {
    id: 'hbagency_space_241543',
    component: 'div',
    className: 'ad-interstitial',
    lazy: true
  },
  [AD_TYPES.STICKY_FOOTER]: {
    id: 'hbagency_space_241541',
    component: 'div',
    className: 'ad-sticky-footer',
    wrapper: 'HB_Footer_Close_hbagency_space_241541',
    closeButton: 'HB_CLOSE_hbagency_space_241541',
    outer: 'HB_OUTER_hbagency_space_241541',
    lazy: false
  },
  [AD_TYPES.STICKY_LEFT]: {
    id: 'hbagency_space_241542',
    component: 'div',
    className: 'ad-sticky-left',
    wrapper: 'HB_Footer_Close_hbagency_space_241542',
    closeButton: 'HB_CLOSE_hbagency_space_241542',
    outer: 'HB_OUTER_hbagency_space_241542',
    lazy: false
  }
};

// Ad component for individual placements
export function AdPlacement({ type, className = '', style = {}, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});
  const rootRef = useRef(null);
  const config = AD_CONFIG[type];

  // Debug function to check Prebid status
  const checkPrebidStatus = () => {
    const status = {
      pbjsExists: !!window.pbjs,
      pbjsQue: window.pbjs?.que || [],
      pbjsVersion: window.pbjs?.version || 'unknown',
      adUnits: window.pbjs?.getAdserverTargeting ? window.pbjs.getAdserverTargeting() : {},
      bidResponses: window.pbjs?.getBidResponses ? window.pbjs.getBidResponses() : {},
      timestamp: new Date().toISOString()
    };
    console.log(`[Ads Debug] Prebid Status for ${type}:`, status);
    setDebugInfo(status);
    return status;
  };

  useEffect(() => {
    if (!config) {
      console.error(`[Ads Error] No config found for type: ${type}`);
      return;
    }

    console.log(`[Ads Debug] Initializing ${type} with config:`, config);

    // Check Prebid status immediately
    const prebidStatus = checkPrebidStatus();
    
    // If Prebid is not loaded, wait for it
    if (!prebidStatus.pbjsExists) {
      console.log(`[Ads Debug] Prebid not loaded yet for ${type}, waiting...`);
      
      const waitForPrebid = () => {
        if (window.pbjs) {
          console.log(`[Ads Debug] Prebid loaded for ${type}!`);
          checkPrebidStatus();
        } else {
          setTimeout(waitForPrebid, 1000);
        }
      };
      
      setTimeout(waitForPrebid, 1000);
    }

    // For lazy loading ads
    if (config.lazy) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              console.log(`[Ads Debug] Ad became visible: ${type} (${config.id})`);
              console.log(`[Ads Debug] Prebid status when visible:`, checkPrebidStatus());
              
              setIsVisible(true);
              setIsLoaded(true);

              // Force Prebid refresh after visibility
              setTimeout(() => {
                if (window.pbjs && window.pbjs.refreshBids) {
                  console.log(`[Ads Debug] Attempting to refresh bids for ${config.id}`);
                  try {
                    window.pbjs.refreshBids();
                  } catch (error) {
                    console.error(`[Ads Error] Failed to refresh bids:`, error);
                  }
                }
              }, 100);
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (rootRef.current) {
        console.log(`[Ads Debug] Setting up observer for ${type} (${config.id})`);
        observer.observe(rootRef.current);
      }

      return () => {
        console.log(`[Ads Debug] Cleaning up observer for ${type}`);
        observer.disconnect();
      };
    } else {
      // For non-lazy ads (sticky)
      console.log(`[Ads Debug] Non-lazy ad ${type} - setting visible immediately`);
      setIsVisible(true);
      setIsLoaded(true);
      
      // Check Prebid status for sticky ads too
      setTimeout(() => {
        checkPrebidStatus();
      }, 1000);
    }
  }, [config, isLoaded, type, checkPrebidStatus]);

  // Additional effect to monitor Prebid changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible && isLoaded) {
        checkPrebidStatus();
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [isVisible, isLoaded, checkPrebidStatus]);

  if (!config) return null;

  // Sticky ads (non-lazy) render immediately with provider-specified structure
  if (type === AD_TYPES.STICKY_FOOTER || type === AD_TYPES.STICKY_LEFT) {
    return (
      <div id={config.wrapper} className={`${config.className} ${className}`} style={style} {...props}>
        <div id={config.closeButton}></div>
        <div id={config.outer}>
          <div id={config.id}></div>
        </div>
      </div>
    );
  }

  // In-page ad: always render wrapper; inject ad container when visible
  if (type === AD_TYPES.IN_PAGE) {
    return (
      <div ref={rootRef} className={`hb-ad-inpage ${className}`} style={style} {...props}>
        <div className="hb-ad-inner">
          {isVisible ? <div className={`hbagency_cls ${config.id}`}></div> : null}
        </div>
      </div>
    );
  }

  // Default (e.g., in-image, interstitial): use a neutral wrapper to observe; mount inner on visible
  return (
    <div ref={rootRef} className={`${config.className} ${className}`} style={style} {...props}>
      {isVisible ? <div id={config.id}></div> : null}
    </div>
  );
}

// Ad manager for controlling ad behavior - always enabled
export function AdManager({ children }) {
  const [globalDebugInfo, setGlobalDebugInfo] = useState({});

  useEffect(() => {
    // Global Prebid monitoring
    const checkGlobalPrebid = () => {
      const status = {
        pbjsExists: !!window.pbjs,
        pbjsVersion: window.pbjs?.version || 'unknown',
        pbjsQue: window.pbjs?.que || [],
        adUnits: window.pbjs?.getAdserverTargeting ? window.pbjs.getAdserverTargeting() : {},
        bidResponses: window.pbjs?.getBidResponses ? window.pbjs.getBidResponses() : {},
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };
      
      console.log('[Ads Global Debug] Prebid Status:', status);
      setGlobalDebugInfo(status);
      
      // Check if we have any ad units configured
      if (window.pbjs && window.pbjs.getAdserverTargeting) {
        const targeting = window.pbjs.getAdserverTargeting();
        console.log('[Ads Global Debug] Ad Server Targeting:', targeting);
      }
      
      // Check bid responses
      if (window.pbjs && window.pbjs.getBidResponses) {
        const responses = window.pbjs.getBidResponses();
        console.log('[Ads Global Debug] Bid Responses:', responses);
      }
    };

    // Check immediately
    checkGlobalPrebid();

    // Check every 3 seconds
    const interval = setInterval(checkGlobalPrebid, 3000);

    // Also check when window loads
    const handleLoad = () => {
      setTimeout(checkGlobalPrebid, 1000);
    };
    
    window.addEventListener('load', handleLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="ad-manager">
      {children}
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          position: 'fixed', 
          bottom: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '10px', 
          fontSize: '12px',
          zIndex: 9999,
          maxWidth: '300px'
        }}>
          <div><strong>Prebid Debug:</strong></div>
          <div>pbjs: {globalDebugInfo.pbjsExists ? '✅' : '❌'}</div>
          <div>Version: {globalDebugInfo.pbjsVersion}</div>
          <div>Que: {globalDebugInfo.pbjsQue?.length || 0} items</div>
          <div>Ad Units: {Object.keys(globalDebugInfo.adUnits || {}).length}</div>
          <div>Bid Responses: {Object.keys(globalDebugInfo.bidResponses || {}).length}</div>
        </div>
      )}
    </div>
  );
}


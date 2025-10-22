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
  const rootRef = useRef(null);
  const config = AD_CONFIG[type];

  useEffect(() => {
    if (!config) return;

    // For lazy loading ads
    if (config.lazy) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoaded) {
              // Minimal diagnostics
              try { console.debug && console.debug('[Ads] Visible:', type, config.id); } catch (e) {}
              setIsVisible(true);
              setIsLoaded(true);
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (rootRef.current) {
        try { console.debug && console.debug('[Ads] Observing placeholder for', type, config.id); } catch (e) {}
        observer.observe(rootRef.current);
      }

      return () => observer.disconnect();
    } else {
      // For non-lazy ads (sticky)
      setIsVisible(true);
      setIsLoaded(true);
    }
  }, [config, isLoaded]);

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
  return (
    <div className="ad-manager">
      {children}
    </div>
  );
}


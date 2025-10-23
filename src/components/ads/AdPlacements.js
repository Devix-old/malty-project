'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// In-Page Ad Component for simple ads (241543, 241544, 241545)
export function InPageAd({ adId, adType = 'simple', className = '', style = {} }) {
  useEffect(() => {
    // Wait for HB Agency script to load and refresh the ad
    const loadAd = () => {
      if (window.hbagency && window.hbagency.loadAd) {
        console.log(`[HB Agency] Loading ad: hbagency_space_${adId}`);
        window.hbagency.loadAd(`hbagency_space_${adId}`);
      } else if (window.hbagency && window.hbagency.refresh) {
        console.log(`[HB Agency] Refreshing ad: hbagency_space_${adId}`);
        window.hbagency.refresh(`hbagency_space_${adId}`);
      } else {
        console.log(`[HB Agency] Script not ready, retrying in 1s...`);
        setTimeout(loadAd, 1000);
      }
    };

    // Start loading after component mounts
    const timer = setTimeout(loadAd, 100);
    return () => clearTimeout(timer);
  }, [adId]);

  if (adType === 'inpage_style_2') {
    // For hbagency_space_241545 with wrapper structure
    return (
      <div className={`hb-ad-inpage ${className}`} style={style}>
        <div className="hb-ad-inner">
          <div className={`hbagency_cls hbagency_space_${adId}`}></div>
        </div>
      </div>
    );
  }

  // For simple ads (241543, 241544)
  return (
    <div className={className} style={style}>
      <div id={`hbagency_space_${adId}`}></div>
    </div>
  );
}

// Footer Ad Component using React Portal
export function FooterAd({ adId, className = '', style = {} }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Load the footer ad after portal is rendered
    const loadFooterAd = () => {
      if (window.hbagency && window.hbagency.loadAd) {
        console.log(`[HB Agency] Loading footer ad: hbagency_space_${adId}`);
        window.hbagency.loadAd(`hbagency_space_${adId}`);
      } else if (window.hbagency && window.hbagency.refresh) {
        console.log(`[HB Agency] Refreshing footer ad: hbagency_space_${adId}`);
        window.hbagency.refresh(`hbagency_space_${adId}`);
      } else {
        console.log(`[HB Agency] Footer ad script not ready, retrying in 1s...`);
        setTimeout(loadFooterAd, 1000);
      }
    };

    const timer = setTimeout(loadFooterAd, 200);
    return () => clearTimeout(timer);
  }, [adId, mounted]);

  // Don't render on server-side
  if (!mounted) return null;

  // Footer ad HTML structure
  const footerAdHTML = (
    <div id={`HB_Footer_Close_hbagency_space_${adId}`} className={className} style={style}>
      <div id={`HB_CLOSE_hbagency_space_${adId}`}></div>
      <div id={`HB_OUTER_hbagency_space_${adId}`}>
        <div id={`hbagency_space_${adId}`}></div>
      </div>
    </div>
  );

  // Use React Portal to render directly into document.body
  // This bypasses React's DOM tree and fixes the "can't close" problem
  return createPortal(footerAdHTML, document.body);
}

// Sticky Footer Ad (simplified version for testing)
export function StickyFooterAd({ adId, className = '', style = {} }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadStickyAd = () => {
      if (window.hbagency && window.hbagency.loadAd) {
        console.log(`[HB Agency] Loading sticky ad: hbagency_space_${adId}`);
        window.hbagency.loadAd(`hbagency_space_${adId}`);
      } else if (window.hbagency && window.hbagency.refresh) {
        console.log(`[HB Agency] Refreshing sticky ad: hbagency_space_${adId}`);
        window.hbagency.refresh(`hbagency_space_${adId}`);
      } else {
        console.log(`[HB Agency] Sticky ad script not ready, retrying in 1s...`);
        setTimeout(loadStickyAd, 1000);
      }
    };

    const timer = setTimeout(loadStickyAd, 200);
    return () => clearTimeout(timer);
  }, [adId, mounted]);

  if (!mounted) return null;

  const stickyAdHTML = (
    <div 
      id={`hbagency_space_${adId}`} 
      className={`ad-sticky-footer ${className}`} 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#fff',
        borderTop: '1px solid #ddd',
        ...style
      }}
    ></div>
  );

  return createPortal(stickyAdHTML, document.body);
}
'use client';

import { useEffect } from 'react';

export default function HBScripts() {
  useEffect(() => {
    // HB Agency Manager
    window.hbManager = {
      closeHB: function(spaceId) {
        console.log('[HB Manager] Closing ad:', spaceId);
        const element = document.getElementById(spaceId);
        if (element) {
          element.style.display = 'none';
        }
        const closeElement = document.getElementById('HB_CLOSE_' + spaceId);
        if (closeElement) {
          closeElement.style.display = 'none';
        }
      }
    };
    
    console.log('[HB Manager] HB Agency manager loaded');
  }, []);

  return (
    <>
      {/* Ad Styles */}
      <style jsx global>{`
        /* Fix close button width issue */
        #HB_CLOSE_hbagency_space_241541 {
          width: auto !important;
          max-width: 728px;
          margin: 0 auto;
          position: relative;
          height: 20px;
          z-index: 2147483642;
          cursor: pointer;
        }
        
        #HB_CLOSE_hbagency_space_241541 img {
          width: 20px !important;
          height: 20px !important;
          float: right;
          position: absolute;
          right: 0;
          top: 0;
        }
        
        /* Sticky Footer Ad */
        .ad-sticky-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: #fff;
          border-top: 1px solid #ddd;
        }
        
        /* Sticky Left Banner */
        .ad-sticky-left {
          position: fixed;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 999;
          width: 300px;
          height: 600px;
        }
        
        /* In-page ads */
        .hb-ad-inpage {
          width: 100%;
          min-height: 250px;
          margin: 20px 0;
        }
        
        .hb-ad-inner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}

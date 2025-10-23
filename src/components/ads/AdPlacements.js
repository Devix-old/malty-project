'use client';

import { AdPlacement, AD_TYPES } from './AdManager';

// In-article ad placement (best for recipe content)
export function InArticleAd({ className = '' }) {
  return (
    <div className={`my-8 ${className}`}>
      <AdPlacement 
        type={AD_TYPES.IN_PAGE}
        className="max-w-4xl mx-auto"
        style={{ 
          minHeight: '250px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );
}

// In-image ad placement (for recipe hero images)
export function InImageAd({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <AdPlacement 
        type={AD_TYPES.IN_IMAGE}
        className="absolute inset-0 z-10"
        style={{ 
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    </div>
  );
}

// Recipe content ad (between ingredients and steps)
export function RecipeContentAd({ className = '' }) {
  return (
    <div className={`my-12 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <AdPlacement 
            type={AD_TYPES.IN_PAGE}
            className="w-full"
            style={{ 
              minHeight: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Homepage hero ad
export function HomepageHeroAd({ className = '' }) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <AdPlacement 
          type={AD_TYPES.IN_PAGE}
          className="w-full"
          style={{ 
            minHeight: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>
    </div>
  );
}

// Category page ad
export function CategoryPageAd({ className = '' }) {
  return (
    <div className={`my-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <AdPlacement 
            type={AD_TYPES.IN_PAGE}
            className="w-full"
            style={{ 
              minHeight: '250px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Related recipes ad
export function RelatedRecipesAd({ className = '' }) {
  return (
    <div className={`my-8 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <AdPlacement 
          type={AD_TYPES.IN_PAGE}
          className="w-full"
          style={{ 
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </div>
    </div>
  );
}

// Simple HB Agency Footer Ad - Direct HTML approach
export function HBFooterAd({ adId }) {
  return (
    <div id={`HB_Footer_Close_hbagency_space_${adId}`}>
      <div id={`HB_CLOSE_hbagency_space_${adId}`}></div>
      <div id={`HB_OUTER_hbagency_space_${adId}`}>
        <div id={`hbagency_space_${adId}`}></div>
      </div>
    </div>
  );
}

// Simple HB Agency In-Page Ad - Direct HTML approach  
export function HBInPageAd({ adId, className = '' }) {
  return (
    <div className={`hb-ad-inpage ${className}`}>
      <div className="hb-ad-inner">
        <div className={`hbagency_cls hbagency_space_${adId}`}></div>
      </div>
    </div>
  );
}

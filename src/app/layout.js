import { Inter, Playfair_Display, Lora, Crimson_Text } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import { AdManager, AdPlacement, AD_TYPES } from '@/components/ads/AdManager';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';

// Modern sans-serif for body text (excellent readability)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

// Elegant serif for headings (classic, editorial feel)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

// Sophisticated serif for blog content (warm, inviting)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: 'swap',
});

// Alternative elegant serif for recipe titles
const crimson = Crimson_Text({
  variable: "--font-crimson",
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  ...generateSiteMetadata({
    title: 'Bakstunden – Bästa recept på pannkakor och kladdkaka',
    description: 'Upptäck recept på pannkakor, kladdkaka och chokladbollar. Enkla och goda desserter för alla tillfällen – besök Bakstunden idag!',
    url: '/',
    keywords: 'recept, bakning, dessert, kladdkaka, choklad, våfflor, pannkakor, svenska recept, matlagning, bakning, söta recept',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'),
  title: {
    template: '%s | Bakstunden',
    default: 'Bakstunden – Bästa recept på pannkakor och kladdkaka',
  },
  applicationName: 'Bakstunden',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://bakstunden.se',
    siteName: 'Bakstunden',
    title: 'Bakstunden – Bästa recept på pannkakor och kladdkaka',
    description: 'Upptäck recept på pannkakor, kladdkaka och chokladbollar. Enkla och goda desserter för alla tillfällen – besök Bakstunden idag!',
    images: [
      {
        url: '/bak-stunden.png',
        width: 1200,
        height: 630,
        alt: 'Bakstunden - Sveriges bästa desserter och bakverk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakstunden – Bästa recept på pannkakor och kladdkaka',
    description: 'Upptäck recept på pannkakor, kladdkaka och chokladbollar. Enkla och goda desserter för alla tillfällen – besök Bakstunden idag!',
    images: ['/bak-stunden.png'],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#FF7A7A',
    'theme-color': '#FF7A7A',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" dir="ltr">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B3M9L45');`,
          }}
        />
        {/* Prebid Header Bidding Script */}
        <script src="https://hbagency.it/cdn/prebid_9_52_hb_v2808.js" async></script>
        
        {/* Force Prebid Loading */}
        <script dangerouslySetInnerHTML={{
          __html: `
            console.log('[Ads Debug] Starting Prebid script loading...');
            
            // Check if script is already loaded
            if (window.pbjs) {
              console.log('[Ads Debug] Prebid already loaded!');
            } else {
              console.log('[Ads Debug] Prebid not found, checking script loading...');
              
              // Monitor script loading
              const checkScript = () => {
                const scripts = document.querySelectorAll('script[src*="prebid"]');
                console.log('[Ads Debug] Found Prebid scripts:', scripts.length);
                
                scripts.forEach((script, index) => {
                  console.log('[Ads Debug] Script', index, ':', {
                    src: script.src,
                    loaded: script.readyState || 'unknown',
                    onload: !!script.onload
                  });
                });
                
                if (window.pbjs) {
                  console.log('[Ads Debug] Prebid loaded successfully!', {
                    version: window.pbjs.version,
                    que: window.pbjs.que
                  });
                } else {
                  console.log('[Ads Debug] Prebid still not loaded, retrying...');
                  setTimeout(checkScript, 2000);
                }
              };
              
              // Start checking after 1 second
              setTimeout(checkScript, 1000);
            }
          `
        }} />
        
        {/* Debug Script for Ad Testing */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.addEventListener('load', function() {
              console.log('[Ads Debug] Page loaded, checking Prebid...');
              
              // Check Prebid every 2 seconds for first 30 seconds
              let attempts = 0;
              const maxAttempts = 15;
              
              const checkPrebid = () => {
                attempts++;
                console.log('[Ads Debug] Attempt', attempts, 'of', maxAttempts);
                
                if (window.pbjs) {
                  console.log('[Ads Debug] Prebid found!', {
                    version: window.pbjs.version,
                    que: window.pbjs.que,
                    adUnits: window.pbjs.getAdserverTargeting ? window.pbjs.getAdserverTargeting() : 'not available',
                    bidResponses: window.pbjs.getBidResponses ? window.pbjs.getBidResponses() : 'not available'
                  });
                  
                  // Try to refresh bids
                  if (window.pbjs.refreshBids) {
                    console.log('[Ads Debug] Attempting to refresh bids...');
                    try {
                      window.pbjs.refreshBids();
                    } catch (error) {
                      console.error('[Ads Debug] Error refreshing bids:', error);
                    }
                  }
                  
                  // Check for ad elements
                  const adElements = document.querySelectorAll('[id*="hbagency_space"]');
                  console.log('[Ads Debug] Found ad elements:', adElements.length);
                  adElements.forEach((el, index) => {
                    console.log('[Ads Debug] Ad element', index, ':', {
                      id: el.id,
                      className: el.className,
                      innerHTML: el.innerHTML,
                      parentElement: el.parentElement?.tagName
                    });
                  });
                  
                } else {
                  console.log('[Ads Debug] Prebid not found yet, attempt', attempts);
                  if (attempts < maxAttempts) {
                    setTimeout(checkPrebid, 2000);
                  } else {
                    console.error('[Ads Debug] Prebid not loaded after', maxAttempts, 'attempts');
                  }
                }
              };
              
              // Start checking after 1 second
              setTimeout(checkPrebid, 1000);
            });
          `
        }} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="73a51c1ce7036450" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} ${crimson.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5B3M9L45"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <AdManager>
          <Header />
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg"
          >
            Hoppa till huvudinnehåll
          </a>
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          
          {/* Sticky Footer Ad */}
          
          <AdPlacement type={AD_TYPES.STICKY_FOOTER} />
          
          {/* Sticky Left Banner Ad */}
          <AdPlacement type={AD_TYPES.STICKY_LEFT} />
        </AdManager>
      </body>
    </html>
  );
}

import { Inter, Playfair_Display, Lora, Crimson_Text } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
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
    title: 'Bakstunden - Sveriges bästa desserter och bakverk',
    description: 'Upptäck fantastiska dessertrecept för alla tillfällen. Från klassisk kladdkaka till moderna chokladvåfflor. Bakstunden har alla söta favoriter du behöver för att lyckas med bakning.',
    url: '/',
    keywords: 'recept, bakning, dessert, kladdkaka, choklad, våfflor, pannkakor, svenska recept, matlagning, bakning, söta recept',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'),
  title: {
    template: '%s | Bakstunden',
    default: 'Bakstunden - Sveriges bästa desserter och bakverk',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://bakstunden.se',
    siteName: 'Bakstunden',
    title: 'Bakstunden - Sveriges bästa desserter och bakverk',
    description: 'Upptäck fantastiska dessertrecept för alla tillfällen. Från klassisk kladdkaka till moderna chokladvåfflor.',
    images: [
      {
        url: '/bak-stunden.png',
        width: 1200,
        height: 630,
        alt: 'Bakstunden logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakstunden - Sveriges bästa desserter och bakverk',
    description: 'Upptäck fantastiska dessertrecept för alla tillfällen. Från klassisk kladdkaka till moderna chokladvåfflor.',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5B3M9L45');`,
          }}
        />
        <link rel="icon" href="/favicon-32x32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
      </body>
    </html>
  );
}

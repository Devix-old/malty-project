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
    title: 'Malty - Sveriges bästa desserter och bakverk',
    description: 'Upptäck fantastiska dessertrecept för alla tillfällen. Från klassisk kladdkaka till moderna chokladvåfflor. Malty har alla söta favoriter du behöver för att lyckas med bakning.',
    url: '/',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://malty.se'),
  title: {
    template: '%s | Malty',
    default: 'Malty - Sveriges bästa desserter och bakverk',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} ${crimson.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg"
        >
          Hoppa till huvudinnehåll
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

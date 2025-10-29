import { Inter, Playfair_Display, Lora, Crimson_Text } from "next/font/google";
import "./globals.css";
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import { generateMetadata as generateSiteMetadata } from '@/lib/seo';
import { Analytics } from "@vercel/analytics/next"
// Modern sans-serif for body text (excellent readability)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Elegant serif for headings (classic, editorial feel)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

// Sophisticated serif for blog content (warm, inviting)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

// Alternative elegant serif for recipe titles
const crimson = Crimson_Text({
  variable: "--font-crimson",
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'serif'],
});

export const metadata = {
  ...generateSiteMetadata({
    title: 'Bakstunden – Sveriges bästa matrecept | Matlagning & Bakning för alla tillfällen',
    description: 'Upptäck tusentals enkla, goda recept – från klassiska pannkakor till saftiga kycklingfärsrätter. Snabba vardagsrätter och svenska favoriter för hela familjen!',
    url: '/',
    keywords: 'recept, matrecept, matlagning, svenska recept, bakning, bakningsrecept, vegetariskt, veganskt, glutenfritt, frukost, lunch, middag, dessert, snabbmat, vardagsmat, kokbok, svensk mat, familjerecept, hemlagad mat, kycklingfärs recept, pannkakor recept, kycklinglårfile recept, kladdkaka recept, lasagne recept, scones recept, chokladbollar recept, våfflor recept, kanelbullar recept, köttbullar recept, carbonara recept, korvstroganoff recept, kyckling recept, sockerkaka recept, lax recept, muffins recept, äppelmos recept, äppelpaj recept, pasta recept, vegetariska recept, hälsosam mat, italiensk mat, asiatisk mat, sallader, soppor, steg-för-steg recept, enkla recept, snabba recept, vardagsrecept, helgmat, festmat',
  }),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bakstunden.se'),
  title: {
    default: 'Bakstunden – Sveriges bästa matrecept för alla tillfällen',
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
    title: 'Bakstunden – Sveriges bästa matrecept för alla tillfällen',
    description: 'Upptäck tusentals enkla, goda recept – från klassiska pannkakor till saftiga kycklingfärsrätter. Snabba vardagsrätter och svenska favoriter för hela familjen!',
    images: [
      {
        url: '/bak-stunden.png',
        width: 1200,
        height: 630,
        alt: 'Bakstunden - Sveriges bästa matrecept för alla tillfällen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakstunden – Sveriges bästa matrecept för alla tillfällen',
    description: 'Upptäck tusentals enkla, goda recept – från klassiska pannkakor till saftiga kycklingfärsrätter. Snabba vardagsrätter och svenska favoriter för hela familjen!',
    images: ['/bak-stunden.png'],
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#FF7A7A',
    'theme-color': '#FF7A7A',
  },
};

// Separate viewport export for Next.js 15 best practices
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv" dir="ltr">
      <head>
        <meta name="google-site-verification" content="73a51c1ce7036450" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} ${crimson.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <HeaderWrapper />
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
        <Analytics />
      </body>
    </html>
  );
}

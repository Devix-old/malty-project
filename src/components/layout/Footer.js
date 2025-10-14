import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  const categories = [
    'Vardagsmat',
    'Vegetariskt',
    'Bakning',
    'Desserter',
    'Soppor',
    'Grillmat',
  ];

  const quickLinks = [
    { name: 'Om Malty', href: '/om' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'Integritetspolicy', href: '/integritet' },
    { name: 'Villkor', href: '/villkor' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/malty', icon: Instagram },
    { name: 'YouTube', href: 'https://youtube.com/@malty', icon: Youtube },
    { name: 'Facebook', href: 'https://facebook.com/malty', icon: Facebook },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Malty startsida">
              <Image
                src="/images/malty-logo.png"
                alt="Malty"
                width={160}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Sveriges bästa samling av recept och matlagningsguider. Hitta inspiration för vardagsmiddagar, bakning och festmat.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Populära kategorier</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/kategorier/${category.toLowerCase().replace(/\s/g, '-')}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Snabblänkar</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Nyhetsbrev</h3>
            <p className="text-sm text-gray-400 mb-3">
              Få nya recept direkt i inkorgen varje vecka.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Din e-postadress"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                aria-label="E-postadress för nyhetsbrev"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Prenumerera
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Malty. Alla rättigheter reserverade.
          </p>
          <p className="text-sm text-gray-400">
            Byggd med Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}


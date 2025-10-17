import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export default function Footer() {
  const mainLinks = [
    { name: 'Recept', href: '/recept' },
    { name: 'Kategorier', href: '/kategorier' },
    { name: 'Om Malty', href: '/om' },
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/malty', icon: Instagram },
    { name: 'YouTube', href: 'https://youtube.com/@malty', icon: Youtube },
    { name: 'Facebook', href: 'https://facebook.com/malty', icon: Facebook },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Malty startsida">
              <Image
                src="/images/bakstunden-tarta-dessert-logo.png"
                alt="Malty"
                width={160}
                height={36}
                className="h-9 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Sveriges bästa samling av recept och matlagningsguider.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {mainLinks.map((link) => (
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

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Följ oss</h3>
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
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Malty. Alla rättigheter reserverade.
          </p>
        </div>
      </div>
    </footer>
  );
}


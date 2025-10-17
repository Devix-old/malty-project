'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { User, Instagram, Youtube, Globe } from 'lucide-react';

export default function AuthorCard({ author }) {
  // Author data (can be expanded with a real author database)
  const authorData = {
    'Anna Bergström': {
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      bio: 'Passionerad matlagare med fokus på vegetarisk matlagning och hållbarhet. Älskar att experimentera med säsongens råvaror och dela med sig av kunskaper.',
      social: {
        instagram: 'annakokar',
        youtube: 'annaskok',
      }
    },
    'Erik Lindström': {
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      bio: 'Självlärd kock med passion för svensk husmanskost och moderna interpretationer av klassiker. Driver en populär matblogg sedan 2018.',
      social: {
        instagram: 'eriksmatblogg',
        youtube: 'erikkokar',
      }
    },
    'Maria Svensson': {
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      bio: 'Konditor och bagare med kärleken för desserter och bakverk. Delar med sig av familjerecept och nya favoriter varje vecka.',
      social: {
        instagram: 'mariasbakverk',
      }
    },
  };

  const data = authorData[author] || {
    avatar: null,
    bio: 'Passionerad matentusiast och receptutvecklare.',
    social: {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 bg-gradient-to-br from-white to-[#FFF8F3] rounded-2xl p-8 shadow-lg"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Om författaren</h3>
      
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {data.avatar ? (
            <Image
              src={data.avatar}
              alt={author}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-[#FF7A7A]/20"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF7A7A] to-[#FFA07A] flex items-center justify-center ring-4 ring-[#FF7A7A]/20">
              <User className="w-12 h-12 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="text-2xl font-bold text-gray-900 mb-2">{author}</h4>
          <p className="text-gray-600 leading-relaxed mb-4">{data.bio}</p>

          {/* Social Links */}
          {Object.keys(data.social).length > 0 && (
            <div className="flex items-center gap-3">
              {data.social.instagram && (
                <a
                  href={`https://instagram.com/${data.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {data.social.youtube && (
                <a
                  href={`https://youtube.com/@${data.social.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-red-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {data.social.website && (
                <a
                  href={data.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-110"
                  aria-label="Webbplats"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}


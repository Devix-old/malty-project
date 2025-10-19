import OmClient from '@/components/om/OmClient';

export const metadata = {
  title: 'Om Bakstunden - Vår historia och vision',
  description: 'Lär känna teamet bakom Bakstunden. Vi är passionerade dessertälskare som delar med oss av våra bästa dessertrecept och bakknep för att inspirera dig i köket.',
  keywords: 'om bakstunden, vår historia, dessertrecept, bakning, svenska desserter, team bakstunden',
  openGraph: {
    title: 'Om Bakstunden - Vår historia och vision | Bakstunden',
    description: 'Lär känna teamet bakom Bakstunden. Vi är passionerade dessertälskare som delar med oss av våra bästa dessertrecept och bakknep för att inspirera dig i köket.',
    type: 'website',
  },
};

export default function OmPage() {
  return <OmClient />;
}



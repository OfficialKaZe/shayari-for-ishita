import { useState } from 'react';
import GalaxyBackground from '@/components/galaxy-background';
import QuoteDisplay from '@/components/quote-display';
import ShayariDisplay from '@/components/shayari-display';

export default function Home() {
  const [currentView, setCurrentView] = useState<'quote' | 'shayari'>('quote');

  const showShayari = () => {
    setCurrentView('shayari');
  };

  const backToQuote = () => {
    setCurrentView('quote');
  };

  return (
    <div className="relative">
      <GalaxyBackground />
      
      {currentView === 'quote' ? (
        <QuoteDisplay onShowShayari={showShayari} />
      ) : (
        <ShayariDisplay onBackToQuote={backToQuote} />
      )}
    </div>
  );
}

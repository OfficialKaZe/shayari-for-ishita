import { useState, useEffect } from 'react';
import { quotes } from '@/data/content';

interface QuoteDisplayProps {
  onShowShayari: () => void;
}

export default function QuoteDisplay({ onShowShayari }: QuoteDisplayProps) {
  const [currentQuote, setCurrentQuote] = useState('');

  useEffect(() => {
    // Display a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      {/* Quote Section */}
      <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto mb-12 text-center animate-float">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
          Galaxy of Love
        </h1>
        <div className="text-xl md:text-2xl font-playfair text-soft-gold leading-relaxed">
          {currentQuote}
        </div>
        <div className="mt-8 text-sm text-gray-300 font-inter">
          ✨ Refresh the page for a new message ✨
        </div>
      </div>

      {/* Shayari Button */}
      <button 
        className="glass-card px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-full btn-glow hover:from-purple-500 hover:to-pink-500 transition-all duration-300 mb-8"
        onClick={onShowShayari}
      >
        Read Beautiful Shayaris 💫
      </button>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { shayaris } from '@/data/content';

interface ShayariDisplayProps {
  onBackToQuote: () => void;
}

export default function ShayariDisplay({ onBackToQuote }: ShayariDisplayProps) {
  const [currentShayariIndex, setCurrentShayariIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const displayCurrentShayari = () => {
    if (isTyping) return;
    
    const shayari = shayaris[currentShayariIndex];
    setDisplayedText('');
    setIsTyping(true);
    setShowCursor(true);

    // Split shayari into words
    const words = shayari.split(' ');
    let wordIndex = 0;

    const typeNextWord = () => {
      if (wordIndex < words.length) {
        const currentWord = words[wordIndex];
        
        setTimeout(() => {
          setDisplayedText(prev => {
            // Handle line breaks
            if (currentWord.includes('\n')) {
              const parts = currentWord.split('\n');
              return prev + parts[0] + '\n' + (parts[1] ? parts[1] + ' ' : '');
            } else {
              return prev + currentWord + ' ';
            }
          });
          
          wordIndex++;
          typeNextWord();
        }, 300); // Delay between words
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(typeNextWord, 500); // Initial delay
  };

  useEffect(() => {
    displayCurrentShayari();
  }, [currentShayariIndex]);

  const showNextShayari = () => {
    if (isTyping) return;
    setCurrentShayariIndex((prev) => (prev + 1) % shayaris.length);
  };

  const showPreviousShayari = () => {
    if (isTyping) return;
    setCurrentShayariIndex((prev) => prev === 0 ? shayaris.length - 1 : prev - 1);
  };

  // Format text with line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
      <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Words from the Heart
          </h2>
          <div className="text-sm text-gray-300">
            {currentShayariIndex + 1} of {shayaris.length}
          </div>
        </div>

        {/* Shayari Text Display */}
        <div className="text-center mb-8">
          <div className="font-playfair text-lg md:text-xl text-soft-gold leading-relaxed min-h-[200px] flex items-center justify-center">
            <div className="relative">
              {formatText(displayedText)}
              {showCursor && <span className="typewriter-cursor ml-1"></span>}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="glass-card px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full btn-glow hover:from-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={showPreviousShayari}
            disabled={isTyping}
          >
            ← Previous
          </button>
          
          <button 
            className="glass-card px-6 py-3 text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full btn-glow hover:from-green-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={showNextShayari}
            disabled={isTyping}
          >
            Next →
          </button>
          
          <button 
            className="glass-card px-6 py-3 text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-full btn-glow hover:from-red-500 hover:to-pink-500 transition-all duration-300"
            onClick={onBackToQuote}
          >
            Back to Quote
          </button>
        </div>
      </div>
    </div>
  );
}

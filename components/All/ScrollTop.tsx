import React, { useState, useEffect } from 'react';

const ScrollTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-50 p-2 rounded-full bg-darkgold text-white shadow-lg transition-opacity duration-300 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${visible ? 'opacity-70 hover:opacity-90' : 'opacity-0 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default ScrollTop; 
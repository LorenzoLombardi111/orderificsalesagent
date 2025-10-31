import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 text-white py-16 px-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg animate-fade-in">
          Orderific AI Sales Training
        </h1>
        <p className="text-xl md:text-2xl opacity-95 font-light tracking-wide">
          Master your sales pitch with AI-powered role-play
        </p>
      </div>
    </header>
  );
};


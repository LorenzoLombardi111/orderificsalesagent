import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Orderific AI Sales Training
        </h1>
        <p className="text-xl md:text-2xl opacity-90">
          Master your sales pitch with AI-powered role-play
        </p>
      </div>
    </header>
  );
};


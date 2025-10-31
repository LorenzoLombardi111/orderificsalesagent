import React from 'react';
import { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  return (
    <div className="bg-white rounded-2xl shadow-large p-8 mb-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="border-l-4 border-gradient-to-b from-primary-500 to-secondary-500 pl-6 bg-gradient-to-r from-primary-50/30 to-transparent py-4 pr-4 rounded-r-lg">
        <div className="flex items-center mb-3">
          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
          <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
            {scenario.title}
          </h3>
        </div>
        <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-primary-100">
          <p className="text-lg text-gray-700">
            <span className="font-bold text-primary-600">Target Persona:</span>
            <span className="ml-2 text-gray-800">{scenario.persona}</span>
          </p>
        </div>
        <p className="text-gray-600 leading-relaxed text-base">
          {scenario.context}
        </p>
      </div>
    </div>
  );
};


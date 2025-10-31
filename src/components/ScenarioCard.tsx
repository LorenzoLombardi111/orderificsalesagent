import React from 'react';
import { Scenario } from '../types';

interface ScenarioCardProps {
  scenario: Scenario;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="border-l-4 border-primary-500 pl-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {scenario.title}
        </h3>
        <p className="text-lg text-gray-700 mb-3">
          <span className="font-semibold">Target Persona:</span> {scenario.persona}
        </p>
        <p className="text-gray-600 leading-relaxed">
          {scenario.context}
        </p>
      </div>
    </div>
  );
};


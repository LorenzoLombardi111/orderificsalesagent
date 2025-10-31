import React from 'react';
import { TrainingStatus } from '../types';

interface StatusIndicatorProps {
  status: TrainingStatus;
  duration: number;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, duration }) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusConfig = (status: TrainingStatus) => {
    switch (status) {
      case 'idle':
        return {
          text: 'Ready',
          color: 'bg-gray-500',
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: '⚪',
        };
      case 'active':
        return {
          text: 'Active',
          color: 'bg-green-500',
          textColor: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: '🟢',
        };
      case 'ended':
        return {
          text: 'Session Ended',
          color: 'bg-blue-500',
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          icon: '🔵',
        };
      case 'processing':
        return {
          text: 'Processing Feedback',
          color: 'bg-yellow-500',
          textColor: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: '🟡',
        };
      default:
        return {
          text: 'Unknown',
          color: 'bg-gray-500',
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: '⚪',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={`flex items-center justify-center space-x-6 p-6 rounded-2xl ${config.bgColor} border border-${config.textColor.replace('text-', '')}-200 transition-all duration-300`}>
      <div className="flex items-center space-x-3">
        <div className={`relative w-4 h-4 rounded-full ${config.color} ${status === 'active' ? 'animate-pulse' : ''}`}>
          <div className={`absolute inset-0 rounded-full ${config.color} ${status === 'active' ? 'animate-ping opacity-75' : ''}`}></div>
        </div>
        <span className={`font-bold text-lg ${config.textColor}`}>
          {config.text}
        </span>
      </div>

      {status === 'active' && (
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-soft">
          <span className="text-gray-500 text-sm font-medium">Duration:</span>
          <span className="font-mono text-xl font-bold text-gray-800 tabular-nums">{formatDuration(duration)}</span>
        </div>
      )}
    </div>
  );
};


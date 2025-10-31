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
        };
      case 'active':
        return {
          text: 'Active',
          color: 'bg-green-500',
          textColor: 'text-green-600',
        };
      case 'ended':
        return {
          text: 'Session Ended',
          color: 'bg-blue-500',
          textColor: 'text-blue-600',
        };
      case 'processing':
        return {
          text: 'Processing Feedback',
          color: 'bg-yellow-500',
          textColor: 'text-yellow-600',
        };
      default:
        return {
          text: 'Unknown',
          color: 'bg-gray-500',
          textColor: 'text-gray-600',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
        <span className={`font-semibold ${config.textColor}`}>
          {config.text}
        </span>
      </div>
      
      {status === 'active' && (
        <div className="text-gray-600">
          <span className="font-mono text-lg">{formatDuration(duration)}</span>
        </div>
      )}
    </div>
  );
};


import React from 'react';
import { TrainingSession, User, Scenario } from '../types';
import { ScenarioCard } from './ScenarioCard';
import { StatusIndicator } from './StatusIndicator';

interface TrainingInterfaceProps {
  session: TrainingSession;
  user: User;
  scenario: Scenario;
  onSimulateStart: () => void;
  onSimulateEnd: () => void;
  onStartNewSession: () => void;
  isWebhookLoading: boolean;
  webhookError: string | null;
}

export const TrainingInterface: React.FC<TrainingInterfaceProps> = ({
  session,
  user,
  scenario,
  onSimulateStart,
  onSimulateEnd,
  onStartNewSession,
  isWebhookLoading,
  webhookError,
}) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <ScenarioCard scenario={scenario} />

      {/* ElevenLabs Widget Placeholder */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <div 
          id="elevenlabs-convai"
          className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-gray-50"
        >
          <div className="text-center">
            <div className="text-gray-500 text-lg mb-2">
              ElevenLabs widget will be embedded here
            </div>
            <div className="text-sm text-gray-400">
              This space is ready for the ElevenLabs conversation widget
            </div>
          </div>
        </div>
        
        {/* Simulation Controls - Remove these when ElevenLabs is integrated */}
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={onSimulateStart}
            disabled={session.status === 'active'}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Simulate Call Start
          </button>
          <button
            onClick={onSimulateEnd}
            disabled={session.status !== 'active'}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Simulate Call End
          </button>
        </div>
      </div>

      {/* Status and Timer */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <StatusIndicator status={session.status} duration={session.duration} />
      </div>

      {/* Instructions Panel */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Click the microphone to start your conversation with Maria
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Speak naturally and engage in a realistic sales conversation
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Your session will last 15-20 minutes
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            You'll receive detailed feedback via email when the session ends
          </li>
        </ul>
      </div>

      {/* Success Message */}
      {session.status === 'ended' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="text-green-500 text-2xl mr-3">✅</div>
            <h3 className="text-xl font-bold text-green-800">
              Training Complete!
            </h3>
          </div>
          <p className="text-green-700 mb-4">
            Check your email for detailed feedback on your performance.
          </p>
          <div className="text-green-600 mb-4">
            <strong>Session Duration:</strong> {formatDuration(session.duration)}
          </div>
          {webhookError && (
            <div className="text-yellow-700 text-sm mb-4">
              Note: There was an issue sending your session data, but your training was recorded.
            </div>
          )}
          <button
            onClick={onStartNewSession}
            disabled={isWebhookLoading}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isWebhookLoading ? 'Processing...' : 'Start New Session'}
          </button>
        </div>
      )}
    </div>
  );
};


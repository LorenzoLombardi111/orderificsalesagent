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
      <div className="bg-white rounded-2xl shadow-large p-8 mb-6 border border-gray-100">
        <div
          id="elevenlabs-convai"
          className="border-2 border-dashed border-primary-200 rounded-2xl h-96 flex items-center justify-center bg-gradient-to-br from-primary-50/30 to-secondary-50/30 backdrop-blur-sm transition-all duration-300 hover:border-primary-300"
        >
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-full shadow-medium mb-4">
              <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="text-gray-700 text-lg font-semibold mb-2">
              ElevenLabs Widget Area
            </div>
            <div className="text-sm text-gray-500">
              The conversation widget will be embedded here
            </div>
          </div>
        </div>

        {/* Simulation Controls - Remove these when ElevenLabs is integrated */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={onSimulateStart}
            disabled={session.status === 'active'}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-medium hover:shadow-large"
          >
            Simulate Call Start
          </button>
          <button
            onClick={onSimulateEnd}
            disabled={session.status !== 'active'}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-medium hover:shadow-large"
          >
            Simulate Call End
          </button>
        </div>
      </div>

      {/* Status and Timer */}
      <div className="bg-white rounded-2xl shadow-soft p-6 mb-6 border border-gray-100">
        <StatusIndicator status={session.status} duration={session.duration} />
      </div>

      {/* Instructions Panel */}
      <div className="bg-gradient-to-br from-white to-primary-50/20 rounded-2xl shadow-large p-8 mb-6 border border-primary-100">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-3 rounded-xl mr-4 shadow-medium">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Instructions</h3>
        </div>
        <ul className="space-y-4">
          <li className="flex items-start group">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
              <span className="text-primary-600 font-bold">1</span>
            </div>
            <p className="text-gray-700 pt-1 leading-relaxed">
              Click the microphone to start your conversation with Maria
            </p>
          </li>
          <li className="flex items-start group">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
              <span className="text-primary-600 font-bold">2</span>
            </div>
            <p className="text-gray-700 pt-1 leading-relaxed">
              Speak naturally and engage in a realistic sales conversation
            </p>
          </li>
          <li className="flex items-start group">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
              <span className="text-primary-600 font-bold">3</span>
            </div>
            <p className="text-gray-700 pt-1 leading-relaxed">
              Your session will last 15-20 minutes
            </p>
          </li>
          <li className="flex items-start group">
            <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary-200 transition-colors">
              <span className="text-primary-600 font-bold">4</span>
            </div>
            <p className="text-gray-700 pt-1 leading-relaxed">
              You'll receive detailed feedback via email when the session ends
            </p>
          </li>
        </ul>
      </div>

      {/* Success Message */}
      {session.status === 'ended' && (
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-8 mb-6 shadow-large">
          <div className="flex items-center mb-6">
            <div className="bg-green-500 p-4 rounded-full mr-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-green-800">
              Training Complete!
            </h3>
          </div>
          <p className="text-green-700 mb-6 text-lg leading-relaxed">
            Congratulations! Check your email for detailed feedback on your performance.
          </p>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6 border border-green-200">
            <div className="flex items-center justify-between">
              <span className="text-green-700 font-semibold text-lg">Session Duration:</span>
              <span className="text-green-800 font-bold text-2xl font-mono">{formatDuration(session.duration)}</span>
            </div>
          </div>
          {webhookError && (
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-yellow-700 text-sm">
                  Note: There was an issue sending your session data, but your training was recorded.
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onStartNewSession}
            disabled={isWebhookLoading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-medium hover:shadow-large"
          >
            {isWebhookLoading ? 'Processing...' : 'Start New Session'}
          </button>
        </div>
      )}
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { User, Scenario, WebhookPayload } from './types';
import { useTrainingSession } from './hooks/useTrainingSession';
import { useWebhook } from './hooks/useWebhook';
import { Header } from './components/Header';
import { UserForm } from './components/UserForm';
import { TrainingInterface } from './components/TrainingInterface';

const SCENARIO: Scenario = {
  title: "Restaurant Owner - Software Demo Call",
  persona: "Maria Santos, Owner of Bella Vista Italian Kitchen",
  context: "Maria is looking for a new point-of-sale system to streamline her restaurant operations. She's been struggling with long wait times during peak hours and wants to improve customer experience. She's particularly interested in features that can help with inventory management and staff scheduling."
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { session, startSession, endSession, resetSession, isActive, isEnded } = useTrainingSession();
  const { sendWebhook, isLoading: isWebhookLoading, error: webhookError } = useWebhook();

  // Handle session end and webhook
  useEffect(() => {
    if (isEnded && user && session.conversationId && session.startTime) {
      const endTime = new Date();
      const payload: WebhookPayload = {
        conversationId: session.conversationId,
        userName: user.name,
        userEmail: user.email,
        startTime: session.startTime.toISOString(),
        endTime: endTime.toISOString(),
        durationSeconds: session.duration,
      };

      // Send webhook
      sendWebhook(payload).then((result) => {
        if (result.success) {
          console.log('Webhook sent successfully');
        } else {
          console.error('Webhook failed:', result.error);
        }
        setShowSuccess(true);
      });
    }
  }, [isEnded, user, session, sendWebhook]);

  const handleUserSubmit = (userData: User) => {
    setUser(userData);
    setShowSuccess(false);
  };

  const handleSimulateStart = () => {
    startSession();
  };

  const handleSimulateEnd = () => {
    endSession();
  };

  const handleStartNewSession = () => {
    resetSession();
    setUser(null);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        {!user ? (
          <UserForm onSubmit={handleUserSubmit} />
        ) : (
          <TrainingInterface
            session={session}
            user={user}
            scenario={SCENARIO}
            onSimulateStart={handleSimulateStart}
            onSimulateEnd={handleSimulateEnd}
            onStartNewSession={handleStartNewSession}
            isWebhookLoading={isWebhookLoading}
            webhookError={webhookError}
          />
        )}
      </main>
    </div>
  );
}

export default App;


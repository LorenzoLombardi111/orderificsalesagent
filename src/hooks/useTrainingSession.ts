import { useState, useCallback, useRef, useEffect } from 'react';
import { TrainingSession, TrainingStatus } from '../types';

export const useTrainingSession = () => {
  const [session, setSession] = useState<TrainingSession>({
    status: 'idle',
    conversationId: null,
    startTime: null,
    duration: 0,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSession = useCallback(() => {
    const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = new Date();
    
    setSession({
      status: 'active',
      conversationId,
      startTime,
      duration: 0,
    });

    // Start timer
    intervalRef.current = setInterval(() => {
      setSession(prev => ({
        ...prev,
        duration: Math.floor((Date.now() - prev.startTime!.getTime()) / 1000),
      }));
    }, 1000);
  }, []);

  const endSession = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setSession(prev => ({
      ...prev,
      status: 'ended',
    }));
  }, []);

  const resetSession = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setSession({
      status: 'idle',
      conversationId: null,
      startTime: null,
      duration: 0,
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isActive = session.status === 'active';
  const isEnded = session.status === 'ended';

  return {
    session,
    startSession,
    endSession,
    resetSession,
    isActive,
    isEnded,
  };
};


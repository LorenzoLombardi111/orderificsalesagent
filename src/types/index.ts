export type TrainingStatus = 'idle' | 'active' | 'ended' | 'processing';

export interface User {
  name: string;
  email: string;
}

export interface TrainingSession {
  status: TrainingStatus;
  conversationId: string | null;
  startTime: Date | null;
  duration: number; // in seconds
}

export interface WebhookPayload {
  conversationId: string;
  userName: string;
  userEmail: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  durationSeconds: number;
}

export interface Scenario {
  title: string;
  persona: string;
  context: string;
}


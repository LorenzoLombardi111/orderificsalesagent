# Orderific AI Sales Training Interface

A clean, modern web application for voice-based sales training with AI-powered role-play.

## Features

- **Voice Training Interface**: Ready for ElevenLabs integration
- **Session Management**: Track training sessions with timers and status indicators
- **Webhook Integration**: Send session data to n8n for processing
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean purple/blue gradient theme

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   VITE_N8N_WEBHOOK_URL=https://your-n8n.com/webhook/call-ended
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
  components/
    Header.tsx           # App header with branding
    UserForm.tsx         # User registration form
    TrainingInterface.tsx # Main training UI
    ScenarioCard.tsx     # Scenario display
    StatusIndicator.tsx  # Session status and timer
  hooks/
    useTrainingSession.ts # Session state management
    useWebhook.ts        # Webhook integration
  types/
    index.ts            # TypeScript interfaces
  App.tsx               # Main application component
  main.tsx              # Application entry point
```

## ElevenLabs Integration

The application is ready for ElevenLabs integration. The widget placeholder is located in the `TrainingInterface` component with the ID `elevenlabs-convai`. 

To integrate:
1. Add the ElevenLabs SDK to your project
2. Initialize the widget in the placeholder div
3. Remove the simulation buttons
4. Connect the ElevenLabs callbacks to the session management hooks

## Webhook Integration

The application sends session data to your n8n webhook when a training session ends. The payload includes:

```json
{
  "conversationId": "string",
  "userName": "string", 
  "userEmail": "string",
  "startTime": "ISO string",
  "endTime": "ISO string",
  "durationSeconds": "number"
}
```

## Testing

Use the "Simulate Call Start" and "Simulate Call End" buttons to test the session flow without ElevenLabs integration.


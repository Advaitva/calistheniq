import { useState, useRef, useCallback, useEffect } from 'react';

interface VoiceCoachOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: string;
}

interface VoiceCoachState {
  isEnabled: boolean;
  isSupported: boolean;
  isSpeaking: boolean;
  voices: SpeechSynthesisVoice[];
}

export function useVoiceCoach(options: VoiceCoachOptions = {}) {
  const {
    rate = 1,
    pitch = 1,
    volume = 1,
    voice = ''
  } = options;

  const [state, setState] = useState<VoiceCoachState>({
    isEnabled: true,
    isSupported: 'speechSynthesis' in window,
    isSpeaking: false,
    voices: []
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    if (!state.isSupported) return;

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setState(prev => ({ ...prev, voices: availableVoices }));
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [state.isSupported]);

  const speak = useCallback((text: string, priority: 'high' | 'normal' = 'normal') => {
    if (!state.isSupported || !state.isEnabled) return;

    // Cancel current speech if high priority
    if (priority === 'high' && state.isSpeaking) {
      speechSynthesis.cancel();
    }

    // Don't interrupt if already speaking and normal priority
    if (state.isSpeaking && priority === 'normal') {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Set voice if specified
    if (voice && state.voices.length > 0) {
      const selectedVoice = state.voices.find(v => v.name.includes(voice));
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onstart = () => {
      setState(prev => ({ ...prev, isSpeaking: true }));
    };

    utterance.onend = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    utterance.onerror = () => {
      setState(prev => ({ ...prev, isSpeaking: false }));
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [state.isSupported, state.isEnabled, state.isSpeaking, state.voices, rate, pitch, volume, voice]);

  const stop = useCallback(() => {
    if (!state.isSupported) return;
    speechSynthesis.cancel();
    setState(prev => ({ ...prev, isSpeaking: false }));
  }, [state.isSupported]);

  const toggle = useCallback(() => {
    setState(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
    if (state.isEnabled && state.isSpeaking) {
      stop();
    }
  }, [state.isEnabled, state.isSpeaking, stop]);

  // Workout-specific voice commands
  const workoutCommands = {
    startWorkout: () => speak("Let's begin your workout! Remember to maintain proper form throughout.", 'high'),
    startExercise: (exerciseName: string) => speak(`Starting ${exerciseName}. Focus on your form!`, 'high'),
    countdown: (seconds: number) => {
      if (seconds <= 3 && seconds > 0) {
        speak(seconds.toString(), 'high');
      }
    },
    encouragement: () => {
      const encouragements = [
        "Great form! Keep it up!",
        "You're doing amazing!",
        "Stay strong! Push through!",
        "Perfect execution!",
        "Feel that burn! You've got this!"
      ];
      const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
      speak(randomEncouragement, 'normal');
    },
    formTip: (tip: string) => speak(`Form tip: ${tip}`, 'normal'),
    rest: (duration: number) => speak(`Take a ${duration} second rest. Stay hydrated!`, 'high'),
    nextExercise: (exerciseName: string) => speak(`Next up: ${exerciseName}. Get ready!`, 'high'),
    workoutComplete: () => speak("Excellent work! You've completed your workout. Great job today!", 'high'),
    halfway: () => speak("You're halfway through! Keep pushing!", 'normal')
  };

  return {
    ...state,
    speak,
    stop,
    toggle,
    workoutCommands
  };
}

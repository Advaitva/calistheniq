import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  Home, 
  ThumbsUp, 
  ThumbsDown,
  Timer as TimerIcon,
  Dumbbell,
  ArrowLeft
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useVoiceCoach } from "@/hooks/use-voice-coach";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ExerciseDisplay from "@/components/workout/exercise-display";
import VoiceCoach from "@/components/workout/voice-coach";
import Timer from "@/components/workout/timer";
import WorkoutControls from "@/components/workout/workout-controls";
import type { Workout, WorkoutSession, Exercise } from "@shared/schema";

type WorkoutPhase = 'ready' | 'exercise' | 'rest' | 'complete';

interface WorkoutState {
  currentExerciseIndex: number;
  currentSet: number;
  phase: WorkoutPhase;
  timeRemaining: number;
  isPaused: boolean;
  repsCompleted: number;
  startTime: number;
}

export default function TrainingSession() {
  const { workoutId } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [currentWorkout] = useLocalStorage<Workout | null>('currentWorkout', null);
  const [userProfile] = useLocalStorage('userProfile', null);
  const [workoutSessions, setWorkoutSessions] = useLocalStorage<WorkoutSession[]>('workoutSessions', []);
  
  const [workoutState, setWorkoutState] = useState<WorkoutState>({
    currentExerciseIndex: 0,
    currentSet: 1,
    phase: 'ready',
    timeRemaining: 0,
    isPaused: false,
    repsCompleted: 0,
    startTime: Date.now()
  });
  
  const [lastVoiceMessage, setLastVoiceMessage] = useState<string>('');
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const voiceCoach = useVoiceCoach({
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8
  });

  // Save workout session mutation
  const saveSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await apiRequest('POST', '/api/sessions', sessionData);
      return response.json();
    },
    onSuccess: (session) => {
      setWorkoutSessions(prev => [session, ...prev]);
    }
  });

  const exercises = Array.isArray(currentWorkout?.exercises) ? currentWorkout.exercises as Exercise[] : [];
  const currentExercise = exercises[workoutState.currentExerciseIndex];
  const totalExercises = exercises.length;
  const workoutProgress = ((workoutState.currentExerciseIndex) / totalExercises) * 100;

  // Timer effect
  useEffect(() => {
    if (workoutState.isPaused || workoutState.phase === 'ready' || workoutState.phase === 'complete') {
      return;
    }

    const interval = setInterval(() => {
      setWorkoutState(prev => {
        if (prev.timeRemaining <= 1) {
          // Time's up - handle phase transition
          if (prev.phase === 'exercise') {
            // Move to rest or next exercise
            if (prev.currentSet < (currentExercise?.sets || 1)) {
              return {
                ...prev,
                phase: 'rest',
                timeRemaining: currentExercise?.restTime || 60,
                currentSet: prev.currentSet + 1
              };
            } else {
              // Move to next exercise
              if (prev.currentExerciseIndex < totalExercises - 1) {
                return {
                  ...prev,
                  currentExerciseIndex: prev.currentExerciseIndex + 1,
                  currentSet: 1,
                  phase: 'exercise',
                  timeRemaining: exercises[prev.currentExerciseIndex + 1]?.duration || 45,
                  repsCompleted: 0
                };
              } else {
                // Workout complete
                return { ...prev, phase: 'complete', timeRemaining: 0 };
              }
            }
          } else if (prev.phase === 'rest') {
            return {
              ...prev,
              phase: 'exercise',
              timeRemaining: currentExercise?.duration || 45,
              repsCompleted: 0
            };
          }
        }
        return { ...prev, timeRemaining: Math.max(0, prev.timeRemaining - 1) };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutState.isPaused, workoutState.phase, currentExercise, totalExercises, currentWorkout]);

  // Voice coaching effects
  useEffect(() => {
    if (!voiceCoach.isEnabled) return;

    if (workoutState.phase === 'exercise' && workoutState.timeRemaining === (currentExercise?.duration || 45)) {
      const message = `Starting ${currentExercise?.name}. Focus on your form!`;
      setLastVoiceMessage(message);
      voiceCoach.workoutCommands.startExercise(currentExercise?.name || '');
    } else if (workoutState.phase === 'rest' && workoutState.timeRemaining === (currentExercise?.restTime || 60)) {
      const message = `Great set! Take a ${currentExercise?.restTime || 60} second rest.`;
      setLastVoiceMessage(message);
      voiceCoach.workoutCommands.rest(currentExercise?.restTime || 60);
    } else if (workoutState.timeRemaining <= 3 && workoutState.timeRemaining > 0) {
      voiceCoach.workoutCommands.countdown(workoutState.timeRemaining);
    } else if (workoutState.phase === 'exercise' && workoutState.timeRemaining === Math.floor((currentExercise?.duration || 45) / 2)) {
      const message = "You're halfway through! Keep pushing!";
      setLastVoiceMessage(message);
      voiceCoach.workoutCommands.halfway();
    }
  }, [workoutState.phase, workoutState.timeRemaining, currentExercise, voiceCoach]);

  // Workout completion effect
  useEffect(() => {
    if (workoutState.phase === 'complete') {
      const message = "Excellent work! You've completed your workout!";
      setLastVoiceMessage(message);
      voiceCoach.workoutCommands.workoutComplete();
      
      // Save workout session
      if (currentWorkout && userProfile) {
        const sessionData = {
          userId: (userProfile as any).userId || 'anonymous',
          workoutId: currentWorkout.id,
          duration: Math.floor((Date.now() - workoutState.startTime) / 1000 / 60),
          exercisesCompleted: exercises.map((ex: Exercise) => ({
            name: ex.name,
            sets: ex.sets || 1,
            reps: ex.reps || 0,
            duration: ex.duration || 0
          })),
          feedback: feedback || 'positive'
        };
        
        saveSessionMutation.mutate(sessionData);
      }
    }
  }, [workoutState.phase]);

  const handleStart = () => {
    if (!currentExercise) return;
    
    setWorkoutState(prev => ({
      ...prev,
      phase: 'exercise',
      timeRemaining: currentExercise.duration || 45,
      isPaused: false
    }));
    
    const message = "Let's begin your workout! Remember to maintain proper form.";
    setLastVoiceMessage(message);
    voiceCoach.workoutCommands.startWorkout();
  };

  const handlePause = () => {
    setWorkoutState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const handleSkip = () => {
    if (workoutState.currentExerciseIndex < totalExercises - 1) {
      setWorkoutState(prev => ({
        ...prev,
        currentExerciseIndex: prev.currentExerciseIndex + 1,
        currentSet: 1,
        phase: 'exercise',
        timeRemaining: currentWorkout?.exercises[prev.currentExerciseIndex + 1]?.duration || 45,
        repsCompleted: 0
      }));
    }
  };

  const handleRestart = () => {
    setWorkoutState(prev => ({
      ...prev,
      currentSet: 1,
      phase: 'exercise',
      timeRemaining: currentExercise?.duration || 45,
      repsCompleted: 0
    }));
  };

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    const message = type === 'positive' ? "Great form! Keep it up!" : "Focus on your technique!";
    setLastVoiceMessage(message);
    if (type === 'positive') {
      voiceCoach.workoutCommands.encouragement();
    }
  };

  if (!currentWorkout) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <Card className="glass-morphism border-0 p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">No Workout Found</h2>
            <p className="text-gray-300 mb-6">Please generate a workout first.</p>
            <Button onClick={() => setLocation('/generate')} className="btn-primary">
              Generate Workout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (workoutState.phase === 'complete') {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="glass-morphism border-0 p-8">
              <CardContent>
                <div className="w-24 h-24 bg-gradient-to-br from-calistheniq-emerald to-calistheniq-electric rounded-full flex items-center justify-center mx-auto mb-6">
                  <ThumbsUp className="h-12 w-12 text-white" />
                </div>
                
                <h1 className="text-4xl font-bold gradient-text mb-4">
                  Workout Complete!
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  Amazing work! You've successfully completed your {currentWorkout.name}.
                </p>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-calistheniq-orange">
                      {Math.floor((Date.now() - workoutState.startTime) / 1000 / 60)}
                    </div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-calistheniq-emerald">
                      {totalExercises}
                    </div>
                    <div className="text-sm text-gray-400">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-calistheniq-amber">
                      {Math.floor(currentWorkout.duration * 8)}
                    </div>
                    <div className="text-sm text-gray-400">Est. Calories</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setLocation('/progress')} className="btn-primary">
                    View Progress
                  </Button>
                  <Button onClick={() => setLocation('/generate')} className="btn-glass">
                    New Workout
                  </Button>
                  <Button onClick={() => setLocation('/')} variant="outline" className="btn-glass">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CalisthenIQ</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation('/')}
              variant="ghost"
              className="text-gray-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Workout
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Workout Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold gradient-text mb-2">{currentWorkout.name}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Exercise {workoutState.currentExerciseIndex + 1} of {totalExercises}</span>
              <span>•</span>
              <span>Set {workoutState.currentSet} of {currentExercise?.sets || 1}</span>
            </div>
            <Progress value={workoutProgress} className="w-32 h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Exercise Display */}
          <div className="lg:col-span-2 space-y-6">
            {workoutState.phase === 'ready' ? (
              <Card className="glass-morphism border-0 p-8 text-center">
                <CardContent>
                  <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
                  <p className="text-gray-300 mb-6">
                    Your workout is ready. Press start when you're prepared to begin.
                  </p>
                  <Button onClick={handleStart} className="btn-primary px-8 py-4 text-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Start Workout
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ExerciseDisplay
                exercise={currentExercise!}
                currentSet={workoutState.currentSet}
                totalSets={currentExercise?.sets || 1}
                timeRemaining={workoutState.timeRemaining}
                repsCompleted={workoutState.repsCompleted}
              />
            )}

            {/* Timer */}
            {workoutState.phase !== 'ready' && (
              <Timer
                time={workoutState.timeRemaining}
                phase={workoutState.phase}
                isPaused={workoutState.isPaused}
                exerciseName={currentExercise?.name || ''}
              />
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Voice Coach */}
            <VoiceCoach
              isEnabled={voiceCoach.isEnabled}
              isSpeaking={voiceCoach.isSpeaking}
              isSupported={voiceCoach.isSupported}
              onToggle={voiceCoach.toggle}
              lastMessage={lastVoiceMessage}
            />

            {/* Workout Controls */}
            {workoutState.phase !== 'ready' && (
              <WorkoutControls
                isPaused={workoutState.isPaused}
                canSkip={workoutState.currentExerciseIndex < totalExercises - 1}
                onPause={handlePause}
                onSkip={handleSkip}
                onRestart={handleRestart}
                onHome={() => setLocation('/')}
              />
            )}

            {/* Quick Feedback */}
            {workoutState.phase === 'exercise' && (
              <Card className="glass-morphism border-0">
                <CardContent className="pt-6">
                  <h5 className="font-semibold mb-3 text-center">How's this set?</h5>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => handleFeedback('positive')}
                      className={`p-3 rounded-lg transition-colors ${
                        feedback === 'positive' 
                          ? 'bg-calistheniq-emerald/20 text-calistheniq-emerald' 
                          : 'hover:bg-calistheniq-emerald/20'
                      }`}
                    >
                      <ThumbsUp className="h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => handleFeedback('negative')}
                      className={`p-3 rounded-lg transition-colors ${
                        feedback === 'negative' 
                          ? 'bg-calistheniq-orange/20 text-calistheniq-orange' 
                          : 'hover:bg-calistheniq-orange/20'
                      }`}
                    >
                      <ThumbsDown className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
          </div>
      </div>
    </div>
  );
}

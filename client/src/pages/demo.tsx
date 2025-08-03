import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Timer as TimerIcon,
  Target,
  Mic,
  Home,
  ArrowRight
} from "lucide-react";
import { useVoiceCoach } from "@/hooks/use-voice-coach";

interface DemoExercise {
  name: string;
  duration: number;
  instructions: string[];
  formTips: string[];
}

const demoExercises: DemoExercise[] = [
  {
    name: "Push-ups",
    duration: 30,
    instructions: [
      "Start in plank position with hands shoulder-width apart",
      "Lower your body until chest nearly touches the floor",
      "Push back up to starting position"
    ],
    formTips: [
      "Keep your core tight throughout the movement",
      "Maintain a straight line from head to heels"
    ]
  },
  {
    name: "Bodyweight Squats",
    duration: 30,
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower down as if sitting in a chair",
      "Push through heels to return to standing"
    ],
    formTips: [
      "Keep your chest up and core engaged",
      "Don't let knees cave inward"
    ]
  },
  {
    name: "Plank Hold",
    duration: 20,
    instructions: [
      "Start in push-up position",
      "Hold your body in a straight line",
      "Breathe normally while maintaining position"
    ],
    formTips: [
      "Don't let hips sag or pike up",
      "Keep shoulders directly over elbows"
    ]
  }
];

type DemoPhase = 'intro' | 'exercise' | 'rest' | 'complete';

export default function Demo() {
  const [, setLocation] = useLocation();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>('intro');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const voiceCoach = useVoiceCoach({
    rate: 0.9,
    pitch: 1.0,
    volume: 0.8
  });

  const currentExercise = demoExercises[currentExerciseIndex];
  const totalExercises = demoExercises.length;

  // Timer effect
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          if (phase === 'exercise') {
            if (currentExerciseIndex < totalExercises - 1) {
              // Move to rest
              setPhase('rest');
              return 10; // 10 second rest
            } else {
              // Demo complete
              setPhase('complete');
              setIsActive(false);
              return 0;
            }
          } else if (phase === 'rest') {
            // Move to next exercise
            setCurrentExerciseIndex(prev => prev + 1);
            setPhase('exercise');
            return demoExercises[currentExerciseIndex + 1]?.duration || 30;
          }
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, phase, currentExerciseIndex, totalExercises]);

  // Progress calculation
  useEffect(() => {
    const totalTime = demoExercises.reduce((sum, ex) => sum + ex.duration + 10, 0) - 10; // -10 for last rest
    const completedTime = demoExercises.slice(0, currentExerciseIndex).reduce((sum, ex) => sum + ex.duration + 10, 0);
    const currentExerciseProgress = phase === 'exercise' 
      ? (currentExercise.duration - timeRemaining) 
      : phase === 'rest' 
      ? currentExercise.duration + (10 - timeRemaining)
      : currentExercise.duration + 10;
    
    setProgress(((completedTime + currentExerciseProgress) / totalTime) * 100);
  }, [currentExerciseIndex, timeRemaining, phase, currentExercise]);

  // Voice coaching
  useEffect(() => {
    if (!voiceCoach.isEnabled || !isActive) return;

    if (phase === 'exercise' && timeRemaining === currentExercise.duration) {
      voiceCoach.speak(`Starting ${currentExercise.name}. Focus on your form!`, 'high');
    } else if (phase === 'rest' && timeRemaining === 10) {
      voiceCoach.speak("Great work! Take a short rest.", 'high');
    } else if (timeRemaining <= 3 && timeRemaining > 0) {
      voiceCoach.speak(timeRemaining.toString(), 'high');
    } else if (phase === 'exercise' && timeRemaining === Math.floor(currentExercise.duration / 2)) {
      voiceCoach.speak("Halfway through! Keep it up!", 'normal');
    }
  }, [phase, timeRemaining, currentExercise, voiceCoach, isActive]);

  const startDemo = () => {
    setPhase('exercise');
    setTimeRemaining(currentExercise.duration);
    setIsActive(true);
    setCurrentExerciseIndex(0);
    setProgress(0);
    voiceCoach.speak("Welcome to your demo workout! Let's begin with push-ups.", 'high');
  };

  const toggleDemo = () => {
    setIsActive(!isActive);
  };

  const resetDemo = () => {
    setPhase('intro');
    setTimeRemaining(0);
    setIsActive(false);
    setCurrentExerciseIndex(0);
    setProgress(0);
    voiceCoach.stop();
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Demo</span> Workout
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the full CalisthenIQ training system with AI voice coaching, 
            real-time guidance, and interactive feedback in this 2-minute demo.
          </p>
        </motion.div>

        {phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass-morphism border-0 text-center p-8">
              <CardContent>
                <div className="mb-8">
                  <img 
                    src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                    alt="Athlete performing calisthenics exercises" 
                    className="rounded-xl mx-auto shadow-2xl w-full max-w-2xl"
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">5-Minute Demo Workout</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Experience a complete workout with AI voice guidance, real-time form tips, 
                  and adaptive difficulty. This demo includes 3 fundamental exercises.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                  <div className="bg-calistheniq-charcoal/50 p-4 rounded-lg">
                    <Mic className="text-calistheniq-orange text-2xl mb-2 mx-auto" />
                    <h4 className="font-semibold mb-1">Voice Coaching</h4>
                    <p className="text-sm text-gray-400">Real-time audio cues and motivation</p>
                  </div>
                  <div className="bg-calistheniq-charcoal/50 p-4 rounded-lg">
                    <Target className="text-calistheniq-electric text-2xl mb-2 mx-auto" />
                    <h4 className="font-semibold mb-1">Form Guidance</h4>
                    <p className="text-sm text-gray-400">Exercise demonstrations and tips</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button onClick={startDemo} className="btn-primary px-8 py-4 text-lg">
                    <Play className="mr-2 h-5 w-5" />
                    Start Demo Workout
                  </Button>
                  
                  <div className="text-sm text-gray-500">
                    <Volume2 className="inline mr-2 h-4 w-4" />
                    Enable sound for the full voice coaching experience
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {(phase === 'exercise' || phase === 'rest') && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Exercise Display */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-morphism border-0">
                <CardContent className="pt-6">
                  {/* Exercise Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">
                        {phase === 'exercise' ? currentExercise.name : 'Rest Time'}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-calistheniq-emerald rounded-full animate-pulse" />
                        <span className="text-sm text-calistheniq-emerald font-medium">DEMO ACTIVE</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Exercise</div>
                      <div className="font-semibold text-calistheniq-orange">
                        {currentExerciseIndex + 1} of {totalExercises}
                      </div>
                    </div>
                  </div>

                  {/* Exercise Visualization */}
                  <div className="relative mb-6 bg-calistheniq-charcoal rounded-lg p-8 text-center">
                    <AnimatePresence mode="wait">
                      {phase === 'exercise' ? (
                        <motion.div
                          key="exercise"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <div className="w-32 h-32 bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Target className="h-16 w-16 text-white" />
                          </div>
                          <h4 className="text-xl font-semibold mb-2">{currentExercise.name}</h4>
                          <p className="text-gray-300">Follow the instructions below</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="rest"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <div className="w-32 h-32 bg-gradient-to-br from-calistheniq-electric to-calistheniq-emerald rounded-full flex items-center justify-center mx-auto mb-4">
                            <TimerIcon className="h-16 w-16 text-white" />
                          </div>
                          <h4 className="text-xl font-semibold mb-2">Rest & Hydrate</h4>
                          <p className="text-gray-300">Prepare for the next exercise</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Demo Progress</span>
                      <span className="text-sm text-calistheniq-orange">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>

                  {/* Instructions */}
                  {phase === 'exercise' && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-calistheniq-orange">Instructions</h4>
                      <ul className="space-y-2">
                        {currentExercise.instructions.map((instruction, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-sm text-gray-300 flex items-start"
                          >
                            <span className="w-5 h-5 bg-calistheniq-orange/20 rounded-full flex items-center justify-center mr-2 mt-0.5 text-xs">
                              {index + 1}
                            </span>
                            {instruction}
                          </motion.li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h4 className="font-semibold text-calistheniq-emerald mb-2">Form Tips</h4>
                        <ul className="space-y-1">
                          {currentExercise.formTips.map((tip, index) => (
                            <li key={index} className="text-sm text-gray-400 flex items-start">
                              <span className="text-calistheniq-emerald mr-2">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Timer Display */}
              <Card className="glass-morphism border-0 text-center p-6">
                <div className="text-6xl font-mono font-bold gradient-text mb-2">
                  {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:
                  {String(timeRemaining % 60).padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-400">
                  {phase === 'exercise' ? 'Exercise Time' : 'Rest Time'}
                </div>
              </Card>
            </div>

            {/* Control Panel */}
            <div className="space-y-6">
              {/* Voice Coach */}
              <Card className="glass-morphism border-0">
                <CardContent className="pt-6 text-center">
                  <motion.div
                    animate={voiceCoach.isSpeaking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6, repeat: voiceCoach.isSpeaking ? Infinity : 0 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      voiceCoach.isEnabled && voiceCoach.isSpeaking
                        ? 'bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber animate-pulse-glow'
                        : voiceCoach.isEnabled
                        ? 'bg-gradient-to-br from-calistheniq-electric to-calistheniq-emerald'
                        : 'bg-gray-600'
                    }`}
                  >
                    {voiceCoach.isEnabled ? (
                      <Mic className="h-8 w-8 text-white" />
                    ) : (
                      <VolumeX className="h-8 w-8 text-gray-400" />
                    )}
                  </motion.div>
                  
                  <h4 className="font-semibold mb-2">
                    {voiceCoach.isEnabled ? 'AI Coach Active' : 'Voice Coach Muted'}
                  </h4>
                  
                  <p className="text-sm text-gray-300 mb-4 italic">
                    "Experience real-time coaching!"
                  </p>
                  
                  <Button
                    onClick={voiceCoach.toggle}
                    className="w-full bg-calistheniq-charcoal/50 hover:bg-calistheniq-charcoal/70 transition-colors"
                  >
                    {voiceCoach.isEnabled ? (
                      <>
                        <Volume2 className="mr-2 h-4 w-4" />
                        Mute Voice
                      </>
                    ) : (
                      <>
                        <VolumeX className="mr-2 h-4 w-4" />
                        Enable Voice
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Demo Controls */}
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="text-center">Demo Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={toggleDemo}
                    className="w-full btn-primary"
                  >
                    {isActive ? (
                      <>
                        <Pause className="mr-2 h-4 w-4" />
                        Pause Demo
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Resume Demo
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={resetDemo}
                    className="w-full btn-glass"
                  >
                    Reset Demo
                  </Button>
                  
                  <Button
                    onClick={() => setLocation('/')}
                    variant="outline"
                    className="w-full btn-glass"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card className="glass-morphism border-0 p-8">
              <CardContent>
                <div className="w-24 h-24 bg-gradient-to-br from-calistheniq-emerald to-calistheniq-electric rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-12 w-12 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold gradient-text mb-4">
                  Demo Complete!
                </h2>
                
                <p className="text-xl text-gray-300 mb-8">
                  You've experienced the CalisthenIQ training system! Ready to start your real fitness journey?
                </p>
                
                <div className="grid grid-cols-3 gap-6 mb-8 max-w-lg mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-calistheniq-orange">3</div>
                    <div className="text-sm text-gray-400">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-calistheniq-emerald">2</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-calistheniq-amber">100%</div>
                    <div className="text-sm text-gray-400">Complete</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => setLocation('/onboarding')} 
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={resetDemo} className="btn-glass">
                      Try Demo Again
                    </Button>
                    <Button onClick={() => setLocation('/')} variant="outline" className="btn-glass">
                      <Home className="mr-2 h-4 w-4" />
                      Back to Home
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

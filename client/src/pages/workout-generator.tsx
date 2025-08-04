import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Zap, Clock, Target, Play, ArrowLeft, Loader2, Dumbbell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { apiRequest } from "@/lib/queryClient";
import type { UserProfile, Workout, GenerateWorkoutRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function WorkoutGenerator() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [userProfile] = useLocalStorage<UserProfile | null>('userProfile', null);
  const [, setCurrentWorkout] = useLocalStorage<Workout | null>('currentWorkout', null);
  
  const [workoutType, setWorkoutType] = useState<string>('mixed');
  const [duration, setDuration] = useState<number[]>([userProfile?.dailyTimeAvailable || 30]);
  const [isWeekend, setIsWeekend] = useState(false);

  const generateWorkoutMutation = useMutation({
    mutationFn: async (request: GenerateWorkoutRequest) => {
      const response = await apiRequest('POST', '/api/workouts/generate', request);
      return response.json();
    },
    onSuccess: (workout: Workout) => {
      setCurrentWorkout(workout);
      setLocation(`/training/${workout.id}`);
      toast({
        title: "Workout Generated!",
        description: "Your personalized workout is ready. Let's get started!",
      });
    },
    onError: (error) => {
      console.error('Error generating workout:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate workout. Please try again.",
        variant: "destructive",
      });
    }
  });

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please complete your profile first.</p>
          <Button onClick={() => setLocation('/onboarding')} className="bg-blue-500 hover:bg-blue-600 text-white">
            Go to Onboarding
          </Button>
        </div>
      </div>
    );
  }

  const handleGenerateWorkout = () => {
    const request: GenerateWorkoutRequest = {
      userProfile,
      workoutType: workoutType as 'strength' | 'endurance' | 'flexibility' | 'mixed',
      duration: duration[0],
      isWeekend
    };
    
    generateWorkoutMutation.mutate(request);
  };

  const workoutTypeOptions = [
    { value: 'mixed', label: 'Mixed Training', description: 'Balanced combination of strength and endurance' },
    { value: 'strength', label: 'Strength Focus', description: 'Build muscle and power with resistance exercises' },
    { value: 'endurance', label: 'Endurance Focus', description: 'Improve cardiovascular fitness and stamina' },
    { value: 'flexibility', label: 'Flexibility & Mobility', description: 'Enhance range of motion and recovery' }
  ];

  const selectedWorkoutType = workoutTypeOptions.find(option => option.value === workoutType);

  return (
    <div className="min-h-screen charcoal-bg text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">CalisthenIQ</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              onClick={() => setLocation('/')}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Generate Your <span className="gradient-text">Perfect Workout</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Customize your training session based on your goals, available time, and current energy level.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workout Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5 text-calistheniq-orange" />
                    Your Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="font-semibold text-calistheniq-orange">{userProfile.name}</div>
                      <div className="text-sm text-gray-400">Athlete</div>
                    </div>
                    <div>
                      <div className="font-semibold text-calistheniq-emerald">{userProfile.fitnessLevel}</div>
                      <div className="text-sm text-gray-400">Level</div>
                    </div>
                    <div>
                      <div className="font-semibold text-calistheniq-amber">{Array.isArray(userProfile.goals) ? userProfile.goals.length : 0}</div>
                      <div className="text-sm text-gray-400">Goals</div>
                    </div>
                    <div>
                      <div className="font-semibold text-calistheniq-electric">{userProfile.dailyTimeAvailable}min</div>
                      <div className="text-sm text-gray-400">Daily Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Workout Type Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-calistheniq-orange" />
                    Workout Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={workoutType} onValueChange={setWorkoutType}>
                    <SelectTrigger className="bg-calistheniq-charcoal/50 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {workoutTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedWorkoutType && (
                    <p className="text-sm text-gray-400">
                      {selectedWorkoutType.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Duration and Settings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-calistheniq-orange" />
                    Duration & Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Duration Slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Workout Duration</Label>
                      <span className="text-lg font-semibold text-calistheniq-orange">
                        {duration[0]} minutes
                      </span>
                    </div>
                    <Slider
                      value={duration}
                      onValueChange={setDuration}
                      max={90}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>10 min</span>
                      <span>Quick</span>
                      <span>Standard</span>
                      <span>Intense</span>
                      <span>90 min</span>
                    </div>
                  </div>

                  {/* Weekend Mode */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekend-mode">Weekend Mode</Label>
                      <p className="text-sm text-gray-400">
                        Focus on skills and mobility exercises
                      </p>
                    </div>
                    <Switch
                      id="weekend-mode"
                      checked={isWeekend}
                      onCheckedChange={setIsWeekend}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Generation Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Workout Preview */}
            <Card className="glass-morphism border-0">
              <CardHeader>
                <CardTitle className="text-center">Workout Preview</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-2xl font-bold gradient-text">
                    {selectedWorkoutType?.label}
                  </div>
                  <div className="text-lg text-gray-300">
                    {duration[0]} minutes
                  </div>
                  <div className="text-sm text-gray-400">
                    {isWeekend ? 'Weekend Recovery' : 'High Intensity'}
                  </div>
                </div>

                {/* Estimated Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-calistheniq-emerald">
                      {Math.floor(duration[0] / 3)}
                    </div>
                    <div className="text-xs text-gray-400">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-calistheniq-amber">
                      {Math.floor(duration[0] * 8)}
                    </div>
                    <div className="text-xs text-gray-400">Est. Calories</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateWorkout}
              disabled={generateWorkoutMutation.isPending}
              className="w-full btn-primary py-4 text-lg"
            >
              {generateWorkoutMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Generate Workout
                </>
              )}
            </Button>

            {/* Back Button */}
            <Button
              onClick={() => setLocation('/onboarding')}
              variant="outline"
              className="w-full btn-glass"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Profile
            </Button>
          </motion.div>
        </div>
        </div>
      </div>
    </div>
  );
}

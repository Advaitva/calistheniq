import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Target, Clock, Dumbbell, CheckCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { UserProfile } from "@shared/schema";

type OnboardingStep = 1 | 2 | 3;

interface OnboardingData {
  name: string;
  fitnessLevel: string;
  height: string;
  weight: string;
  goals: string[];
  dailyTimeAvailable: string;
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [, setUserProfile] = useLocalStorage<UserProfile | null>('userProfile', null);
  
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    fitnessLevel: '',
    height: '',
    weight: '',
    goals: [],
    dailyTimeAvailable: ''
  });

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "Body Metrics", icon: Target },
    { number: 3, title: "Time Available", icon: Clock }
  ];

  const fitnessLevels = [
    { value: "beginner", label: "Beginner - New to calisthenics" },
    { value: "intermediate", label: "Intermediate - Some experience" },
    { value: "advanced", label: "Advanced - Experienced athlete" }
  ];

  const goalOptions = [
    { id: "strength", label: "Build Strength" },
    { id: "endurance", label: "Improve Endurance" },
    { id: "flexibility", label: "Increase Flexibility" },
    { id: "weight_loss", label: "Weight Loss" },
    { id: "muscle_gain", label: "Muscle Gain" }
  ];

  const timeOptions = [
    { value: "15", label: "15 minutes" },
    { value: "20", label: "20 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "60 minutes" }
  ];

  const handleGoalToggle = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.fitnessLevel !== '';
      case 2:
        return formData.height !== '' && formData.weight !== '' && formData.goals.length > 0;
      case 3:
        return formData.dailyTimeAvailable !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
    } else {
      // Complete onboarding
      const profile: UserProfile = {
        id: 'anonymous',
        userId: 'anonymous',
        name: formData.name,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        fitnessLevel: formData.fitnessLevel as 'beginner' | 'intermediate' | 'advanced',
        goals: formData.goals,
        dailyTimeAvailable: parseInt(formData.dailyTimeAvailable)
      };
      
      setUserProfile(profile);
      setLocation('/generate');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as OnboardingStep);
    } else {
      setLocation('/');
    }
  };

  return (
    <div className="min-h-screen charcoal-bg">
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
              onClick={handleBack}
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isActive ? 'bg-blue-500 text-white shadow-lg scale-110' :
                        isCompleted ? 'bg-green-500 text-white' :
                        'bg-gray-200 text-gray-400'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                      </div>
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' :
                        isCompleted ? 'text-green-600' :
                        'text-gray-400'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-0.5 mx-6 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {currentStep === 1 && "Let's get to know you"}
                {currentStep === 2 && "Tell us about your goals"}
                {currentStep === 3 && "How much time do you have?"}
              </h1>
              <p className="text-gray-600">
                {currentStep === 1 && "Just a few basics to personalize your experience"}
                {currentStep === 2 && "We'll tailor workouts to your specific needs"}
                {currentStep === 3 && "We'll create workouts that fit your schedule"}
              </p>
            </div>
          </div>

          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="charcoal-card rounded-2xl p-8 md:p-12">
              {/* Step 1: Your Profile */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Profile</h2>
                    <p className="text-gray-600">What should we call you and what's your fitness level?</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                        What's your name?
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-input"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-4 block">
                        What's your fitness level?
                      </Label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: "beginner", label: "Novice", description: "New to calisthenics", color: "green" },
                          { value: "intermediate", label: "Proficient", description: "Some experience with bodyweight training", color: "blue" },
                          { value: "advanced", label: "Master", description: "Advanced calisthenics athlete", color: "purple" }
                        ].map((level) => (
                          <button
                            key={level.value}
                            onClick={() => setFormData({...formData, fitnessLevel: level.value})}
                            className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                              formData.fitnessLevel === level.value
                                ? `border-${level.color}-500 bg-${level.color}-50`
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-gray-900">{level.label}</div>
                                <div className="text-sm text-gray-600">{level.description}</div>
                              </div>
                              {formData.fitnessLevel === level.value && (
                                <CheckCircle className={`w-5 h-5 text-${level.color}-500`} />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Your Objectives */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Objectives</h2>
                    <p className="text-gray-600">Tell us your body metrics and fitness goals</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="height" className="text-sm font-medium text-gray-700 mb-2 block">
                          Height (cm)
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="175"
                          value={formData.height}
                          onChange={(e) => setFormData({...formData, height: e.target.value})}
                          className="h-12 text-lg border-gray-200 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight" className="text-sm font-medium text-gray-700 mb-2 block">
                          Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="70"
                          value={formData.weight}
                          onChange={(e) => setFormData({...formData, weight: e.target.value})}
                          className="h-12 text-lg border-gray-200 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-4 block">
                        What are your goals? (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 gap-3">
                        {goalOptions.map((goal) => (
                          <button
                            key={goal.id}
                            onClick={() => handleGoalToggle(goal.id)}
                            className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                              formData.goals.includes(goal.id)
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="font-medium text-gray-900">{goal.label}</div>
                            {formData.goals.includes(goal.id) && (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-2" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Your Commitment */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Commitment</h2>
                    <p className="text-gray-600">How much time can you dedicate daily?</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">
                      Daily workout duration
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {timeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFormData({...formData, dailyTimeAvailable: option.value})}
                          className={`p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                            formData.dailyTimeAvailable === option.value
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl font-bold text-orange-600 mb-1">{option.value}</div>
                          <div className="text-sm text-gray-600">minutes</div>
                          {formData.dailyTimeAvailable === option.value && (
                            <CheckCircle className="w-5 h-5 text-orange-500 mx-auto mt-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-6 py-3"
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`px-6 py-3 ${
                    currentStep === 1 ? 'bg-blue-500 hover:bg-blue-600' :
                    currentStep === 2 ? 'bg-green-500 hover:bg-green-600' :
                    'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  {currentStep === 3 ? 'Generate My Workout' : 'Continue'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

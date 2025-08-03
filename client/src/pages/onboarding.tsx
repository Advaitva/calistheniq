import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User, Target, Clock } from "lucide-react";
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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.fitnessLevel;
      case 2:
        return formData.height && formData.weight && formData.goals.length > 0;
      case 3:
        return formData.dailyTimeAvailable;
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
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold ${
                    isActive ? 'bg-gradient-to-r from-calistheniq-orange to-calistheniq-amber text-white' :
                    isCompleted ? 'bg-calistheniq-emerald text-white' :
                    'bg-gray-700 text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {step.number < 3 && (
                    <div className={`w-20 h-1 mx-4 ${
                      isCompleted ? 'bg-calistheniq-emerald' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-400">Step {currentStep} of 3</p>
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-morphism border-0">
            <CardHeader>
              <CardTitle className="text-center text-xl">
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Your body metrics and goals"}
                {currentStep === 3 && "How much time do you have?"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-calistheniq-charcoal/50 border-gray-600"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fitness-level">Fitness Level</Label>
                    <Select
                      value={formData.fitnessLevel}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessLevel: value }))}
                    >
                      <SelectTrigger className="bg-calistheniq-charcoal/50 border-gray-600">
                        <SelectValue placeholder="Select your fitness level" />
                      </SelectTrigger>
                      <SelectContent>
                        {fitnessLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {/* Step 2: Body Metrics & Goals */}
              {currentStep === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={formData.height}
                        onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                        className="bg-calistheniq-charcoal/50 border-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={formData.weight}
                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                        className="bg-calistheniq-charcoal/50 border-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Your Goals (select all that apply)</Label>
                    <div className="grid grid-cols-1 gap-3">
                      {goalOptions.map((goal) => (
                        <div key={goal.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={goal.id}
                            checked={formData.goals.includes(goal.id)}
                            onCheckedChange={() => handleGoalToggle(goal.id)}
                          />
                          <Label htmlFor={goal.id} className="cursor-pointer">
                            {goal.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Time Available */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label>Daily workout time</Label>
                  <div className="grid grid-cols-1 gap-3">
                    {timeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          formData.dailyTimeAvailable === option.value
                            ? 'border-calistheniq-orange bg-calistheniq-orange/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name="dailyTime"
                          value={option.value}
                          checked={formData.dailyTimeAvailable === option.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dailyTimeAvailable: e.target.value }))}
                          className="sr-only"
                        />
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm text-gray-400">
                          Perfect for {option.value === "15" ? "busy days" : 
                                     option.value === "30" ? "most people" :
                                     option.value === "60" ? "serious training" : "quick sessions"}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1 btn-glass"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {currentStep === 1 ? 'Back to Home' : 'Previous'}
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 btn-primary"
                >
                  {currentStep === 3 ? 'Generate Workout' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

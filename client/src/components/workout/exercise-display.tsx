import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Timer, RotateCcw, Target, Zap } from "lucide-react";
import type { Exercise } from "@shared/schema";

interface ExerciseDisplayProps {
  exercise: Exercise;
  currentSet: number;
  totalSets: number;
  timeRemaining?: number;
  repsCompleted?: number;
  onComplete?: () => void;
}

export default function ExerciseDisplay({
  exercise,
  currentSet,
  totalSets,
  timeRemaining,
  repsCompleted
}: ExerciseDisplayProps) {
  const progressPercentage = ((currentSet - 1) / totalSets) * 100;
  const isTimeBased = exercise.duration !== undefined;
  const isRepBased = exercise.reps !== undefined;

  return (
    <Card className="glass-morphism border-0">
      <CardContent className="pt-6">
        {/* Exercise Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-1">{exercise.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-calistheniq-orange text-calistheniq-orange">
                {exercise.type}
              </Badge>
              <Badge variant="outline" className="border-calistheniq-emerald text-calistheniq-emerald">
                {exercise.difficulty}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-calistheniq-emerald rounded-full animate-pulse" />
            <span className="text-sm text-calistheniq-emerald font-medium">LIVE</span>
          </div>
        </div>

        {/* Exercise Image/Animation Area */}
        <div className="relative mb-6 bg-calistheniq-charcoal rounded-lg p-6 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-12 w-12 text-white" />
          </div>
          <p className="text-gray-300">Exercise demonstration</p>
        </div>

        {/* Current Set Info */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Set Progress</span>
            <span className="text-sm text-calistheniq-orange">
              Set {currentSet} of {totalSets}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3 mb-4" />
          
          {/* Exercise Details */}
          <div className="grid grid-cols-2 gap-4 text-center">
            {isRepBased && (
              <div className="bg-calistheniq-charcoal/30 p-3 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <RotateCcw className="h-4 w-4 mr-1 text-calistheniq-amber" />
                  <span className="text-sm font-medium">Reps</span>
                </div>
                <div className="text-xl font-bold">
                  {repsCompleted || 0}/{exercise.reps}
                </div>
              </div>
            )}
            
            {isTimeBased && (
              <div className="bg-calistheniq-charcoal/30 p-3 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Timer className="h-4 w-4 mr-1 text-calistheniq-electric" />
                  <span className="text-sm font-medium">Time</span>
                </div>
                <div className="text-xl font-bold">
                  {timeRemaining || exercise.duration}s
                </div>
              </div>
            )}
            
            {exercise.restTime && (
              <div className="bg-calistheniq-charcoal/30 p-3 rounded-lg">
                <div className="flex items-center justify-center mb-1">
                  <Zap className="h-4 w-4 mr-1 text-calistheniq-emerald" />
                  <span className="text-sm font-medium">Rest</span>
                </div>
                <div className="text-xl font-bold">
                  {exercise.restTime}s
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-calistheniq-orange">Instructions</h4>
          <ul className="space-y-1">
            {exercise.instructions.map((instruction, index) => (
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
        </div>

        {/* Form Tips */}
        {exercise.formTips.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="font-semibold text-calistheniq-emerald mb-2">Form Tips</h4>
            <ul className="space-y-1">
              {exercise.formTips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-400 flex items-start">
                  <span className="text-calistheniq-emerald mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

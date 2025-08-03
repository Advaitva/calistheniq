import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pause, Play, SkipForward, RotateCcw, Home } from "lucide-react";

interface WorkoutControlsProps {
  isPaused: boolean;
  canSkip: boolean;
  onPause: () => void;
  onSkip: () => void;
  onRestart: () => void;
  onHome: () => void;
}

export default function WorkoutControls({
  isPaused,
  canSkip,
  onPause,
  onSkip,
  onRestart,
  onHome
}: WorkoutControlsProps) {
  return (
    <Card className="glass-morphism border-0">
      <CardHeader>
        <CardTitle className="text-center">Quick Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={onPause}
          className="w-full btn-glass"
        >
          {isPaused ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Resume Workout
            </>
          ) : (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause Workout
            </>
          )}
        </Button>
        
        <Button
          onClick={onSkip}
          disabled={!canSkip}
          className="w-full btn-glass"
        >
          <SkipForward className="mr-2 h-4 w-4" />
          Skip Exercise
        </Button>
        
        <Button
          onClick={onRestart}
          className="w-full btn-glass"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart Set
        </Button>
        
        <Button
          onClick={onHome}
          variant="outline"
          className="w-full btn-glass"
        >
          <Home className="mr-2 h-4 w-4" />
          End Workout
        </Button>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Timer as TimerIcon, Play, Pause } from "lucide-react";

interface TimerProps {
  time: number;
  phase: 'exercise' | 'rest' | 'complete';
  isPaused: boolean;
  exerciseName: string;
}

export default function Timer({ time, phase, isPaused, exerciseName }: TimerProps) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  
  const getPhaseColor = () => {
    switch (phase) {
      case 'exercise':
        return 'from-calistheniq-orange to-calistheniq-amber';
      case 'rest':
        return 'from-calistheniq-electric to-calistheniq-emerald';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'exercise':
        return `${exerciseName} - Work Time`;
      case 'rest':
        return 'Rest & Recover';
      default:
        return 'Timer';
    }
  };

  return (
    <Card className="glass-morphism border-0">
      <CardContent className="pt-6">
        <div className="text-center">
          {/* Timer Icon */}
          <motion.div
            animate={!isPaused && time > 0 ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: !isPaused && time > 0 ? Infinity : 0, ease: "linear" }}
            className={`w-20 h-20 bg-gradient-to-br ${getPhaseColor()} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {isPaused ? (
              <Pause className="h-10 w-10 text-white" />
            ) : (
              <TimerIcon className="h-10 w-10 text-white" />
            )}
          </motion.div>

          {/* Timer Display */}
          <motion.div
            key={time}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="text-6xl font-mono font-bold gradient-text mb-2"
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </motion.div>

          {/* Phase Text */}
          <div className="text-lg font-medium text-gray-300 mb-1">
            {getPhaseText()}
          </div>

          {/* Status */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            {isPaused ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Paused</span>
              </>
            ) : (
              <>
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  phase === 'exercise' ? 'bg-calistheniq-orange' : 'bg-calistheniq-electric'
                }`} />
                <span>Active</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

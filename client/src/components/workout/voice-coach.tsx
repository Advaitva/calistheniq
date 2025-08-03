import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume2, VolumeX, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VoiceCoachProps {
  isEnabled: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
  onToggle: () => void;
  lastMessage?: string;
}

export default function VoiceCoach({ 
  isEnabled, 
  isSpeaking, 
  isSupported, 
  onToggle, 
  lastMessage 
}: VoiceCoachProps) {
  if (!isSupported) {
    return (
      <Card className="glass-morphism border-0">
        <CardContent className="pt-6 text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <VolumeX className="h-8 w-8 text-gray-400" />
          </div>
          <h4 className="font-semibold mb-2 text-gray-400">Voice Not Supported</h4>
          <p className="text-sm text-gray-500">
            Your browser doesn't support voice coaching.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-morphism border-0">
      <CardContent className="pt-6 text-center">
        <motion.div
          animate={isSpeaking ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.6, repeat: isSpeaking ? Infinity : 0 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isEnabled && isSpeaking
              ? 'bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber animate-pulse-glow'
              : isEnabled
              ? 'bg-gradient-to-br from-calistheniq-electric to-calistheniq-emerald'
              : 'bg-gray-600'
          }`}
        >
          {isEnabled ? (
            <Mic className="h-8 w-8 text-white" />
          ) : (
            <VolumeX className="h-8 w-8 text-gray-400" />
          )}
        </motion.div>
        
        <h4 className="font-semibold mb-2">
          {isEnabled ? 'AI Coach Active' : 'Voice Coach Muted'}
        </h4>
        
        <AnimatePresence mode="wait">
          {lastMessage && isEnabled && (
            <motion.p
              key={lastMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-gray-300 mb-4 italic"
            >
              "{lastMessage}"
            </motion.p>
          )}
        </AnimatePresence>
        
        <Button
          onClick={onToggle}
          className="w-full bg-calistheniq-charcoal/50 hover:bg-calistheniq-charcoal/70 transition-colors"
        >
          {isEnabled ? (
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
  );
}

import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Bolt, Mic, Brain, Play, Video, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Bolt,
      title: "Zero Commitment",
      description: "No accounts, no subscriptions, no credit cards. Just enter your basics and start training instantly.",
      gradient: "from-calistheniq-orange to-calistheniq-amber"
    },
    {
      icon: Mic,
      title: "Voice-Powered Coach",
      description: "AI trainer with real-time voice cues, form tips, and motivational callouts during your workout.",
      gradient: "from-calistheniq-electric to-calistheniq-emerald"
    },
    {
      icon: Brain,
      title: "Adapts on the Fly",
      description: "Smart algorithms adjust workout intensity based on your real-time performance and feedback.",
      gradient: "from-calistheniq-amber to-calistheniq-orange"
    }
  ];

  const stats = [
    { value: "0s", label: "Setup Time" },
    { value: "<10s", label: "Workout Generation" },
    { value: "∞", label: "Free Workouts" }
  ];

  const steps = [
    { number: 1, title: "Basic Info", description: "Name + fitness level" },
    { number: 2, title: "Body Metrics", description: "Height, weight, goals" },
    { number: 3, title: "Time Available", description: "Daily workout duration" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-calistheniq-dark/90 via-calistheniq-charcoal/80 to-calistheniq-dark/95" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Your <span className="gradient-text">AI Trainer</span><br />
              Awaits
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Zero subscriptions. Zero excuses. Just instant calisthenics workouts with voice-guided AI coaching that adapts to your performance in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => setLocation("/onboarding")}
                className="btn-primary px-8 py-4 rounded-full text-lg animate-pulse-glow"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Training Now
              </Button>
              <Button
                onClick={() => setLocation("/demo")}
                className="btn-glass px-8 py-4 rounded-full text-lg"
              >
                <Video className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-calistheniq-orange/20 rounded-full animate-float hidden lg:block" />
        <div className="absolute top-1/3 right-10 w-16 h-16 bg-calistheniq-electric/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-calistheniq-charcoal/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="gradient-text">CalisthenIQ</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Three game-changing features that make calisthenics training accessible to everyone
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-morphism p-8 text-center hover:scale-105 transition-transform border-0">
                    <CardContent className="pt-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 gradient-text">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Onboarding Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Started in <span className="gradient-text">3 Steps</span>
            </h2>
            <p className="text-xl text-gray-300">
              Less than 60 seconds to your first AI-generated workout
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-calistheniq-orange to-calistheniq-amber rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Workout Generation Preview */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism p-8 border-0">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Smart Workout Generation</h3>
                    <p className="text-gray-300 mb-6">
                      Our AI analyzes your inputs and generates personalized workouts in under 10 seconds. 
                      Different routines for workdays vs weekends, automatically adjusted for your goals.
                    </p>
                    <div className="bg-calistheniq-charcoal/50 p-4 rounded-lg font-mono text-sm">
                      <div className="text-calistheniq-orange">// Example Output</div>
                      <div className="text-calistheniq-emerald">30yo, 175cm, 75kg, Intermediate, 20min</div>
                      <div className="text-white">→ 5 Rounds: 10 Pull-ups, 20 Push-ups, 30s Plank</div>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400" 
                      alt="Athlete performing bodyweight exercises during golden hour" 
                      className="rounded-xl shadow-2xl w-full h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your <span className="gradient-text">Training</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who've discovered the power of AI-guided calisthenics. 
              No commitments, no barriers—just results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                onClick={() => setLocation("/onboarding")}
                className="btn-primary px-10 py-4 rounded-full text-xl animate-pulse-glow"
              >
                Start Your Journey
              </Button>
              <Button
                onClick={() => setLocation("/demo")}
                className="btn-glass px-10 py-4 rounded-full text-xl"
              >
                Learn More
              </Button>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center justify-center">
              <Shield className="mr-2 h-4 w-4" />
              No signup required • Always free • Privacy focused
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

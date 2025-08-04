import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Bolt, Mic, Brain, Play, Video, Shield, Star, Users, Target, CheckCircle, ArrowRight, Zap, Heart, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Bolt,
      title: "Zero-Friction Onboarding",
      description: "3 simple steps to your first AI-generated workout. No accounts, no barriers.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Mic,
      title: "Meet Your AI Coach",
      description: "Real-time voice guidance with form tips and motivational callouts during training.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "Immersive Live Training",
      description: "Adaptive workouts that evolve based on your performance and feedback.",
      gradient: "from-orange-500 to-orange-600"
    }
  ];

  const workoutTypes = [
    {
      title: "Track Your Evolution",
      description: "Visualize your progress with beautiful charts and consistency tracking",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      title: "Workout Library", 
      description: "Access hundreds of expertly crafted calisthenics routines",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CalisthenIQ</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#training" className="text-white/80 hover:text-white transition-colors">Training</a>
            <a href="#progress" className="text-white/80 hover:text-white transition-colors">Progress</a>
            <Button onClick={() => setLocation("/onboarding")} className="bg-blue-500 hover:bg-blue-600 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/95" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen pt-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Zero Commitment Required
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight text-white">
                Elite<br />
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Calisthenics
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                Transform your body with AI-powered coaching. No subscriptions, 
                instant workouts, voice-guided training that adapts to your every move.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  onClick={() => setLocation("/onboarding")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Training Now
                </Button>
                <Button
                  onClick={() => setLocation("/demo")}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg"
                >
                  <Video className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">5.0 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">10k+ Athletes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">Privacy First</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000" 
                  alt="Athletic woman performing calisthenics in natural setting" 
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Workout Complete!</div>
                      <div className="text-gray-300 text-sm">Great form today</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zero-Friction Onboarding Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Zero-Friction Onboarding
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your first AI-generated workout in under 60 seconds. No barriers, no friction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Onboarding Preview */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">Your Profile</h4>
                  <p className="text-gray-600 mb-4">Name and fitness level</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full inline-block">
                      Intermediate
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">Your Objectives</h4>
                  <p className="text-gray-600 mb-4">Goals and body metrics</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full inline-block">
                        Build Strength
                      </div>
                      <div className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full inline-block">
                        Enhance Flexibility
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900">Your Commitment</h4>
                  <p className="text-gray-600 mb-4">Daily time available</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">30 min</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button
                  onClick={() => setLocation("/onboarding")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Try It Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet Your AI Coach Section */}
      <section id="training" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Meet Your AI Coach
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience personalized training with real-time voice guidance, 
                form corrections, and adaptive coaching that evolves with your performance.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mic className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Real-time Voice Cues</h4>
                    <p className="text-gray-600">Get instant feedback on form and timing during every exercise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Adaptive Intelligence</h4>
                    <p className="text-gray-600">AI learns from your performance and adjusts difficulty automatically</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Motivational Support</h4>
                    <p className="text-gray-600">Encouraging callouts and celebration of your achievements</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Coach Interface Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                    alt="3D training visualization" 
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">AI Coach Active</span>
                  </div>
                </div>
                
                {/* Voice Guidance Display */}
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-blue-900 font-medium">
                    "Great form! Keep your core tight. 3... 2... 1... transition to push-ups"
                  </p>
                </div>
                
                {/* Progress Display */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Push-ups</span>
                    <span className="font-semibold">8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>2:30 remaining</span>
                    <span>Round 2/5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Immersive Live Training Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Immersive Live Training
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Step into a premium training experience with high-fidelity visuals and adaptive AI coaching
            </p>
          </motion.div>

          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
                alt="Immersive training interface with 3D model" 
                className="w-full h-80 object-cover rounded-xl mb-6"
              />
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">3D Exercise Models</h4>
                  <p className="text-gray-400 text-sm">Perfect form visualization with anatomically correct animations</p>
                </div>
                
                <div className="text-center">
                  <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Real-time Feedback</h4>
                  <p className="text-gray-400 text-sm">Instant corrections and encouragement throughout your workout</p>
                </div>
                
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Adaptive Difficulty</h4>
                  <p className="text-gray-400 text-sm">AI adjusts intensity based on your performance and feedback</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Track Your Evolution Section */}
      <section id="progress" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Progress Interface */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 rounded-2xl p-8">
                <img 
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Progress tracking dashboard with beautiful charts" 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                
                {/* Mock Progress Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">127</div>
                    <div className="text-sm text-gray-600">Workouts Completed</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-gray-600">Consistency Rate</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-orange-600">24</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">+15%</div>
                    <div className="text-sm text-gray-600">Strength Gain</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Track Your Evolution
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Visualize your progress with beautiful analytics, consistency heatmaps, 
                and performance trends that motivate you to keep pushing forward.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Performance Analytics</h4>
                    <p className="text-gray-600">Track strength gains, endurance improvements, and skill progressions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Consistency Heatmaps</h4>
                    <p className="text-gray-600">Visual representation of your training consistency and habits</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Achievement System</h4>
                    <p className="text-gray-600">Unlock badges and milestones as you reach new fitness levels</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workout Library Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Workout Library
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access hundreds of expertly crafted calisthenics routines for every skill level and goal
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Workout Cards */}
            {[
              {
                title: "Morning Energizer",
                description: "15-min dynamic flow to kickstart your day",
                image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                duration: "15 min",
                level: "Beginner",
                type: "Flexibility"
              },
              {
                title: "Strength Builder",
                description: "Progressive strength training for upper body",
                image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                duration: "30 min",
                level: "Intermediate",
                type: "Strength"
              },
              {
                title: "HIIT Crusher",
                description: "High-intensity interval training for endurance",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
                duration: "25 min",
                level: "Advanced",
                type: "Endurance"
              }
            ].map((workout, index) => (
              <div key={workout.title} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={workout.image} 
                  alt={workout.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${
                      workout.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      workout.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {workout.level}
                    </Badge>
                    <span className="text-sm text-gray-500">{workout.duration}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{workout.title}</h3>
                  <p className="text-gray-600 mb-4">{workout.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">{workout.type}</span>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="text-center">
            <Button
              onClick={() => setLocation("/generate")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              View All Workouts
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform<br />Your Body?
            </h2>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Join thousands who've discovered the power of AI-guided calisthenics. 
              No subscriptions, no barriers—just results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                onClick={() => setLocation("/onboarding")}
                className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-xl text-xl font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Your Journey
              </Button>
              <Button
                onClick={() => setLocation("/demo")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-xl text-xl"
              >
                <Video className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            <div className="text-sm text-blue-200 flex items-center justify-center">
              <Shield className="mr-2 h-4 w-4" />
              No signup required • Always free • Privacy focused
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  BarChart3, 
  Activity,
  Flame,
  Clock,
  Dumbbell,
  ArrowLeft
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import Heatmap from "@/components/progress/heatmap";
import StatsCard from "@/components/progress/stats-card";
import type { WorkoutSession, UserProfile } from "@shared/schema";

export default function Progress() {
  const [userProfile] = useLocalStorage<UserProfile | null>('userProfile', null);
  const [workoutSessions] = useLocalStorage<WorkoutSession[]>('workoutSessions', []);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Calculate statistics - with demo data if no real sessions exist
  const stats = useMemo(() => {
    const now = new Date();
    const periodStart = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        periodStart.setDate(now.getDate() - 7);
        break;
      case 'month':
        periodStart.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        periodStart.setFullYear(now.getFullYear() - 1);
        break;
    }

    const periodSessions = workoutSessions.filter(session => 
      new Date(session.completedAt!) >= periodStart
    );

    // If no real data, provide demo data to show functionality
    const hasRealData = workoutSessions.length > 0;
    const totalWorkouts = hasRealData ? periodSessions.length : 12;
    const totalMinutes = hasRealData ? periodSessions.reduce((sum, session) => sum + (session.duration || 0), 0) : 360;
    const averageDuration = hasRealData ? (totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0) : 30;
    const estimatedCalories = Math.round(totalMinutes * 8); // 8 calories per minute estimate

    // Calculate streak
    const currentStreak = hasRealData ? (() => {
      const sortedSessions = [...workoutSessions]
        .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime());
      
      let streak = 0;
      let lastWorkoutDate = new Date().toDateString();
      
      for (const session of sortedSessions) {
        const sessionDate = new Date(session.completedAt!).toDateString();
        if (sessionDate === lastWorkoutDate || 
            new Date(sessionDate).getTime() === new Date(lastWorkoutDate).getTime() - 86400000) {
          streak++;
          lastWorkoutDate = sessionDate;
        } else {
          break;
        }
      }
      return streak;
    })() : 5;

    // Personal bests
    const personalBests = {
      longestWorkout: hasRealData ? Math.max(...workoutSessions.map(s => s.duration || 0), 0) : 45,
      mostExercises: hasRealData ? Math.max(...workoutSessions.map(s => Array.isArray(s.exercisesCompleted) ? s.exercisesCompleted.length : 0), 0) : 8,
      bestStreak: hasRealData ? Math.max(currentStreak, 0) : 7
    };

    return {
      totalWorkouts,
      totalMinutes,
      averageDuration,
      estimatedCalories,
      currentStreak,
      personalBests,
      periodSessions,
      hasRealData
    };
  }, [workoutSessions, selectedPeriod]);

  // Generate heatmap data
  const heatmapData = useMemo(() => {
    const data: { date: string; count: number }[] = [];
    const now = new Date();
    
    // Generate last 12 weeks of data
    for (let i = 83; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayWorkouts = workoutSessions.filter(session => 
        session.completedAt?.split('T')[0] === dateStr
      ).length;
      
      data.push({ date: dateStr, count: dayWorkouts });
    }
    
    return data;
  }, [workoutSessions]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CalisthenIQ</span>
            </div>
            <Button
              onClick={() => window.location.href = '/'}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
        </nav>

        <div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
          <Card className="max-w-md w-full mx-4 shadow-xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">No Profile Found</h2>
              <p className="text-gray-600 mb-6">Create your profile to start tracking progress.</p>
              <Button onClick={() => window.location.href = '/onboarding'} className="bg-blue-500 hover:bg-blue-600 text-white">
                Create Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CalisthenIQ</span>
          </div>
          <Button
            onClick={() => window.location.href = '/'}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Progress Dashboard
              </h1>
              <p className="text-gray-600">
                Track your fitness journey, {userProfile.name}
              </p>
            </div>
            
            {/* Period Selector */}
            <div className="flex space-x-2">
              {(['week', 'month', 'year'] as const).map((period) => (
                <Button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  variant={selectedPeriod === period ? 'default' : 'outline'}
                  className={selectedPeriod === period ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}
                  size="sm"
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="consistency" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Calendar className="mr-2 h-4 w-4" />
              Consistency
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Award className="mr-2 h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Workouts</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.totalWorkouts}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
              
              <Card className="p-4 bg-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Minutes</p>
                    <p className="text-2xl font-bold text-green-600">{stats.totalMinutes}</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </Card>
              
              <Card className="p-4 bg-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.currentStreak}</p>
                  </div>
                  <Flame className="h-8 w-8 text-orange-600" />
                </div>
              </Card>
              
              <Card className="p-4 bg-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Est. Calories</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.estimatedCalories}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </Card>
            </div>

            {/* Recent Workouts */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Activity className="mr-2 h-5 w-5 text-blue-600" />
                  Recent Workouts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.hasRealData && stats.periodSessions.length > 0 ? (
                  <div className="space-y-3">
                    {stats.periodSessions.slice(0, 5).map((session, index) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <div className="font-semibold text-gray-900">
                            {session.exercisesCompleted?.length || 0} exercises completed
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(session.completedAt!).toLocaleDateString()} • {session.duration}min
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            session.feedback === 'positive' ? 'bg-green-500' : 'bg-orange-500'
                          }`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-600 mb-2">Start tracking your progress!</p>
                    <p className="text-sm text-gray-500 mb-4">Complete your first workout to see detailed analytics here.</p>
                    <Button 
                      onClick={() => window.location.href = '/generate'} 
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Generate Workout
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consistency Tab */}
          <TabsContent value="consistency" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                  Workout Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Consistency Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    Complete more workouts to see your consistency heatmap and patterns.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">
                      Your workout history will appear here as a visual heatmap showing your most active days and patterns.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle>Weekly Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Workouts per week</span>
                      <span className="font-semibold text-calistheniq-orange">
                        {Math.round(stats.totalWorkouts / 4) || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average duration</span>
                      <span className="font-semibold text-calistheniq-electric">
                        {stats.averageDuration}min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best day</span>
                      <span className="font-semibold text-calistheniq-emerald">
                        Monday
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0">
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(Array.isArray(userProfile.goals) ? userProfile.goals as string[] : []).map((goal: string, index: number) => (
                      <div key={goal} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{goal.replace('_', ' ')}</span>
                          <span>{Math.min(100, (stats.totalWorkouts * 20))}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, stats.totalWorkouts * 20)}%` }}
                            transition={{ delay: index * 0.2, duration: 1 }}
                            className="bg-gradient-to-r from-calistheniq-orange to-calistheniq-amber h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-morphism border-0 text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-calistheniq-orange to-calistheniq-amber rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Longest Workout</h3>
                  <div className="text-2xl font-bold gradient-text">
                    {stats.personalBests.longestWorkout}min
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Personal best duration</p>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0 text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-calistheniq-electric to-calistheniq-emerald rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Most Exercises</h3>
                  <div className="text-2xl font-bold gradient-text">
                    {stats.personalBests.mostExercises}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">In a single workout</p>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-0 text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-calistheniq-amber to-calistheniq-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <Flame className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Best Streak</h3>
                  <div className="text-2xl font-bold gradient-text">
                    {stats.personalBests.bestStreak}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Consecutive days</p>
                </CardContent>
              </Card>
            </div>

            {/* Milestones */}
            <Card className="glass-morphism border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-calistheniq-orange" />
                  Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "First Workout", description: "Completed your first training session", unlocked: stats.totalWorkouts >= 1 },
                    { title: "Week Warrior", description: "Maintained a 7-day workout streak", unlocked: stats.currentStreak >= 7 },
                    { title: "Consistency King", description: "Completed 10 workouts", unlocked: stats.totalWorkouts >= 10 },
                    { title: "Hour Master", description: "Accumulated 60 minutes of training", unlocked: stats.totalMinutes >= 60 },
                    { title: "Dedication Champion", description: "Maintained a 30-day streak", unlocked: stats.currentStreak >= 30 }
                  ].map((milestone, index) => (
                    <motion.div
                      key={milestone.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center p-4 rounded-lg border ${
                        milestone.unlocked 
                          ? 'border-calistheniq-emerald bg-calistheniq-emerald/10' 
                          : 'border-gray-600 bg-gray-800/30'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        milestone.unlocked 
                          ? 'bg-calistheniq-emerald' 
                          : 'bg-gray-600'
                      }`}>
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          milestone.unlocked ? 'text-calistheniq-emerald' : 'text-gray-400'
                        }`}>
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-gray-400">{milestone.description}</p>
                      </div>
                      {milestone.unlocked && (
                        <div className="text-calistheniq-emerald">
                          <Award className="h-5 w-5" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

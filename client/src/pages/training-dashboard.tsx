import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Calendar,
  Clock,
  Play,
  Target,
  TrendingUp,
  Dumbbell,
  ArrowLeft,
  Plus,
  History,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { WorkoutSession, UserProfile, Workout } from "@shared/schema";

export default function TrainingDashboard() {
  const [, setLocation] = useLocation();
  const [userProfile] = useLocalStorage<UserProfile | null>('userProfile', null);
  const [workoutSessions] = useLocalStorage<WorkoutSession[]>('workoutSessions', []);
  const [selectedTab, setSelectedTab] = useState('overview');

  // Calculate training statistics
  const trainingStats = useMemo(() => {
    const now = new Date();
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const weekSessions = workoutSessions.filter(session => 
      new Date(session.completedAt!) >= thisWeek
    );
    
    const monthSessions = workoutSessions.filter(session => 
      new Date(session.completedAt!) >= thisMonth
    );

    const totalTime = workoutSessions.reduce((sum, session) => sum + (session.duration || 0), 0);
    const avgDuration = workoutSessions.length > 0 ? Math.round(totalTime / workoutSessions.length) : 0;

    return {
      totalWorkouts: workoutSessions.length,
      weekWorkouts: weekSessions.length,
      monthWorkouts: monthSessions.length,
      totalMinutes: totalTime,
      avgDuration,
      hasData: workoutSessions.length > 0
    };
  }, [workoutSessions]);

  // Generate upcoming week schedule
  const weekSchedule = useMemo(() => {
    const schedule = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Check if there's a workout completed on this day
      const completedSession = workoutSessions.find(session => 
        new Date(session.completedAt!).toDateString() === date.toDateString()
      );

      schedule.push({
        day: dayName,
        date: dateStr,
        isToday: date.toDateString() === today.toDateString(),
        completed: !!completedSession,
        plannedDuration: userProfile?.dailyTimeAvailable || 30
      });
    }
    
    return schedule;
  }, [workoutSessions, userProfile]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">CalisthenIQ</span>
            </div>
            <Button
              onClick={() => setLocation('/')}
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
              <p className="text-gray-600 mb-6">Create your profile to start training.</p>
              <Button onClick={() => setLocation('/onboarding')} className="bg-blue-500 hover:bg-blue-600 text-white">
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
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CalisthenIQ</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setLocation('/generate')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Workout
            </Button>
            <Button
              onClick={() => setLocation('/')}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
          </div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Training Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {userProfile.name}! Ready for your next workout?
            </p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Workouts</p>
                    <p className="text-3xl font-bold text-gray-900">{trainingStats.totalWorkouts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">This Week</p>
                    <p className="text-3xl font-bold text-gray-900">{trainingStats.weekWorkouts}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Minutes</p>
                    <p className="text-3xl font-bold text-gray-900">{trainingStats.totalMinutes}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                    <p className="text-3xl font-bold text-gray-900">{trainingStats.avgDuration}m</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="bg-white border border-gray-200 shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <Calendar className="mr-2 h-4 w-4" />
                Week Schedule
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <History className="mr-2 h-4 w-4" />
                Training History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Week Schedule */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Week Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    {weekSchedule.map((day, index) => (
                      <motion.div
                        key={day.day}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`p-4 rounded-lg border-2 ${
                          day.isToday 
                            ? 'border-blue-500 bg-blue-50' 
                            : day.completed 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className={`text-lg font-semibold ${
                            day.isToday ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {day.day}
                          </div>
                          <div className="text-sm text-gray-500 mb-2">{day.date}</div>
                          
                          {day.completed ? (
                            <div className="flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-sm text-green-600 ml-1">Done</span>
                            </div>
                          ) : day.isToday ? (
                            <Button
                              onClick={() => setLocation('/generate')}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Start
                            </Button>
                          ) : (
                            <div className="text-sm text-gray-400">
                              {day.plannedDuration}m planned
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Generate New Workout</h3>
                    <p className="text-blue-100 mb-4">
                      Create a personalized workout based on your goals and available time
                    </p>
                    <Button
                      onClick={() => setLocation('/generate')}
                      className="bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Generate Workout
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">View Progress</h3>
                    <p className="text-green-100 mb-4">
                      Track your fitness journey with detailed analytics and insights
                    </p>
                    <Button
                      onClick={() => setLocation('/progress')}
                      className="bg-white text-green-600 hover:bg-green-50"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Progress
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {/* Training History */}
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Training History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {trainingStats.hasData ? (
                    <div className="space-y-4">
                      {workoutSessions.slice(0, 10).map((session, index) => (
                        <motion.div
                          key={session.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Dumbbell className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Workout Session</h4>
                              <p className="text-sm text-gray-500">
                                {new Date(session.completedAt!).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {session.duration}m
                            </div>
                            <Badge 
                              className={`${
                                session.feedback === 'positive' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {session.feedback === 'positive' ? 'Completed' : 'Partial'}
                            </Badge>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <History className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Training History</h3>
                      <p className="text-gray-600 mb-6">Start your first workout to see your training history here.</p>
                      <Button
                        onClick={() => setLocation('/generate')}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start First Workout
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
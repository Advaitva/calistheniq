import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Onboarding from "@/pages/onboarding";
import WorkoutGenerator from "@/pages/workout-generator";
import TrainingSession from "@/pages/training-session";
import TrainingDashboard from "@/pages/training-dashboard";
import Progress from "@/pages/progress";
import Demo from "@/pages/demo";
function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/generate" component={WorkoutGenerator} />
        <Route path="/training/:workoutId?" component={TrainingSession} />
        <Route path="/training" component={TrainingDashboard} />
        <Route path="/progress" component={Progress} />
        <Route path="/demo" component={Demo} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="calistheniq-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

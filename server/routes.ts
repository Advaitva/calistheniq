import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserProfileSchema, 
  insertWorkoutSchema, 
  insertWorkoutSessionSchema,
  type GenerateWorkoutRequest 
} from "@shared/schema";
import { generateWorkout } from "../client/src/lib/workout-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Generate workout endpoint
  app.post("/api/workouts/generate", async (req, res) => {
    try {
      const { userProfile, workoutType, duration, isWeekend }: GenerateWorkoutRequest = req.body;
      
      if (!userProfile) {
        return res.status(400).json({ message: "User profile is required" });
      }

      const workout = generateWorkout({
        userProfile,
        workoutType,
        duration,
        isWeekend
      });

      // Save the generated workout
      const savedWorkout = await storage.createWorkout({
        userId: userProfile.userId || 'anonymous',
        name: workout.name,
        exercises: workout.exercises,
        duration: workout.duration,
        difficulty: workout.difficulty,
        type: workout.type
      });

      res.json(savedWorkout);
    } catch (error) {
      console.error("Error generating workout:", error);
      res.status(500).json({ message: "Failed to generate workout" });
    }
  });

  // Save user profile
  app.post("/api/profiles", async (req, res) => {
    try {
      const profileData = insertUserProfileSchema.parse(req.body);
      const profile = await storage.createUserProfile({
        ...profileData,
        userId: 'anonymous' // Since we're not using real auth
      });
      res.json(profile);
    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(400).json({ message: "Invalid profile data" });
    }
  });

  // Get user profile
  app.get("/api/profiles/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await storage.getUserProfile(userId);
      
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  // Save workout session
  app.post("/api/sessions", async (req, res) => {
    try {
      const sessionData = insertWorkoutSessionSchema.parse(req.body);
      const session = await storage.createWorkoutSession(sessionData);
      res.json(session);
    } catch (error) {
      console.error("Error saving session:", error);
      res.status(400).json({ message: "Invalid session data" });
    }
  });

  // Get user workout sessions
  app.get("/api/sessions/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const sessions = await storage.getUserWorkoutSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  // Get user recent sessions for progress tracking
  app.get("/api/sessions/:userId/recent", async (req, res) => {
    try {
      const { userId } = req.params;
      const limit = parseInt(req.query.limit as string) || 10;
      const sessions = await storage.getUserRecentSessions(userId, limit);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching recent sessions:", error);
      res.status(500).json({ message: "Failed to fetch recent sessions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

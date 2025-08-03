import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Exercise type
export interface Exercise {
  id: string;
  name: string;
  type: string;
  description?: string;
  instructions: string[];
  duration?: number; // seconds
  reps?: number;
  sets?: number;
  restTime?: number; // seconds
  difficulty: "beginner" | "intermediate" | "advanced";
  muscleGroups?: string[];
  equipment?: string[];
  formTips?: string[];
}

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const workouts = pgTable("workouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  name: text("name").notNull(),
  exercises: json("exercises").$type<Exercise[]>().notNull(), // Array of exercise objects
  duration: integer("duration").notNull(), // in minutes
  difficulty: text("difficulty").notNull(), // beginner, intermediate, advanced
  type: text("type").notNull(), // strength, endurance, flexibility
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  name: text("name").notNull(),
  height: integer("height"), // in cm
  weight: integer("weight"), // in kg
  fitnessLevel: text("fitness_level").notNull(), // beginner, intermediate, advanced
  goals: json("goals").$type<string[]>().notNull(), // Array of goals: strength, flexibility, endurance
  dailyTimeAvailable: integer("daily_time_available").notNull(), // in minutes
});

export const workoutSessions = pgTable("workout_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  workoutId: varchar("workout_id"),
  completedAt: text("completed_at").default(sql`CURRENT_TIMESTAMP`),
  duration: integer("duration"), // actual duration in minutes
  exercisesCompleted: json("exercises_completed").$type<Exercise[]>().notNull(),
  feedback: text("feedback"), // thumbs up/down
});

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true,
  createdAt: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  userId: true,
});

export const insertWorkoutSessionSchema = createInsertSchema(workoutSessions).omit({
  id: true,
  completedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;
export type Workout = typeof workouts.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertWorkoutSession = z.infer<typeof insertWorkoutSessionSchema>;
export type WorkoutSession = typeof workoutSessions.$inferSelect;

// Additional types for the frontend

export type GenerateWorkoutRequest = {
  userProfile: UserProfile;
  workoutType?: 'strength' | 'endurance' | 'flexibility' | 'mixed';
  duration?: number;
  isWeekend?: boolean;
};

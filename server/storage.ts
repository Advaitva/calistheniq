import { 
  type User, 
  type InsertUser, 
  type Workout, 
  type InsertWorkout,
  type UserProfile,
  type InsertUserProfile,
  type WorkoutSession,
  type InsertWorkoutSession 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // User Profiles
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile & { userId: string }): Promise<UserProfile>;
  updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile | undefined>;
  
  // Workouts
  getWorkout(id: string): Promise<Workout | undefined>;
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  getUserWorkouts(userId: string): Promise<Workout[]>;
  
  // Workout Sessions
  createWorkoutSession(session: InsertWorkoutSession): Promise<WorkoutSession>;
  getUserWorkoutSessions(userId: string): Promise<WorkoutSession[]>;
  getUserRecentSessions(userId: string, limit: number): Promise<WorkoutSession[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private userProfiles: Map<string, UserProfile>;
  private workouts: Map<string, Workout>;
  private workoutSessions: Map<string, WorkoutSession>;

  constructor() {
    this.users = new Map();
    this.userProfiles = new Map();
    this.workouts = new Map();
    this.workoutSessions = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId
    );
  }

  async createUserProfile(profile: InsertUserProfile & { userId: string }): Promise<UserProfile> {
    const id = randomUUID();
    const userProfile: UserProfile = { 
      ...profile, 
      id,
      height: profile.height ?? null,
      weight: profile.weight ?? null
    };
    this.userProfiles.set(id, userProfile);
    return userProfile;
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | undefined> {
    const existingProfile = await this.getUserProfile(userId);
    if (!existingProfile) return undefined;
    
    const updatedProfile = { ...existingProfile, ...updates };
    this.userProfiles.set(existingProfile.id, updatedProfile);
    return updatedProfile;
  }

  async getWorkout(id: string): Promise<Workout | undefined> {
    return this.workouts.get(id);
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = randomUUID();
    const workout: Workout = { 
      ...insertWorkout, 
      id,
      userId: insertWorkout.userId ?? null,
      createdAt: new Date().toISOString()
    };
    this.workouts.set(id, workout);
    return workout;
  }

  async getUserWorkouts(userId: string): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(
      (workout) => workout.userId === userId
    );
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const id = randomUUID();
    const session: WorkoutSession = {
      ...insertSession,
      id,
      userId: insertSession.userId ?? null,
      workoutId: insertSession.workoutId ?? null,
      duration: insertSession.duration ?? null,
      feedback: insertSession.feedback ?? null,
      completedAt: new Date().toISOString()
    };
    this.workoutSessions.set(id, session);
    return session;
  }

  async getUserWorkoutSessions(userId: string): Promise<WorkoutSession[]> {
    return Array.from(this.workoutSessions.values()).filter(
      (session) => session.userId === userId
    );
  }

  async getUserRecentSessions(userId: string, limit: number): Promise<WorkoutSession[]> {
    const userSessions = await this.getUserWorkoutSessions(userId);
    return userSessions
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();

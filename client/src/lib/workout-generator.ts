import type { UserProfile, GenerateWorkoutRequest, Exercise } from '@shared/schema';
import { 
  exercises, 
  getExerciseById, 
  getProgressionExercises, 
  getDaySchedule, 
  getWarmupExercises,
  WEEKLY_SCHEDULE 
} from './exercises';

interface GeneratedWorkout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  difficulty: string;
  type: string;
  description: string;
  voiceScript?: string[];
}

// Elite 12-Week Progression System - Military Drill Sergeant Style
function generateWorkout(request: GenerateWorkoutRequest): GeneratedWorkout {
  const { userProfile, workoutType = 'mixed', duration, isWeekend = false } = request;
  
  // Determine current training week (1-12) based on user progress or default to week 1
  const currentWeek = getCurrentTrainingWeek(userProfile);
  
  // Get today's training focus
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
  const daySchedule = getDaySchedule(dayOfWeek);
  
  // If it's a rest day
  if (daySchedule?.focus === 'rest') {
    return createRestDayMessage();
  }
  
  // Create workout based on 12-week progression
  return createProgressionWorkout(
    userProfile, 
    currentWeek, 
    daySchedule, 
    isWeekend
  );
}

// ==== CORE PROGRESSION FUNCTIONS ====
function getCurrentTrainingWeek(userProfile: UserProfile): number {
  // For now, default to week 1. In production, this would track user's actual progress
  // Could be stored in localStorage or user profile
  return 1;
}

function createRestDayMessage(): GeneratedWorkout {
  return {
    id: generateWorkoutId(),
    name: "Active Recovery Day",
    exercises: [],
    duration: 0,
    difficulty: "rest",
    type: "rest",
    description: "Complete rest day. Focus on sleep, hydration, and nutrition. Your muscles grow during recovery, not just training!",
    voiceScript: [
      "Today is your rest day, soldier!",
      "Recovery is not weakness - it's strategic preparation.", 
      "Get 7-8 hours of sleep and stay hydrated.",
      "Tomorrow we return to battle stronger!"
    ]
  };
}

function createProgressionWorkout(
  userProfile: UserProfile,
  week: number, 
  daySchedule: any,
  isWeekend: boolean
): GeneratedWorkout {
  
  const selectedExercises: Exercise[] = [];
  const warmupExercises = getWarmupExercises().slice(0, 3); // 3 warmup moves
  
  // Add warmup (10 minutes)
  selectedExercises.push(...warmupExercises);
  
  // Build main workout based on day focus
  const mainExercises = buildMainWorkout(userProfile, week, daySchedule);
  selectedExercises.push(...mainExercises);
  
  // Generate military-style workout
  return {
    id: generateWorkoutId(),
    name: generateEliteWorkoutName(daySchedule.focus, week, userProfile.fitnessLevel),
    exercises: selectedExercises,
    duration: daySchedule.duration || userProfile.dailyTimeAvailable,
    difficulty: userProfile.fitnessLevel,
    type: daySchedule.focus,
    description: generateDrillSergeantDescription(daySchedule, week),
    voiceScript: generateVoiceScript(daySchedule.focus, selectedExercises.length)
  };
}

function buildMainWorkout(userProfile: UserProfile, week: number, daySchedule: any): Exercise[] {
  const mainExercises: Exercise[] = [];
  
  switch (daySchedule.focus) {
    case 'full_body_strength':
      // Monday: Triplets (Push + Pull + Squat)
      const pushExercise = getProgressionExercise('push', week, userProfile.fitnessLevel);
      const pullExercise = getProgressionExercise('pull', week, userProfile.fitnessLevel);
      const squatExercise = getProgressionExercise('squat', week, userProfile.fitnessLevel);
      const coreExercise = getExerciseById('core-plank');
      
      if (pushExercise) mainExercises.push(pushExercise);
      if (pullExercise) mainExercises.push(pullExercise);
      if (squatExercise) mainExercises.push(squatExercise);
      if (coreExercise) mainExercises.push(coreExercise);
      break;
      
    case 'push_emphasis':
      // Tuesday: Push focus + Core
      const pushMain = getProgressionExercise('push', week, userProfile.fitnessLevel);
      const pushSecondary = getExerciseById('push-diamond');
      const explosive = getExerciseById('explosive-push-up');
      const core = getExerciseById('core-hollow-body');
      
      if (pushMain) mainExercises.push(pushMain);
      if (pushSecondary && pushSecondary.id !== pushMain?.id) mainExercises.push(pushSecondary);
      if (explosive) mainExercises.push(explosive);
      if (core) mainExercises.push(core);
      break;
      
    case 'pull_emphasis':
      // Wednesday: Pull focus + Mobility
      const pullMain = getProgressionExercise('pull', week, userProfile.fitnessLevel);
      const pullSecondary = getExerciseById('pull-negative');
      const mobility = getExerciseById('mobility-scapula-pushups');
      
      if (pullMain) mainExercises.push(pullMain);
      if (pullSecondary && pullSecondary.id !== pullMain?.id) mainExercises.push(pullSecondary);
      if (mobility) mainExercises.push(mobility);
      break;
      
    case 'squat_emphasis':
      // Friday: Squat focus + Balance
      const squatMain = getProgressionExercise('squat', week, userProfile.fitnessLevel);
      const squatSecondary = getExerciseById('squat-deep');
      const balance = getExerciseById('squat-bulgarian-split');
      
      if (squatMain) mainExercises.push(squatMain);
      if (squatSecondary && squatSecondary.id !== squatMain?.id) mainExercises.push(squatSecondary);
      if (balance) mainExercises.push(balance);
      break;
      
    case 'skill_integration':
      // Saturday: Combinations + Explosives
      const combo1 = getExerciseById('explosive-push-up');
      const combo2 = getExerciseById('explosive-jump-squat');
      const skill = getProgressionExercise('push', week, userProfile.fitnessLevel);
      
      if (combo1) mainExercises.push(combo1);
      if (combo2) mainExercises.push(combo2);  
      if (skill) mainExercises.push(skill);
      break;
      
    case 'active_recovery':
      // Thursday: Mobility only
      const mobility1 = getExerciseById('mobility-cat-cow');
      const mobility2 = getExerciseById('mobility-scapula-pushups');
      const stretch = getExerciseById('core-plank'); // Light core work
      
      if (mobility1) mainExercises.push(mobility1);
      if (mobility2) mainExercises.push(mobility2);
      if (stretch) mainExercises.push(stretch);
      break;
      
    default:
      // Default fallback
      const defaultPush = getExerciseById('push-normal');
      const defaultSquat = getExerciseById('squat-bodyweight');
      const defaultCore = getExerciseById('core-plank');
      
      if (defaultPush) mainExercises.push(defaultPush);
      if (defaultSquat) mainExercises.push(defaultSquat);
      if (defaultCore) mainExercises.push(defaultCore);
  }
  
  return mainExercises.filter(Boolean);
}

function getProgressionExercise(path: 'push' | 'pull' | 'squat', week: number, fitnessLevel: string): Exercise | undefined {
  const exerciseId = getProgressionExercises(path, week);
  const exercise = getExerciseById(exerciseId);
  
  // Adjust reps/sets based on fitness level
  if (exercise && fitnessLevel === 'beginner' && exercise.reps) {
    return { ...exercise, reps: Math.max(1, Math.floor(exercise.reps * 0.7)) };
  } else if (exercise && fitnessLevel === 'advanced' && exercise.reps) {
    return { ...exercise, reps: Math.floor(exercise.reps * 1.3) };
  }
  
  return exercise;
}

// ==== MILITARY DRILL SERGEANT VOICE SCRIPTS ====
function generateVoiceScript(focus: string, exerciseCount: number): string[] {
  const scripts = {
    full_body_strength: [
      "Listen up, soldier! Today we dominate all muscle groups!",
      "Four rounds of triplets - push, pull, squat. No mercy!",
      "This is where champions are forged. Let's move!",
      "2 minutes rest between rounds. Make every rep count!"
    ],
    push_emphasis: [
      "Push day means push HARD! No weak reps allowed!",
      "We're building that chest and tricep strength today!",
      "Every push-up is a step closer to that one-arm goal!",
      "Feel the burn? That's weakness leaving your body!"
    ],
    pull_emphasis: [
      "Time to build that back strength, warrior!",
      "Pull-ups separate the strong from the weak!",
      "Grip that bar and show me what you're made of!",
      "Your lats will thank you later. Let's get it!"
    ],
    squat_emphasis: [
      "Leg day is the foundation of all strength!",
      "Those pistol squats won't master themselves!",
      "Single leg strength - that's elite territory!",
      "Every squat builds unshakeable power!"
    ],
    skill_integration: [
      "Skills day! Time to put it all together!",
      "Explosive power meets technical precision!",
      "This is where we forge elite athletes!",
      "Short and intense - maximum impact!"
    ],
    active_recovery: [
      "Recovery is part of the process, soldier!",
      "Mobility work builds bulletproof movement!",
      "We're preparing the body for tomorrow's battle!",
      "Slow and controlled. Quality over speed!"
    ]
  };
  
  return scripts[focus as keyof typeof scripts] || [
    "Time to work, soldier!",
    "No excuses, only results!",
    "Push yourself beyond limits!",
    "Champions are made in moments like this!"
  ];
}

function generateEliteWorkoutName(focus: string, week: number, fitnessLevel: string): string {
  const names = {
    full_body_strength: `Week ${week} - Full Body Domination`,
    push_emphasis: `Week ${week} - Push Power Protocol`,
    pull_emphasis: `Week ${week} - Pull Strength Squadron`,  
    squat_emphasis: `Week ${week} - Leg Power Legion`,
    skill_integration: `Week ${week} - Elite Integration`,
    active_recovery: `Week ${week} - Tactical Recovery`
  };
  
  const baseName = names[focus as keyof typeof names] || `Week ${week} - Elite Training`;
  return `${baseName} (${fitnessLevel.toUpperCase()})`;
}

function generateDrillSergeantDescription(daySchedule: any, week: number): string {
  const descriptions = {
    full_body_strength: `MONDAY MISSION: Full body triplets designed to build comprehensive strength. 4 rounds of push-pull-squat combinations with 2-minute strategic recovery. This is your foundation day - make it count!`,
    
    push_emphasis: `TUESDAY TARGET: Push emphasis training focused on building upper body pressing power. Progressive overload toward one-arm push-up mastery. Every rep brings you closer to elite status!`,
    
    pull_emphasis: `WEDNESDAY WARFARE: Pull-focused session building back strength and grip endurance. Systematic progression toward pull-up mastery. Your back muscles will become weapons!`,
    
    squat_emphasis: `FRIDAY FORCE: Single-leg focused training building toward pistol squat mastery. Balance, mobility, and strength combined into one elite movement pattern!`,
    
    skill_integration: `SATURDAY SKILLS: Integration day combining explosive power with technical precision. This is where we forge the complete athlete - short, intense, maximum impact!`,
    
    active_recovery: `THURSDAY TACTICS: Strategic recovery with mobility work and light movement. We're preparing your body for tomorrow's battles. Recovery is not rest - it's preparation!`
  };
  
  return descriptions[daySchedule.focus as keyof typeof descriptions] || 
    `Elite training session designed to push your limits and build real strength. No shortcuts, only results!`;
}

// ==== UTILITY FUNCTIONS ====
function generateWorkoutId(): string {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export the main function for use in the application
export { generateWorkout };

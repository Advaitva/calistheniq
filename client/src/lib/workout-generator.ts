import type { UserProfile, GenerateWorkoutRequest, Exercise } from '@shared/schema';
import { exercises, getExercisesByDifficulty, getExercisesByType } from './exercises';

interface GeneratedWorkout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  difficulty: string;
  type: string;
  description: string;
}

export function generateWorkout(request: GenerateWorkoutRequest): GeneratedWorkout {
  const { userProfile, workoutType = 'mixed', duration, isWeekend = false } = request;
  const targetDuration = duration || userProfile.dailyTimeAvailable;
  
  // Determine workout focus based on goals and day type
  const workoutFocus = determineWorkoutFocus(userProfile.goals, isWeekend, workoutType);
  
  // Get appropriate exercises
  const selectedExercises = selectExercises(
    userProfile.fitnessLevel,
    workoutFocus,
    targetDuration,
    isWeekend
  );
  
  // Generate workout structure
  const workoutStructure = createWorkoutStructure(
    selectedExercises,
    targetDuration,
    userProfile.fitnessLevel,
    isWeekend
  );
  
  return {
    id: generateWorkoutId(),
    name: generateWorkoutName(workoutFocus, isWeekend, userProfile.fitnessLevel),
    exercises: workoutStructure.exercises,
    duration: workoutStructure.duration,
    difficulty: userProfile.fitnessLevel,
    type: workoutFocus,
    description: generateWorkoutDescription(workoutStructure, workoutFocus)
  };
}

function determineWorkoutFocus(
  goals: unknown, 
  isWeekend: boolean, 
  preferredType: string
): string {
  if (preferredType !== 'mixed') {
    return preferredType;
  }
  
  const goalsArray = Array.isArray(goals) ? goals as string[] : [];
  
  if (isWeekend) {
    // Weekend focus on skills and flexibility
    if (goalsArray.includes('flexibility')) return 'flexibility';
    if (goalsArray.includes('strength')) return 'strength';
    return 'mixed';
  }
  
  // Workday focus based on primary goals
  if (goalsArray.includes('strength')) return 'strength';
  if (goalsArray.includes('endurance')) return 'endurance';
  return 'mixed';
}

function selectExercises(
  fitnessLevel: string,
  workoutFocus: string,
  targetDuration: number,
  isWeekend: boolean
): Exercise[] {
  const difficultyExercises = getExercisesByDifficulty(fitnessLevel as 'beginner' | 'intermediate' | 'advanced');
  
  let selectedExercises: Exercise[] = [];
  
  if (workoutFocus === 'strength') {
    selectedExercises = difficultyExercises.filter(ex => ex.type === 'strength');
  } else if (workoutFocus === 'endurance') {
    selectedExercises = difficultyExercises.filter(ex => ex.type === 'endurance');
  } else {
    // Mixed workout
    const strengthExercises = difficultyExercises.filter(ex => ex.type === 'strength');
    const enduranceExercises = difficultyExercises.filter(ex => ex.type === 'endurance');
    
    selectedExercises = [
      ...strengthExercises.slice(0, Math.ceil(strengthExercises.length * 0.7)),
      ...enduranceExercises.slice(0, Math.ceil(enduranceExercises.length * 0.3))
    ];
  }
  
  // Shuffle and limit based on duration
  const shuffled = selectedExercises.sort(() => 0.5 - Math.random());
  const exerciseCount = Math.min(
    Math.floor(targetDuration / 3), // Rough estimate: 3 minutes per exercise
    shuffled.length,
    isWeekend ? 6 : 8 // More variety on weekends
  );
  
  return shuffled.slice(0, exerciseCount);
}

function createWorkoutStructure(
  exercises: Exercise[],
  targetDuration: number,
  fitnessLevel: string,
  isWeekend: boolean
) {
  const isEMOM = !isWeekend && targetDuration <= 30; // Every Minute on the Minute for short weekday workouts
  const isCircuit = targetDuration > 30 || isWeekend;
  
  if (isEMOM) {
    return createEMOMWorkout(exercises, targetDuration, fitnessLevel);
  } else if (isCircuit) {
    return createCircuitWorkout(exercises, targetDuration, fitnessLevel);
  } else {
    return createStandardWorkout(exercises, targetDuration, fitnessLevel);
  }
}

function createEMOMWorkout(exercises: Exercise[], duration: number, fitnessLevel: string) {
  const rounds = duration;
  const exercisesPerRound = Math.min(3, exercises.length);
  const selectedExercises = exercises.slice(0, exercisesPerRound);
  
  // Adjust reps based on fitness level for EMOM
  const adjustedExercises = selectedExercises.map(exercise => ({
    ...exercise,
    reps: exercise.reps ? Math.floor(exercise.reps * (fitnessLevel === 'beginner' ? 0.7 : fitnessLevel === 'advanced' ? 1.3 : 1)) : exercise.reps,
    duration: exercise.duration ? Math.floor(exercise.duration * (fitnessLevel === 'beginner' ? 0.8 : fitnessLevel === 'advanced' ? 1.2 : 1)) : exercise.duration,
    sets: rounds,
    restTime: 60 - (exercise.duration || (exercise.reps ? exercise.reps * 2 : 30)) // Rest for remainder of minute
  }));
  
  return {
    exercises: adjustedExercises,
    duration,
    structure: 'EMOM',
    rounds
  };
}

function createCircuitWorkout(exercises: Exercise[], duration: number, fitnessLevel: string) {
  const rounds = Math.ceil(duration / 10); // 10 minutes per round approximately
  const workTime = 45;
  const restTime = 15;
  
  const adjustedExercises = exercises.map(exercise => ({
    ...exercise,
    duration: workTime,
    restTime: restTime,
    sets: rounds
  }));
  
  return {
    exercises: adjustedExercises,
    duration,
    structure: 'Circuit',
    rounds
  };
}

function createStandardWorkout(exercises: Exercise[], duration: number, fitnessLevel: string) {
  // Standard sets and reps workout
  const timePerExercise = duration / exercises.length;
  const sets = Math.max(2, Math.floor(timePerExercise / 3));
  
  const adjustedExercises = exercises.map(exercise => ({
    ...exercise,
    sets: Math.min(sets, exercise.sets || 3),
    restTime: fitnessLevel === 'beginner' ? 90 : fitnessLevel === 'advanced' ? 60 : 75
  }));
  
  return {
    exercises: adjustedExercises,
    duration,
    structure: 'Standard',
    rounds: 1
  };
}

function generateWorkoutName(focus: string, isWeekend: boolean, fitnessLevel: string): string {
  const timeOfWeek = isWeekend ? 'Weekend' : 'Weekday';
  const focusName = focus.charAt(0).toUpperCase() + focus.slice(1);
  const levelName = fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1);
  
  const workoutTypes = [
    `${timeOfWeek} ${focusName} Blast`,
    `${levelName} ${focusName} Circuit`,
    `${timeOfWeek} Warrior Workout`,
    `${focusName} Power Session`,
    `${levelName} Body Forge`
  ];
  
  return workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
}

function generateWorkoutDescription(workoutStructure: any, focus: string): string {
  const { structure, rounds, exercises } = workoutStructure;
  const exerciseCount = exercises.length;
  
  if (structure === 'EMOM') {
    return `${rounds}-minute EMOM with ${exerciseCount} exercises. Complete all exercises within each minute, then rest for the remainder.`;
  } else if (structure === 'Circuit') {
    return `${rounds}-round circuit with ${exerciseCount} exercises. Work for 45 seconds, rest for 15 seconds between exercises.`;
  } else {
    return `Complete all sets and reps for each exercise before moving to the next. Focus on proper form and controlled movements.`;
  }
}

function generateWorkoutId(): string {
  return `workout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

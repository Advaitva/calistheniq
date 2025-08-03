import type { Exercise } from '@shared/schema';

export const exercises: Exercise[] = [
  // Beginner Exercises
  {
    name: "Push-ups",
    type: "strength",
    reps: 8,
    sets: 3,
    restTime: 60,
    instructions: [
      "Start in a plank position with hands shoulder-width apart",
      "Lower your body until chest nearly touches the floor",
      "Push back up to starting position"
    ],
    formTips: [
      "Keep your core tight throughout the movement",
      "Maintain a straight line from head to heels",
      "Don't let your hips sag or pike up"
    ],
    difficulty: "beginner"
  },
  {
    name: "Bodyweight Squats",
    type: "strength",
    reps: 12,
    sets: 3,
    restTime: 45,
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower down as if sitting in a chair",
      "Push through heels to return to standing"
    ],
    formTips: [
      "Keep your chest up and core engaged",
      "Don't let knees cave inward",
      "Go as low as comfortable while maintaining form"
    ],
    difficulty: "beginner"
  },
  {
    name: "Plank",
    type: "strength",
    duration: 30,
    sets: 3,
    restTime: 30,
    instructions: [
      "Start in push-up position",
      "Hold your body in a straight line",
      "Breathe normally while maintaining position"
    ],
    formTips: [
      "Don't let hips sag or pike up",
      "Keep shoulders directly over elbows",
      "Engage your entire core"
    ],
    difficulty: "beginner"
  },
  {
    name: "Jumping Jacks",
    type: "endurance",
    duration: 45,
    sets: 3,
    restTime: 15,
    instructions: [
      "Start standing with feet together",
      "Jump while spreading legs and raising arms overhead",
      "Jump back to starting position"
    ],
    formTips: [
      "Land softly on the balls of your feet",
      "Keep a steady rhythm",
      "Engage your core throughout"
    ],
    difficulty: "beginner"
  },
  
  // Intermediate Exercises
  {
    name: "Pull-ups",
    type: "strength",
    reps: 6,
    sets: 3,
    restTime: 90,
    instructions: [
      "Hang from pull-up bar with palms facing away",
      "Pull your body up until chin clears the bar",
      "Lower yourself back to starting position"
    ],
    formTips: [
      "Use full range of motion",
      "Don't swing or use momentum",
      "Engage your back muscles, not just arms"
    ],
    difficulty: "intermediate"
  },
  {
    name: "Pike Push-ups",
    type: "strength",
    reps: 8,
    sets: 3,
    restTime: 60,
    instructions: [
      "Start in downward dog position",
      "Lower your head toward the ground",
      "Push back up to starting position"
    ],
    formTips: [
      "Keep legs as straight as possible",
      "Focus on shoulder strength",
      "Don't let elbows flare too wide"
    ],
    difficulty: "intermediate"
  },
  {
    name: "Burpees",
    type: "endurance",
    reps: 10,
    sets: 3,
    restTime: 60,
    instructions: [
      "Start standing, drop to squat position",
      "Jump feet back to plank, do a push-up",
      "Jump feet forward, then jump up with arms overhead"
    ],
    formTips: [
      "Maintain good form even when tired",
      "Land softly to protect joints",
      "Keep core engaged throughout"
    ],
    difficulty: "intermediate"
  },
  {
    name: "L-Sit Hold",
    type: "strength",
    duration: 15,
    sets: 3,
    restTime: 45,
    instructions: [
      "Sit with legs extended, hands beside hips",
      "Press down and lift your body off the ground",
      "Hold legs parallel to the floor"
    ],
    formTips: [
      "Keep shoulders down and back",
      "Press firmly through your hands",
      "Start with bent knees if needed"
    ],
    difficulty: "intermediate"
  },
  
  // Advanced Exercises
  {
    name: "Handstand Push-ups",
    type: "strength",
    reps: 5,
    sets: 3,
    restTime: 120,
    instructions: [
      "Get into handstand position against wall",
      "Lower head toward ground with control",
      "Push back up to handstand position"
    ],
    formTips: [
      "Use wall for support initially",
      "Keep core tight throughout",
      "Focus on shoulder and arm strength"
    ],
    difficulty: "advanced"
  },
  {
    name: "Muscle-ups",
    type: "strength",
    reps: 3,
    sets: 3,
    restTime: 180,
    instructions: [
      "Start hanging from pull-up bar",
      "Pull up explosively and transition over the bar",
      "Lower yourself back to starting position"
    ],
    formTips: [
      "Generate power from the bottom",
      "Lean forward during transition",
      "Practice the transition movement separately"
    ],
    difficulty: "advanced"
  },
  {
    name: "Pistol Squats",
    type: "strength",
    reps: 5,
    sets: 3,
    restTime: 90,
    instructions: [
      "Stand on one leg with other leg extended forward",
      "Lower down to squat on single leg",
      "Push back up to standing position"
    ],
    formTips: [
      "Keep extended leg straight and elevated",
      "Use arms for balance",
      "Control the descent"
    ],
    difficulty: "advanced"
  },
  {
    name: "Human Flag Hold",
    type: "strength",
    duration: 10,
    sets: 3,
    restTime: 120,
    instructions: [
      "Grip vertical pole with hands stacked",
      "Lift body horizontally parallel to ground",
      "Hold position with body straight"
    ],
    formTips: [
      "Top hand pulls, bottom hand pushes",
      "Keep body in straight line",
      "Build up core and lat strength first"
    ],
    difficulty: "advanced"
  }
];

export const getExercisesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Exercise[] => {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByType = (type: string): Exercise[] => {
  return exercises.filter(exercise => exercise.type === type);
};

export const getRandomExercises = (count: number, difficulty?: 'beginner' | 'intermediate' | 'advanced'): Exercise[] => {
  const availableExercises = difficulty ? getExercisesByDifficulty(difficulty) : exercises;
  const shuffled = [...availableExercises].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

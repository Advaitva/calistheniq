import type { Exercise } from '@shared/schema';

// 12-Week Calisthenics Progression Plan - Elite Training System
// Based on military drill sergeant intensity with zero-barrier progression

export const exercises: Exercise[] = [
  // ==== PUSH PROGRESSION (One-Arm Push-Up Path) ====
  // Beginner Level
  {
    id: "push-normal",
    name: "Normal Push-Ups",
    type: "strength",
    reps: 12,
    sets: 3,
    restTime: 60,
    instructions: [
      "Start in plank position, hands shoulder-width apart",
      "Lower chest to floor with controlled 2-second descent",
      "Push up explosively in 1 second",
      "Maintain straight line from head to heels"
    ],
    formTips: [
      "Keep core tight throughout movement",
      "Don't let hips sag or pike up",
      "Full range of motion - chest touches floor",
      "2-0-1-0 tempo for strength gains"
    ],
    difficulty: "beginner",
    muscleGroups: ["chest", "shoulders", "triceps", "core"],
    equipment: []
  },
  {
    id: "push-diamond",
    name: "Diamond Push-Ups",
    type: "strength",
    reps: 8,
    sets: 3,
    restTime: 90,
    instructions: [
      "Form diamond shape with thumbs and forefingers",
      "Position hands under chest center",
      "Lower with control, keeping elbows close to body",
      "Push up with explosive power"
    ],
    formTips: [
      "Keep diamond tight under chest",
      "Don't let elbows flare wide",
      "More tricep focus than regular push-ups",
      "Master regular push-ups first"
    ],
    difficulty: "intermediate",
    muscleGroups: ["triceps", "chest", "shoulders"],
    equipment: []
  },
  {
    id: "push-archer",
    name: "Archer Push-Ups",
    type: "strength",
    reps: 4,
    sets: 4,
    restTime: 120,
    instructions: [
      "Start wide grip, shift weight to one arm",
      "Lower while extending opposite arm straight",
      "Push up using working arm primarily",
      "Alternate sides or complete all reps one side"
    ],
    formTips: [
      "Supporting arm stays straight like an archer's bow",
      "Working arm does 80% of the work",
      "Progress slowly - very demanding exercise",
      "Record yourself to check form"
    ],
    difficulty: "advanced",
    muscleGroups: ["chest", "shoulders", "triceps", "core"],
    equipment: []
  },
  {
    id: "push-one-arm",
    name: "One-Arm Push-Up",
    type: "strength",
    reps: 1,
    sets: 5,
    restTime: 180,
    instructions: [
      "Position working hand under chest center",
      "Spread legs wide for stability",
      "Keep non-working arm behind back",
      "Lower with perfect control, push up with full power"
    ],
    formTips: [
      "Takes 8-12 weeks to achieve first rep",
      "Practice negatives first (4-5 second descents)",
      "Keep core rock solid - no twisting",
      "Master archer push-ups before attempting"
    ],
    difficulty: "advanced",
    muscleGroups: ["chest", "shoulders", "triceps", "core"],
    equipment: []
  },

  // ==== PULL PROGRESSION (Pull-Up Path) ====
  // Beginner Level
  {
    id: "pull-australian",
    name: "Australian Pull-Ups",
    type: "strength",
    reps: 10,
    sets: 4,
    restTime: 60,
    instructions: [
      "Hang under bar with feet on ground",
      "Body straight from head to heels",
      "Pull chest to bar, squeeze shoulder blades",
      "Lower with control"
    ],
    formTips: [
      "Higher bar = easier, lower = harder",
      "Keep body rigid like a plank",
      "Pull with back muscles, not just arms",
      "Perfect for building pull-up strength"
    ],
    difficulty: "beginner",
    muscleGroups: ["back", "biceps", "rear delts"],
    equipment: ["pull-up bar", "low bar"]
  },
  {
    id: "pull-negative",
    name: "Negative Pull-Ups",
    type: "strength",
    reps: 5,
    sets: 3,
    restTime: 90,
    instructions: [
      "Jump or step up to chin-over-bar position",
      "Lower yourself very slowly (5 seconds minimum)",
      "Focus on control throughout entire descent",
      "Step down and repeat"
    ],
    formTips: [
      "5-second descent minimum for strength gains",
      "Don't drop - control the entire movement",
      "This builds the strength for full pull-ups",
      "Most important pull-up progression exercise"
    ],
    difficulty: "intermediate",
    muscleGroups: ["back", "biceps", "forearms"],
    equipment: ["pull-up bar"]
  },
  {
    id: "pull-assisted",
    name: "Band Assisted Pull-Ups",
    type: "strength",
    reps: 8,
    sets: 4,
    restTime: 90,
    instructions: [
      "Loop resistance band around bar and under feet",
      "Hang with arms fully extended",
      "Pull up until chin clears bar",
      "Lower with control to full hang"
    ],
    formTips: [
      "Band provides help at bottom, less at top",
      "Focus on pulling with back, not arms",
      "Use progressively thinner bands",
      "Bridge between negatives and full pull-ups"
    ],
    difficulty: "intermediate",
    muscleGroups: ["back", "biceps", "rear delts"],
    equipment: ["pull-up bar", "resistance band"]
  },
  {
    id: "pull-full",
    name: "Pull-Ups",
    type: "strength",
    reps: 5,
    sets: 3,
    restTime: 120,
    instructions: [
      "Hang from bar with arms fully extended",
      "Pull body up until chin clears bar",
      "Lower with control to full hang",
      "No swinging or kipping"
    ],
    formTips: [
      "Dead hang start and finish",
      "Pull with back, squeeze shoulder blades",
      "Chin must clear bar completely",
      "Quality over quantity - perfect form"
    ],
    difficulty: "advanced",
    muscleGroups: ["back", "biceps", "core"],
    equipment: ["pull-up bar"]
  },

  // ==== SQUAT PROGRESSION (Pistol Squat Path) ====
  {
    id: "squat-bodyweight",
    name: "Bodyweight Squats",
    type: "strength",
    reps: 20,
    sets: 3,
    restTime: 45,
    instructions: [
      "Stand with feet shoulder-width apart",
      "Lower as if sitting in invisible chair",
      "Keep chest up, knees track over toes",
      "Drive through heels to stand"
    ],
    formTips: [
      "Go as low as comfortable with good form",
      "Don't let knees cave inward",
      "Weight on heels, not toes",
      "Core engaged throughout movement"
    ],
    difficulty: "beginner",
    muscleGroups: ["quads", "glutes", "hamstrings"],
    equipment: []
  },
  {
    id: "squat-deep",
    name: "Deep Squats",
    type: "strength",
    reps: 15,
    sets: 4,
    restTime: 60,
    instructions: [
      "Squat down as low as possible",
      "Aim for hamstrings to calves",
      "Hold bottom position briefly",
      "Stand up with control"
    ],
    formTips: [
      "Work on ankle mobility daily",
      "Heels stay flat on ground",
      "Deep squats prepare for pistol squats",
      "Quality depth over quantity"
    ],
    difficulty: "intermediate",
    muscleGroups: ["quads", "glutes", "calves"],
    equipment: []
  },
  {
    id: "squat-bulgarian-split",
    name: "Bulgarian Split Squats",
    type: "strength",
    reps: 8,
    sets: 3,
    restTime: 60,
    instructions: [
      "Place rear foot on elevated surface",
      "Lower into lunge position",
      "Drive through front heel to return",
      "Complete all reps before switching legs"
    ],
    formTips: [
      "Most weight on front leg",
      "Don't push off back foot",
      "Builds single-leg strength for pistols",
      "Keep torso upright"
    ],
    difficulty: "intermediate",
    muscleGroups: ["quads", "glutes", "hamstrings"],
    equipment: ["bench", "chair"]
  },
  {
    id: "squat-box-pistol",
    name: "Box Pistol Squats",
    type: "strength",
    reps: 5,
    sets: 3,
    restTime: 90,
    instructions: [
      "Stand on box with one leg hanging off",
      "Extend hanging leg forward",
      "Lower until touching box lightly",
      "Drive up through standing leg"
    ],
    formTips: [
      "Box limits depth - builds confidence",
      "Extended leg stays straight",
      "Don't rely on box - just light touch",
      "Progress to lower boxes over time"
    ],
    difficulty: "advanced",
    muscleGroups: ["quads", "glutes", "core"],
    equipment: ["box", "platform"]
  },
  {
    id: "squat-pistol",
    name: "Pistol Squats",
    type: "strength",
    reps: 3,
    sets: 5,
    restTime: 120,
    instructions: [
      "Stand on one leg, other leg extended forward",
      "Lower down keeping extended leg off ground",
      "Go as low as possible with control",
      "Drive up through heel to standing"
    ],
    formTips: [
      "Ultimate single-leg strength exercise",
      "Requires mobility, balance, and strength",
      "Takes months to master - be patient",
      "Practice balance work separately"
    ],
    difficulty: "advanced",
    muscleGroups: ["quads", "glutes", "core", "calves"],
    equipment: []
  },

  // ==== CORE & STABILITY ====
  {
    id: "core-plank",
    name: "Plank Hold",
    type: "strength",
    duration: 60,
    sets: 3,
    restTime: 30,
    instructions: [
      "Start in push-up position",
      "Hold body in perfect straight line",
      "Breathe normally while maintaining position",
      "Don't let hips sag or pike up"
    ],
    formTips: [
      "Engage entire core, not just abs",
      "Keep shoulders over elbows",
      "Quality over time - perfect form first",
      "Build to 60+ seconds for strength gains"
    ],
    difficulty: "beginner",
    muscleGroups: ["core", "shoulders"],
    equipment: []
  },
  {
    id: "core-hollow-body",
    name: "Hollow Body Hold",
    type: "strength",
    duration: 30,
    sets: 3,
    restTime: 30,
    instructions: [
      "Lie on back, press lower back to floor",
      "Lift shoulders and legs off ground",
      "Form a 'hollow' or banana shape",
      "Hold position while breathing"
    ],
    formTips: [
      "Lower back stays glued to floor",
      "The more you 'hollow' the harder it gets",
      "Essential for advanced calisthenics",
      "Start with knees bent if needed"
    ],
    difficulty: "intermediate",
    muscleGroups: ["core", "hip flexors"],
    equipment: []
  },

  // ==== DYNAMIC & EXPLOSIVE ====
  {
    id: "explosive-push-up",
    name: "Explosive Push-Ups",
    type: "strength",
    reps: 6,
    sets: 3,
    restTime: 90,
    instructions: [
      "Start in regular push-up position",
      "Lower with control",
      "Explode up with maximum force",
      "Hands may leave ground at top"
    ],
    formTips: [
      "Focus on explosive upward movement",
      "Land softly if hands leave ground",
      "Builds power for advanced moves",
      "Quality explosive movement over speed"
    ],
    difficulty: "intermediate",
    muscleGroups: ["chest", "shoulders", "triceps"],
    equipment: []
  },
  {
    id: "explosive-jump-squat",
    name: "Jump Squats",
    type: "endurance",
    reps: 10,
    sets: 3,
    restTime: 45,
    instructions: [
      "Start in squat position",
      "Jump up with maximum effort",
      "Land softly and immediately squat again",
      "Maintain rhythm and power"
    ],
    formTips: [
      "Land soft - absorb impact",
      "Keep knees aligned over toes",
      "Jump for height, not just speed",
      "Builds explosive leg power"
    ],
    difficulty: "intermediate",
    muscleGroups: ["quads", "glutes", "calves"],
    equipment: []
  },

  // ==== WARM-UP & MOBILITY ====
  {
    id: "warmup-arm-circles",
    name: "Arm Circles",
    type: "warmup",
    duration: 30,
    sets: 1,
    restTime: 0,
    instructions: [
      "Extend arms parallel to ground",
      "Make small circles, gradually increase size",
      "Switch directions after 15 seconds",
      "Keep shoulders relaxed"
    ],
    formTips: [
      "Start small, build to large circles",
      "Both directions equally",
      "Prepares shoulders for training",
      "Part of every warm-up routine"
    ],
    difficulty: "beginner",
    muscleGroups: ["shoulders"],
    equipment: []
  },
  {
    id: "warmup-jumping-jacks",
    name: "Jumping Jacks",
    type: "warmup",
    duration: 60,
    sets: 1,
    restTime: 0,
    instructions: [
      "Start standing with feet together",
      "Jump while spreading legs and raising arms",
      "Jump back to starting position",
      "Maintain steady rhythm"
    ],
    formTips: [
      "Land softly on balls of feet",
      "Keep core engaged",
      "Raises heart rate for training",
      "Classic warm-up movement"
    ],
    difficulty: "beginner",
    muscleGroups: ["cardio"],
    equipment: []
  },
  {
    id: "mobility-cat-cow",
    name: "Cat-Cow Stretch",
    type: "mobility",
    duration: 60,
    sets: 1,
    restTime: 0,
    instructions: [
      "Start on hands and knees",
      "Arch back and look up (cow)",
      "Round back and look down (cat)",
      "Flow smoothly between positions"
    ],
    formTips: [
      "Move slowly and controlled",
      "Feel the stretch through entire spine",
      "Essential for spine health",
      "Do before every workout"
    ],
    difficulty: "beginner",
    muscleGroups: ["spine", "core"],
    equipment: []
  },
  {
    id: "mobility-scapula-pushups",
    name: "Scapula Push-Ups",
    type: "mobility",
    reps: 10,
    sets: 2,
    restTime: 30,
    instructions: [
      "Start in push-up position",
      "Keep arms straight throughout",
      "Push shoulder blades apart and together",
      "Focus on scapular movement only"
    ],
    formTips: [
      "Arms stay locked - no elbow bending",
      "Movement comes from shoulder blades",
      "Activates muscles for push-ups",
      "Improves shoulder health"
    ],
    difficulty: "beginner",
    muscleGroups: ["shoulders", "back"],
    equipment: []
  }
];

// ==== 12-WEEK PROGRESSION PATHS ====
export const PROGRESSION_PATHS = {
  push: [
    'push-normal',        // Week 1-3: Master 12+ reps
    'push-diamond',       // Week 4-6: Build tricep strength  
    'push-archer',        // Week 7-10: Unilateral preparation
    'push-one-arm'        // Week 11-12: Elite goal achievement
  ],
  pull: [
    'pull-australian',    // Week 1-3: Build back strength
    'pull-negative',      // Week 4-6: Eccentric strength
    'pull-assisted',      // Week 7-8: Bridge to full
    'pull-full'          // Week 9-12: Master pull-ups
  ],
  squat: [
    'squat-bodyweight',   // Week 1-2: Foundation
    'squat-deep',         // Week 3-5: Mobility & depth
    'squat-bulgarian-split', // Week 6-8: Single leg prep
    'squat-box-pistol',   // Week 9-11: Assisted pistol
    'squat-pistol'       // Week 12: Elite achievement
  ]
};

// ==== WEEKLY SCHEDULE STRUCTURE ====
export const WEEKLY_SCHEDULE = {
  monday: {
    focus: 'full_body_strength',
    duration: 60,
    structure: 'triplets',
    exercises: ['push', 'pull', 'squat'],
    rounds: 4,
    rest: 120
  },
  tuesday: {
    focus: 'push_emphasis', 
    duration: 45,
    structure: 'strength_focus',
    exercises: ['push', 'explosive', 'core'],
    rest: 90
  },
  wednesday: {
    focus: 'pull_emphasis',
    duration: 45, 
    structure: 'strength_focus',
    exercises: ['pull', 'mobility'],
    rest: 90
  },
  thursday: {
    focus: 'active_recovery',
    duration: 45,
    structure: 'mobility_flow',
    exercises: ['mobility', 'stretching'],
    rest: 30
  },
  friday: {
    focus: 'squat_emphasis',
    duration: 45,
    structure: 'strength_focus', 
    exercises: ['squat', 'balance'],
    rest: 90
  },
  saturday: {
    focus: 'skill_integration',
    duration: 30,
    structure: 'combinations',
    exercises: ['explosive', 'combinations'],
    rest: 60
  },
  sunday: {
    focus: 'rest',
    duration: 0,
    structure: 'complete_rest'
  }
};

// ==== HELPER FUNCTIONS ====
export const getExercisesByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Exercise[] => {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByType = (type: string): Exercise[] => {
  return exercises.filter(exercise => exercise.type === type);
};

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};

export const getProgressionExercises = (path: 'push' | 'pull' | 'squat', week: number): string => {
  const pathExercises = PROGRESSION_PATHS[path];
  if (week <= 3) return pathExercises[0];
  if (week <= 6) return pathExercises[1]; 
  if (week <= 10) return pathExercises[2];
  return pathExercises[3] || pathExercises[pathExercises.length - 1];
};

export const getDaySchedule = (day: string) => {
  const dayLower = day.toLowerCase();
  return WEEKLY_SCHEDULE[dayLower as keyof typeof WEEKLY_SCHEDULE];
};

export const getWarmupExercises = (): Exercise[] => {
  return exercises.filter(ex => ex.type === 'warmup' || ex.type === 'mobility');
};

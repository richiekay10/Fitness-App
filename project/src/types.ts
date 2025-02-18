export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility';
  targetMuscles: string[];
  defaultSets?: number;
  defaultReps?: number;
  defaultDuration?: number; // in minutes
}

export interface WorkoutSet {
  id: string;
  exerciseId: string;
  weight?: number;
  reps?: number;
  duration?: number; // in minutes
  distance?: number; // in kilometers
  completed: boolean;
}

export interface Workout {
  id: string;
  date: string;
  title: string;
  notes?: string;
  sets: WorkoutSet[];
  duration: number; // in minutes
  status: 'in-progress' | 'completed';
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number;
  streakDays: number;
  personalBests: {
    exerciseId: string;
    weight: number;
    date: string;
  }[];
}
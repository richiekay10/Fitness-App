import { Exercise } from './types';

export const exercises: Exercise[] = [
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'strength',
    targetMuscles: ['chest', 'shoulders', 'triceps'],
    defaultSets: 3,
    defaultReps: 10
  },
  {
    id: 'squat',
    name: 'Squat',
    category: 'strength',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes'],
    defaultSets: 3,
    defaultReps: 10
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'strength',
    targetMuscles: ['back', 'hamstrings', 'glutes'],
    defaultSets: 3,
    defaultReps: 8
  },
  {
    id: 'running',
    name: 'Running',
    category: 'cardio',
    targetMuscles: ['legs', 'heart'],
    defaultDuration: 30
  },
  {
    id: 'yoga',
    name: 'Yoga Flow',
    category: 'flexibility',
    targetMuscles: ['full body'],
    defaultDuration: 20
  }
];

export const muscleGroups = [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'legs',
  'core',
  'full body'
];

export const categoryColors = {
  strength: 'bg-red-500',
  cardio: 'bg-blue-500',
  flexibility: 'bg-green-500'
};
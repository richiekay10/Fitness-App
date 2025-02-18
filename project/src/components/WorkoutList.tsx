import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, CheckCircle, Circle } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutListProps {
  workouts: Workout[];
  onUpdateWorkout: (workout: Workout) => void;
}

export function WorkoutList({ workouts, onUpdateWorkout }: WorkoutListProps) {
  if (workouts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts yet</h3>
        <p className="text-gray-500">Start by creating a new workout!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <motion.div
          key={workout.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">{workout.title}</h3>
            <button
              onClick={() => onUpdateWorkout({
                ...workout,
                status: workout.status === 'completed' ? 'in-progress' : 'completed'
              })}
              className="text-gray-400 hover:text-gray-600"
            >
              {workout.status === 'completed' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(workout.date).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {workout.duration} min
            </div>
          </div>

          {workout.notes && (
            <p className="mt-2 text-sm text-gray-600">{workout.notes}</p>
          )}

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Exercises</h4>
            <div className="space-y-2">
              {workout.sets.map((set) => (
                <div
                  key={set.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{set.exerciseId}</span>
                  <span className="text-gray-500">
                    {set.weight ? `${set.weight}kg x ` : ''}
                    {set.reps ? `${set.reps} reps` : ''}
                    {set.duration ? `${set.duration} min` : ''}
                    {set.distance ? `${set.distance}km` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
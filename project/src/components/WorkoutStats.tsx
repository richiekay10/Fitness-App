import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, Clock, Trophy } from 'lucide-react';
import { Workout } from '../types';
import { exercises } from '../data';

interface WorkoutStatsProps {
  workouts: Workout[];
}

export function WorkoutStats({ workouts }: WorkoutStatsProps) {
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
  
  const completedWorkouts = workouts.filter(w => w.status === 'completed');
  const completionRate = totalWorkouts > 0 
    ? Math.round((completedWorkouts.length / totalWorkouts) * 100) 
    : 0;

  // Calculate personal bests for each exercise
  const personalBests = exercises
    .map(exercise => {
      const maxWeight = Math.max(
        ...workouts.flatMap(w => 
          w.sets
            .filter(s => s.exerciseId === exercise.id && s.weight)
            .map(s => s.weight || 0)
        ),
        0
      );

      return {
        exercise,
        maxWeight,
        date: workouts.find(w => 
          w.sets.some(s => s.exerciseId === exercise.id && s.weight === maxWeight)
        )?.date
      };
    })
    .filter(pb => pb.maxWeight > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Activity className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Total Workouts</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalWorkouts}</p>
          <p className="text-sm text-gray-500 mt-1">
            {completionRate}% completion rate
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Total Duration</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalDuration} min</p>
          <p className="text-sm text-gray-500 mt-1">
            Avg. {totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0} min per workout
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Latest Workout</h3>
          </div>
          {workouts.length > 0 ? (
            <>
              <p className="text-lg font-medium text-gray-900">{workouts[0].title}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(workouts[0].date).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-gray-500">No workouts yet</p>
          )}
        </motion.div>
      </div>

      {personalBests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-medium text-gray-900">Personal Bests</h3>
          </div>
          <div className="space-y-4">
            {personalBests.map(({ exercise, maxWeight, date }) => (
              <div key={exercise.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                  <p className="text-sm text-gray-500">
                    {date ? new Date(date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-900">{maxWeight}kg</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
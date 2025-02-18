import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Exercise, Workout, WorkoutSet } from '../types';
import { exercises, categoryColors } from '../data';

interface NewWorkoutProps {
  onSave: (workout: Workout) => void;
}

export function NewWorkout({ onSave }: NewWorkoutProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<WorkoutSet[]>([]);

  const handleAddExercise = (exercise: Exercise) => {
    const newSet: WorkoutSet = {
      id: Math.random().toString(),
      exerciseId: exercise.id,
      weight: 0,
      reps: exercise.defaultReps,
      duration: exercise.defaultDuration,
      completed: false
    };
    setSelectedExercises(prev => [...prev, newSet]);
  };

  const handleRemoveExercise = (setId: string) => {
    setSelectedExercises(prev => prev.filter(set => set.id !== setId));
  };

  const handleUpdateSet = (setId: string, updates: Partial<WorkoutSet>) => {
    setSelectedExercises(prev =>
      prev.map(set =>
        set.id === setId ? { ...set, ...updates } : set
      )
    );
  };

  const handleSave = () => {
    if (!title || selectedExercises.length === 0) return;

    const workout: Workout = {
      id: Math.random().toString(),
      date: new Date().toISOString(),
      title,
      notes,
      sets: selectedExercises,
      duration: selectedExercises.reduce((acc, set) => acc + (set.duration || 0), 0),
      status: 'in-progress'
    };

    onSave(workout);
    setTitle('');
    setNotes('');
    setSelectedExercises([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Workout Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Morning Workout"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Any notes about this workout..."
          />
        </div>

        <div className="space-y-4">
          {selectedExercises.map((set) => {
            const exercise = exercises.find(e => e.id === set.exerciseId);
            if (!exercise) return null;

            return (
              <motion.div
                key={set.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                  <div className="mt-2 space-x-4">
                    {exercise.category === 'strength' && (
                      <>
                        <input
                          type="number"
                          value={set.weight || 0}
                          onChange={(e) => handleUpdateSet(set.id, { weight: Number(e.target.value) })}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Weight"
                        />
                        <input
                          type="number"
                          value={set.reps || 0}
                          onChange={(e) => handleUpdateSet(set.id, { reps: Number(e.target.value) })}
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Reps"
                        />
                      </>
                    )}
                    {(exercise.category === 'cardio' || exercise.category === 'flexibility') && (
                      <input
                        type="number"
                        value={set.duration || 0}
                        onChange={(e) => handleUpdateSet(set.id, { duration: Number(e.target.value) })}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Minutes"
                      />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveExercise(set.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Exercises</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <motion.button
              key={exercise.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAddExercise(exercise)}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50"
            >
              <div className={`w-10 h-10 rounded-lg ${categoryColors[exercise.category]} flex items-center justify-center`}>
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                <p className="text-sm text-gray-500">{exercise.targetMuscles.join(', ')}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!title || selectedExercises.length === 0}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Workout
        </button>
      </div>
    </div>
  );
}
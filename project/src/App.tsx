import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Calendar, History, Trophy, Plus } from 'lucide-react';
import { WorkoutList } from './components/WorkoutList';
import { NewWorkout } from './components/NewWorkout';
import { WorkoutStats } from './components/WorkoutStats';
import { Workout } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'workouts' | 'new' | 'stats'>('workouts');
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [workout, ...prev]);
    setActiveTab('workouts');
  };

  const updateWorkout = (updatedWorkout: Workout) => {
    setWorkouts(prev => 
      prev.map(w => w.id === updatedWorkout.id ? updatedWorkout : w)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dumbbell className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">FitTrack</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-8">
          <nav className="flex space-x-4 bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setActiveTab('workouts')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'workouts' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Workouts</span>
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'new' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>New Workout</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeTab === 'stats' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="w-5 h-5" />
              <span>Stats</span>
            </button>
          </nav>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'workouts' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WorkoutList workouts={workouts} onUpdateWorkout={updateWorkout} />
            </motion.div>
          )}

          {activeTab === 'new' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <NewWorkout onSave={addWorkout} />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <WorkoutStats workouts={workouts} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
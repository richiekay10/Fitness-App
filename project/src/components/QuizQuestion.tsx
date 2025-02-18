import { motion } from 'framer-motion';
import { Question } from '../types';
import clsx from 'clsx';
import { Timer } from './Timer';
import { difficultyColors } from '../data';
import { Badge } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  isCorrect: boolean | null;
  onTimeout: () => void;
  streak: number;
}

export function QuizQuestion({ 
  question, 
  selectedAnswer, 
  onSelectAnswer, 
  isCorrect, 
  onTimeout,
  streak 
}: QuizQuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-4">
        <Timer
          duration={question.timeLimit}
          onTimeout={onTimeout}
          isActive={selectedAnswer === null}
        />
        <div className="flex items-center space-x-4">
          <span className={clsx(
            'text-sm font-medium',
            difficultyColors[question.difficulty]
          )}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
          {streak > 0 && (
            <div className="flex items-center space-x-1">
              <Badge className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-yellow-500">
                Streak: {streak}
              </span>
            </div>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectAnswer(index)}
            className={clsx(
              'w-full p-4 text-left rounded-lg transition-colors',
              'hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500',
              selectedAnswer === index && isCorrect === null && 'bg-indigo-100',
              selectedAnswer === index && isCorrect && 'bg-green-100 border-green-500',
              selectedAnswer === index && isCorrect === false && 'bg-red-100 border-red-500',
              'disabled:cursor-not-allowed',
              selectedAnswer !== null && 'pointer-events-none'
            )}
            disabled={selectedAnswer !== null}
          >
            <span className="flex items-center">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 mr-3">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
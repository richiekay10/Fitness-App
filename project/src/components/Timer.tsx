import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  duration: number;
  onTimeout: () => void;
  isActive: boolean;
}

export function Timer({ duration, onTimeout, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onTimeout]);

  const progress = (timeLeft / duration) * 100;

  return (
    <div className="flex items-center space-x-2">
      <TimerIcon className="w-5 h-5 text-indigo-500" />
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="text-sm font-medium text-gray-600">{timeLeft}s</span>
    </div>
  );
}
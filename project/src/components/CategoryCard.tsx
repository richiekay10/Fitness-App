import { motion } from 'framer-motion';
import { Brain, Code, Globe, Palette } from 'lucide-react';
import { Category } from '../types';

const icons = {
  Brain,
  Code,
  Globe,
  Palette
};

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const Icon = icons[category.icon as keyof typeof icons];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden rounded-xl bg-white shadow-lg cursor-pointer group"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative p-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{category.name}</h3>
            <p className="text-white/80 text-sm">{category.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
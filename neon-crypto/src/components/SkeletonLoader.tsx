import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

// Skeleton de base
export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <motion.div
      className={`bg-white/5 rounded-lg ${className}`}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

// Skeleton pour les stats cards
export const SkeletonStatCard: React.FC = () => {
  return (
    <div className="bg-[#121212] border border-white/6 rounded-xl p-6 space-y-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
};

// Skeleton pour le graphique
export const SkeletonChart: React.FC = () => {
  return (
    <div className="bg-[#121212] border border-white/6 rounded-xl p-8 h-[500px] space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-48" />
      </div>
      <Skeleton className="h-[380px] w-full" />
    </div>
  );
};

// Skeleton pour le widget IA
export const SkeletonAI: React.FC = () => {
  return (
    <div className="bg-[#121212] border border-white/6 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
};

export default Skeleton;
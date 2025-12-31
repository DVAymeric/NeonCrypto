import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-6 text-gray-400"
      >
        {icon || <AlertCircle size={64} />}
      </motion.div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-base text-gray-600 max-w-md mb-6">
        {description}
      </p>
      
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default EmptyState;
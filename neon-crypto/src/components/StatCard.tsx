import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import Card from '../components/Card';
import Badge from '../components/Bagde';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  trend = "0%", 
  icon,
  delay = 0 
}) => {
  const isPositive = !trend.includes("-");

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card variant="default" padding="lg" hoverable>
        <div className="flex justify-between items-start mb-6">
          <motion.div 
            className="p-4 bg-white/5 rounded-xl text-gray-400"
            whileHover={{ 
              backgroundColor: "rgba(112, 0, 255, 0.2)",
              color: "#ffffff",
              scale: 1.05
            }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          
          <Badge 
            variant={isPositive ? 'success' : 'danger'}
            size="md"
            icon={isPositive 
              ? <ArrowUpRight size={14} strokeWidth={3} /> 
              : <ArrowDownRight size={14} strokeWidth={3} />
            }
            animated
          >
            <span className="font-mono tabular-nums">{trend}</span>
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">
            {label}
          </p>
          <motion.p 
            className="text-4xl font-black text-white tracking-tight tabular-nums"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;
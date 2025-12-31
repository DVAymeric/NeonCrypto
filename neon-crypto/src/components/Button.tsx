import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  
  const variants = {
    primary: 'bg-[#7000FF] hover:bg-[#8000FF] text-white shadow-sm hover:shadow-md',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/15',
    ghost: 'hover:bg-white/5 text-zinc-400 hover:text-white',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',      // 36px
    md: 'h-11 px-6 text-base',   // 44px ✅
    lg: 'h-14 px-8 text-lg',     // 56px
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-semibold
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      whileHover={!disabled && !loading ? { y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;
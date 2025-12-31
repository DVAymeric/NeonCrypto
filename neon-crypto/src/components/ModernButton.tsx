import React from 'react';
import { Loader2 } from 'lucide-react';

interface ModernButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string;
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  icon,
  className = '',
}) => {
  
  const variants = {
    primary: 'bg-[#7000FF] hover:bg-[#8000FF] text-white shadow-sm hover:shadow-lg hover:shadow-[#7000FF]/30',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    outline: 'bg-white border-2 border-gray-300 hover:border-[#7000FF] text-gray-900 hover:text-[#7000FF]',
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm',      // 40px
    md: 'h-12 px-6 text-base',    // 48px
    lg: 'h-14 px-8 text-lg',      // 56px
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2.5
    rounded-xl font-semibold
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {!loading && icon && icon}
      {children}
    </button>
  );
};

export default ModernButton;
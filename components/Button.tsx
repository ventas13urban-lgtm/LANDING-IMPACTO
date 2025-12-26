import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  // Added shadow-[...] classes and increased duration for shadow
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-sm font-sans font-semibold tracking-wide transition-all duration-300 ease-out disabled:opacity-50 shadow-[0_0_25px_-5px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_-5px_rgba(0,0,0,0.7)] transition-shadow duration-1000";
  
  const variants = {
    primary: "bg-impacto-blue text-white hover:bg-blue-700 active:scale-[0.98]",
    secondary: "bg-impacto-dark text-white hover:bg-gray-900 active:scale-[0.98]",
    outline: "border border-impacto-dark text-impacto-dark hover:bg-impacto-dark hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

import React from 'react';
import { cn } from '@/lib/utils';

interface BlurCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'dark';
  intensity?: 'light' | 'medium' | 'heavy';
  hoverable?: boolean;
}

export const BlurCard = ({
  children,
  className,
  variant = 'default',
  intensity = 'medium',
  hoverable = false,
  ...props
}: BlurCardProps) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'default':
        return 'bg-white/70 dark:bg-black/50';
      case 'bordered':
        return 'bg-white/60 dark:bg-black/40 border border-white/20 dark:border-white/10';
      case 'dark':
        return 'bg-black/50 dark:bg-white/10';
      default:
        return 'bg-white/70 dark:bg-black/50';
    }
  };

  const getBlurClass = () => {
    switch (intensity) {
      case 'light':
        return 'backdrop-blur-sm';
      case 'medium':
        return 'backdrop-blur-md';
      case 'heavy':
        return 'backdrop-blur-xl';
      default:
        return 'backdrop-blur-md';
    }
  };

  const getHoverClass = () => {
    if (!hoverable) return '';
    
    switch (variant) {
      case 'default':
        return 'hover:bg-white/80 dark:hover:bg-black/60 transition-all duration-300';
      case 'bordered':
        return 'hover:bg-white/70 dark:hover:bg-black/50 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300';
      case 'dark':
        return 'hover:bg-black/60 dark:hover:bg-white/20 transition-all duration-300';
      default:
        return 'hover:bg-white/80 dark:hover:bg-black/60 transition-all duration-300';
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl shadow-lg',
        getBackgroundClass(),
        getBlurClass(),
        getHoverClass(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

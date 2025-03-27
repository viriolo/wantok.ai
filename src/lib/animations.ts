
import { useEffect, useState } from 'react';

type AnimationProps = {
  initialClass: string;
  animateClass: string;
  threshold?: number;
  delay?: number;
};

export const useScrollAnimation = ({
  initialClass,
  animateClass,
  threshold = 0.1,
  delay = 0
}: AnimationProps) => {
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(elementRef);

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [elementRef, threshold, delay]);

  const className = isVisible ? animateClass : initialClass;

  return { className, ref: setElementRef };
};

export const staggerChildren = (delay = 100) => {
  return (index: number) => ({
    animationDelay: `${index * delay}ms`,
  });
};

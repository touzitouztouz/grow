
import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  readOnly?: boolean;
}

const Star = ({ filled, className }: { filled: boolean, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={cn('w-6 h-6', className, filled ? 'text-yellow-400' : 'text-border')}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);


const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, count = 5, value = 0, onValueChange, readOnly = false, ...props }, ref) => {
    const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
    
    const handleStarClick = (index: number) => {
      if (!readOnly && onValueChange) {
        onValueChange(index + 1);
      }
    };
    
    const handleStarHover = (index: number) => {
      if (!readOnly) {
        setHoverValue(index + 1);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-1', readOnly ? 'cursor-default' : 'cursor-pointer', className)}
        onMouseLeave={() => setHoverValue(undefined)}
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            className="focus:outline-none focus:ring-2 focus:ring-accent-primary rounded-sm"
            onClick={() => handleStarClick(i)}
            onMouseEnter={() => handleStarHover(i)}
            disabled={readOnly}
            aria-label={`Rate ${i + 1} out of ${count}`}
          >
            <Star filled={(hoverValue || value) > i} />
          </button>
        ))}
      </div>
    );
  }
);

Rating.displayName = 'Rating';

export { Rating };
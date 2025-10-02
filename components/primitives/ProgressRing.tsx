
import React from 'react';
import { cn } from '../lib/utils';

interface ProgressRingProps extends React.SVGAttributes<SVGSVGElement> {
  value?: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing = React.forwardRef<SVGSVGElement, ProgressRingProps>(
  ({ className, value = 0, size = 120, strokeWidth = 10, ...props }, ref) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={cn('transform -rotate-90', className)}
        {...props}
      >
        <circle
          className="text-border"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-accent-secondary transition-all duration-300 ease-in-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
    );
  }
);
ProgressRing.displayName = 'ProgressRing';

export { ProgressRing };
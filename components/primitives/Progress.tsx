
import React from 'react';
import { cn } from '../lib/utils';

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number | null }
>(({ className, value, ...props }, ref) => (
  <div
    ref={ref}
    role="progressbar"
    aria-valuenow={value ?? undefined}
    aria-valuemin={0}
    aria-valuemax={100}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-sidebar',
      className
    )}
    {...props}
  >
    <div
      className="h-full w-full flex-1 bg-accent-secondary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));
Progress.displayName = 'Progress';

export { Progress };
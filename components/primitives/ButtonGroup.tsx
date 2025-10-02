
import React from 'react';
import { cn } from '../lib/utils';

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex items-center',
      // Complex but powerful selector to handle button rounding within the group
      '[&>button]:rounded-none [&>button:first-child]:rounded-l-custom [&>button:last-child]:rounded-r-custom [&>button:not(:first-child)]:-ml-px',
      className
    )}
    role="group"
    {...props}
  />
));

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };

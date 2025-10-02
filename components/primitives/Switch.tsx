
import React from 'react';
import { cn } from '../lib/utils';

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { checked: boolean, onCheckedChange?: (checked: boolean) => void }
>(({ className, checked, onCheckedChange, ...props }, ref) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    data-state={checked ? 'checked' : 'unchecked'}
    ref={ref}
    onClick={() => onCheckedChange?.(!checked)}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      'ring-offset-background',
      'data-[state=checked]:bg-accent-secondary',
      'data-[state=unchecked]:bg-border',
      className
    )}
    {...props}
  >
    <span
      data-state={checked ? 'checked' : 'unchecked'}
      className={cn(
        'pointer-events-none block h-5 w-5 rounded-full bg-component shadow-lg ring-0 transition-transform',
        'data-[state=checked]:translate-x-5',
        'data-[state=unchecked]:translate-x-0'
      )}
    />
  </button>
));
Switch.displayName = 'Switch';

export { Switch };
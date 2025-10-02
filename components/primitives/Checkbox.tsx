
import React from 'react';
import { cn } from '../lib/utils';
import Icon from '../Icon';

const Checkbox = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { checked: boolean | 'indeterminate' }
>(({ className, checked, ...props }, ref) => (
  <button
    type="button"
    role="checkbox"
    // Fix: Correctly map 'indeterminate' state to 'mixed' for `aria-checked` attribute.
    aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
    data-state={checked === 'indeterminate' ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <div className="h-full w-full flex items-center justify-center">
        {/* Fix: Changed comparison from 'checked' string to `true` boolean to correctly display the checkmark icon. */}
        {checked === true && <Icon name="check-icon" className="h-3 w-3" />}
        {checked === 'indeterminate' && <Icon name="minus-icon" className="h-2 w-2" />}
    </div>
  </button>
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };
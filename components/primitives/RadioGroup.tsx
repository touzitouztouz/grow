
import React, { createContext, useContext } from 'react';
import { cn } from '../lib/utils';

interface RadioGroupContextType {
  value: string;
  onValueChange: (value: string) => void;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string; onValueChange: (value: string) => void; name?: string }
>(({ className, value, onValueChange, name, ...props }, ref) => {
  const contextValue = { value, onValueChange, name };
  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn('grid gap-2', className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup');
  }
  const isChecked = context.value === value;

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isChecked}
      data-state={isChecked ? 'checked' : 'unchecked'}
      onClick={() => context.onValueChange(value)}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        {isChecked && <div className="h-2.5 w-2.5 rounded-full bg-current text-current" />}
      </div>
    </button>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
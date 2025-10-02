
import React, { createContext, useContext, useState } from 'react';
import { cn } from '../lib/utils';
import Icon from '../Icon';

interface AccordionContextType {
  value: string | string[];
  onValueChange: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

const Accordion = ({
  children,
  type = 'single',
  defaultValue,
  className,
}: React.PropsWithChildren<{
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
}>) => {
  const [value, setValue] = useState<string | string[]>(
    defaultValue || (type === 'multiple' ? [] : '')
  );

  const onValueChange = (itemValue: string) => {
    if (type === 'multiple') {
      setValue((prev) =>
        Array.isArray(prev)
          ? prev.includes(itemValue)
            ? prev.filter((v) => v !== itemValue)
            : [...prev, itemValue]
          : [itemValue]
      );
    } else {
      setValue((prev) => (prev === itemValue ? '' : itemValue));
    }
  };
  
  return (
    <AccordionContext.Provider value={{ value, onValueChange, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = createContext<string | undefined>(undefined);

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => (
  <AccordionItemContext.Provider value={value}>
    <div
      ref={ref}
      className={cn('border-b border-border', className)}
      {...props}
    />
  </AccordionItemContext.Provider>
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const accordionContext = useContext(AccordionContext);
  const itemValue = useContext(AccordionItemContext);

  if (!accordionContext || itemValue === undefined) {
    throw new Error('AccordionTrigger must be used within an AccordionItem');
  }

  const isOpen = Array.isArray(accordionContext.value)
    ? accordionContext.value.includes(itemValue)
    : accordionContext.value === itemValue;

  return (
    <h3 className="flex">
      <button
        ref={ref}
        onClick={() => accordionContext.onValueChange(itemValue)}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
        <Icon
          name="chevron-down-icon"
          className="h-4 w-4 shrink-0 transition-transform duration-200"
        />
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const accordionContext = useContext(AccordionContext);
  const itemValue = useContext(AccordionItemContext);

  if (!accordionContext || itemValue === undefined) {
    throw new Error('AccordionContent must be used within an AccordionItem');
  }
    
  const isOpen = Array.isArray(accordionContext.value)
    ? accordionContext.value.includes(itemValue)
    : accordionContext.value === itemValue;

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
      )}
      data-state={isOpen ? 'open' : 'closed'}
      hidden={!isOpen}
      {...props}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';


export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
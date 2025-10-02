
import React, { createContext, useContext, useState } from 'react';
import { cn } from '../lib/utils';

interface TabsContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const Tabs = ({
  defaultValue,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { defaultValue: string }) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn('w-full', className)} {...props} />
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-custom bg-sidebar p-1 text-secondary',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  const isActive = context.value === value;
  const contentId = `tab-content-${value}`;
  const triggerId = `tab-trigger-${value}`;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={triggerId}
      aria-controls={contentId}
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => context.setValue(value)}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-component data-[state=active]:text-primary data-[state=active]:shadow-sm',
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }

  if (context.value !== value) return null;

  const contentId = `tab-content-${value}`;
  const triggerId = `tab-trigger-${value}`;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={contentId}
      aria-labelledby={triggerId}
      data-state="active"
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2',
        className
      )}
      tabIndex={0}
      {...props}
    />
  );
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
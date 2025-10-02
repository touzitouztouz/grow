

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../lib/utils';
import Icon from '../Icon';

interface SelectContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string | null;
  setSelectedValue: (value: string) => void;
  selectedLabel: string | null;
  setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const Select = ({
  children,
  defaultValue,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue || null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;

  const handleSetValue = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fix: Added useEffect to derive and set the display label from children when value changes.
  useEffect(() => {
    if (selectedValue) {
      let label: string | null = null;
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectContent) {
          // Fix: Cast props to `any` to access properties on child elements, resolving TypeScript errors about unknown properties when dynamically iterating through children.
          React.Children.forEach((child.props as any).children, (item) => {
            if (React.isValidElement(item) && (item.props as any).value === selectedValue) {
              if (typeof (item.props as any).children === 'string') {
                label = (item.props as any).children;
              }
            }
          });
        }
      });
      setSelectedLabel(label);
    } else {
      setSelectedLabel(null);
    }
  }, [selectedValue, children]);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, setSelectedValue: handleSetValue, selectedLabel, setSelectedLabel, triggerRef, contentRef }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectTrigger must be used within a Select');

  return (
    <button
      ref={context.triggerRef}
      type="button"
      role="combobox"
      aria-controls={context.isOpen ? 'listbox' : undefined}
      aria-expanded={context.isOpen}
      onClick={() => context.setIsOpen(!context.isOpen)}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-custom border border-border bg-component px-3 py-2 text-sm ring-offset-background placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <Icon name="chevron-down-icon" className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

// Fix: Use `selectedLabel` from context to display the value, resolving multiple errors.
const SelectValue = ({ placeholder }: { placeholder?: string }) => {
    const context = useContext(SelectContext);
    if (!context) throw new Error('SelectValue must be used within a Select');
    const { selectedLabel } = context;

    return <span>{selectedLabel || placeholder}</span>;
}
SelectValue.displayName = 'SelectValue';


const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectContent must be used within a Select');

  if (!context.isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={context.contentRef}
      role="listbox"
      className={cn(
        'absolute z-50 min-w-[8rem] overflow-hidden rounded-custom border bg-component text-primary shadow-md animate-fade-in',
        'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      style={{
        width: context.triggerRef.current?.offsetWidth,
        top: (context.triggerRef.current?.offsetTop ?? 0) + (context.triggerRef.current?.offsetHeight ?? 0) + 4,
        left: context.triggerRef.current?.offsetLeft ?? 0,
      }}
      {...props}
    >
        {children}
    </div>, document.body
  );
});
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const context = useContext(SelectContext);
  if (!context) throw new Error('SelectItem must be used within a Select');

  const isSelected = context.selectedValue === value;

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      data-state={isSelected ? 'checked' : 'unchecked'}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-sidebar',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      onClick={() => {
        context.setSelectedValue(value);
        context.setIsOpen(false);
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Icon name="check-icon" className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
});
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
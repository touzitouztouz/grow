

import React, { useState, createContext, useContext, useRef, useLayoutEffect } from 'react';
import { cn } from '../lib/utils';

// Helper function to merge multiple refs into a single callback ref
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      }
    });
  };
}

let tooltipCounter = 0;

interface TooltipContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  tooltipId: string;
}

const TooltipContext = createContext<TooltipContextType | undefined>(undefined);

const TooltipProvider = ({ children }: React.PropsWithChildren<{}>) => {
  // In a real app, this provider would manage global state for tooltips.
  // For this simple case, it just provides a scope.
  return <>{children}</>;
};

const Tooltip = ({ children }: React.PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [tooltipId] = useState(() => `tooltip-${tooltipCounter++}`);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen, triggerRef, contentRef, tooltipId }}>
      {children}
    </TooltipContext.Provider>
  );
};

// Fix: Use React.PropsWithChildren to resolve a TypeScript error where the compiler
// incorrectly reports the 'children' prop as missing. This makes the prop optional
// at compile-time, which handles the JSX transform issue, while runtime validation
// via React.Children.only still enforces that a single child is provided.
const TooltipTrigger = ({ children }: React.PropsWithChildren<{}>) => {
  const context = useContext(TooltipContext);
  if (!context) throw new Error('TooltipTrigger must be used within a Tooltip');

  const { isOpen, setIsOpen, triggerRef, tooltipId } = context;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Enforce a single child, which is a requirement for cloneElement.
  const child = React.Children.only(children);

  // This check is for type safety and should not be reached if React.Children.only does not throw.
  if (!React.isValidElement(child)) {
    return <>{children}</>;
  }

  // The 'ref' property is not publicly exposed on the 'ReactElement' type.
  // Casting to 'any' is a common workaround to access the child's ref and merge it.
  const mergedRef = mergeRefs(triggerRef, (child as any).ref);

  // Cast props to `any` to work around a TypeScript limitation with `React.cloneElement`.
  // `ref` and event handlers are valid properties for `cloneElement`, but the generic overload's typings do not
  // always infer them correctly, causing type errors. This is a pragmatic workaround.
  return React.cloneElement(child, {
    ref: mergedRef,
    'aria-describedby': isOpen ? tooltipId : undefined,
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose,
    onFocus: handleOpen,
    onBlur: handleClose,
  } as any);
};


const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
    const context = useContext(TooltipContext);
    if (!context) throw new Error("TooltipContent must be used within a Tooltip");

    const { isOpen, triggerRef, contentRef, tooltipId } = context;
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useLayoutEffect(() => {
        if (isOpen && triggerRef.current && contentRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const contentRect = contentRef.current.getBoundingClientRect();
            
            const top = triggerRect.top - contentRect.height - 8 + window.scrollY;
            const left = triggerRect.left + (triggerRect.width / 2) - (contentRect.width / 2) + window.scrollX;

            setPosition({ top, left });
        }
    }, [isOpen, triggerRef, contentRef]);
    
    if (!isOpen) return null;

    return (
        <div
            ref={mergeRefs(contentRef, ref)}
            id={tooltipId}
            role="tooltip"
            style={{ ...style, ...position, position: 'absolute' }}
            className={cn(
                'z-50 overflow-hidden rounded-md border border-border bg-component px-3 py-1.5 text-sm text-primary shadow-md animate-fade-in',
                className
            )}
            {...props}
        />
    );
});
TooltipContent.displayName = 'TooltipContent';


export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
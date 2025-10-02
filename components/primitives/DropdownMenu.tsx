
import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { cn } from '../lib/utils';

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined);

const DropdownMenu = ({ children }: React.PropsWithChildren<{}>) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, triggerRef, menuRef }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = ({ children }: { children: React.ReactElement<any> }) => {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuTrigger must be used within a DropdownMenu');
  
  return React.cloneElement(children, {
    ref: context.triggerRef,
    onClick: () => context.setIsOpen(!context.isOpen),
    'aria-haspopup': 'menu',
    'aria-expanded': context.isOpen,
  });
};

const DropdownMenuPortal = ({ children }: React.PropsWithChildren<{}>) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
    return mounted ? ReactDOM.createPortal(children, document.body) : null;
};

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const context = useContext(DropdownMenuContext);
  if (!context) throw new Error('DropdownMenuContent must be used within a DropdownMenu');

  const { isOpen, menuRef, setIsOpen, triggerRef } = context;

  useEffect(() => {
    if (isOpen && menuRef.current) {
        const menuItems = Array.from(
            menuRef.current.querySelectorAll<HTMLElement>('[role="menuitem"]')
        );
        if (menuItems.length > 0) {
            // Defer focus to allow for rendering
            setTimeout(() => (menuItems[0] as HTMLElement)?.focus(), 0);
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;
            if (key === 'ArrowDown' || key === 'ArrowUp') {
                event.preventDefault();
                const currentFocus = document.activeElement as HTMLElement;
                const currentIndex = menuItems.indexOf(currentFocus);
                let nextIndex = -1;

                if (key === 'ArrowDown') {
                    nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                } else { // ArrowUp
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                }
                
                if (nextIndex !== -1) {
                    (menuItems[nextIndex] as HTMLElement)?.focus();
                }
            } else if (key === 'Home') {
                event.preventDefault();
                (menuItems[0] as HTMLElement)?.focus();
            } else if (key === 'End') {
                event.preventDefault();
                (menuItems[menuItems.length - 1] as HTMLElement)?.focus();
            } else if (key === 'Tab') {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };

        const menuEl = menuRef.current;
        menuEl.addEventListener('keydown', handleKeyDown);
        return () => {
            if (menuEl) {
               menuEl.removeEventListener('keydown', handleKeyDown);
            }
        };
    }
  }, [isOpen, menuRef, setIsOpen, triggerRef]);


  if (!context.isOpen) return null;

  return (
     <DropdownMenuPortal>
        <div
          ref={context.menuRef}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            'absolute z-50 min-w-[8rem] overflow-hidden rounded-custom border border-border bg-component p-1 text-primary shadow-md animate-fade-in',
            // Basic positioning logic, can be improved with a library like Popper.js
            'origin-top-right right-0 mt-2',
            className
          )}
          {...props}
        />
     </DropdownMenuPortal>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    role="menuitem"
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-sidebar',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    tabIndex={-1}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-orientation="horizontal"
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
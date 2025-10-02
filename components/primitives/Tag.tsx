
import React from 'react';
import { cn } from '../lib/utils';
import Icon from '../Icon';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    ({ className, children, onRemove, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn(
            'inline-flex items-center rounded-md border border-border bg-sidebar px-2 py-1 text-xs font-medium text-secondary',
            className
          )}
          {...props}
        >
          {children}
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="ml-1.5 -mr-0.5 flex-shrink-0 p-0.5 rounded-full inline-flex items-center justify-center text-secondary/70 hover:text-primary hover:bg-border"
              aria-label="Remove tag"
            >
              <Icon name="x-mark-icon" className="h-3 w-3" />
            </button>
          )}
        </div>
      );
    }
);

Tag.displayName = 'Tag';

export { Tag };
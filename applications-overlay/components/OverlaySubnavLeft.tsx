
import React, { useState } from 'react';
import Icon from '../../components/Icon';
import { useOverlayNavigation } from '../contexts/OverlayNavigationContext';
import { cn } from '../../components/lib/utils';

const OverlaySubnavLeft = (): React.ReactElement | null => {
    const { hasSubnav, currentSubnavItems, activeSubnavItem, setActiveSubnavItem } = useOverlayNavigation();
    const [isOpen, setIsOpen] = useState(true);
    
    if (!hasSubnav) {
        return null; // Don't render if there's no subnav for the current view
    }

    return (
        <aside className={cn(
            "relative shrink-0 h-full bg-sidebar border-r border-border transition-all duration-300 ease-in-out",
            isOpen ? "w-20 md:w-52" : "w-0"
        )}>
            <div className={cn(
                "h-full overflow-y-auto transition-opacity duration-200",
                isOpen ? "opacity-100" : "opacity-0"
            )}>
                <div className="p-2 h-full flex flex-col space-y-2">
                    <div className="bg-component shadow-custom rounded-custom p-2 border border-border flex-1">
                        <nav aria-label="Secondary Application Navigation" className="h-full">
                            <ul className="space-y-1 h-full">
                                {currentSubnavItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => setActiveSubnavItem(item.id)}
                                            className={cn(
                                                'w-full flex rounded-custom transition-colors duration-200',
                                                // Mobile layout: icon over name
                                                'flex-col items-center p-2 text-center',
                                                // Desktop layout: icon next to name
                                                'md:flex-row md:p-3 md:text-left',
                                                activeSubnavItem === item.id
                                                    ? 'bg-accent-secondary/20 text-accent-secondary font-semibold'
                                                    : 'text-secondary hover:bg-accent-secondary/10 hover:text-primary'
                                            )}
                                            aria-current={activeSubnavItem === item.id ? 'page' : undefined}
                                        >
                                            {item.icon && <Icon name={item.icon} className="w-6 h-6 shrink-0 mb-1 md:mb-0 md:mr-3" />}
                                            <span className="text-[10px] md:text-sm leading-tight md:leading-normal">{item.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Collapse sub-navigation" : "Expand sub-navigation"}
                aria-expanded={isOpen}
                className={cn(
                    "absolute bottom-4 z-10",
                    "p-1.5 bg-component rounded-full text-secondary hover:text-primary shadow-md border border-border",
                    "transition-all duration-300 ease-in-out",
                    isOpen
                        ? "left-1/2 -translate-x-1/2"
                        : "left-2"
                )}
            >
                <Icon name={isOpen ? "arrow-left-circle-icon" : "arrow-right-circle-icon"} className="w-6 h-6" />
            </button>
        </aside>
    );
};

export default React.memo(OverlaySubnavLeft);

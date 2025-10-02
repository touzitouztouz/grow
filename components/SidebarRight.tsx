
import React, { forwardRef, useCallback } from 'react';
import Icon from './Icon';
import { useUIState } from '../contexts/UIStateContext';
import { useNavigation } from '../contexts/NavigationContext';
import { RIGHT_SIDEBAR_ITEMS } from '../data';

interface SidebarRightProps {
    id: string;
}

const SidebarRight = forwardRef<HTMLElement, SidebarRightProps>(({ id }, ref) => {
    const { isRightSidebarOpen, setAnnouncement } = useUIState();
    const { activeRightSidebarItem, handleRightSidebarSelect: selectItem } = useNavigation();
    
    const handleRightSidebarSelect = useCallback((itemId: string) => {
        selectItem(itemId);
        const label = RIGHT_SIDEBAR_ITEMS.find(item => item.id === itemId)?.label || '';
        setAnnouncement(`Navigated to ${label} section`);
    }, [selectItem, setAnnouncement]);

    return (
        <aside id={id} ref={ref} className={`hidden md:block transition-all duration-300 ease-in-out z-10 ${isRightSidebarOpen ? 'w-56 p-2' : 'w-20 p-2'}`}>
            <div className="bg-component rounded-custom w-full flex flex-col items-center py-4 h-full shadow-custom border border-border">
                <button
                    onClick={() => handleRightSidebarSelect('dashboard')}
                    className={`text-accent-primary font-bold text-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 rounded-md ${isRightSidebarOpen ? 'mb-8' : 'h-0 opacity-0 overflow-hidden'}`}
                    aria-label="Go to dashboard"
                    disabled={activeRightSidebarItem === 'dashboard'}
                    tabIndex={isRightSidebarOpen ? 0 : -1}
                >
                    LOGO
                </button>
                <nav className="w-full" aria-label="Main Navigation">
                    <ul className="space-y-2 px-3">
                        {RIGHT_SIDEBAR_ITEMS.map((item) => (
                            <li key={item.id} className="relative">
                                <button
                                    onClick={() => handleRightSidebarSelect(item.id)}
                                    className={`w-full flex items-center p-3 rounded-custom transition-colors duration-200 ${
                                        activeRightSidebarItem === item.id 
                                        ? 'bg-accent-primary/20 text-accent-primary' 
                                        : 'text-secondary hover:bg-accent-primary/10 hover:text-primary'
                                    } ${isRightSidebarOpen ? 'justify-between' : 'justify-center'}`}
                                    aria-label={item.label}
                                    aria-current={activeRightSidebarItem === item.id ? 'page' : undefined}
                                >
                                    <span className={`text-sm font-semibold transition-opacity duration-200 ${isRightSidebarOpen ? 'opacity-100' : 'opacity-0 absolute'}`} aria-hidden={!isRightSidebarOpen}>
                                        {item.label}
                                    </span>
                                    {item.icon && <Icon name={item.icon} className="w-6 h-6 shrink-0"/>}
                                </button>
                                 {activeRightSidebarItem === item.id && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-primary rounded-r-full shadow-glow-primary" aria-hidden="true"></div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
});

SidebarRight.displayName = "SidebarRight";

export default React.memo(SidebarRight);

import React, { useCallback } from 'react';
import Icon from './Icon';
import { useNavigation } from '../contexts/NavigationContext';
import { useUIState } from '../contexts/UIStateContext';
import { RIGHT_SIDEBAR_ITEMS } from '../data';
import { cn } from './lib/utils';

const PhoneRightSidebar = (): React.ReactElement => {
    const { activeRightSidebarItem, handleRightSidebarSelect: selectItem } = useNavigation();
    const { isRightSidebarOpen, setAnnouncement } = useUIState();

    const handleRightSidebarSelect = useCallback((itemId: string) => {
        selectItem(itemId);
        const label = RIGHT_SIDEBAR_ITEMS.find(item => item.id === itemId)?.label || '';
        setAnnouncement(`Navigated to ${label} section`);
    }, [selectItem, setAnnouncement]);

    return (
        <aside 
            id="phone-sidebar-right" 
            className={cn(
                "bg-component border-l border-border flex-shrink-0 md:hidden transition-all duration-300 ease-in-out",
                isRightSidebarOpen ? "w-20 p-2" : "w-0 p-0 border-l-0"
            )}
        >
            <nav 
                className={cn(
                    "h-full overflow-hidden transition-opacity duration-200",
                    isRightSidebarOpen ? "opacity-100" : "opacity-0"
                )} 
                aria-label="Main Navigation Mobile"
                aria-hidden={!isRightSidebarOpen}
            >
                <ul className="flex flex-col items-center justify-start h-full space-y-1 pt-2">
                    {RIGHT_SIDEBAR_ITEMS.map((item) => (
                        <li key={item.id} className="relative w-full">
                            <button
                                onClick={() => handleRightSidebarSelect(item.id)}
                                className={`w-full flex flex-col items-center p-1 rounded-custom transition-colors duration-200 ${
                                    activeRightSidebarItem === item.id
                                        ? 'text-accent-primary'
                                        : 'text-secondary hover:bg-sidebar hover:text-primary'
                                }`}
                                aria-label={item.label}
                                aria-current={activeRightSidebarItem === item.id ? 'page' : undefined}
                                tabIndex={isRightSidebarOpen ? 0 : -1}
                            >
                                {item.icon && <Icon name={item.icon} className="w-6 h-6 shrink-0 mb-1" />}
                                <span className="text-[7px] font-semibold text-center leading-tight">
                                    {item.label}
                                </span>
                            </button>
                            {activeRightSidebarItem === item.id && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-primary rounded-r-full" aria-hidden="true"></div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default React.memo(PhoneRightSidebar);
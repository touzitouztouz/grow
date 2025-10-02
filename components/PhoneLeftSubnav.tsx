
import React from 'react';
import Icon from './Icon';
import { useNavigation } from '../contexts/NavigationContext';
import { useUIState } from '../contexts/UIStateContext';
import { cn } from './lib/utils';

const PhoneLeftSubnav = (): React.ReactElement | null => {
    const { currentLeftSubnavItems, activeLeftSubnavItem, setActiveLeftSubnavItem } = useNavigation();
    const { isLeftSidebarOpen } = useUIState();

    if (!currentLeftSubnavItems || currentLeftSubnavItems.length === 0) {
        return null;
    }

    return (
        <aside 
            id="phone-subnav-left" 
            className={cn(
                "bg-sidebar flex-shrink-0 md:hidden border-r border-border transition-all duration-300 ease-in-out",
                isLeftSidebarOpen ? "w-20 p-2" : "w-0 p-0 border-r-0"
            )}
        >
            <nav 
                className={cn(
                    "h-full overflow-hidden transition-opacity duration-200",
                    isLeftSidebarOpen ? "opacity-100" : "opacity-0"
                )} 
                aria-label="Secondary Navigation Mobile"
                aria-hidden={!isLeftSidebarOpen}
            >
                <ul className="flex flex-col items-center justify-start h-full space-y-1 pt-2">
                    {currentLeftSubnavItems.map((item) => (
                        <li key={item.id} className="relative w-full">
                            <button
                                onClick={() => setActiveLeftSubnavItem(item.id)}
                                className={`w-full flex flex-col items-center p-1 rounded-custom transition-colors duration-200 ${
                                    activeLeftSubnavItem === item.id
                                        ? 'text-accent-secondary'
                                        : 'text-secondary hover:bg-component hover:text-primary'
                                }`}
                                aria-label={item.label}
                                aria-current={activeLeftSubnavItem === item.id ? 'page' : undefined}
                                tabIndex={isLeftSidebarOpen ? 0 : -1}
                            >
                                {item.icon && <Icon name={item.icon} className="w-6 h-6 shrink-0 mb-1" />}
                                <span className="text-[7px] font-semibold text-center leading-tight uppercase">
                                    {item.label}
                                </span>
                            </button>
                             {activeLeftSubnavItem === item.id && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-secondary rounded-l-full" aria-hidden="true"></div>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default React.memo(PhoneLeftSubnav);
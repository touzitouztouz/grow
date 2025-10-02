
import React from 'react';
import Icon from './Icon';
import { useNavigation } from '../contexts/NavigationContext';
import { useUIState } from '../contexts/UIStateContext';

const SubnavLeft = (): React.ReactElement | null => {
    const { currentLeftSubnavItems, activeLeftSubnavItem, setActiveLeftSubnavItem } = useNavigation();
    const { isLeftSidebarOpen } = useUIState();
    
    if (!currentLeftSubnavItems || currentLeftSubnavItems.length === 0) {
        return null;
    }

    return (
        <div className="bg-sidebar shadow-custom rounded-custom p-2 border border-border">
            <nav aria-label="Secondary Navigation" aria-hidden={!isLeftSidebarOpen}>
                <ul className="space-y-1">
                    {currentLeftSubnavItems.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveLeftSubnavItem(item.id)}
                                className={`w-full flex items-center p-3 rounded-custom transition-colors duration-200 text-left ${
                                    activeLeftSubnavItem === item.id
                                        ? 'bg-accent-secondary/20 text-accent-secondary font-semibold'
                                        : 'text-secondary hover:bg-accent-secondary/10 hover:text-primary'
                                }`}
                                aria-current={activeLeftSubnavItem === item.id ? 'page' : undefined}
                            >
                                {item.icon && <Icon name={item.icon} className="w-5 h-5 mr-3 shrink-0" />}
                                <span className="text-sm">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default React.memo(SubnavLeft);


import React from 'react';
import type { OverlayAppItem } from '../../types';
import Icon from '../../components/Icon';
import { useOverlayNavigation } from '../contexts/OverlayNavigationContext';

interface OverlayHeaderProps {
    appDetails: OverlayAppItem;
    onClose: () => void;
    onMinimize: () => void;
}

const OverlayHeader = ({ appDetails, onClose, onMinimize }: OverlayHeaderProps) => {
    const { currentHeaderItems, activeHeaderItem, setActiveHeaderItem } = useOverlayNavigation();
    const titleId = `overlay-title-${appDetails.id}`;

    const getNavButtonClasses = (itemId: string) => {
        const isActive = activeHeaderItem === itemId;
        return `px-2 sm:px-4 py-1 text-xs sm:text-sm font-semibold rounded-custom transition-colors duration-200 whitespace-nowrap ${
            isActive
                ? 'bg-component text-primary shadow-sm'
                : 'text-secondary hover:bg-component/60 hover:text-primary'
        }`;
    };
    
    return (
        <header className="bg-component/80 backdrop-blur-sm shadow-custom flex items-center px-2 sm:px-4 py-2 h-16 z-20 shrink-0 border-b border-border">
            {/* Left Section */}
            <div className="flex items-center flex-shrink-0 space-x-3 min-w-0 mr-2 sm:mr-4">
                <Icon name={appDetails.icon} className="w-6 h-6 text-accent-primary" />
                <h1 id={titleId} className="text-sm sm:text-base lg:text-xl font-bold text-primary truncate">{appDetails.label}</h1>
            </div>

            {/* Center Section (Navigation) */}
            <nav className="flex-1 flex justify-center items-center min-w-0" aria-label="Application Navigation">
                {currentHeaderItems && currentHeaderItems.length > 0 && (
                     <div className="bg-component/40 backdrop-blur-xl border border-border p-1 rounded-custom flex items-center space-x-1 shadow-sm" role="tablist" aria-label="Application Categories">
                        {currentHeaderItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveHeaderItem(item.id)}
                                className={getNavButtonClasses(item.id)}
                                role="tab"
                                aria-selected={activeHeaderItem === item.id}
                                aria-controls="overlay-main-content"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                )}
            </nav>

            {/* Right Section */}
            <div className="flex items-center justify-end flex-shrink-0 space-x-2 ml-2 sm:ml-4">
                <button onClick={onMinimize} className="p-2 text-secondary hover:bg-sidebar rounded-full focus:outline-none focus:ring-2 focus:ring-accent-primary" aria-label={`Minimize ${appDetails.label} application`}>
                    <Icon name="minus-icon" className="w-5 h-5" />
                </button>
                <button onClick={onClose} className="p-2 text-secondary hover:bg-sidebar hover:text-destructive rounded-full focus:outline-none focus:ring-2 focus:ring-accent-primary" aria-label={`Close ${appDetails.label} application`}>
                    <Icon name="x-mark-icon" className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default React.memo(OverlayHeader);

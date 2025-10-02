

import React, { useCallback, useMemo } from 'react';
import { OVERLAY_APPS } from '../data';
import Icon from './Icon';
import type { OverlayAppItem, OverlayAppId } from '../types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './primitives/Tooltip';
import { useUIState } from '../contexts/UIStateContext';
import { useNavigation } from '../contexts/NavigationContext';
import { cn } from './lib/utils';

const AppButton = React.memo(({ app, isTrayOpen, onClick }: {
    app: OverlayAppItem;
    isTrayOpen: boolean;
    onClick: (appId: string, trigger: HTMLButtonElement) => void;
}): React.ReactElement => {
    const a11yProps = {
        'aria-label': `Launch ${app.label}`,
        tabIndex: isTrayOpen ? 0 : -1,
    };

    return (
        <button
            onClick={(e) => onClick(app.id, e.currentTarget)}
            className={cn(`flex flex-col items-center text-secondary hover:text-primary transition-all duration-300 ease-out group transform`,
                isTrayOpen 
                    ? 'opacity-100 scale-100 w-8 sm:w-16' 
                    : 'opacity-0 scale-50 w-0 pointer-events-none'
            )}
            {...a11yProps}
        >
            <div className="w-6 h-6 sm:w-10 sm:h-10 bg-sidebar rounded-custom flex items-center justify-center group-hover:bg-accent-primary/20">
                <Icon name={app.icon} className="w-4 h-4 sm:w-8 sm:h-8" />
            </div>
            <span className="text-xs mt-1 hidden sm:block">{app.label}</span>
        </button>
    );
});
AppButton.displayName = 'AppButton';


const Footer = (): React.ReactElement => {
    const { hasSubnav } = useNavigation();
    const {
        isLeftSidebarOpen,
        isRightSidebarOpen,
        isTrayOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        toggleTray,
        handleLaunchApp,
        minimizedApps,
        activeOverlayApp,
        handleRestoreApp,
        handleCloseMinimizedApp,
        leftSidebarToggleRef,
        rightSidebarToggleRef,
    } = useUIState();
    
    const handleAppClick = useCallback((appId: string, trigger: HTMLButtonElement): void => {
        handleLaunchApp(appId, trigger);
        if (isTrayOpen) {
            toggleTray(); // Close tray after launching
        }
    }, [handleLaunchApp, isTrayOpen, toggleTray]);
    
    const { trayApps, minimizedAppDetails } = useMemo(() => {
        const filteredTrayApps = OVERLAY_APPS.filter(app => app.id !== activeOverlayApp && !minimizedApps.includes(app.id));
        const details = minimizedApps.map(id => OVERLAY_APPS.find(app => app.id === id)).filter((app): app is OverlayAppItem => !!app);
        return { trayApps: filteredTrayApps, minimizedAppDetails: details };
    }, [activeOverlayApp, minimizedApps]);

    const hasMinimizedApps = minimizedApps.length > 0;
    
    const leftTrayApps = (hasMinimizedApps ? trayApps : trayApps.slice(0, Math.ceil(trayApps.length / 2))).slice().reverse();
    const rightTrayApps = hasMinimizedApps ? [] : trayApps.slice(Math.ceil(trayApps.length / 2));

    return (
        <TooltipProvider>
            <footer className="shrink-0 px-2 pt-1">
                <div className="h-14 sm:h-16 bg-component/80 backdrop-blur-sm shadow-custom rounded-custom w-full max-w-screen-2xl mx-auto flex justify-between items-center px-2 sm:px-4 border-t border-border">
                    
                    {/* Left Toggle */}
                    <div className="flex-shrink-0">
                        <Tooltip>
                            <TooltipTrigger>
                                <button
                                    ref={leftSidebarToggleRef}
                                    onClick={toggleLeftSidebar}
                                    className={`p-2 text-secondary hover:text-accent-secondary transition-all duration-300 shrink-0 ${!hasSubnav ? 'invisible pointer-events-none' : ''}`}
                                    aria-label={isLeftSidebarOpen ? 'Collapse Left Sidebar' : 'Expand Left Sidebar'}
                                    aria-expanded={isLeftSidebarOpen}
                                    aria-controls="subnav-left phone-subnav-left"
                                    disabled={!hasSubnav}
                                >
                                    <Icon name={isLeftSidebarOpen ? "arrow-left-circle-icon" : "arrow-right-circle-icon"} className="w-7 h-7 sm:w-8 sm:h-8"/>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isLeftSidebarOpen ? 'Collapse Left Sidebar' : 'Expand Left Sidebar'} (Alt + L)</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Center Tray and Toggle Wrapper - Flexbox layout to prevent overlap */}
                    <div className="flex-1 flex justify-center items-center min-w-0 px-1">
                        <div className="flex items-center justify-center relative">
                            {/* Staggered animation wrapper */}
                            <div
                                className={`flex items-center justify-center transition-all duration-300 ease-in-out ${
                                    isTrayOpen ? 'gap-x-0.5 sm:gap-x-2' : 'gap-x-0'
                                }`}
                            >
                                {/* Left Icons */}
                                <div id="app-tray-left" className="flex items-center justify-end">
                                    {leftTrayApps.map((app, index) => (
                                        <div key={app.id} className="transition-all duration-300" style={{ transitionDelay: isTrayOpen ? `${(leftTrayApps.length - index -1) * 30}ms` : '0ms'}}>
                                            <AppButton
                                                app={app}
                                                isTrayOpen={isTrayOpen}
                                                onClick={handleAppClick}
                                            />
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Plus/Minus Button */}
                                <Tooltip>
                                    <TooltipTrigger>
                                        <button
                                            onClick={toggleTray}
                                            className="w-9 h-9 sm:w-12 sm:h-12 bg-accent-primary text-accent-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:opacity-90 transition-all duration-300 z-10 mx-1 sm:mx-2 shrink-0 shadow-glow-primary"
                                            aria-label={isTrayOpen ? 'Close Apps Tray' : 'Open Apps Tray'}
                                            aria-expanded={isTrayOpen}
                                            aria-haspopup="true"
                                            aria-controls="app-tray-left app-tray-right"
                                        >
                                            <Icon name={isTrayOpen ? 'minus-icon' : 'plus-icon'} className="w-5 h-5 sm:w-7 sm:h-7" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{isTrayOpen ? 'Close Apps Tray' : 'Open Apps Tray'} (Alt + A)</p>
                                    </TooltipContent>
                                </Tooltip>

                                {/* Right Icons */}
                                <div id="app-tray-right" className="flex items-center justify-start">
                                    {rightTrayApps.map((app, index) => (
                                        <div key={app.id} className="transition-all duration-300" style={{ transitionDelay: isTrayOpen ? `${index * 30}ms` : '0ms'}}>
                                            <AppButton
                                                app={app}
                                                isTrayOpen={isTrayOpen}
                                                onClick={handleAppClick}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Minimized Apps & Toggle */}
                    <div className="flex-shrink-0 flex items-center space-x-1 sm:space-x-2">
                        <div className="flex items-center space-x-1">
                            {minimizedAppDetails.map(app => (
                                <div key={app.id} className="relative group">
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button
                                                onClick={(e) => handleRestoreApp(app.id, e.currentTarget)}
                                                className="p-2 bg-sidebar rounded-full text-secondary hover:text-accent-primary hover:bg-accent-primary/20 transition-colors"
                                                aria-label={`Restore ${app.label}`}
                                            >
                                                <Icon name={app.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Restore {app.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <button
                                                onClick={() => handleCloseMinimizedApp(app.id as OverlayAppId)}
                                                className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-component rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                aria-label={`Close ${app.label}`}
                                            >
                                                <Icon name="x-mark-icon" className="w-3 h-3" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Close {app.label}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                        <Tooltip>
                            <TooltipTrigger>
                                <button
                                    ref={rightSidebarToggleRef}
                                    onClick={toggleRightSidebar}
                                    className={`p-2 text-secondary hover:text-accent-primary transition-all duration-300 shrink-0`}
                                    aria-label={isRightSidebarOpen ? 'Collapse Right Sidebar' : 'Expand Right Sidebar'}
                                    aria-expanded={isRightSidebarOpen}
                                    aria-controls="sidebar-right phone-sidebar-right"
                                >
                                    <Icon name={isRightSidebarOpen ? "arrow-right-circle-icon" : "arrow-left-circle-icon"} className="w-7 h-7 sm:w-8 sm:h-8"/>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{isRightSidebarOpen ? 'Collapse Right Sidebar' : 'Expand Right Sidebar'} (Alt + R)</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </footer>
        </TooltipProvider>
    );
};
Footer.displayName = 'Footer';

export default React.memo(Footer);

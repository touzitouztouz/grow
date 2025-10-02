

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { User } from '../types';
import Icon from './Icon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './primitives/Tooltip';
import { useNavigation } from '../contexts/NavigationContext';
import { useTheme } from '../contexts/ThemeContext';
import { useUIState } from '../contexts/UIStateContext';

interface HeaderProps {
    sectionTitle: string;
    user: User;
}

const Header = ({ sectionTitle, user }: HeaderProps): React.ReactElement => {
    const { currentHeaderItems, activeHeaderItem, handleHeaderSelect } = useNavigation();
    const { theme, toggleTheme: baseToggleTheme } = useTheme();
    const { notificationButtonRef, setAnnouncement } = useUIState();
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleTheme = useCallback((): void => {
        baseToggleTheme();
        setAnnouncement(`Theme set to ${theme === 'light' ? 'dark' : 'light'} mode`);
    }, [baseToggleTheme, setAnnouncement, theme]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const navContainerClasses = "bg-component/40 backdrop-blur-xl border border-border p-1 rounded-custom flex items-center space-x-1 shadow-sm";

    const getNavButtonClasses = (itemId: string): string => {
        const isActive = activeHeaderItem === itemId;
        return `px-2 sm:px-4 py-1 text-xs sm:text-sm font-semibold rounded-custom transition-colors duration-200 whitespace-nowrap ${
            isActive
                ? 'bg-component text-primary shadow-sm'
                : 'text-secondary hover:bg-component/60 hover:text-primary'
        }`;
    };
    
    return (
        <TooltipProvider>
            <header className="bg-component/80 backdrop-blur-sm shadow-custom flex items-center px-2 sm:px-4 py-2 h-16 z-20 shrink-0 border-b border-border">
                {/* Left Section */}
                <div className="flex items-center flex-shrink min-w-0 mr-2 sm:mr-4">
                    <h1 className="text-sm sm:text-base lg:text-xl font-bold text-primary truncate">{sectionTitle}</h1>
                </div>

                {/* Center Section (Navigation) */}
                <nav className="flex-1 flex justify-center items-center min-w-0" aria-label="Content Navigation">
                    {currentHeaderItems && currentHeaderItems.length > 0 && (
                        <div className={navContainerClasses} role="tablist" aria-label="Content Categories">
                            {currentHeaderItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleHeaderSelect(item.id)}
                                    className={getNavButtonClasses(item.id)}
                                    role="tab"
                                    aria-selected={activeHeaderItem === item.id}
                                    aria-controls="main-content"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}
                </nav>

                {/* Right Section */}
                <div className="flex items-center justify-end flex-shrink-0 space-x-2 sm:space-x-3 md:space-x-4 ml-2 sm:ml-4">
                    <Tooltip>
                        <TooltipTrigger>
                            <button
                                onClick={toggleTheme}
                                className="p-1 rounded-full text-secondary hover:text-accent-primary transition-colors"
                                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            >
                                <Icon name={theme === 'light' ? 'moon-icon' : 'sun-icon'} className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Switch to {theme === 'light' ? 'dark' : 'light'} mode</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <button
                                ref={notificationButtonRef}
                                className="text-secondary hover:text-accent-primary transition-colors"
                                aria-label="Notifications"
                            >
                                <Icon name="bell-icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Notifications (Alt + N)</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <button className="text-secondary hover:text-accent-primary transition-colors" aria-label="Messages">
                                <Icon name="chat-bubble-left-ellipsis-icon" className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Messages</p>
                        </TooltipContent>
                    </Tooltip>
                    
                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            id="user-menu-button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-component"
                            aria-expanded={isDropdownOpen}
                            aria-haspopup="true"
                            aria-controls="user-menu"
                        >
                            <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                            <div className="hidden sm:block min-w-0 text-left">
                                <p className="font-semibold text-sm text-primary truncate">{user.name}</p>
                                <p className="text-xs text-secondary truncate">{user.role}</p>
                            </div>
                             <Icon name="chevron-down-icon" className={`w-4 h-4 text-secondary transition-transform duration-200 hidden sm:block ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <div
                                id="user-menu"
                                className="absolute right-0 mt-2 w-48 origin-top-right bg-component rounded-custom shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                            >
                                <div className="py-1" role="none">
                                    <a href="#" className="block px-4 py-2 text-sm text-primary hover:bg-sidebar" role="menuitem" id="user-menu-item-0">Account Settings</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-primary hover:bg-sidebar" role="menuitem" id="user-menu-item-1">Help Center</a>
                                    <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem" id="user-menu-item-2">Logout</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </TooltipProvider>
    );
};
Header.displayName = 'Header';

export default React.memo(Header);

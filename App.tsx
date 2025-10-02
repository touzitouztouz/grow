

import React, { useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import SidebarRight from './components/SidebarRight';
import SubnavLeft from './components/SubnavLeft';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import OverlayApp from './components/OverlayApp';
import { useNavigation } from './contexts/NavigationContext';
import { useUIState } from './contexts/UIStateContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NavigationProvider } from './contexts/NavigationContext';
import { UIStateProvider } from './contexts/UIStateContext';
import { RIGHT_SIDEBAR_ITEMS } from './data';
import PhoneRightSidebar from './components/PhoneRightSidebar';
import PhoneLeftSubnav from './components/PhoneLeftSubnav';

const ContactWidget = React.memo((): React.ReactElement => {
    return (
        <div role="region" aria-labelledby="contact-widget-title" className="bg-component shadow-custom rounded-custom p-4 border border-border">
            <div className="flex items-center space-x-3">
                <img src="https://picsum.photos/seed/contact/40/40" alt="Contact person" className="w-10 h-10 rounded-full" />
                <div>
                    <p id="contact-widget-title" className="font-semibold text-sm text-primary">Jane Doe</p>
                    <p className="text-xs text-secondary">Project Lead</p>
                </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="w-full text-xs bg-sidebar text-primary py-2 px-2 rounded-md hover:bg-border transition-colors">Message</button>
                <button className="w-full text-xs bg-sidebar text-primary py-2 px-2 rounded-md hover:bg-border transition-colors">Profile</button>
            </div>
        </div>
    );
});
ContactWidget.displayName = 'ContactWidget';


const StudentInfoWidget = React.memo((): React.ReactElement => {
    return (
        <div role="region" aria-labelledby="student-widget-title" className="bg-component shadow-custom rounded-custom p-4 border border-border">
            <div className="flex items-center space-x-3">
                <img src="https://picsum.photos/seed/student/40/40" alt="Student avatar" className="w-10 h-10 rounded-full" />
                <div>
                    <p id="student-widget-title" className="font-semibold text-sm text-primary">Mike Ross</p>
                    <p className="text-xs text-secondary">Enrolled: CS101</p>
                </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="w-full text-xs bg-sidebar text-primary py-2 px-2 rounded-md hover:bg-border transition-colors">Grades</button>
                <button className="w-full text-xs bg-sidebar text-primary py-2 px-2 rounded-md hover:bg-border transition-colors">Tutor</button>
            </div>
        </div>
    );
});
StudentInfoWidget.displayName = 'StudentInfoWidget';


const AppContent = (): React.ReactElement => {
    const { hasSubnav, activeRightSidebarItem } = useNavigation();
    const {
        activeOverlayApp,
        handleCloseOverlay,
        isLeftSidebarOpen,
        isRightSidebarOpen,
        announcement,
        clearAnnouncement,
        leftSidebarToggleRef,
        rightSidebarToggleRef,
        toggleTray,
        toggleLeftSidebar,
        toggleRightSidebar,
        notificationButtonRef,
    } = useUIState();
    
    const user = useMemo(() => ({
        name: 'Yassine Eljebari',
        role: 'Owner',
        avatarUrl: 'https://picsum.photos/100/100',
    }), []);

    const activeRightSidebarLabel = RIGHT_SIDEBAR_ITEMS.find(item => item.id === activeRightSidebarItem)?.label || 'Dashboard';
    
    const sidebarRightRef = useRef<HTMLElement>(null);
    const subnavLeftRef = useRef<HTMLElement>(null);
    
    // Announcer effect for screen readers
    useEffect(() => {
        if (announcement) {
            // Clear announcement after a delay to allow screen readers to re-announce if needed
            const timer = setTimeout(() => clearAnnouncement(), 1000);
            return () => clearTimeout(timer);
        }
    }, [announcement, clearAnnouncement]);

    // Desktop-only focus management for the right sidebar
    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 768) {
            return;
        }

        if (isRightSidebarOpen) {
            const firstFocusable = sidebarRightRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement | null;
            firstFocusable?.focus();
        } else {
             rightSidebarToggleRef.current?.focus();
        }
    }, [isRightSidebarOpen, rightSidebarToggleRef]);
    
    // Desktop-only focus management for the left sub-navigation
    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 768) {
            return;
        }
        
        if (isLeftSidebarOpen) {
            const firstFocusable = subnavLeftRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement | null;
            firstFocusable?.focus();
        } else {
            // Only return focus to the toggle button if a subnav exists and was visible
            if (hasSubnav) { 
                leftSidebarToggleRef.current?.focus();
            }
        }
    }, [isLeftSidebarOpen, leftSidebarToggleRef, hasSubnav]);

    // Global keyboard shortcuts for accessibility and power users
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.altKey) {
                switch (event.key.toLowerCase()) {
                    case 'a':
                        event.preventDefault();
                        toggleTray();
                        break;
                    case 'l':
                        if (hasSubnav) {
                            event.preventDefault();
                            toggleLeftSidebar();
                        }
                        break;
                    case 'r':
                        event.preventDefault();
                        toggleRightSidebar();
                        break;
                    case 'n':
                        event.preventDefault();
                        notificationButtonRef.current?.focus();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [hasSubnav, toggleTray, toggleLeftSidebar, toggleRightSidebar, notificationButtonRef]);


    return (
        <div className="h-screen w-screen bg-background font-sans text-primary flex flex-col overflow-hidden">
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
            </div>

            <Header
                sectionTitle={activeRightSidebarLabel}
                user={user}
            />
            <div className="flex flex-1 overflow-hidden">
                {/* --- LEFT SIDE (Mobile & Desktop) --- */}
                {hasSubnav && <PhoneLeftSubnav />}
                
                 {hasSubnav && (
                    <aside 
                        id="subnav-left"
                        ref={subnavLeftRef}
                        className={`hidden md:block transition-all duration-300 ease-in-out shrink-0 ${isLeftSidebarOpen ? 'w-52' : 'w-0'}`}
                        aria-hidden={!isLeftSidebarOpen}
                    >
                        <div className={`p-2 h-full flex flex-col space-y-2 overflow-hidden transition-opacity duration-200 ${isLeftSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <SubnavLeft />
                            {activeRightSidebarItem === 'school' ? <StudentInfoWidget /> : <ContactWidget />}
                        </div>
                    </aside>
                )}

                {/* --- MAIN CONTENT --- */}
                <MainContent />

                {/* --- RIGHT SIDE (Mobile & Desktop) --- */}
                <PhoneRightSidebar />
                <SidebarRight id="sidebar-right" ref={sidebarRightRef} />
            </div>
            <Footer />
            {activeOverlayApp && (
                <OverlayApp
                    appName={activeOverlayApp}
                    onClose={handleCloseOverlay}
                />
            )}
        </div>
    );
};
AppContent.displayName = 'AppContent';

function App(): React.ReactElement {
    return (
        <ThemeProvider>
            <NavigationProvider>
                <UIStateProvider>
                    <AppContent />
                </UIStateProvider>
            </NavigationProvider>
        </ThemeProvider>
    );
}

export default App;

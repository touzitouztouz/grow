
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { NavItem } from '../../types';
// Fix: Import OverlayAppNav from '../../types' instead of '../../data' as the type is defined there.
import type { OverlayAppNav } from '../../types';

interface OverlayNavigationContextType {
    navData: OverlayAppNav;
    currentHeaderItems: NavItem[];
    currentSubnavItems: NavItem[];
    hasSubnav: boolean;
    activeHeaderItem: string;
    activeSubnavItem: string;
    setActiveHeaderItem: (id: string) => void;
    setActiveSubnavItem: (id: string) => void;
}

const OverlayNavigationContext = createContext<OverlayNavigationContextType | undefined>(undefined);

export const OverlayNavigationProvider = ({ navData, children }: React.PropsWithChildren<{ navData: OverlayAppNav }>) => {
    const [activeHeaderItem, setActiveHeaderItem] = useState<string>(navData.subApps[0]?.id || '');
    
    const currentSubnavItems = useMemo(() => navData.content[activeHeaderItem] || [], [navData, activeHeaderItem]);
    const hasSubnav = useMemo(() => currentSubnavItems.length > 0, [currentSubnavItems]);

    const [activeSubnavItem, setActiveSubnavItem] = useState<string>(currentSubnavItems[0]?.id || '');
    
    // Effect to reset subnav item when header item changes
    useEffect(() => {
        const newSubnavItems = navData.content[activeHeaderItem] || [];
        setActiveSubnavItem(newSubnavItems[0]?.id || '');
    }, [activeHeaderItem, navData.content]);


    const handleSetActiveHeaderItem = useCallback((id: string) => {
        setActiveHeaderItem(id);
    }, []);

    const handleSetActiveSubnavItem = useCallback((id: string) => {
        setActiveSubnavItem(id);
    }, []);

    const value = useMemo(() => ({
        navData,
        currentHeaderItems: navData.subApps,
        currentSubnavItems,
        hasSubnav,
        activeHeaderItem,
        activeSubnavItem,
        setActiveHeaderItem: handleSetActiveHeaderItem,
        setActiveSubnavItem: handleSetActiveSubnavItem,
    }), [navData, currentSubnavItems, hasSubnav, activeHeaderItem, activeSubnavItem, handleSetActiveHeaderItem, handleSetActiveSubnavItem]);

    return (
        <OverlayNavigationContext.Provider value={value}>
            {children}
        </OverlayNavigationContext.Provider>
    );
};

export const useOverlayNavigation = (): OverlayNavigationContextType => {
    const context = useContext(OverlayNavigationContext);
    if (context === undefined) {
        throw new Error('useOverlayNavigation must be used within an OverlayNavigationProvider');
    }
    return context;
};

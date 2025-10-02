

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';
import type { NavItem, RightSidebarId } from '../types';
import { NAVIGATION_LOGIC } from '../data';

interface NavigationState {
    activeRightSidebarItem: RightSidebarId;
    activeHeaderItem: string;
    activeLeftSubnavItem: string;
}

type NavigationAction =
    | { type: 'SELECT_RIGHT_SIDEBAR_ITEM'; payload: RightSidebarId }
    | { type: 'SELECT_HEADER_ITEM'; payload: string }
    | { type: 'SET_LEFT_SUBNAV_ITEM'; payload: string };
    
const initialState: NavigationState = {
    activeRightSidebarItem: 'communication',
    activeHeaderItem: 'email',
    activeLeftSubnavItem: 'inbox',
};

const navigationReducer = (state: NavigationState, action: NavigationAction): NavigationState => {
    switch (action.type) {
        case 'SELECT_RIGHT_SIDEBAR_ITEM': {
            const id = action.payload;
            const newNavData = NAVIGATION_LOGIC[id];
            const newHeaderItem = newNavData.header[0]?.id || '';
            const newSubnavItems = newNavData.subnav[newHeaderItem] || [];
            const newSubnavItem = newSubnavItems[0]?.id || '';
            return {
                ...state,
                activeRightSidebarItem: id,
                activeHeaderItem: newHeaderItem,
                activeLeftSubnavItem: newSubnavItem,
            };
        }
        case 'SELECT_HEADER_ITEM': {
             const id = action.payload;
             const newSubnavItems = NAVIGATION_LOGIC[state.activeRightSidebarItem].subnav[id] || [];
             return { ...state, activeHeaderItem: id, activeLeftSubnavItem: newSubnavItems[0]?.id || '' };
        }
        case 'SET_LEFT_SUBNAV_ITEM':
            return { ...state, activeLeftSubnavItem: action.payload };
        default:
            return state;
    }
};

interface NavigationContextType extends NavigationState {
    currentHeaderItems: NavItem[];
    currentLeftSubnavItems: NavItem[];
    hasSubnav: boolean;
    handleRightSidebarSelect: (id: string) => void;
    handleHeaderSelect: (id: string) => void;
    setActiveLeftSubnavItem: (id: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: React.PropsWithChildren<{}>): React.ReactElement => {
    const [state, dispatch] = useReducer(navigationReducer, initialState);

    const navData = useMemo(() => NAVIGATION_LOGIC[state.activeRightSidebarItem], [state.activeRightSidebarItem]);
    const currentHeaderItems = useMemo(() => navData.header, [navData]);
    const currentLeftSubnavItems = useMemo(() => navData.subnav[state.activeHeaderItem] || [], [navData, state.activeHeaderItem]);
    const hasSubnav = useMemo(() => Object.values(navData.subnav).some((subnavArray) => Array.isArray(subnavArray) && subnavArray.length > 0), [navData]);

    const handleRightSidebarSelect = useCallback((id: string) => dispatch({ type: 'SELECT_RIGHT_SIDEBAR_ITEM', payload: id as RightSidebarId }), []);
    const handleHeaderSelect = useCallback((id: string) => dispatch({ type: 'SELECT_HEADER_ITEM', payload: id }), []);
    const setActiveLeftSubnavItem = useCallback((id: string) => dispatch({ type: 'SET_LEFT_SUBNAV_ITEM', payload: id }), []);
    
    const value = useMemo(() => ({
        ...state,
        currentHeaderItems,
        currentLeftSubnavItems,
        hasSubnav,
        handleRightSidebarSelect,
        handleHeaderSelect,
        setActiveLeftSubnavItem,
    }), [state, currentHeaderItems, currentLeftSubnavItems, hasSubnav, handleRightSidebarSelect, handleHeaderSelect, setActiveLeftSubnavItem]);

    return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = (): NavigationContextType => {
    const context = useContext(NavigationContext);
    if (context === undefined) {
        throw new Error('useNavigation must be used within a NavigationProvider');
    }
    return context;
};

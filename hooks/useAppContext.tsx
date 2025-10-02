
import React, { createContext, useContext, useMemo, useRef, useCallback, useReducer, Dispatch, useEffect } from 'react';
import type { NavItem } from '../types';
import { NAVIGATION_LOGIC, RIGHT_SIDEBAR_ITEMS } from '../data';

// --- State and Actions ---
interface AppState {
    isLeftSidebarOpen: boolean;
    isRightSidebarOpen: boolean;
    isTrayOpen: boolean;
    activeRightSidebarItem: string;
    activeHeaderItem: string;
    activeLeftSubnavItem: string;
    activeOverlayApp: string | null;
    minimizedApps: string[];
    announcement: string;
    theme: 'light' | 'dark';
}

type Action =
    | { type: 'TOGGLE_LEFT_SIDEBAR' }
    | { type: 'TOGGLE_RIGHT_SIDEBAR' }
    | { type: 'TOGGLE_TRAY' }
    | { type: 'SELECT_RIGHT_SIDEBAR_ITEM'; payload: string }
    | { type: 'SELECT_HEADER_ITEM'; payload: string }
    | { type: 'SET_LEFT_SUBNAV_ITEM'; payload: string }
    | { type: 'LAUNCH_APP'; payload: { appId: string, trigger: HTMLButtonElement } }
    | { type: 'CLOSE_OVERLAY' }
    | { type: 'MINIMIZE_APP' }
    | { type: 'RESTORE_APP'; payload: { appId: string, trigger: HTMLButtonElement } }
    | { type: 'CLOSE_MINIMIZED_APP'; payload: string }
    | { type: 'CLEAR_ANNOUNCEMENT' }
    | { type: 'SET_THEME'; payload: 'light' | 'dark' };
    
// --- Reducer ---

const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};


const initialState: AppState = {
    isLeftSidebarOpen: true,
    isRightSidebarOpen: true,
    isTrayOpen: false,
    activeRightSidebarItem: 'communication',
    activeHeaderItem: 'email',
    activeLeftSubnavItem: 'inbox',
    activeOverlayApp: null,
    minimizedApps: [],
    announcement: '',
    theme: getInitialTheme(),
};

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'TOGGLE_LEFT_SIDEBAR':
            return { ...state, isLeftSidebarOpen: !state.isLeftSidebarOpen, announcement: state.isLeftSidebarOpen ? 'Left sidebar collapsed' : 'Left sidebar expanded' };
        case 'TOGGLE_RIGHT_SIDEBAR':
            return { ...state, isRightSidebarOpen: !state.isRightSidebarOpen, announcement: state.isRightSidebarOpen ? 'Right sidebar collapsed' : 'Right sidebar expanded' };
        case 'TOGGLE_TRAY':
            return { ...state, isTrayOpen: !state.isTrayOpen, announcement: state.isTrayOpen ? 'App tray closed' : 'App tray opened' };
        case 'SELECT_RIGHT_SIDEBAR_ITEM': {
            const id = action.payload;
            const newNavData = NAVIGATION_LOGIC[id] || { header: [], subnav: {} };
            const newHeaderItem = newNavData.header[0]?.id || '';
            const newSubnavItems = newNavData.subnav[newHeaderItem] || [];
            const newSubnavItem = newSubnavItems[0]?.id || '';
            const label = RIGHT_SIDEBAR_ITEMS.find(item => item.id === id)?.label || '';

            return {
                ...state,
                activeRightSidebarItem: id,
                activeHeaderItem: newHeaderItem,
                activeLeftSubnavItem: newSubnavItem,
                announcement: `Navigated to ${label} section`,
            };
        }
        case 'SELECT_HEADER_ITEM': {
             const id = action.payload;
             const newSubnavItems = NAVIGATION_LOGIC[state.activeRightSidebarItem].subnav[id] || [];
             return { ...state, activeHeaderItem: id, activeLeftSubnavItem: newSubnavItems[0]?.id || '' };
        }
        case 'SET_LEFT_SUBNAV_ITEM':
            return { ...state, activeLeftSubnavItem: action.payload };
        case 'LAUNCH_APP':
        case 'RESTORE_APP':
            return { 
                ...state,
                minimizedApps: state.minimizedApps.filter(id => id !== action.payload.appId),
                activeOverlayApp: action.payload.appId,
                announcement: `${action.payload.appId} app opened`
            };
        case 'CLOSE_OVERLAY':
            return { ...state, activeOverlayApp: null, announcement: `${state.activeOverlayApp} app closed` };
        case 'MINIMIZE_APP':
            if (!state.activeOverlayApp || state.minimizedApps.includes(state.activeOverlayApp)) {
                return state;
            }
            return {
                ...state,
                minimizedApps: [...state.minimizedApps, state.activeOverlayApp],
                activeOverlayApp: null,
                announcement: `${state.activeOverlayApp} app minimized`
            };
        case 'CLOSE_MINIMIZED_APP':
             return { 
                ...state,
                minimizedApps: state.minimizedApps.filter(id => id !== action.payload),
                announcement: `${action.payload} app closed from minimized`
            };
        case 'CLEAR_ANNOUNCEMENT':
            return { ...state, announcement: '' };
        case 'SET_THEME':
            return { ...state, theme: action.payload, announcement: `Theme set to ${action.payload} mode` };
        default:
            return state;
    }
};

// --- Context ---
interface AppContextType extends AppState {
    dispatch: Dispatch<Action>;
    // Derived state
    currentHeaderItems: NavItem[];
    currentLeftSubnavItems: NavItem[];
    hasSubnav: boolean;
    // Refs for focus management
    appLaunchButtonRef: React.RefObject<HTMLButtonElement | null>;
    leftSidebarToggleRef: React.RefObject<HTMLButtonElement | null>;
    rightSidebarToggleRef: React.RefObject<HTMLButtonElement | null>;
    notificationButtonRef: React.RefObject<HTMLButtonElement | null>;
    // Wrapped dispatchers for convenience
    toggleLeftSidebar: () => void;
    toggleRightSidebar: () => void;
    toggleTray: () => void;
    handleRightSidebarSelect: (id: string) => void;
    handleHeaderSelect: (id: string) => void;
    setActiveLeftSubnavItem: (id: string) => void;
    handleLaunchApp: (appId: string, trigger: HTMLButtonElement) => void;
    handleCloseOverlay: () => void;
    handleMinimizeApp: () => void;
    handleRestoreApp: (appId: string, trigger: HTMLButtonElement) => void;
    handleCloseMinimizedApp: (id: string) => void;
    clearAnnouncement: () => void;
    toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Fix: Update `AppProvider`'s props type to use `React.PropsWithChildren`.
// This makes the `children` prop optional, resolving a TypeScript error in `App.tsx`
// where the JSX transform was not correctly inferring the `children` prop.
export const AppProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const appLaunchButtonRef = useRef<HTMLButtonElement | null>(null);
    const leftSidebarToggleRef = useRef<HTMLButtonElement | null>(null);
    const rightSidebarToggleRef = useRef<HTMLButtonElement | null>(null);
    const notificationButtonRef = useRef<HTMLButtonElement | null>(null);

    // Theme side-effect
    useEffect(() => {
        const root = window.document.documentElement;
        if (state.theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        try {
            localStorage.setItem('theme', state.theme);
        } catch (error) {
            console.error("Could not save theme to localStorage", error);
        }
    }, [state.theme]);


    // Derived state
    const navData = useMemo(() => NAVIGATION_LOGIC[state.activeRightSidebarItem] || { header: [], subnav: {} }, [state.activeRightSidebarItem]);
    const currentHeaderItems = useMemo(() => navData.header, [navData]);
    const currentLeftSubnavItems = useMemo(() => navData.subnav[state.activeHeaderItem] || [], [navData, state.activeHeaderItem]);
    const hasSubnav = useMemo(() => Object.values(navData.subnav).some((subnavArray) => Array.isArray(subnavArray) && subnavArray.length > 0), [navData]);

    // Action creators (memoized dispatchers)
    const toggleLeftSidebar = useCallback(() => dispatch({ type: 'TOGGLE_LEFT_SIDEBAR' }), []);
    const toggleRightSidebar = useCallback(() => dispatch({ type: 'TOGGLE_RIGHT_SIDEBAR' }), []);
    const toggleTray = useCallback(() => dispatch({ type: 'TOGGLE_TRAY' }), []);
    const handleRightSidebarSelect = useCallback((id: string) => dispatch({ type: 'SELECT_RIGHT_SIDEBAR_ITEM', payload: id }), []);
    const handleHeaderSelect = useCallback((id: string) => dispatch({ type: 'SELECT_HEADER_ITEM', payload: id }), []);
    const setActiveLeftSubnavItem = useCallback((id: string) => dispatch({ type: 'SET_LEFT_SUBNAV_ITEM', payload: id }), []);
    
    const handleLaunchApp = useCallback((appId: string, trigger: HTMLButtonElement) => {
        appLaunchButtonRef.current = trigger;
        if (state.minimizedApps.includes(appId)) {
             dispatch({ type: 'RESTORE_APP', payload: { appId, trigger } });
        } else if (appId !== state.activeOverlayApp) {
             dispatch({ type: 'LAUNCH_APP', payload: { appId, trigger } });
        }
    }, [state.minimizedApps, state.activeOverlayApp]);
    
    const handleRestoreApp = useCallback((appId: string, trigger: HTMLButtonElement) => {
        appLaunchButtonRef.current = trigger;
        dispatch({ type: 'RESTORE_APP', payload: { appId, trigger } });
    }, []);

    const handleCloseOverlay = useCallback(() => {
        dispatch({ type: 'CLOSE_OVERLAY' });
        setTimeout(() => appLaunchButtonRef.current?.focus(), 0);
    }, []);
    
    const handleMinimizeApp = useCallback(() => {
        dispatch({ type: 'MINIMIZE_APP' });
        setTimeout(() => appLaunchButtonRef.current?.focus(), 0);
    }, []);

    const handleCloseMinimizedApp = useCallback((id: string) => dispatch({ type: 'CLOSE_MINIMIZED_APP', payload: id }), []);
    const clearAnnouncement = useCallback(() => dispatch({ type: 'CLEAR_ANNOUNCEMENT' }), []);
    const toggleTheme = useCallback(() => dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' }), [state.theme]);


    const value = useMemo(() => ({
        ...state,
        dispatch,
        currentHeaderItems,
        currentLeftSubnavItems,
        hasSubnav,
        appLaunchButtonRef,
        leftSidebarToggleRef,
        rightSidebarToggleRef,
        notificationButtonRef,
        toggleLeftSidebar,
        toggleRightSidebar,
        toggleTray,
        handleRightSidebarSelect,
        handleHeaderSelect,
        setActiveLeftSubnavItem,
        handleLaunchApp,
        handleCloseOverlay,
        handleMinimizeApp,
        handleRestoreApp,
        handleCloseMinimizedApp,
        clearAnnouncement,
        toggleTheme,
    }), [
        state, currentHeaderItems, currentLeftSubnavItems, hasSubnav,
        toggleLeftSidebar, toggleRightSidebar, toggleTray, handleRightSidebarSelect,
        handleHeaderSelect, setActiveLeftSubnavItem, handleLaunchApp, handleCloseOverlay,
        handleMinimizeApp, handleRestoreApp, handleCloseMinimizedApp, clearAnnouncement,
        toggleTheme
    ]);

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

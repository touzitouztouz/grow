

import React, { createContext, useContext, useReducer, useCallback, useMemo, useRef } from 'react';
import type { OverlayAppId } from '../types';

interface UIState {
    isLeftSidebarOpen: boolean;
    isRightSidebarOpen: boolean;
    isTrayOpen: boolean;
    activeOverlayApp: OverlayAppId | null;
    minimizedApps: OverlayAppId[];
    announcement: string;
}

type UIAction =
    | { type: 'TOGGLE_LEFT_SIDEBAR' }
    | { type: 'TOGGLE_RIGHT_SIDEBAR' }
    | { type: 'TOGGLE_TRAY' }
    | { type: 'SET_ANNOUNCEMENT'; payload: string }
    | { type: 'CLEAR_ANNOUNCEMENT' }
    | { type: 'LAUNCH_APP'; payload: { appId: OverlayAppId, trigger: HTMLButtonElement } }
    | { type: 'CLOSE_OVERLAY' }
    | { type: 'MINIMIZE_APP' }
    | { type: 'RESTORE_APP'; payload: { appId: OverlayAppId, trigger: HTMLButtonElement } }
    | { type: 'CLOSE_MINIMIZED_APP'; payload: OverlayAppId };

const isDesktop = (): boolean => typeof window !== 'undefined' && window.innerWidth >= 768;

const initialState: UIState = {
    isLeftSidebarOpen: isDesktop(),
    isRightSidebarOpen: isDesktop(),
    isTrayOpen: false,
    activeOverlayApp: null,
    minimizedApps: [],
    announcement: '',
};

const uiReducer = (state: UIState, action: UIAction): UIState => {
    switch (action.type) {
        case 'TOGGLE_LEFT_SIDEBAR':
            return { ...state, isLeftSidebarOpen: !state.isLeftSidebarOpen, announcement: state.isLeftSidebarOpen ? 'Left sidebar collapsed' : 'Left sidebar expanded' };
        case 'TOGGLE_RIGHT_SIDEBAR':
            return { ...state, isRightSidebarOpen: !state.isRightSidebarOpen, announcement: state.isRightSidebarOpen ? 'Right sidebar collapsed' : 'Right sidebar expanded' };
        case 'TOGGLE_TRAY':
            return { ...state, isTrayOpen: !state.isTrayOpen, announcement: state.isTrayOpen ? 'App tray closed' : 'App tray opened' };
        case 'SET_ANNOUNCEMENT':
             return { ...state, announcement: action.payload };
        case 'CLEAR_ANNOUNCEMENT':
            return { ...state, announcement: '' };
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
        default:
            return state;
    }
};

interface UIContextType extends UIState {
    appLaunchButtonRef: React.RefObject<HTMLButtonElement | null>;
    leftSidebarToggleRef: React.RefObject<HTMLButtonElement | null>;
    rightSidebarToggleRef: React.RefObject<HTMLButtonElement | null>;
    notificationButtonRef: React.RefObject<HTMLButtonElement | null>;
    toggleLeftSidebar: () => void;
    toggleRightSidebar: () => void;
    toggleTray: () => void;
    setAnnouncement: (message: string) => void;
    clearAnnouncement: () => void;
    handleLaunchApp: (appId: string, trigger: HTMLButtonElement) => void;
    handleCloseOverlay: () => void;
    handleMinimizeApp: () => void;
    handleRestoreApp: (appId: string, trigger: HTMLButtonElement) => void;
    handleCloseMinimizedApp: (id: OverlayAppId) => void;
}

const UIStateContext = createContext<UIContextType | undefined>(undefined);

export const UIStateProvider = ({ children }: React.PropsWithChildren<{}>): React.ReactElement => {
    const [state, dispatch] = useReducer(uiReducer, initialState);
    const appLaunchButtonRef = useRef<HTMLButtonElement | null>(null);
    const leftSidebarToggleRef = useRef<HTMLButtonElement | null>(null);
    const rightSidebarToggleRef = useRef<HTMLButtonElement | null>(null);
    const notificationButtonRef = useRef<HTMLButtonElement | null>(null);

    const toggleLeftSidebar = useCallback(() => dispatch({ type: 'TOGGLE_LEFT_SIDEBAR' }), []);
    const toggleRightSidebar = useCallback(() => dispatch({ type: 'TOGGLE_RIGHT_SIDEBAR' }), []);
    const toggleTray = useCallback(() => dispatch({ type: 'TOGGLE_TRAY' }), []);
    const setAnnouncement = useCallback((message: string) => dispatch({ type: 'SET_ANNOUNCEMENT', payload: message }), []);
    const clearAnnouncement = useCallback(() => dispatch({ type: 'CLEAR_ANNOUNCEMENT' }), []);
    const handleLaunchApp = useCallback((appId: string, trigger: HTMLButtonElement) => {
        appLaunchButtonRef.current = trigger;
        const typedAppId = appId as OverlayAppId;
        if (state.minimizedApps.includes(typedAppId)) {
             dispatch({ type: 'RESTORE_APP', payload: { appId: typedAppId, trigger } });
        } else if (appId !== state.activeOverlayApp) {
             dispatch({ type: 'LAUNCH_APP', payload: { appId: typedAppId, trigger } });
        }
    }, [state.minimizedApps, state.activeOverlayApp]);
    const handleRestoreApp = useCallback((appId: string, trigger: HTMLButtonElement) => {
        appLaunchButtonRef.current = trigger;
        dispatch({ type: 'RESTORE_APP', payload: { appId: appId as OverlayAppId, trigger } });
    }, []);
    const handleCloseOverlay = useCallback(() => {
        dispatch({ type: 'CLOSE_OVERLAY' });
        setTimeout(() => appLaunchButtonRef.current?.focus(), 0);
    }, []);
    const handleMinimizeApp = useCallback(() => {
        dispatch({ type: 'MINIMIZE_APP' });
        setTimeout(() => appLaunchButtonRef.current?.focus(), 0);
    }, []);
    const handleCloseMinimizedApp = useCallback((id: OverlayAppId) => dispatch({ type: 'CLOSE_MINIMIZED_APP', payload: id }), []);

    const value = useMemo(() => ({
        ...state,
        appLaunchButtonRef,
        leftSidebarToggleRef,
        rightSidebarToggleRef,
        notificationButtonRef,
        toggleLeftSidebar,
        toggleRightSidebar,
        toggleTray,
        setAnnouncement,
        clearAnnouncement,
        handleLaunchApp,
        handleCloseOverlay,
        handleMinimizeApp,
        handleRestoreApp,
        handleCloseMinimizedApp,
    }), [state, toggleLeftSidebar, toggleRightSidebar, toggleTray, setAnnouncement, clearAnnouncement, handleLaunchApp, handleCloseOverlay, handleMinimizeApp, handleRestoreApp, handleCloseMinimizedApp]);

    return <UIStateContext.Provider value={value}>{children}</UIStateContext.Provider>;
};

export const useUIState = (): UIContextType => {
    const context = useContext(UIStateContext);
    if (context === undefined) {
        throw new Error('useUIState must be used within a UIStateProvider');
    }
    return context;
};

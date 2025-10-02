
import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
}

type ThemeAction = { type: 'SET_THEME'; payload: Theme };

const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const initialState: ThemeState = {
    theme: getInitialTheme(),
};

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
    switch (action.type) {
        case 'SET_THEME':
            return { ...state, theme: action.payload };
        default:
            return state;
    }
};

interface ThemeContextType extends ThemeState {
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

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
    
    const toggleTheme = useCallback(() => {
        dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' });
    }, [state.theme]);
    
    const value = useMemo(() => ({
        ...state,
        toggleTheme,
    }), [state, toggleTheme]);
    
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

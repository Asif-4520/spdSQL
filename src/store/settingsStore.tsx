import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

interface Settings {
    themeMode: ThemeMode;
    resolvedTheme: 'light' | 'dark';
    fontSize: number;
    showLineNumbers: boolean;
    autoSaveHistory: boolean;
    isVertical: boolean;
    showExecutionTime: boolean;
}

interface SettingsContextValue extends Settings {
    setThemeMode: (mode: ThemeMode) => void;
    setFontSize: (size: number) => void;
    setShowLineNumbers: (show: boolean) => void;
    setAutoSaveHistory: (save: boolean) => void;
    setIsVertical: (vertical: boolean) => void;
    setShowExecutionTime: (show: boolean) => void;
    toggleTheme: () => void;
    resetSettings: () => void;
    theme: 'light' | 'dark';
}

const STORAGE_KEY = 'SQLio-settings';

function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

function getDefaultSettings(): Settings {
    return {
        themeMode: 'auto',
        resolvedTheme: getSystemTheme(),
        fontSize: 14,
        showLineNumbers: true,
        autoSaveHistory: true,
        isVertical: true,
        showExecutionTime: true,
    };
}

function loadSettings(): Settings {
    if (typeof window === 'undefined') return getDefaultSettings();
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved) as Partial<Settings>;
            const settings = { ...getDefaultSettings(), ...parsed };
            if (settings.themeMode === 'auto') {
                settings.resolvedTheme = getSystemTheme();
            }
            return settings;
        }
    } catch {
        // ignore
    }
    return getDefaultSettings();
}

function saveSettings(settings: Settings): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
        // ignore
    }
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>(loadSettings);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            setSettings((prev) => {
                if (prev.themeMode !== 'auto') return prev;
                return { ...prev, resolvedTheme: e.matches ? 'dark' : 'light' };
            });
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const setThemeMode = useCallback((mode: ThemeMode) => {
        setSettings((prev) => ({
            ...prev,
            themeMode: mode,
            resolvedTheme: mode === 'auto' ? getSystemTheme() : mode,
        }));
    }, []);

    const toggleTheme = useCallback(() => {
        setSettings((prev) => {
            const newTheme = prev.resolvedTheme === 'dark' ? 'light' : 'dark';
            return { ...prev, themeMode: newTheme, resolvedTheme: newTheme };
        });
    }, []);

    const setFontSize = useCallback((fontSize: number) => {
        setSettings((prev) => ({ ...prev, fontSize }));
    }, []);

    const setShowLineNumbers = useCallback((showLineNumbers: boolean) => {
        setSettings((prev) => ({ ...prev, showLineNumbers }));
    }, []);

    const setAutoSaveHistory = useCallback((autoSaveHistory: boolean) => {
        setSettings((prev) => ({ ...prev, autoSaveHistory }));
    }, []);

    const setIsVertical = useCallback((isVertical: boolean) => {
        setSettings((prev) => ({ ...prev, isVertical }));
    }, []);

    const setShowExecutionTime = useCallback((showExecutionTime: boolean) => {
        setSettings((prev) => ({ ...prev, showExecutionTime }));
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(getDefaultSettings());
    }, []);

    const value: SettingsContextValue = {
        ...settings,
        theme: settings.resolvedTheme,
        setThemeMode,
        setFontSize,
        setShowLineNumbers,
        setAutoSaveHistory,
        setIsVertical,
        setShowExecutionTime,
        toggleTheme,
        resetSettings,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettingsStore(): SettingsContextValue {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error(
            'useSettingsStore must be used within SettingsProvider'
        );
    }
    return context;
}

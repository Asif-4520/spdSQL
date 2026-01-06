import { useEffect } from 'react';
import { useSettingsStore } from '../store';

export function useTheme() {
    const { resolvedTheme, themeMode, setThemeMode, toggleTheme } = useSettingsStore();

    useEffect(() => {
        const root = document.documentElement;

        if (resolvedTheme === 'light') {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
    }, [resolvedTheme]);

    return {
        theme: resolvedTheme,
        themeMode,
        isDark: resolvedTheme === 'dark',
        isLight: resolvedTheme === 'light',
        setThemeMode,
        toggleTheme,
    };
}

export default useTheme;

import { useEffect } from "react";
import { useSettingsStore } from "../store";

const DARK_THEMES = ["dark", "midnight", "forest"] as const;
const LIGHT_THEMES = ["light", "solarized", "pastel"] as const;

export function useTheme() {
    const { resolvedTheme, themeMode, setThemeMode, toggleTheme } =
        useSettingsStore();

    useEffect(() => {
        const root = document.documentElement;
        const themeClasses = [
            "light",
            "theme-midnight",
            "theme-solarized",
            "theme-forest",
            "theme-pastel",
        ];
        root.classList.remove(...themeClasses);

        switch (resolvedTheme) {
            case "light":
                root.classList.add("light");
                break;
            case "midnight":
                root.classList.add("theme-midnight");
                break;
            case "solarized":
                root.classList.add("theme-solarized");
                break;
            case "forest":
                root.classList.add("theme-forest");
                break;
            case "pastel":
                root.classList.add("theme-pastel");
                break;
            default:
                break;
        }
    }, [resolvedTheme]);

    const isDark = DARK_THEMES.includes(
        resolvedTheme as (typeof DARK_THEMES)[number]
    );
    const isLight = LIGHT_THEMES.includes(
        resolvedTheme as (typeof LIGHT_THEMES)[number]
    );

    return {
        theme: resolvedTheme,
        themeMode,
        isDark,
        isLight,
        setThemeMode,
        toggleTheme,
    };
}

export default useTheme;

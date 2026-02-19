import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type ThemeMode =
    | "light"
    | "dark"
    | "midnight"
    | "solarized"
    | "forest"
    | "pastel"
    | "auto";
type EditorTheme =
    | "match"
    | "light"
    | "dark"
    | "midnight"
    | "solarized"
    | "forest"
    | "pastel";
type EditorHighlight = "balanced" | "vibrant" | "soft" | "contrast";

interface Settings {
    themeMode: ThemeMode;
    resolvedTheme:
        | "light"
        | "dark"
        | "midnight"
        | "solarized"
        | "forest"
        | "pastel";
    lastLightTheme: "light" | "solarized" | "pastel";
    lastDarkTheme: "dark" | "midnight" | "forest";
    editorTheme: EditorTheme;
    editorHighlight: EditorHighlight;
    fontSize: number;
    showLineNumbers: boolean;
    autoSaveHistory: boolean;
    isVertical: boolean;
    showExecutionTime: boolean;
}

interface SettingsContextValue extends Settings {
    setThemeMode: (mode: ThemeMode) => void;
    setEditorTheme: (theme: EditorTheme) => void;
    setEditorHighlight: (highlight: EditorHighlight) => void;
    setFontSize: (size: number) => void;
    setShowLineNumbers: (show: boolean) => void;
    setAutoSaveHistory: (save: boolean) => void;
    setIsVertical: (vertical: boolean) => void;
    setShowExecutionTime: (show: boolean) => void;
    toggleTheme: () => void;
    resetSettings: () => void;
    isSettingsOpen: boolean;
    setIsSettingsOpen: (open: boolean) => void;
    theme: "light" | "dark" | "midnight" | "solarized" | "forest" | "pastel";
}

const STORAGE_KEY = "spdSQL-settings";

function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") {
        return "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function getDefaultSettings(): Settings {
    return {
        themeMode: "auto",
        resolvedTheme: getSystemTheme(),
        lastLightTheme: "light",
        lastDarkTheme: "dark",
        editorTheme: "match",
        editorHighlight: "balanced",
        fontSize: 14,
        showLineNumbers: true,
        autoSaveHistory: true,
        isVertical: true,
        showExecutionTime: true,
    };
}

function loadSettings(): Settings {
    if (typeof window === "undefined") {
        return getDefaultSettings();
    }
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved) as Partial<Settings>;
            const settings = { ...getDefaultSettings(), ...parsed };
            if (settings.themeMode === "auto") {
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
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

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

        switch (settings.resolvedTheme) {
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
                // dark is the default variables
                break;
        }
    }, [settings.resolvedTheme]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            setSettings((prev) => {
                if (prev.themeMode !== "auto") {
                    return prev;
                }
                return { ...prev, resolvedTheme: e.matches ? "dark" : "light" };
            });
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const setThemeMode = useCallback((mode: ThemeMode) => {
        setSettings((prev) => {
            const lightThemes = ["light", "solarized", "pastel"] as const;
            const darkThemes = ["dark", "midnight", "forest"] as const;

            let nextResolved: Settings["resolvedTheme"];
            if (mode === "auto") {
                nextResolved = getSystemTheme();
            } else {
                nextResolved = mode as Settings["resolvedTheme"];
            }

            const isLightLike = (
                theme: string
            ): theme is Settings["lastLightTheme"] =>
                lightThemes.includes(theme as (typeof lightThemes)[number]);
            const isDarkLike = (
                theme: string
            ): theme is Settings["lastDarkTheme"] =>
                darkThemes.includes(theme as (typeof darkThemes)[number]);

            return {
                ...prev,
                themeMode: mode,
                resolvedTheme: nextResolved,
                lastLightTheme: isLightLike(mode)
                    ? (mode as Settings["lastLightTheme"])
                    : prev.lastLightTheme,
                lastDarkTheme: isDarkLike(mode)
                    ? (mode as Settings["lastDarkTheme"])
                    : prev.lastDarkTheme,
            };
        });
    }, []);

    const toggleTheme = useCallback(() => {
        setSettings((prev) => {
            const darkLike =
                prev.resolvedTheme === "dark" ||
                prev.resolvedTheme === "midnight" ||
                prev.resolvedTheme === "forest";

            const targetTheme = darkLike
                ? prev.lastLightTheme
                : prev.lastDarkTheme;

            return {
                ...prev,
                themeMode: targetTheme,
                resolvedTheme: targetTheme,
            };
        });
    }, []);

    const setFontSize = useCallback((fontSize: number) => {
        setSettings((prev) => ({ ...prev, fontSize }));
    }, []);

    const setEditorTheme = useCallback((theme: EditorTheme) => {
        setSettings((prev) => ({ ...prev, editorTheme: theme }));
    }, []);

    const setEditorHighlight = useCallback((highlight: EditorHighlight) => {
        setSettings((prev) => ({ ...prev, editorHighlight: highlight }));
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
        setEditorTheme,
        setEditorHighlight,
        setFontSize,
        setShowLineNumbers,
        setAutoSaveHistory,
        setIsVertical,
        setShowExecutionTime,
        toggleTheme,
        resetSettings,
        isSettingsOpen,
        setIsSettingsOpen,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettingsStore(): SettingsContextValue {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error(
            "useSettingsStore must be used within SettingsProvider"
        );
    }
    return context;
}

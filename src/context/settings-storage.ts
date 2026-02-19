import type { Settings } from "./types";

export const DEFAULT_SETTINGS: Settings = {
    editorFontSize: 14,
    showLineNumbers: true,
    autoSaveHistory: true,
};

const STORAGE_KEY = "spdSQL-settings";

export const loadSettings = (): Settings => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
        } catch {
            return DEFAULT_SETTINGS;
        }
    }
    return DEFAULT_SETTINGS;
};

export const saveSettings = (settings: Settings): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};

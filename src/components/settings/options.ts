export type ThemeModeOption = {
    value:
        | "light"
        | "dark"
        | "midnight"
        | "solarized"
        | "forest"
        | "pastel"
        | "auto";
    label: string;
    hint: string;
    accent: string;
    overlay?: string;
    swatch: string[];
    group: "Light" | "Dark";
};

export type PaletteOption = {
    value: "balanced" | "vibrant" | "soft" | "contrast";
    label: string;
    colors: string[];
    hint?: string;
};

export const themeOptions: ThemeModeOption[] = [
    {
        value: "auto",
        label: "Auto",
        hint: "Matches your system",
        accent: "linear-gradient(135deg, #6366f1, #22d3ee)",
        overlay:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 50%)",
        swatch: ["#6366f1", "#22d3ee", "#0ea5e9"],
        group: "Light",
    },
    {
        value: "dark",
        label: "Dark",
        hint: "Classic midnight",
        accent: "linear-gradient(135deg, #0f172a, #1f2937)",
        swatch: ["#0f172a", "#111827", "#1f2937"],
        group: "Dark",
    },
    {
        value: "light",
        label: "Light",
        hint: "Clean daylight",
        accent: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        swatch: ["#f8fafc", "#e2e8f0", "#cbd5e1"],
        group: "Light",
    },
    {
        value: "midnight",
        label: "Midnight",
        hint: "Deep navy glow",
        accent: "linear-gradient(135deg, #0b1224, #111827)",
        swatch: ["#0b1224", "#0f172a", "#1f2937"],
        group: "Dark",
    },
    {
        value: "solarized",
        label: "Solarized",
        hint: "Warm, low-contrast",
        accent: "linear-gradient(135deg, #fdf6e3, #f1e7c6)",
        swatch: ["#fdf6e3", "#eee8d5", "#268bd2"],
        group: "Light",
    },
    {
        value: "forest",
        label: "Forest",
        hint: "Moody greens",
        accent: "linear-gradient(135deg, #0b1f1a, #123828)",
        swatch: ["#0b1f1a", "#0f2d22", "#22c55e"],
        group: "Dark",
    },
    {
        value: "pastel",
        label: "Pastel",
        hint: "Soft & airy",
        accent: "linear-gradient(135deg, #f5e9ff, #d8f2ff)",
        swatch: ["#f5e9ff", "#d8f2ff", "#c7d2fe"],
        group: "Light",
    },
];

export const paletteOptions: PaletteOption[] = [
    {
        value: "balanced",
        label: "Balanced",
        colors: ["#4b5563", "#0ea5e9", "#10b981", "#f59e0b"],
        hint: "Neutral base with lively accents",
    },
    {
        value: "vibrant",
        label: "Vibrant",
        colors: ["#ff3366", "#22d3ee", "#ffd166", "#7c3aed"],
        hint: "Neon pop for dark themes",
    },
    {
        value: "soft",
        label: "Soft",
        colors: ["#f2e9ff", "#ffe4e6", "#e0f2fe", "#dcfce7"],
        hint: "Pastel wash that stays legible",
    },
    {
        value: "contrast",
        label: "High Contrast",
        colors: ["#0f172a", "#fef3c7", "#38bdf8", "#f43f5e"],
        hint: "Bold edges for maximum clarity",
    },
];

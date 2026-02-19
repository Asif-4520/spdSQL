import { EditorView } from "@codemirror/view";

type ThemeKey =
    | "dark"
    | "light"
    | "midnight"
    | "solarized"
    | "forest"
    | "pastel";

const baseShared = {
    ".cm-scroller": {
        fontFamily: "monospace",
        lineHeight: "1.65",
    },
};

export const DarkTheme = EditorView.theme(
    {
        "&": {
            backgroundColor: "#1f2937",
            color: "#e5e7eb",
        },
        ".cm-content": {
            caretColor: "#82aaff",
            padding: "10px 0",
        },
        ".cm-cursor": {
            borderLeftColor: "#82aaff",
        },
        ".cm-activeLine": {
            backgroundColor: "#273449",
        },
        ".cm-activeLineGutter": {
            backgroundColor: "#273449",
            color: "#9ca3af",
        },
        ".cm-selectionBackground": {
            backgroundColor: "#374151 !important",
        },
        ".cm-gutters": {
            backgroundColor: "#111827",
            color: "#6b7280",
            borderRight: "1px solid #374151",
        },
        ".cm-matchingBracket": {
            backgroundColor: "#374151",
            outline: "1px solid #82aaff",
        },
        ...baseShared,
    },
    { dark: true }
);

export const LightTheme = EditorView.theme({
    "&": {
        backgroundColor: "#ffffff",
        color: "#1f2937",
    },
    ".cm-content": {
        caretColor: "#6366f1",
        padding: "10px 0",
    },
    ".cm-activeLine": {
        backgroundColor: "#f3f4f6",
    },
    ".cm-activeLineGutter": {
        backgroundColor: "#f3f4f6",
        color: "#4b5563",
    },
    ".cm-selectionBackground": {
        backgroundColor: "#e0e7ff !important",
    },
    ".cm-gutters": {
        backgroundColor: "#f9fafb",
        color: "#6b7280",
        borderRight: "1px solid #e5e7eb",
    },
    ".cm-matchingBracket": {
        backgroundColor: "#e0e7ff",
        outline: "1px solid #6366f1",
    },
    ...baseShared,
});

export const MidnightTheme = EditorView.theme(
    {
        "&": {
            backgroundColor: "#0b1221",
            color: "#dbeafe",
        },
        ".cm-content": {
            caretColor: "#38bdf8",
            padding: "10px 0",
        },
        ".cm-cursor": {
            borderLeftColor: "#38bdf8",
        },
        ".cm-activeLine": {
            backgroundColor: "#111a2f",
        },
        ".cm-activeLineGutter": {
            backgroundColor: "#111a2f",
            color: "#7dd3fc",
        },
        ".cm-selectionBackground": {
            backgroundColor: "#1e293b !important",
        },
        ".cm-gutters": {
            backgroundColor: "#0f172a",
            color: "#64748b",
            borderRight: "1px solid #1e293b",
        },
        ".cm-matchingBracket": {
            backgroundColor: "#1e293b",
            outline: "1px solid #38bdf8",
        },
        ...baseShared,
    },
    { dark: true }
);

export const SolarizedTheme = EditorView.theme({
    "&": {
        backgroundColor: "#fdf6e3",
        color: "#073642",
    },
    ".cm-content": {
        caretColor: "#b58900",
        padding: "10px 0",
    },
    ".cm-activeLine": {
        backgroundColor: "#eee8d5",
    },
    ".cm-activeLineGutter": {
        backgroundColor: "#eee8d5",
        color: "#657b83",
    },
    ".cm-selectionBackground": {
        backgroundColor: "#dfe4cb !important",
    },
    ".cm-gutters": {
        backgroundColor: "#f5e8c8",
        color: "#657b83",
        borderRight: "1px solid #e6d8b7",
    },
    ".cm-matchingBracket": {
        backgroundColor: "#eee8d5",
        outline: "1px solid #b58900",
    },
    ...baseShared,
});

export const ForestTheme = EditorView.theme(
    {
        "&": {
            backgroundColor: "#0f1a14",
            color: "#e3fcec",
        },
        ".cm-content": {
            caretColor: "#34d399",
            padding: "10px 0",
        },
        ".cm-cursor": {
            borderLeftColor: "#34d399",
        },
        ".cm-activeLine": {
            backgroundColor: "#122019",
        },
        ".cm-activeLineGutter": {
            backgroundColor: "#122019",
            color: "#6ee7b7",
        },
        ".cm-selectionBackground": {
            backgroundColor: "#1b2a22 !important",
        },
        ".cm-gutters": {
            backgroundColor: "#0d1510",
            color: "#7f9f8c",
            borderRight: "1px solid #1b2a22",
        },
        ".cm-matchingBracket": {
            backgroundColor: "#1b2a22",
            outline: "1px solid #34d399",
        },
        ...baseShared,
    },
    { dark: true }
);

export const PastelTheme = EditorView.theme({
    "&": {
        backgroundColor: "#fff7fb",
        color: "#3c2a3e",
    },
    ".cm-content": {
        caretColor: "#d946ef",
        padding: "10px 0",
    },
    ".cm-activeLine": {
        backgroundColor: "#fde5f5",
    },
    ".cm-activeLineGutter": {
        backgroundColor: "#fde5f5",
        color: "#6b4b6f",
    },
    ".cm-selectionBackground": {
        backgroundColor: "#f7d7ef !important",
    },
    ".cm-gutters": {
        backgroundColor: "#fff0f8",
        color: "#7a667d",
        borderRight: "1px solid #f3d4ea",
    },
    ".cm-matchingBracket": {
        backgroundColor: "#fde5f5",
        outline: "1px solid #d946ef",
    },
    ...baseShared,
});

export const editorThemes: Record<
    ThemeKey,
    ReturnType<typeof EditorView.theme>
> = {
    dark: DarkTheme,
    light: LightTheme,
    midnight: MidnightTheme,
    solarized: SolarizedTheme,
    forest: ForestTheme,
    pastel: PastelTheme,
};

export type EditorThemeKey = ThemeKey;

const APP_BASE = "/app" as const;

export const PATHS = {
    HOME: "/",
    APP: APP_BASE,
    EDITOR: APP_BASE,
    SCHEMA: `${APP_BASE}/schema`,
    IMPORT: `${APP_BASE}/import`,
    EXPORT: `${APP_BASE}/export`,
    DEMO: `${APP_BASE}/demo`,
    HISTORY: `${APP_BASE}/history`,
    SHORTCUTS: `${APP_BASE}/shortcuts`,
    HELP: `${APP_BASE}/help`,
    ABOUT: `${APP_BASE}/about`,
    SETTINGS: `${APP_BASE}/settings`,
    FEEDBACK: `${APP_BASE}/feedback`,
} as const;

export const RELATIVE = {
    EDITOR: ".",
    SCHEMA: "./schema",
    IMPORT: "./import",
    EXPORT: "./export",
    DEMO: "./demo",
    HISTORY: "./history",
    SHORTCUTS: "./shortcuts",
    HELP: "./help",
    ABOUT: "./about",
    SETTINGS: "./settings",
    FEEDBACK: "./feedback",
    BACK_TO_SCHEMA: "../schema",
} as const;

export const isPath = {
    editor: (pathname: string) =>
        pathname === PATHS.APP || pathname === `${PATHS.APP}/`,
    schema: (pathname: string) => pathname.includes("schema"),
};

export type PathKey = keyof typeof PATHS;
export type RelativePathKey = keyof typeof RELATIVE;

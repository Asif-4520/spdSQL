const BASE = {
    HOME: '/',
    APP: '/app',
} as const;

const APP_ROUTES = {
    EDITOR: '',
    SCHEMA: 'schema',
    IMPORT: 'import',
    EXPORT: 'export',
    DEMO: 'demo',
    HISTORY: 'history',
    SHORTCUTS: 'shortcuts',
    HELP: 'help',
    ABOUT: 'about',
    SETTINGS: 'settings',
    FEEDBACK: 'feedback',
} as const;

export const PATHS = {
    HOME: BASE.HOME,
    APP: BASE.APP,
    EDITOR: BASE.APP,
    SCHEMA: `${BASE.APP}/${APP_ROUTES.SCHEMA}`,
    IMPORT: `${BASE.APP}/${APP_ROUTES.IMPORT}`,
    EXPORT: `${BASE.APP}/${APP_ROUTES.EXPORT}`,
    DEMO: `${BASE.APP}/${APP_ROUTES.DEMO}`,
    HISTORY: `${BASE.APP}/${APP_ROUTES.HISTORY}`,
    SHORTCUTS: `${BASE.APP}/${APP_ROUTES.SHORTCUTS}`,
    HELP: `${BASE.APP}/${APP_ROUTES.HELP}`,
    ABOUT: `${BASE.APP}/${APP_ROUTES.ABOUT}`,
    SETTINGS: `${BASE.APP}/${APP_ROUTES.SETTINGS}`,
    FEEDBACK: `${BASE.APP}/${APP_ROUTES.FEEDBACK}`,
} as const;

export const RELATIVE = {
    EDITOR: '.',
    SCHEMA: './schema',
    IMPORT: './import',
    EXPORT: './export',
    DEMO: './demo',
    HISTORY: './history',
    SHORTCUTS: './shortcuts',
    HELP: './help',
    ABOUT: './about',
    SETTINGS: './settings',
    FEEDBACK: './feedback',
    BACK_TO_SCHEMA: '../schema',
} as const;

export const SEGMENTS = APP_ROUTES;

export const isPath = {
    editor: (pathname: string) =>
        pathname === PATHS.APP || pathname === `${PATHS.APP}/`,
    schema: (pathname: string) => pathname.includes(APP_ROUTES.SCHEMA),
};

export type PathKey = keyof typeof PATHS;
export type RelativePathKey = keyof typeof RELATIVE;

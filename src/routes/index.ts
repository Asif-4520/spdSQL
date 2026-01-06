/**
 * Routes Module - Central export for all routing utilities
 */

// Route path constants and helpers
export { PATHS, RELATIVE, SEGMENTS, isPath } from './paths';
export type { PathKey, RelativePathKey } from './paths';

// Lazy loaded page components
export { LazyPages } from './LazyPages';

// Router component
export { default as AppRouter } from './router';

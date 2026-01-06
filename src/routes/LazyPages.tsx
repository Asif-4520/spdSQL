import { Suspense, lazy, type ComponentType } from 'react';

// Loading spinner component
function PageLoader() {
    return (
        <div className='flex items-center justify-center h-full w-full'>
            <div className='flex flex-col items-center gap-3'>
                <div className='w-6 h-6 border-2 border-(--accent-color) border-t-transparent rounded-full animate-spin' />
                <span className='text-sm text-(--text-secondary)'>
                    Loading...
                </span>
            </div>
        </div>
    );
}

// HOC to wrap lazy loaded components with Suspense
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withSuspense<T extends ComponentType<any>>(
    importFn: () => Promise<{ default: T }>
) {
    const LazyComponent = lazy(importFn);

    return function SuspenseWrapper(props: React.ComponentProps<T>) {
        return (
            <Suspense fallback={<PageLoader />}>
                <LazyComponent {...props} />
            </Suspense>
        );
    };
}

// Export lazy pages
export const LazyPages = {
    QueryEditor: withSuspense(() => import('../pages/QueryEditor')),
    Schema: withSuspense(() => import('../pages/Schema')),
    Import: withSuspense(() => import('../pages/Import')),
    Export: withSuspense(() => import('../pages/Export')),
    DemoData: withSuspense(() => import('../pages/DemoData')),
    History: withSuspense(() => import('../pages/History')),
    Shortcuts: withSuspense(() => import('../pages/Shortcuts')),
    Help: withSuspense(() => import('../pages/Help')),
    About: withSuspense(() => import('../pages/About')),
    Settings: withSuspense(() => import('../pages/Settings')),
    Feedback: withSuspense(() => import('../pages/Feedback')),
};

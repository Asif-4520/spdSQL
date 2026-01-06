import { createBrowserRouter, RouterProvider } from 'react-router';
import Playground from '../layouts/Playground';
import Home from '../pages/Home';
import { LazyPages } from './LazyPages';
import { SEGMENTS } from './paths';

const {
    QueryEditor,
    Schema,
    Import,
    DemoData,
    Export,
    History,
    About,
    Shortcuts,
    Help,
    Settings,
    Feedback,
} = LazyPages;

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'app',
        element: <Playground />,
        children: [
            { index: true, element: <QueryEditor /> },
            { path: SEGMENTS.SCHEMA, element: <Schema /> },
            { path: SEGMENTS.IMPORT, element: <Import /> },
            { path: SEGMENTS.EXPORT, element: <Export /> },
            { path: SEGMENTS.DEMO, element: <DemoData /> },
            { path: SEGMENTS.HISTORY, element: <History /> },
            { path: SEGMENTS.SHORTCUTS, element: <Shortcuts /> },
            { path: SEGMENTS.HELP, element: <Help /> },
            { path: SEGMENTS.ABOUT, element: <About /> },
            { path: SEGMENTS.SETTINGS, element: <Settings /> },
            { path: SEGMENTS.FEEDBACK, element: <Feedback /> },
        ],
    },
];

const router = createBrowserRouter(routes);

function AppRouter() {
    return <RouterProvider router={router} />;
}

export default AppRouter;

import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import Home from "../pages/Home";
import Playground from "../pages/Playground";

const QueryEditor = lazy(() => import("../pages/QueryEditor"));
const Schema = lazy(() => import("../pages/Schema"));
const Import = lazy(() => import("../pages/Import"));
const DemoData = lazy(() => import("../pages/DemoData"));
const Export = lazy(() => import("../pages/Export"));
const History = lazy(() => import("../pages/History"));
const Shortcuts = lazy(() => import("../pages/Shortcuts"));
const Settings = lazy(() => import("../pages/Settings"));

const About = lazy(() => import("../pages/About"));
const Help = lazy(() => import("../pages/Help"));
const Feedback = lazy(() => import("../pages/Feedback"));

const Loading = () => (
    <div className="h-full w-full flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
);

const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "app",
        element: <Playground />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <QueryEditor />
                    </Suspense>
                ),
            },
            {
                path: "schema",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Schema />
                    </Suspense>
                ),
            },
            {
                path: "import",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Import />
                    </Suspense>
                ),
            },
            {
                path: "export",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Export />
                    </Suspense>
                ),
            },
            {
                path: "demo",
                element: (
                    <Suspense fallback={<Loading />}>
                        <DemoData />
                    </Suspense>
                ),
            },
            {
                path: "history",
                element: (
                    <Suspense fallback={<Loading />}>
                        <History />
                    </Suspense>
                ),
            },
            {
                path: "shortcuts",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Shortcuts />
                    </Suspense>
                ),
            },
            {
                path: "help",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Help />
                    </Suspense>
                ),
            },
            {
                path: "about",
                element: (
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "settings",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Settings />
                    </Suspense>
                ),
            },
            {
                path: "feedback",
                element: (
                    <Suspense fallback={<Loading />}>
                        <Feedback />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "*",
        element: (
            <div className="h-screen w-full flex items-center justify-center flex-col gap-4">
                <h1 className="text-6xl  text-(--accent-color)">404</h1>
                <p className="text-lg text-(--text-secondary)">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <a
                    href="/app"
                    className="px-4 py-2 bg-(--accent-color) text-white rounded-lg hover:bg-(--accent-color-hover) transition"
                >
                    Go to Home
                </a>
            </div>
        ),
    },
];

const router = createBrowserRouter(routes);

export function AppRouter() {
    return <RouterProvider router={router} />;
}

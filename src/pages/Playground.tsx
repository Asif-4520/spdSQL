import { Outlet } from "react-router";
import { useStateContext } from "../context/GlobalContext";
import { useDatabase } from "../hooks/useDatabase";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useTheme } from "../hooks/useTheme";
import NavBar from "../components/NavBar";
import SidePanel from "../components/SidePanel";
import Statusbar from "../components/Statusbar";

const Layout = ({ navbar, sidebarContent, statusbar, children }: any) => {
    return (
        <div className="h-screen grid grid-cols-1 md:grid-cols-[60px_1fr] grid-rows-[50px_1fr_25px] bg-(--bg-main) text-(--accent-color)">
            <header className="col-span-2">{navbar}</header>
            <aside className="row-span-1 border-r hidden md:block">
                {sidebarContent}
            </aside>
            <main className="w-full h-full overflow-hidden">{children}</main>
            <footer className="col-span-2">{statusbar}</footer>
        </div>
    );
};

function DatabaseLoader() {
    return (
        <div className="h-screen w-screen flex items-center justify-center bg-(--bg-main) text-(--accent-color)">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-(--accent-color) border-t-transparent rounded-full animate-spin" />
                <p className="font-mono text-sm">Initializing Database...</p>
            </div>
        </div>
    );
}

export default function Playground() {
    const { ExecStatus, ExecTimeMs } = useStateContext();

    const { isReady } = useDatabase();
    useKeyboardShortcuts();
    useTheme();

    if (!isReady) {
        return <DatabaseLoader />;
    }

    return (
        <Layout
            navbar={<NavBar />}
            sidebarContent={<SidePanel />}
            statusbar={
                <Statusbar
                    status={ExecStatus}
                    message={
                        ExecTimeMs ? `Last run: ${ExecTimeMs} ms` : "Ready"
                    }
                />
            }
        >
            <Outlet />
        </Layout>
    );
}

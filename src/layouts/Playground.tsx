import NavBar from '../components/NavBar';
import Layout from './Layout';
import Statusbar from '../components/Statusbar';
import SidePanel from '../components/SidePanel';
import { Outlet } from 'react-router';
import { useStateContext } from '../context/GlobalContext';
import { useDatabase, useKeyboardShortcuts, useTheme } from '../hooks';

function DatabaseLoader() {
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-(--bg-main) text-(--accent-color)'>
            <div className='flex flex-col items-center gap-4'>
                <div className='w-8 h-8 border-4 border-(--accent-color) border-t-transparent rounded-full animate-spin' />
                <p className='font-mono text-sm'>Initializing Database...</p>
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
                    message={ExecTimeMs ? `Last run: ${ExecTimeMs} ms` : 'Ready'}
                />
            }
        >
            <Outlet />
        </Layout>
    );
}

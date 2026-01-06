import { History, Database, FileCode2, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { PATHS } from '../routes/paths';

function SidePanel() {
    const location = useLocation();
    const currentPath =
        location.pathname.replace(PATHS.APP, '').replace('/', '') || 'editor';

    const navItems = [
        { to: '', icon: FileCode2, name: 'Editor', id: 'editor' },
        { to: 'schema', icon: Database, name: 'Schema', id: 'schema' },
        { to: 'history', icon: History, name: 'History', id: 'history' },
    ];

    const isActive = (id: string) => {
        if (id === 'editor')
            return currentPath === '' || currentPath === 'editor';
        return currentPath === id;
    };

    return (
        <div className='h-full w-full flex flex-col py-3 bg-(--bg-sidebar)'>
            <div className='flex flex-col gap-2 px-3 md:px-0 md:items-center'>
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        to={item.to}
                        title={item.name}
                        className={`flex items-center gap-3 md:justify-center px-3 md:px-0 py-2.5 md:py-0 md:w-9 md:h-9 rounded-lg transition-all ${
                            isActive(item.id)
                                ? 'bg-(--accent-color) text-white shadow-md'
                                : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-activity-bar)'
                        }`}
                    >
                        <item.icon size={18} className='shrink-0' />
                        <span className='md:hidden font-medium text-sm'>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>

            <div className='flex-1' />
            <div className='px-3 md:px-0 md:flex md:justify-center'>
                <Link
                    to='settings'
                    title='Settings'
                    className={`flex items-center gap-3 md:justify-center px-3 md:px-0 py-2.5 md:py-0 md:w-9 md:h-9 rounded-lg transition-all ${
                        currentPath === 'settings'
                            ? 'bg-(--accent-color) text-white shadow-md'
                            : 'text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-activity-bar)'
                    }`}
                >
                    <Settings size={18} className='shrink-0' />
                    <span className='md:hidden font-medium text-sm'>
                        Settings
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default SidePanel;

import {
    HelpCircle,
    Database,
    FileCode,
    History,
    Upload,
    Zap,
    ArrowLeft,
    ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Help() {
    const navigate = useNavigate();

    const guides = [
        {
            icon: FileCode,
            title: 'Writing Queries',
            items: [
                'Type your SQL in the editor on the left',
                'Press Ctrl+Enter (or click Run) to execute',
                'Results appear in the panel below',
                'Use Ctrl+L to clear the editor',
            ],
        },
        {
            icon: Database,
            title: 'Managing Data',
            items: [
                'Go to Import to load CSV, JSON, or SQL files',
                'Each file creates a table with the same name',
                'View all tables in the Schema page (sidebar)',
                'Demo tables (users, products, orders) are pre-loaded',
            ],
        },
        {
            icon: Upload,
            title: 'Import & Export',
            items: [
                'Drag & drop files or click to browse',
                'Supported: CSV, JSON, SQL, Parquet, Excel',
                'Export as SQL dump to backup everything',
                'Export individual tables as CSV or JSON',
            ],
        },
        {
            icon: History,
            title: 'Query History',
            items: [
                'All queries are automatically saved',
                'Click any history item to load it',
                'Green = success, Red = error',
            ],
        },
    ];

    return (
        <div className='h-full overflow-y-auto bg-(--bg-panel) text-(--text-primary)'>
            <div className='max-w-3xl mx-auto p-6 sm:p-8 space-y-6'>
                <div className='flex items-center gap-4'>
                    <button
                        onClick={() => navigate(-1)}
                        className='p-2 rounded-xl hover:bg-(--bg-activity-bar) transition-colors'
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className='text-2xl font-bold flex items-center gap-2'>
                            <HelpCircle
                                size={24}
                                className='text-(--accent-color)'
                            />
                            Help & Guide
                        </h1>
                        <p className='text-sm text-(--text-secondary)'>
                            Learn how to use SQLio effectively
                        </p>
                    </div>
                </div>

                <div className='bg-(--accent-color)/10 border border-(--accent-color)/30 rounded-2xl p-6'>
                    <h2 className='font-bold mb-4 flex items-center gap-2 text-lg'>
                        <Zap size={20} className='text-(--accent-color)' />
                        Quick Start
                    </h2>
                    <ol className='space-y-4 text-sm'>
                        <li className='flex gap-3 items-start'>
                            <span className='w-7 h-7 bg-(--accent-color) text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0'>
                                1
                            </span>
                            <span>
                                Import a CSV or JSON file (or use the demo
                                tables)
                            </span>
                        </li>
                        <li className='flex gap-3 items-start'>
                            <span className='w-7 h-7 bg-(--accent-color) text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0'>
                                2
                            </span>
                            <span>
                                Write a SQL query like{' '}
                                <code className='bg-(--bg-main) px-2 py-0.5 rounded-lg font-mono text-xs'>
                                    SELECT * FROM users
                                </code>
                            </span>
                        </li>
                        <li className='flex gap-3 items-start'>
                            <span className='w-7 h-7 bg-(--accent-color) text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0'>
                                3
                            </span>
                            <span>
                                Press{' '}
                                <kbd className='px-2 py-1 bg-(--bg-main) border border-(--border-color) rounded-lg text-xs font-mono'>
                                    Ctrl+Enter
                                </kbd>{' '}
                                to run
                            </span>
                        </li>
                    </ol>
                </div>

                <div className='space-y-4'>
                    {guides.map((guide, idx) => (
                        <div
                            key={idx}
                            className='bg-(--bg-main) border border-(--border-color) rounded-2xl p-6 hover:border-(--accent-color)/30 transition-colors'
                        >
                            <h3 className='font-bold mb-4 flex items-center gap-2 text-lg'>
                                <guide.icon
                                    size={18}
                                    className='text-(--accent-color)'
                                />
                                {guide.title}
                            </h3>
                            <ul className='space-y-2'>
                                {guide.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className='flex items-start gap-2 text-sm text-(--text-secondary)'
                                    >
                                        <ChevronRight
                                            size={14}
                                            className='text-(--accent-color) mt-1 shrink-0'
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

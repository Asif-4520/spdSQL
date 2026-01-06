import { Link } from 'react-router';
import {
    Database,
    ArrowRight,
    Github,
    Play,
    ShieldCheck,
    FileSpreadsheet,
    Zap,
    Cpu,
    Check,
    Globe,
    LayoutTemplate,
    Box,
} from 'lucide-react';
import { PATHS } from '../routes/paths';

export default function Home() {
    return (
        <div className='h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden'>
            <div className='fixed inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none'></div>

            <nav className='fixed top-0 w-full z-50 border-b border-white/10 bg-black/90 backdrop-blur-sm'>
                <div className='max-w-6xl mx-auto px-3 sm:px-6 h-12 sm:h-14 flex items-center justify-between'>
                    <div className='flex items-center gap-1.5 sm:gap-2 font-mono font-bold text-base sm:text-lg tracking-tight'>
                        <div className='w-5 h-5 sm:w-6 sm:h-6 bg-white text-black flex items-center justify-center rounded-sm'>
                            <Database
                                size={12}
                                className='sm:w-3.5 sm:h-3.5'
                                strokeWidth={3}
                            />
                        </div>
                        SQLio
                    </div>
                    <div className='flex items-center gap-3 sm:gap-6 text-sm font-medium'>
                        <a
                            href='https://github.com/Asif-4520'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 sm:gap-2'
                        >
                            <Github size={16} />{' '}
                            <span className='hidden sm:inline'>Source</span>
                        </a>
                        <Link
                            to={PATHS.APP}
                            className='bg-white text-black px-3 sm:px-4 py-1.5 rounded-sm font-bold hover:bg-gray-200 transition-colors text-xs uppercase tracking-wide flex items-center gap-1.5 sm:gap-2'
                        >
                            <Play size={10} fill='currentColor' />{' '}
                            <span className='hidden xs:inline'>Open</span> App
                        </Link>
                    </div>
                </div>
            </nav>

            <main className='pt-20 sm:pt-28 md:pt-32 pb-10 px-3 sm:px-6 max-w-6xl mx-auto relative z-10'>
                <section
                    aria-labelledby='hero-title'
                    className='grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-16 sm:mb-24'
                >
                    <div>
                        <div className='inline-flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3 py-1.5 border border-gray-800 bg-gray-900 rounded text-[10px] sm:text-[11px] font-mono text-gray-400 uppercase tracking-widest mb-4 sm:mb-6 flex-wrap'>
                            <span className='flex items-center gap-1 sm:gap-1.5 text-emerald-400'>
                                <Globe size={10} className='sm:w-3 sm:h-3' />
                                Browser
                            </span>
                            <span className='w-px h-3 bg-gray-700 hidden xs:block'></span>
                            <span className='flex items-center gap-1 sm:gap-1.5 text-sky-400'>
                                <Zap size={10} className='sm:w-3 sm:h-3' />
                                Fast
                            </span>
                            <span className='w-px h-3 bg-gray-700 hidden xs:block'></span>
                            <span className='flex items-center gap-1 sm:gap-1.5 text-emerald-400'>
                                <ShieldCheck
                                    size={12}
                                    className='sm:w-4 sm:h-4'
                                />{' '}
                                Local
                            </span>
                        </div>

                        <h1
                            id='hero-title'
                            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-6 leading-tight'
                        >
                            Run SQL Queries
                            <br />
                            <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-sky-400'>
                                Directly in Your Browser
                            </span>
                        </h1>

                        <p className='text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-6 sm:mb-8 font-light'>
                            No installations, no configurations. SQLio runs
                            entirely in your browser.
                            <br className='hidden md:block' />
                            Upload CSV, Excel, or JSON files, write SQL, and get
                            results instantly. Perfect for learning and
                            analysis.
                        </p>

                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Link
                                to={PATHS.APP}
                                className='h-12 px-6 bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors border border-white rounded-md'
                            >
                                Start Practicing SQL <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className='mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500 font-mono'>
                            <span className='flex items-center gap-1.5 sm:gap-2'>
                                <Check
                                    size={12}
                                    className='sm:w-3.5 sm:h-3.5 text-emerald-400'
                                />{' '}
                                No Install
                            </span>
                            <span className='flex items-center gap-1.5 sm:gap-2'>
                                <Check
                                    size={12}
                                    className='sm:w-3.5 sm:h-3.5 text-emerald-400'
                                />{' '}
                                CSV & Excel
                            </span>
                            <span className='flex items-center gap-1.5 sm:gap-2'>
                                <Check
                                    size={12}
                                    className='sm:w-3.5 sm:h-3.5 text-emerald-400'
                                />{' '}
                                Real SQL
                            </span>
                        </div>

                        <p className='sr-only'>
                            SQLio is a browser-based SQL playground that lets
                            users run real SQL queries locally using DuckDB.
                            Practice SQL online without installation, upload
                            CSV, Excel, or JSON files, and analyze data
                            instantly.
                        </p>
                    </div>

                    <div className='w-full bg-[#0a0a0a] h-96 border border-gray-800 rounded-lg overflow-hidden shadow-2xl font-mono text-xs sm:text-sm relative'>
                        <div className='flex items-center px-2 sm:px-4 py-1.5 sm:py-2 border-b border-gray-800 bg-[#111] gap-1.5 sm:gap-2'>
                            <div className='flex gap-1 sm:gap-1.5 mr-2 sm:mr-4'>
                                <div className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/60'></div>
                                <div className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500/60'></div>
                                <div className='w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500/60'></div>
                            </div>
                            <div className='bg-[#0a0a0a] border border-gray-800 border-b-0 px-2 sm:px-3 py-0.5 sm:py-1 rounded-t text-[10px] sm:text-xs text-gray-300 flex items-center gap-1 sm:gap-2'>
                                <LayoutTemplate
                                    size={8}
                                    className='sm:w-2.5 sm:h-2.5'
                                />{' '}
                                <span className='hidden xs:inline'>app.</span>{' '}
                                SQLio.dev
                            </div>
                        </div>

                        <div className='p-3 sm:p-6 h-64 sm:h-80 flex flex-col'>
                            <div className='flex-1 flex flex-col'>
                                <div className='flex justify-between items-end mb-2'>
                                    <div className='text-[10px] text-gray-500 uppercase font-bold tracking-wider'>
                                        SQL Editor
                                    </div>
                                    <div className='text-[10px] text-gray-400 flex items-center gap-1'>
                                        <FileSpreadsheet size={10} /> Query
                                        ready to execute
                                    </div>
                                </div>

                                <div className='text-white mb-6 bg-[#050505] border border-gray-800 p-3 rounded min-h-[60px] font-medium'>
                                    <span className='text-emerald-400'>
                                        SELECT
                                    </span>{' '}
                                    *{' '}
                                    <span className='text-emerald-400'>
                                        FROM
                                    </span>{' '}
                                    uploaded_data{' '}
                                    <span className='text-emerald-400'>
                                        WHERE
                                    </span>{' '}
                                    score &gt; 90
                                    <span className='animate-pulse w-2 h-4 bg-white inline-block align-middle ml-1'></span>
                                </div>

                                <div className='mt-auto border border-gray-800 rounded bg-[#050505]'>
                                    <div className='flex justify-between items-center px-3 py-1.5 bg-[#111] border-b border-gray-800'>
                                        <span className='text-[10px] text-gray-500 uppercase'>
                                            Query Results
                                        </span>
                                        <span className='text-[10px] text-green-500 flex items-center gap-1'>
                                            <Check size={10} /> 3 rows returned
                                        </span>
                                    </div>
                                    <div className='overflow-x-auto'>
                                        <table className='w-full text-left text-xs text-gray-300'>
                                            <thead>
                                                <tr className='text-gray-500 border-b border-gray-800'>
                                                    <th className='p-3 font-normal bg-[#0a0a0a]'>
                                                        id
                                                    </th>
                                                    <th className='p-3 font-normal bg-[#0a0a0a]'>
                                                        name
                                                    </th>
                                                    <th className='p-3 font-normal bg-[#0a0a0a]'>
                                                        score
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors'>
                                                    <td className='p-3 text-gray-400 font-medium'>
                                                        101
                                                    </td>
                                                    <td className='p-3'>
                                                        Alice Johnson
                                                    </td>
                                                    <td className='p-3 text-green-400 font-bold'>
                                                        98
                                                    </td>
                                                </tr>
                                                <tr className='border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors'>
                                                    <td className='p-3 text-gray-400 font-medium'>
                                                        102
                                                    </td>
                                                    <td className='p-3'>
                                                        Robert Smith
                                                    </td>
                                                    <td className='p-3 text-green-400 font-bold'>
                                                        92
                                                    </td>
                                                </tr>
                                                <tr className='hover:bg-gray-900/50 transition-colors'>
                                                    <td className='p-3 text-gray-400 font-medium'>
                                                        103
                                                    </td>
                                                    <td className='p-3'>
                                                        Charlie Brown
                                                    </td>
                                                    <td className='p-3 text-green-400 font-bold'>
                                                        94
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    aria-labelledby='features-title'
                    className='border-t border-gray-800 pt-10 sm:pt-16'
                >
                    <h2
                        id='features-title'
                        className='font-bold text-2xl sm:text-3xl mb-8 sm:mb-12 text-center'
                    >
                        Why{' '}
                        <span className='text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-sky-400'>
                            SQLio
                        </span>
                        ?
                    </h2>

                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
                        <div className='p-6 border border-gray-800 bg-[#050505] hover:bg-gray-900/50 transition-all rounded-lg group hover:border-emerald-500/30'>
                            <div className='w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors'>
                                <Globe size={20} className='text-emerald-400' />
                            </div>
                            <h3 className='text-lg font-bold mb-3'>
                                Zero Setup
                            </h3>
                            <p className='text-gray-400 text-sm leading-relaxed'>
                                Open your browser and start coding. No database
                                installations, no configuration files.
                            </p>
                        </div>

                        <div className='p-6 border border-gray-800 bg-[#050505] hover:bg-gray-900/50 transition-all rounded-lg group hover:border-sky-500/30'>
                            <div className='w-10 h-10 bg-sky-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-sky-500/20 transition-colors'>
                                <Cpu size={20} className='text-sky-400' />
                            </div>
                            <h3 className='text-lg font-bold mb-3'>
                                Runs Locally
                            </h3>
                            <p className='text-gray-400 text-sm leading-relaxed'>
                                Your data never leaves your device. All
                                processing happens locally in your browser for
                                maximum privacy.
                            </p>
                        </div>

                        <div className='p-6 border border-gray-800 bg-[#050505] hover:bg-gray-900/50 transition-all rounded-lg group hover:border-purple-500/30'>
                            <div className='w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors'>
                                <Box size={20} className='text-purple-400' />
                            </div>
                            <h3 className='text-lg font-bold mb-3'>
                                Safe Sandbox
                            </h3>
                            <p className='text-gray-400 text-sm leading-relaxed'>
                                Experiment freely. Even{' '}
                                <code className='text-red-400 px-1'>
                                    DROP TABLE
                                </code>{' '}
                                won't affect your system.
                            </p>
                        </div>

                        <div className='p-6 border border-gray-800 bg-[#050505] hover:bg-gray-900/50 transition-all rounded-lg group hover:border-amber-500/30'>
                            <div className='w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors'>
                                <Database
                                    size={20}
                                    className='text-amber-400'
                                />
                            </div>
                            <h3 className='text-lg font-bold mb-3'>
                                Real SQL Engine
                            </h3>
                            <p className='text-gray-400 text-sm leading-relaxed'>
                                Learn actual SQL syntax that works in production
                                databases, not just simplified mock queries.
                            </p>
                        </div>
                    </div>
                </section>

                <footer className='mt-10 pt-8 border-t border-gray-800 text-center'>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                        <div className='w-5 h-5 bg-white text-black flex items-center justify-center rounded-sm'>
                            <Database size={12} strokeWidth={3} />
                        </div>
                        <span className='font-bold text-lg'>SQLio</span>
                    </div>
                    <p className='text-gray-600 text-sm'>
                        Built for Students & Analysts • Your SQL Practice Lab
                    </p>
                </footer>
            </main>
        </div>
    );
}

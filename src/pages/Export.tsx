import { useNavigate } from 'react-router';
import {
    saveDatabase,
    getTables,
    exportTableAsCSV,
    exportTableAsJSON,
    exportTableAsParquet,
    exportTableAsExcel,
    exportAllTablesAsParquet,
} from '../lib/DB/duckdb.service';
import { PATHS, RELATIVE } from '../routes/paths';
import toast from 'react-hot-toast';
import {
    Download,
    FileJson,
    FileSpreadsheet,
    FileCode,
    ArrowLeft,
    Table,
    Database,
    Upload,
    FileArchive,
    Sheet,
    RefreshCw,
    CheckCircle2,
    HardDrive,
    Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';

type ExportFormat = 'sql' | 'csv' | 'json' | 'parquet' | 'excel' | 'parquetAll';

const formatConfigs = [
    {
        id: 'csv' as const,
        name: 'CSV',
        icon: FileSpreadsheet,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'hover:border-green-500/50',
    },
    {
        id: 'json' as const,
        name: 'JSON',
        icon: FileJson,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'hover:border-amber-500/50',
    },
    {
        id: 'parquet' as const,
        name: 'Parquet',
        icon: FileArchive,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'hover:border-purple-500/50',
    },
    {
        id: 'excel' as const,
        name: 'Excel',
        icon: Sheet,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'hover:border-emerald-500/50',
    },
];

function Export() {
    const navigate = useNavigate();
    const [tables, setTables] = useState<string[]>([]);
    const [selectedTable, setSelectedTable] = useState<string>('');
    const [exporting, setExporting] = useState<string | null>(null);
    const [recentExport, setRecentExport] = useState<string | null>(null);

    useEffect(() => {
        loadTables();
    }, []);

    const loadTables = async () => {
        try {
            const t = await getTables();
            setTables(t);
            if (t.length > 0) setSelectedTable(t[0]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleExport = async (format: ExportFormat) => {
        setExporting(format);
        const toastId = toast.loading('Exporting...');
        try {
            switch (format) {
                case 'sql':
                    await saveDatabase();
                    break;
                case 'csv':
                    if (!selectedTable) throw new Error('Select a table');
                    await exportTableAsCSV(selectedTable);
                    break;
                case 'json':
                    if (!selectedTable) throw new Error('Select a table');
                    await exportTableAsJSON(selectedTable);
                    break;
                case 'parquet':
                    if (!selectedTable) throw new Error('Select a table');
                    await exportTableAsParquet(selectedTable);
                    break;
                case 'excel':
                    if (!selectedTable) throw new Error('Select a table');
                    await exportTableAsExcel(selectedTable);
                    break;
                case 'parquetAll':
                    await exportAllTablesAsParquet();
                    break;
            }
            toast.success('Download started!', { id: toastId });
            setRecentExport(format);
            setTimeout(() => setRecentExport(null), 3000);
        } catch (err: any) {
            toast.error(err.message || 'Export failed', { id: toastId });
        } finally {
            setExporting(null);
        }
    };

    if (tables.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-full p-8 text-center'>
                <div className='w-20 h-20 rounded-2xl bg-(--bg-activity-bar) flex items-center justify-center mb-6'>
                    <Database
                        size={36}
                        className='text-(--text-secondary) opacity-50'
                    />
                </div>
                <h2 className='text-xl font-bold mb-2'>No Tables Found</h2>
                <p className='text-(--text-secondary) mb-6 max-w-sm'>
                    Import data or load demo tables to export
                </p>
                <div className='flex gap-3'>
                    <button
                        onClick={() => navigate(PATHS.IMPORT)}
                        className='flex items-center gap-2 px-5 py-2.5 bg-(--accent-color) text-white rounded-xl hover:opacity-90 transition-opacity'
                    >
                        <Upload size={18} />
                        Import
                    </button>
                    <button
                        onClick={() => navigate(PATHS.DEMO)}
                        className='flex items-center gap-2 px-5 py-2.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-colors'
                    >
                        <Sparkles size={18} />
                        Demo Data
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col h-full p-6 overflow-auto'>
            <div className='flex items-center gap-3 mb-6'>
                <button
                    onClick={() => navigate(-1)}
                    className='p-2 rounded-xl hover:bg-(--bg-activity-bar) transition-colors'
                >
                    <ArrowLeft size={20} />
                </button>
                <div className='flex-1'>
                    <h1 className='text-xl font-bold flex items-center gap-2'>
                        <Download size={22} className='text-(--accent-color)' />
                        Export Data
                    </h1>
                    <p className='text-sm text-(--text-secondary)'>
                        Download your data in various formats
                    </p>
                </div>
                <button
                    onClick={() => navigate(RELATIVE.IMPORT)}
                    className='flex items-center gap-2 px-4 py-2 text-sm bg-(--bg-activity-bar) border border-(--border-color) rounded-xl hover:border-(--accent-color) transition-colors'
                >
                    <Upload size={16} />
                    Import
                </button>
            </div>

            <div className='max-w-2xl mx-auto w-full space-y-6'>
                <div className='flex gap-4 p-5 bg-(--bg-main) border border-(--border-color) rounded-2xl'>
                    <div className='flex items-center gap-3'>
                        <div className='w-12 h-12 rounded-xl bg-(--accent-color)/20 flex items-center justify-center'>
                            <HardDrive
                                size={22}
                                className='text-(--accent-color)'
                            />
                        </div>
                        <div>
                            <div className='text-2xl font-bold'>
                                {tables.length}
                            </div>
                            <div className='text-xs text-(--text-secondary)'>
                                Tables
                            </div>
                        </div>
                    </div>
                    <div className='ml-auto'>
                        <button
                            onClick={loadTables}
                            className='p-2.5 text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-activity-bar) rounded-xl transition-colors'
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                <section className='bg-(--bg-main) border border-(--border-color) rounded-2xl overflow-hidden'>
                    <div className='px-5 py-4 border-b border-(--border-color) bg-(--bg-panel)'>
                        <h2 className='font-semibold flex items-center gap-2'>
                            <Table
                                size={18}
                                className='text-(--accent-color)'
                            />
                            Export Single Table
                        </h2>
                        <p className='text-xs text-(--text-secondary) mt-1'>
                            Select a table and choose format
                        </p>
                    </div>
                    <div className='p-5 space-y-4'>
                        <div>
                            <label className='text-xs text-(--text-secondary) block mb-2 font-medium'>
                                Select Table
                            </label>
                            <select
                                value={selectedTable}
                                onChange={(e) =>
                                    setSelectedTable(e.target.value)
                                }
                                className='w-full px-4 py-3 bg-(--bg-panel) border border-(--border-color) rounded-xl text-(--text-primary) focus:border-(--accent-color) outline-none cursor-pointer'
                            >
                                {tables.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                            {formatConfigs.map((fmt) => (
                                <button
                                    key={fmt.id}
                                    onClick={() => handleExport(fmt.id)}
                                    disabled={exporting === fmt.id}
                                    className={`group flex flex-col items-center gap-2 p-4 ${fmt.bg} border border-(--border-color) rounded-xl ${fmt.border} disabled:opacity-50 transition-all hover:scale-[1.02]`}
                                >
                                    {exporting === fmt.id ? (
                                        <RefreshCw
                                            size={24}
                                            className='animate-spin'
                                        />
                                    ) : recentExport === fmt.id ? (
                                        <CheckCircle2
                                            size={24}
                                            className='text-green-400'
                                        />
                                    ) : (
                                        <fmt.icon
                                            size={24}
                                            className={fmt.color}
                                        />
                                    )}
                                    <span className='text-sm font-medium'>
                                        {fmt.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <section className='bg-(--bg-main) border border-(--border-color) rounded-2xl overflow-hidden'>
                    <div className='px-5 py-4 border-b border-(--border-color) bg-(--bg-panel)'>
                        <h2 className='font-semibold flex items-center gap-2'>
                            <Database
                                size={18}
                                className='text-(--accent-color)'
                            />
                            Full Database Backup
                        </h2>
                        <p className='text-xs text-(--text-secondary) mt-1'>
                            Export all {tables.length} tables at once
                        </p>
                    </div>
                    <div className='p-5 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <button
                            onClick={() => handleExport('sql')}
                            disabled={exporting === 'sql'}
                            className='group flex items-center gap-4 p-4 bg-blue-500/10 border border-(--border-color) rounded-xl hover:border-blue-500/50 disabled:opacity-50 transition-all'
                        >
                            <div className='w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                                {exporting === 'sql' ? (
                                    <RefreshCw
                                        size={24}
                                        className='animate-spin text-blue-400'
                                    />
                                ) : (
                                    <FileCode
                                        size={24}
                                        className='text-blue-400'
                                    />
                                )}
                            </div>
                            <div className='text-left flex-1'>
                                <div className='font-semibold'>SQL Dump</div>
                                <div className='text-xs text-(--text-secondary)'>
                                    CREATE + INSERT
                                </div>
                            </div>
                            <div className='text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg'>
                                .sql
                            </div>
                        </button>
                        <button
                            onClick={() => handleExport('parquetAll')}
                            disabled={exporting === 'parquetAll'}
                            className='group flex items-center gap-4 p-4 bg-violet-500/10 border border-(--border-color) rounded-xl hover:border-violet-500/50 disabled:opacity-50 transition-all'
                        >
                            <div className='w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform'>
                                {exporting === 'parquetAll' ? (
                                    <RefreshCw
                                        size={24}
                                        className='animate-spin text-violet-400'
                                    />
                                ) : (
                                    <FileArchive
                                        size={24}
                                        className='text-violet-400'
                                    />
                                )}
                            </div>
                            <div className='text-left flex-1'>
                                <div className='font-semibold'>
                                    Parquet Bundle
                                </div>
                                <div className='text-xs text-(--text-secondary)'>
                                    All tables in ZIP
                                </div>
                            </div>
                            <div className='text-xs px-2 py-1 bg-violet-500/20 text-violet-400 rounded-lg'>
                                .zip
                            </div>
                        </button>
                    </div>
                </section>

                <div className='flex items-center justify-center gap-2 py-3 text-xs text-(--text-secondary)'>
                    <CheckCircle2 size={14} className='text-green-400' />
                    <span>All files can be re-imported back into SQLio</span>
                </div>
            </div>
        </div>
    );
}

export default Export;

import { useEffect, useState } from 'react';
import { getSchema } from '../lib/DB/duckdb.service';
import {
    ChevronDown,
    ChevronRight,
    Table,
    Database,
    RefreshCw,
    Hash,
    Type,
} from 'lucide-react';

interface ColumnInfo {
    column_name: string;
    data_type: string;
}

interface TableSchema {
    [tableName: string]: ColumnInfo[];
}

function Schema() {
    const [schemaData, setSchemaData] = useState<TableSchema>({});
    const [expandedTables, setExpandedTables] = useState<
        Record<string, boolean>
    >({});
    const [loading, setLoading] = useState(true);

    const refreshSchema = async () => {
        setLoading(true);
        try {
            const res = await getSchema();
            if (!res || res.length === 0) {
                setSchemaData({});
                return;
            }
            const grouped: TableSchema = {};
            for (const row of res) {
                const tableName = row.table_name;
                if (!grouped[tableName]) {
                    grouped[tableName] = [];
                }
                grouped[tableName].push({
                    column_name: row.column_name,
                    data_type: row.data_type,
                });
            }
            setSchemaData(grouped);
            const expanded: Record<string, boolean> = {};
            Object.keys(grouped).forEach((t) => (expanded[t] = true));
            setExpandedTables(expanded);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshSchema();
    }, []);

    const toggleTable = (tableName: string) => {
        setExpandedTables((prev) => ({
            ...prev,
            [tableName]: !prev[tableName],
        }));
    };

    const tableNames = Object.keys(schemaData);

    if (loading) {
        return (
            <div className='h-full w-full flex items-center justify-center text-(--text-secondary)'>
                <RefreshCw className='animate-spin mr-3' size={24} />
                <span>Loading schema...</span>
            </div>
        );
    }

    if (tableNames.length === 0) {
        return (
            <div className='h-full w-full flex flex-col items-center justify-center text-(--text-secondary)'>
                <div className='w-20 h-20 rounded-2xl bg-(--bg-activity-bar) flex items-center justify-center mb-4'>
                    <Database size={36} className='opacity-40' />
                </div>
                <p className='text-lg font-medium'>No tables found</p>
                <p className='text-sm opacity-70'>
                    Import data or create tables to see schema
                </p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-4 overflow-auto w-full h-full p-4 bg-(--bg-panel) text-(--text-primary)'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Database size={24} className='text-(--accent-color)' />
                    <h2 className='text-xl font-bold'>Database Schema</h2>
                    <span className='text-sm text-(--text-secondary) bg-(--bg-activity-bar) px-3 py-1 rounded-full'>
                        {tableNames.length} table
                        {tableNames.length !== 1 ? 's' : ''}
                    </span>
                </div>
                <button
                    onClick={refreshSchema}
                    className='flex items-center gap-2 px-4 py-2 text-sm bg-(--bg-activity-bar) hover:bg-(--bg-sidebar) rounded-xl border border-(--border-color) transition-colors'
                >
                    <RefreshCw size={14} />
                    Refresh
                </button>
            </div>

            <div className='space-y-3'>
                {tableNames.map((tableName) => (
                    <div
                        key={tableName}
                        className='border border-(--border-color) rounded-xl overflow-hidden bg-(--bg-main) hover:border-(--accent-color)/50 transition-colors'
                    >
                        <button
                            onClick={() => toggleTable(tableName)}
                            className='w-full flex items-center gap-3 px-4 py-3.5 bg-(--bg-title-bar) hover:bg-(--bg-activity-bar) transition-colors text-left'
                        >
                            {expandedTables[tableName] ? (
                                <ChevronDown
                                    size={18}
                                    className='text-(--text-secondary)'
                                />
                            ) : (
                                <ChevronRight
                                    size={18}
                                    className='text-(--text-secondary)'
                                />
                            )}
                            <Table
                                size={18}
                                className='text-(--accent-color)'
                            />
                            <span className='font-semibold'>{tableName}</span>
                            <span className='text-xs text-(--text-secondary) ml-auto'>
                                {schemaData[tableName].length} column
                                {schemaData[tableName].length !== 1 ? 's' : ''}
                            </span>
                        </button>

                        {expandedTables[tableName] && (
                            <div className='border-t border-(--border-color)'>
                                <table className='w-full text-sm'>
                                    <thead className='bg-(--bg-panel)'>
                                        <tr>
                                            <th className='px-4 py-2.5 text-left font-medium text-(--text-secondary) border-b border-(--border-color)'>
                                                <div className='flex items-center gap-2'>
                                                    <Hash size={12} />
                                                    Column
                                                </div>
                                            </th>
                                            <th className='px-4 py-2.5 text-left font-medium text-(--text-secondary) border-b border-(--border-color)'>
                                                <div className='flex items-center gap-2'>
                                                    <Type size={12} />
                                                    Type
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schemaData[tableName].map(
                                            (col, idx) => (
                                                <tr
                                                    key={idx}
                                                    className={`${
                                                        idx % 2 === 0
                                                            ? 'bg-(--bg-main)'
                                                            : 'bg-(--bg-panel)'
                                                    } hover:bg-(--bg-activity-bar) transition-colors`}
                                                >
                                                    <td className='px-4 py-2.5 font-mono text-(--text-primary)'>
                                                        {col.column_name}
                                                    </td>
                                                    <td className='px-4 py-2.5'>
                                                        <span className='px-2.5 py-1 bg-(--accent-color)/20 text-(--accent-color) rounded-lg text-xs font-mono'>
                                                            {col.data_type}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Schema;

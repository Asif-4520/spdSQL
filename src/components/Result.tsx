import { useStateContext } from '../context/GlobalContext';
import { useSettingsStore } from '../store';
import { useState } from 'react';
import type { QueryResult as DuckQueryResult } from '../lib/DB/db.core';
import {
    Table,
    AlertCircle,
    CheckCircle2,
    Database,
    Plus,
    Trash2,
    FileEdit,
    Copy,
    Check,
} from 'lucide-react';

function formatValue(val: unknown): string {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'object') return JSON.stringify(val);
    return String(val);
}

function CopyBtn({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);

    function copy() {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <button
            onClick={copy}
            className='p-1 hover:bg-(--bg-activity-bar) rounded transition-colors'
            title='Copy'
        >
            {copied ? (
                <Check size={12} className='text-emerald-500' />
            ) : (
                <Copy size={12} className='text-(--text-secondary)' />
            )}
        </button>
    );
}

function DataTable({
    columns,
    values,
}: {
    columns: string[];
    values: unknown[][];
}) {
    const { fontSize } = useSettingsStore();

    return (
        <div className='h-full flex flex-col'>
            <div className='flex-1 overflow-auto'>
                <div className='min-w-full inline-block'>
                    <table
                        className='w-full border-collapse'
                        style={{ fontSize: `${fontSize - 1}px` }}
                    >
                        <thead className='bg-(--bg-activity-bar) sticky top-0 z-10'>
                            <tr>
                                <th className='px-1 sm:px-2 py-2 text-xs text-(--text-secondary) border-b border-(--border-color) w-8 sm:w-10 font-medium'>
                                    #
                                </th>
                                {columns.map((col, i) => (
                                    <th
                                        key={i}
                                        className='px-2 sm:px-3 py-2 text-left text-xs font-semibold text-(--text-primary) border-b border-(--border-color) whitespace-nowrap'
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {values.map((row, i) => (
                                <tr
                                    key={i}
                                    className={`${
                                        i % 2 ? 'bg-(--bg-panel)' : ''
                                    } hover:bg-(--bg-list-hover) transition-colors`}
                                >
                                    <td className='px-1 sm:px-2 py-1.5 text-xs text-(--text-secondary) border-b border-(--border-color) font-mono'>
                                        {i + 1}
                                    </td>
                                    {row.map((cell, j) => (
                                        <td
                                            key={j}
                                            className='px-2 sm:px-3 py-1.5 border-b border-(--border-color) max-w-[150px] sm:max-w-xs'
                                            title={formatValue(cell)}
                                        >
                                            <span
                                                className={`block truncate ${
                                                    cell === null
                                                        ? 'text-(--text-secondary) italic text-xs'
                                                        : 'text-(--text-primary)'
                                                }`}
                                            >
                                                {formatValue(cell)}
                                            </span>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='px-2 sm:px-3 py-2 text-xs text-(--text-secondary) border-t border-(--border-color) bg-(--bg-panel) flex items-center gap-1.5 flex-wrap'>
                <CheckCircle2 size={11} className='text-emerald-500 shrink-0' />
                <span className='text-(--text-primary) font-medium'>
                    {values.length}
                </span>{' '}
                rows
            </div>
        </div>
    );
}

function SuccessBox({ type, rows }: { type: string; rows?: number }) {
    const icons: Record<string, React.ReactNode> = {
        INSERT: <Plus size={20} className='text-emerald-500' />,
        UPDATE: <FileEdit size={20} className='text-amber-500' />,
        DELETE: <Trash2 size={20} className='text-red-500' />,
        CREATE: <Database size={20} className='text-violet-500' />,
    };

    const msg =
        rows !== undefined ? `${rows} row(s) affected` : `${type} successful`;

    return (
        <div className='h-full flex items-center justify-center'>
            <div className='flex items-center gap-4 px-6 py-4 bg-(--bg-panel) border border-(--border-color) rounded-xl'>
                <div className='w-10 h-10 rounded-lg bg-(--bg-activity-bar) flex items-center justify-center'>
                    {icons[type] || (
                        <CheckCircle2 size={20} className='text-blue-500' />
                    )}
                </div>
                <div>
                    <div className='flex items-center gap-1.5 font-medium text-(--text-primary)'>
                        <CheckCircle2 size={14} className='text-emerald-500' />
                        {type} Successful
                    </div>
                    <p className='text-xs text-(--text-secondary) mt-0.5'>
                        {msg}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ErrorBox({ error }: { error: string }) {
    const { resolvedTheme } = useSettingsStore();
    const isLight = resolvedTheme === 'light';

    return (
        <div className='h-full p-3 overflow-auto'>
            <div
                className='p-3 rounded-lg'
                style={{
                    backgroundColor: isLight
                        ? '#fef2f2'
                        : 'rgba(239, 68, 68, 0.08)',
                }}
            >
                <div className='flex items-start gap-2'>
                    <AlertCircle
                        size={16}
                        style={{
                            color: isLight ? '#dc2626' : '#f87171',
                            marginTop: 2,
                            flexShrink: 0,
                        }}
                    />
                    <div className='flex-1 min-w-0'>
                        <pre
                            className='text-sm whitespace-pre-wrap font-mono overflow-auto'
                            style={{ color: isLight ? '#b91c1c' : '#fca5a5' }}
                        >
                            {error}
                        </pre>
                    </div>
                    <CopyBtn text={error} />
                </div>
            </div>
        </div>
    );
}

function EmptyBox() {
    return (
        <div className='h-full flex flex-col items-center justify-center text-(--text-secondary) gap-2'>
            <Table size={24} className='opacity-40' />
            <p className='text-sm text-(--text-primary)'>
                Run a query to see results
            </p>
            <p className='text-xs opacity-70'>Ctrl+Enter</p>
        </div>
    );
}

function NoRows() {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-2'>
            <CheckCircle2 size={24} className='text-emerald-500' />
            <p className='text-sm text-(--text-primary)'>Query executed</p>
            <p className='text-xs text-(--text-secondary)'>No rows returned</p>
        </div>
    );
}

export default function Result() {
    const { QueryError, QueryResult } = useStateContext();

    if (QueryError) return <ErrorBox error={QueryError} />;
    if (!QueryResult?.length) return <EmptyBox />;

    const [firstResult] = QueryResult as DuckQueryResult[];
    const columns = firstResult?.columns ?? [];
    const values = firstResult?.values ?? [];
    const { statementType, affectedRows } = firstResult ?? {};

    if (columns?.length && values?.length) {
        return <DataTable columns={columns} values={values} />;
    }

    if (statementType) {
        const selectTypes = ['SELECT', 'SHOW', 'DESCRIBE', 'EXPLAIN', 'PRAGMA'];
        if (selectTypes.includes(statementType)) return <NoRows />;
        return <SuccessBox type={statementType} rows={affectedRows} />;
    }

    return columns?.length ? <NoRows /> : <EmptyBox />;
}

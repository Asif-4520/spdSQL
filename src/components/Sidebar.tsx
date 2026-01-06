import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Table, Trash2 } from 'lucide-react';

interface Props {
    schema: { [table: string]: string[] };
    history: {
        query: string;
        timestamp: number;
        status: 'success' | 'error';
    }[];
    onSelectQuery: (query: string) => void;
    onViewSchema: () => void;
    onClearHistory: () => void;
}

const Sidebar: React.FC<Props> = ({
    schema,
    history,
    onSelectQuery,
    onViewSchema,
    onClearHistory,
}) => {
    const [activeTab, setActiveTab] = useState<'explorer' | 'history'>('explorer');
    const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({});

    const toggleTable = (table: string) => {
        setExpandedTables((prev) => ({ ...prev, [table]: !prev[table] }));
    };

    return (
        <div className='h-full flex flex-col bg-(--bg-sidebar) border-r border-(--border-color) text-(--text-secondary)'>
            <div className='flex border-b border-(--border-color)'>
                <button
                    className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'explorer'
                            ? 'text-(--accent-color) border-b-2 border-(--accent-color) bg-(--bg-main)'
                            : 'border-b-2 border-transparent hover:bg-(--bg-main)'
                        }`}
                    onClick={() => setActiveTab('explorer')}
                >
                    Explorer
                </button>
                <button
                    className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'history'
                            ? 'text-(--accent-color) border-b-2 border-(--accent-color) bg-(--bg-main)'
                            : 'border-b-2 border-transparent hover:bg-(--bg-main)'
                        }`}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </button>
            </div>

            <div className='flex-1 min-h-0 p-2 overflow-auto custom-scrollbar'>
                {activeTab === 'explorer' ? (
                    <div>
                        <div className='flex justify-between items-center mb-2 px-1'>
                            <div className='text-[10px] font-bold uppercase tracking-wider opacity-70'>
                                Tables
                            </div>
                            <button
                                onClick={onViewSchema}
                                className='text-[10px] bg-(--bg-activity-bar) hover:bg-(--accent-color) px-2 py-1 rounded-lg text-(--text-secondary) hover:text-white transition-colors'
                            >
                                Details
                            </button>
                        </div>
                        {Object.keys(schema).length === 0 ? (
                            <div className='text-xs p-3 italic opacity-60 text-center'>
                                No tables found
                            </div>
                        ) : (
                            Object.entries(schema).map(([table, columns]) => (
                                <div key={table} className='mb-1'>
                                    <div
                                        className='flex items-center gap-1.5 cursor-pointer hover:text-(--text-primary) hover:bg-(--bg-list-hover) px-2 py-1.5 rounded-lg transition-colors group'
                                        onClick={() => toggleTable(table)}
                                    >
                                        {expandedTables[table] ? (
                                            <ChevronDown size={14} className='opacity-70' />
                                        ) : (
                                            <ChevronRight size={14} className='opacity-70' />
                                        )}
                                        <Table size={14} className='text-(--accent-color)' />
                                        <span className='text-sm font-medium text-(--text-primary)'>
                                            {table}
                                        </span>
                                    </div>

                                    {expandedTables[table] && (
                                        <div className='ml-5 mt-1 border-l border-(--border-color) pl-2'>
                                            {columns.map((col) => (
                                                <div
                                                    key={col}
                                                    className='text-xs py-1 hover:text-(--text-primary) cursor-text select-text flex items-center gap-1.5'
                                                >
                                                    <div className='w-1.5 h-1.5 bg-(--accent-color) rounded-full opacity-50' />
                                                    {col}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className='w-full h-full flex flex-col overflow-hidden'>
                        <div className='flex w-full text-xs font-bold items-center pb-2 justify-between text-(--text-primary) px-1 shrink-0'>
                            <div className='uppercase tracking-wider opacity-70 text-[10px]'>
                                Recent
                            </div>
                            {history.length > 0 && (
                                <button
                                    className='p-1.5 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-colors'
                                    onClick={onClearHistory}
                                    title='Clear All'
                                >
                                    <Trash2 size={12} />
                                </button>
                            )}
                        </div>
                        {history.length === 0 && (
                            <div className='text-xs p-3 italic opacity-60 text-center'>
                                No history yet
                            </div>
                        )}
                        <div className='flex-1 overflow-y-auto custom-scrollbar space-y-1.5'>
                            {history.map((item, idx) => (
                                <div
                                    key={idx}
                                    className='group p-2.5 rounded-xl bg-(--bg-main) border border-(--border-color) hover:border-(--accent-color) cursor-pointer transition-all'
                                    onClick={() => onSelectQuery(item.query)}
                                >
                                    <div className='text-xs font-mono text-(--text-primary) line-clamp-2 mb-1.5'>
                                        {item.query}
                                    </div>
                                    <div className='flex justify-between items-center text-[10px]'>
                                        <span
                                            className={
                                                item.status === 'success'
                                                    ? 'text-green-400'
                                                    : 'text-red-400'
                                            }
                                        >
                                            {item.status === 'success' ? '✓ Success' : '✗ Error'}
                                        </span>
                                        <span className='opacity-60'>
                                            {new Date(item.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;

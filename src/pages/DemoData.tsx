import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
    importTables,
    DEMO_TABLES,
    TABLE_CATEGORIES,
    TABLE_PRESETS,
    getTablesWithDependencies,
} from '../lib/DB/db.demo';
import { RELATIVE } from '../routes/paths';
import toast from 'react-hot-toast';
import {
    Database,
    CheckSquare,
    Square,
    Loader2,
    Package,
    ArrowLeft,
    Info,
} from 'lucide-react';

function DemoData() {
    const navigate = useNavigate();
    const [selectedTables, setSelectedTables] = useState<Set<string>>(
        new Set()
    );
    const [isImporting, setIsImporting] = useState(false);

    const toggleTable = (tableId: string) => {
        const newSelected = new Set(selectedTables);
        if (newSelected.has(tableId)) {
            newSelected.delete(tableId);
        } else {
            newSelected.add(tableId);
        }
        setSelectedTables(newSelected);
    };

    const applyPreset = (presetId: string) => {
        const preset = TABLE_PRESETS[presetId as keyof typeof TABLE_PRESETS];
        if (preset) {
            setSelectedTables(new Set(preset.tables));
        }
    };

    const selectAllInCategory = (categoryId: string) => {
        const tablesInCategory = DEMO_TABLES.filter(
            (t) => t.category === categoryId
        );
        const newSelected = new Set(selectedTables);
        const allSelected = tablesInCategory.every((t) =>
            newSelected.has(t.id)
        );

        if (allSelected) {
            tablesInCategory.forEach((t) => newSelected.delete(t.id));
        } else {
            tablesInCategory.forEach((t) => newSelected.add(t.id));
        }
        setSelectedTables(newSelected);
    };

    const handleImportDemoTables = async () => {
        if (selectedTables.size === 0) {
            toast.error('Please select at least one table');
            return;
        }

        setIsImporting(true);
        const toastId = toast.loading('Importing demo tables...');

        try {
            const tableIds = Array.from(selectedTables);
            const { success, failed } = await importTables(tableIds);

            if (failed.length > 0) {
                toast.error(`Failed to import: ${failed.join(', ')}`, {
                    id: toastId,
                });
            } else {
                toast.success(
                    `Successfully imported ${success.length} table(s)`,
                    { id: toastId }
                );
                setTimeout(() => navigate(RELATIVE.BACK_TO_SCHEMA), 1000);
            }
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Import failed', { id: toastId });
        } finally {
            setIsImporting(false);
        }
    };

    const resolvedTables = getTablesWithDependencies(
        Array.from(selectedTables)
    );
    const addedDependencies = resolvedTables.filter(
        (t) => !selectedTables.has(t)
    );

    return (
        <div className='flex flex-col h-full p-6 overflow-auto'>
            <div className='flex items-center gap-4 mb-6'>
                <button
                    onClick={() => navigate(-1)}
                    className='p-2 rounded-xl hover:bg-(--bg-activity-bar) text-(--text-secondary) hover:text-(--text-primary) transition-colors'
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className='text-2xl font-bold text-(--text-primary)'>
                        Load Demo Data
                    </h1>
                    <p className='text-sm text-(--text-secondary)'>
                        Select tables to import sample data for learning SQL
                    </p>
                </div>
            </div>

            <div className='mb-6'>
                <h2 className='text-sm font-medium text-(--text-secondary) mb-3'>
                    Quick Presets
                </h2>
                <div className='flex flex-wrap gap-2'>
                    {Object.values(TABLE_PRESETS).map((preset) => (
                        <button
                            key={preset.id}
                            onClick={() => applyPreset(preset.id)}
                            className='flex items-center gap-2 px-4 py-2.5 rounded-xl bg-(--bg-activity-bar) hover:bg-(--bg-sidebar) border border-(--border-color) text-(--text-primary) text-sm transition-colors'
                            title={preset.description}
                        >
                            <span>{preset.icon}</span>
                            <span>{preset.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className='flex-1 overflow-auto'>
                <h2 className='text-sm font-medium text-(--text-secondary) mb-3'>
                    Select Tables
                </h2>
                <div className='grid gap-4'>
                    {TABLE_CATEGORIES.map((category) => {
                        const tablesInCategory = DEMO_TABLES.filter(
                            (t) => t.category === category.id
                        );
                        if (tablesInCategory.length === 0) return null;

                        const allSelected = tablesInCategory.every((t) =>
                            selectedTables.has(t.id)
                        );

                        return (
                            <div
                                key={category.id}
                                className='rounded-2xl border border-(--border-color) bg-(--bg-panel) overflow-hidden'
                            >
                                <button
                                    onClick={() =>
                                        selectAllInCategory(category.id)
                                    }
                                    className='flex items-center gap-3 w-full px-4 py-3.5 bg-(--bg-activity-bar) hover:bg-(--bg-sidebar) transition-colors'
                                >
                                    {allSelected ? (
                                        <CheckSquare
                                            size={18}
                                            className='text-(--accent-color)'
                                        />
                                    ) : (
                                        <Square
                                            size={18}
                                            className='text-(--text-secondary)'
                                        />
                                    )}
                                    <span className='text-lg'>
                                        {category.icon}
                                    </span>
                                    <span className='font-medium text-(--text-primary)'>
                                        {category.name}
                                    </span>
                                    <span className='text-xs text-(--text-secondary) ml-auto'>
                                        {tablesInCategory.length} table
                                        {tablesInCategory.length !== 1
                                            ? 's'
                                            : ''}
                                    </span>
                                </button>

                                <div className='grid gap-1 p-2'>
                                    {tablesInCategory.map((table) => {
                                        const isSelected = selectedTables.has(
                                            table.id
                                        );
                                        const isDependency =
                                            addedDependencies.includes(
                                                table.id
                                            );

                                        return (
                                            <button
                                                key={table.id}
                                                onClick={() =>
                                                    toggleTable(table.id)
                                                }
                                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                                                    isSelected || isDependency
                                                        ? 'bg-(--accent-color)/10'
                                                        : 'hover:bg-(--bg-activity-bar)'
                                                }`}
                                            >
                                                {isSelected ? (
                                                    <CheckSquare
                                                        size={16}
                                                        className='text-(--accent-color) shrink-0'
                                                    />
                                                ) : isDependency ? (
                                                    <CheckSquare
                                                        size={16}
                                                        className='text-(--text-secondary) shrink-0'
                                                    />
                                                ) : (
                                                    <Square
                                                        size={16}
                                                        className='text-(--text-secondary) shrink-0'
                                                    />
                                                )}
                                                <span className='text-lg'>
                                                    {table.icon}
                                                </span>
                                                <div className='flex-1 min-w-0'>
                                                    <div className='flex items-center gap-2'>
                                                        <span className='font-medium text-(--text-primary)'>
                                                            {table.displayName}
                                                        </span>
                                                        {isDependency &&
                                                            !isSelected && (
                                                                <span className='text-xs px-2 py-0.5 rounded-full bg-(--text-secondary)/20 text-(--text-secondary)'>
                                                                    dependency
                                                                </span>
                                                            )}
                                                    </div>
                                                    <div className='text-xs text-(--text-secondary) truncate'>
                                                        {table.description}
                                                    </div>
                                                </div>
                                                <span className='text-xs text-(--text-secondary) shrink-0'>
                                                    {table.rowCount} rows
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='sticky bottom-0 bg-(--bg-main) pt-4 border-t border-(--border-color) mt-4'>
                {addedDependencies.length > 0 && (
                    <div className='flex items-start gap-2 mb-3 p-3 rounded-xl bg-(--accent-color)/10 text-sm text-(--text-secondary)'>
                        <Info
                            size={16}
                            className='shrink-0 mt-0.5 text-(--accent-color)'
                        />
                        <span>
                            Dependencies will be included:{' '}
                            {addedDependencies.join(', ')}
                        </span>
                    </div>
                )}

                <div className='flex items-center justify-between gap-4'>
                    <div className='text-sm text-(--text-secondary) flex items-center gap-2'>
                        <Package size={16} />
                        {resolvedTables.length} table
                        {resolvedTables.length !== 1 ? 's' : ''} selected
                    </div>
                    <button
                        onClick={handleImportDemoTables}
                        disabled={isImporting || selectedTables.size === 0}
                        className='flex items-center gap-2 px-6 py-2.5 rounded-xl bg-(--accent-color) text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isImporting ? (
                            <>
                                <Loader2 size={18} className='animate-spin' />
                                Importing...
                            </>
                        ) : (
                            <>
                                <Database size={18} />
                                Import Selected
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DemoData;

import {
    Keyboard,
    Code,
    Database,
    Navigation,
    ArrowLeft,
    Copy,
    Edit,
    FolderOpen,
    Eye,
} from 'lucide-react';
import { useNavigate } from 'react-router';

interface ShortcutGroup {
    title: string;
    icon: React.ReactNode;
    shortcuts: { keys: string[]; action: string; description?: string }[];
}

export default function Shortcuts() {
    const navigate = useNavigate();

    const shortcutGroups: ShortcutGroup[] = [
        {
            title: 'App Shortcuts',
            icon: <Database size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'Enter'],
                    action: 'Run Query',
                    description: 'Execute the current SQL query',
                },
                {
                    keys: ['Ctrl', 'S'],
                    action: 'Save Database',
                    description: 'Export database as SQL file',
                },
                {
                    keys: ['Ctrl', 'Shift', 'R'],
                    action: 'Reset Database',
                    description: 'Reload page to reset DuckDB instance',
                },
                {
                    keys: ['Ctrl', 'L'],
                    action: 'Clear Editor',
                    description: 'Clear all text from the editor',
                },
                {
                    keys: ['Ctrl', 'E'],
                    action: 'Focus Editor',
                    description: 'Move focus to SQL editor',
                },
            ],
        },
        {
            title: 'File Operations',
            icon: <FolderOpen size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'I'],
                    action: 'Import Data',
                    description: 'Open import page',
                },
                {
                    keys: ['Ctrl', 'Shift', 'E'],
                    action: 'Export Data',
                    description: 'Open export page',
                },
                {
                    keys: ['Ctrl', 'Shift', 'D'],
                    action: 'Demo Data',
                    description: 'Open demo data page',
                },
            ],
        },
        {
            title: 'View & Navigation',
            icon: <Eye size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', '1'],
                    action: 'Go to Editor',
                    description: 'Navigate to SQL editor',
                },
                {
                    keys: ['Ctrl', '2'],
                    action: 'Go to Schema',
                    description: 'Navigate to schema view',
                },
                {
                    keys: ['Ctrl', '3'],
                    action: 'Go to History',
                    description: 'Navigate to query history',
                },
                
                {
                    keys: ['Ctrl', '\\'],
                    action: 'Toggle Split',
                    description: 'Toggle horizontal/vertical split',
                },
                {
                    keys: ['Ctrl', 'T'],
                    action: 'Toggle Theme',
                    description: 'Switch between dark and light mode',
                },
                {
                    keys: ['Ctrl', 'K'],
                    action: 'Keyboard Shortcuts',
                    description: 'Show this shortcuts page',
                },
            ],
        },
        {
            title: 'Editor - Basic Editing',
            icon: <Edit size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'Z'],
                    action: 'Undo',
                    description: 'Undo last change',
                },
                {
                    keys: ['Ctrl', 'Shift', 'Z'],
                    action: 'Redo',
                    description: 'Redo last undone change',
                },
                {
                    keys: ['Ctrl', 'Y'],
                    action: 'Redo (Alt)',
                    description: 'Alternative redo shortcut',
                },
                {
                    keys: ['Ctrl', 'A'],
                    action: 'Select All',
                    description: 'Select all text in editor',
                },
                {
                    keys: ['Ctrl', 'X'],
                    action: 'Cut Line',
                    description: 'Cut current line (if no selection)',
                },
                {
                    keys: ['Ctrl', 'C'],
                    action: 'Copy Line',
                    description: 'Copy current line (if no selection)',
                },
                {
                    keys: ['Ctrl', 'V'],
                    action: 'Paste',
                    description: 'Paste from clipboard',
                },
            ],
        },
        {
            title: 'Selection & Cursor',
            icon: <Copy size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'D'],
                    action: 'Select Word',
                    description: 'Select word at cursor, then next occurrence',
                },
                {
                    keys: ['Ctrl', 'Shift', 'L'],
                    action: 'Select All Occurrences',
                    description: 'Select all occurrences of current word',
                },
                {
                    keys: ['Alt', 'Click'],
                    action: 'Add Cursor',
                    description: 'Add cursor at click position',
                },
                {
                    keys: ['Ctrl', 'Alt', '↑'],
                    action: 'Add Cursor Above',
                    description: 'Add cursor on line above',
                },
                {
                    keys: ['Ctrl', 'Alt', '↓'],
                    action: 'Add Cursor Below',
                    description: 'Add cursor on line below',
                },
                {
                    keys: ['Esc'],
                    action: 'Single Cursor',
                    description: 'Reduce to single cursor',
                },
                {
                    keys: ['Ctrl', 'U'],
                    action: 'Undo Selection',
                    description: 'Undo last selection change',
                },
            ],
        },
        {
            title: 'Line Operations',
            icon: <Code size={18} />,
            shortcuts: [
                {
                    keys: ['Alt', '↑'],
                    action: 'Move Line Up',
                    description: 'Move current line up',
                },
                {
                    keys: ['Alt', '↓'],
                    action: 'Move Line Down',
                    description: 'Move current line down',
                },
                {
                    keys: ['Shift', 'Alt', '↑'],
                    action: 'Copy Line Up',
                    description: 'Duplicate line above',
                },
                {
                    keys: ['Shift', 'Alt', '↓'],
                    action: 'Copy Line Down',
                    description: 'Duplicate line below',
                },
                {
                    keys: ['Ctrl', 'Shift', 'K'],
                    action: 'Delete Line',
                    description: 'Delete entire current line',
                },
                {
                    keys: ['Ctrl', '/'],
                    action: 'Toggle Comment',
                    description: 'Comment/uncomment line',
                },
                {
                    keys: ['Ctrl', 'Enter'],
                    action: 'Insert Line Below',
                    description: 'Insert new line below',
                },
                {
                    keys: ['Ctrl', 'Shift', 'Enter'],
                    action: 'Insert Line Above',
                    description: 'Insert new line above',
                },
                {
                    keys: ['Tab'],
                    action: 'Indent',
                    description: 'Indent selected lines',
                },
                {
                    keys: ['Shift', 'Tab'],
                    action: 'Outdent',
                    description: 'Remove indent from lines',
                },
                {
                    keys: ['Ctrl', '['],
                    action: 'Outdent (Alt)',
                    description: 'Alternative outdent',
                },
                {
                    keys: ['Ctrl', ']'],
                    action: 'Indent (Alt)',
                    description: 'Alternative indent',
                },
            ],
        },
        {
            title: 'Search & Replace',
            icon: <Code size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'F'],
                    action: 'Find',
                    description: 'Open search panel',
                },
                {
                    keys: ['Ctrl', 'H'],
                    action: 'Find & Replace',
                    description: 'Open search and replace',
                },
                {
                    keys: ['F3'],
                    action: 'Find Next',
                    description: 'Go to next match',
                },
                {
                    keys: ['Shift', 'F3'],
                    action: 'Find Previous',
                    description: 'Go to previous match',
                },
                {
                    keys: ['Ctrl', 'G'],
                    action: 'Go to Line',
                    description: 'Jump to specific line number',
                },
            ],
        },
        {
            title: 'Code Intelligence',
            icon: <Code size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'Space'],
                    action: 'Autocomplete',
                    description: 'Trigger SQL autocomplete',
                },
                {
                    keys: ['Ctrl', '.'],
                    action: 'Quick Fix',
                    description: 'Show quick fix suggestions',
                },
                {
                    keys: ['Ctrl', 'Shift', 'Space'],
                    action: 'Parameter Hints',
                    description: 'Show function parameter info',
                },
            ],
        },
        {
            title: 'Editor - Navigation',
            icon: <Navigation size={18} />,
            shortcuts: [
                {
                    keys: ['Ctrl', 'Home'],
                    action: 'Go to Start',
                    description: 'Jump to start of document',
                },
                {
                    keys: ['Ctrl', 'End'],
                    action: 'Go to End',
                    description: 'Jump to end of document',
                },
                {
                    keys: ['Ctrl', '←'],
                    action: 'Word Left',
                    description: 'Move cursor left by word',
                },
                {
                    keys: ['Ctrl', '→'],
                    action: 'Word Right',
                    description: 'Move cursor right by word',
                },
                {
                    keys: ['Ctrl', 'G'],
                    action: 'Go to Line',
                    description: 'Jump to specific line number',
                },
            ],
        },
    ];

    const KeyCap = ({ k }: { k: string }) => (
        <span className='inline-flex items-center justify-center min-w-7 h-7 px-2 bg-(--bg-title-bar) border border-(--border-color) rounded text-xs font-mono font-medium shadow-sm'>
            {k === 'Ctrl'
                ? '⌃ Ctrl'
                : k === 'Shift'
                ? '⇧ Shift'
                : k === 'Alt'
                ? '⌥ Alt'
                : k === 'Enter'
                ? '↵ Enter'
                : k}
        </span>
    );

    return (
        <div className='h-full overflow-auto bg-(--bg-panel) text-(--text-primary)'>
            <div className='max-w-3xl mx-auto p-6 pb-12'>
                <div className='flex items-center gap-3 mb-6'>
                    <button
                        onClick={() => navigate(-1)}
                        className='p-2 hover:bg-(--bg-activity-bar) rounded-lg transition-colors'
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className='text-xl font-bold flex items-center gap-2'>
                            <Keyboard
                                size={22}
                                className='text-(--accent-color)'
                            />
                            Keyboard Shortcuts
                        </h1>
                        <p className='text-sm text-(--text-secondary)'>
                            On macOS, use{' '}
                            <span className='font-mono'>⌘ Cmd</span> instead of
                            Ctrl
                        </p>
                    </div>
                </div>

                <div className='space-y-6'>
                    {shortcutGroups.map((group, gi) => (
                        <div
                            key={gi}
                            className='bg-(--bg-main) border border-(--border-color) rounded-xl p-5'
                        >
                            <div className='flex items-center gap-2 mb-4 text-(--accent-color)'>
                                {group.icon}
                                <h2 className='font-semibold'>{group.title}</h2>
                            </div>
                            <div className='space-y-2'>
                                {group.shortcuts.map((s, i) => (
                                    <div
                                        key={i}
                                        className='flex items-center justify-between p-3 bg-(--bg-panel) rounded-lg hover:bg-(--bg-activity-bar) transition-colors'
                                    >
                                        <div className='flex-1'>
                                            <div className='font-medium text-sm'>
                                                {s.action}
                                            </div>
                                            {s.description && (
                                                <div className='text-xs text-(--text-secondary) mt-0.5'>
                                                    {s.description}
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            {s.keys.map((k, ki) => (
                                                <span
                                                    key={ki}
                                                    className='flex items-center gap-1'
                                                >
                                                    <KeyCap k={k} />
                                                    {ki < s.keys.length - 1 && (
                                                        <span className='text-(--text-secondary) text-xs'>
                                                            +
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

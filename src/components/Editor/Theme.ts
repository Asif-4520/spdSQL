import { EditorView } from '@codemirror/view';
export const DarkTheme = EditorView.theme(
    {
        '&': {
            backgroundColor: '#1f2937',
            color: '#e5e7eb',
        },
        '.cm-content': {
            caretColor: '#82aaff',
            padding: '10px 0',
        },
        '.cm-cursor': {
            borderLeftColor: '#82aaff',
        },
        '.cm-activeLine': {
            backgroundColor: '#273449',
        },
        '.cm-activeLineGutter': {
            backgroundColor: '#273449',
            color: '#9ca3af',
        },
        '.cm-selectionBackground': {
            backgroundColor: '#374151 !important',
        },
        '.cm-gutters': {
            backgroundColor: '#111827',
            color: '#6b7280',
            borderRight: '1px solid #374151',
        },
        '.cm-matchingBracket': {
            backgroundColor: '#374151',
            outline: '1px solid #82aaff',
        },
        '.cm-scroller': {
            fontFamily: 'monospace',
            lineHeight: '1.65',
        },
    },
    { dark: true }
);

export const LightTheme = EditorView.theme({
    '&': {
        backgroundColor: '#ffffff',
        color: '#1f2937',
    },
    '.cm-content': {
        caretColor: '#6366f1',
        padding: '10px 0',
    },
    '.cm-activeLine': {
        backgroundColor: '#f3f4f6',
    },
    '.cm-activeLineGutter': {
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
    },
    '.cm-selectionBackground': {
        backgroundColor: '#e0e7ff !important',
    },
    '.cm-gutters': {
        backgroundColor: '#f9fafb',
        color: '#6b7280',
        borderRight: '1px solid #e5e7eb',
    },
    '.cm-matchingBracket': {
        backgroundColor: '#e0e7ff',
        outline: '1px solid #6366f1',
    },
});

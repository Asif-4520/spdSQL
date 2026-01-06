import { useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useStateContext } from '../context/GlobalContext';
import { useSettingsStore } from '../store';
import { saveDatabase } from '../lib/DB/duckdb.service';
import { RELATIVE, isPath } from '../routes/paths';
import toast from 'react-hot-toast';
import { useQueryRunner } from './useQueryRunner';

interface Shortcut {
    key: string;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    action: () => void | Promise<void>;
    allowInInput?: boolean;
}

export function useKeyboardShortcuts() {
    const navigate = useNavigate();
    const ctx = useStateContext();
    const { runQuery } = useQueryRunner();
    const { toggleTheme, isVertical, setIsVertical } = useSettingsStore();

    const runQueryWithState = useCallback(async () => {
        if (isPath.schema(window.location.pathname)) return;
        await runQuery();
    }, [runQuery]);

    const handleSaveDatabase = useCallback(async () => {
        const toastId = toast.loading('Saving database...');
        try {
            await saveDatabase();
            toast.success('Database saved!', { id: toastId });
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Save failed';
            toast.error(message, { id: toastId });
        }
    }, []);

    const clearEditor = useCallback(() => ctx.setQuery(''), [ctx]);
    const focusEditor = useCallback(
        () => (document.querySelector('.cm-content') as HTMLElement)?.focus(),
        []
    );
    const toggleSplit = useCallback(
        () => setIsVertical(!isVertical),
        [isVertical, setIsVertical]
    );
    const goTo = useCallback(
        (path: string) => () => navigate(path),
        [navigate]
    );

    const shortcuts: Shortcut[] = useMemo(
        () => [
            {
                key: 'Enter',
                ctrl: true,
                action: runQueryWithState,
                allowInInput: true,
            },
            { key: 's', ctrl: true, action: handleSaveDatabase },
            { key: 'i', ctrl: true, action: goTo(RELATIVE.IMPORT) },
            {
                key: 'e',
                ctrl: true,
                shift: true,
                action: goTo(RELATIVE.EXPORT),
            },
            {
                key: 'd',
                ctrl: true,
                shift: true,
                action: goTo(RELATIVE.DEMO),
            },
            { key: 'l', ctrl: true, action: clearEditor },
            { key: 'e', ctrl: true, action: focusEditor },
            { key: '\\', ctrl: true, action: toggleSplit },
            { key: 't', ctrl: true, action: toggleTheme },
            { key: '1', ctrl: true, action: goTo(RELATIVE.EDITOR) },
            { key: '2', ctrl: true, action: goTo(RELATIVE.SCHEMA) },
            { key: '3', ctrl: true, action: goTo(RELATIVE.HISTORY) },
            { key: 'k', ctrl: true, action: goTo(RELATIVE.SHORTCUTS) },
            {
                key: 'r',
                ctrl: true,
                shift: true,
                action: () => window.location.reload(),
            },
        ],
        [
            clearEditor,
            focusEditor,
            goTo,
            handleSaveDatabase,
            runQueryWithState,
            toggleSplit,
            toggleTheme,
        ]
    );

    useEffect(() => {
        const handler = async (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            const isInInput =
                target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
            const isInEditor = target.closest('.cm-editor') !== null;

            for (const s of shortcuts) {
                const keyMatch =
                    s.key.toLowerCase() === e.key.toLowerCase() ||
                    s.key === e.key;
                const ctrlMatch =
                    (s.ctrl ?? false) === (e.ctrlKey || e.metaKey);
                const shiftMatch = (s.shift ?? false) === e.shiftKey;
                const altMatch = (s.alt ?? false) === e.altKey;

                if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
                    if (isInInput && !isInEditor && !s.allowInInput) return;
                    e.preventDefault();
                    await s.action();
                    return;
                }
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [shortcuts]);

    return {
        runQuery,
        handleSaveDatabase,
        clearEditor,
        focusEditor,
        toggleSplit,
        toggleTheme,
    };
}

export default useKeyboardShortcuts;

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { sql } from '@codemirror/lang-sql';
import { autocompletion } from '@codemirror/autocomplete';
import { syntaxHighlighting } from '@codemirror/language';
import { useStateContext } from '../context/GlobalContext';
import { useSettingsStore } from '../store';
import { Dark, Light } from './Editor/HighlightStyle';
import { DarkTheme, LightTheme } from './Editor/Theme';

export default function Editor() {
    const ref = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const debounceRef = useRef<number | null>(null);

    const langCompartment = useMemo(() => new Compartment(), []);
    const themeCompartment = useMemo(() => new Compartment(), []);
    const lineNumbersCompartment = useMemo(() => new Compartment(), []);
    const fontSizeCompartment = useMemo(() => new Compartment(), []);

    const { Query, setQuery, Schema, setEditorGetValue } = useStateContext();
    const { resolvedTheme, fontSize, showLineNumbers } = useSettingsStore();

    const [initialized, setInitialized] = useState<boolean>(false);

    const fontSizeTheme = useCallback(
        (size: number) =>
            EditorView.theme({
                '&': { fontSize: `${size}px` },
                '.cm-scroller': { fontSize: `${size}px` },
            }),
        []
    );

    useEffect(() => {
        if (!ref.current) return;

        const state = EditorState.create({
            doc: Query,
            extensions: [
                keymap.of([...defaultKeymap, ...historyKeymap]),
                history(),
                autocompletion(),

                langCompartment.of(sql({ upperCaseKeywords: true })),

                themeCompartment.of(
                    resolvedTheme === 'dark'
                        ? [DarkTheme, syntaxHighlighting(Dark)]
                        : [LightTheme, syntaxHighlighting(Light)]
                ),

                fontSizeCompartment.of(fontSizeTheme(fontSize)),
                lineNumbersCompartment.of(showLineNumbers ? lineNumbers() : []),

                EditorView.updateListener.of((update) => {
                    if (!update.docChanged) return;
                    if (debounceRef.current) clearTimeout(debounceRef.current);
                    debounceRef.current = window.setTimeout(() => {
                        setQuery(update.state.doc.toString());
                    }, 300);
                }),

                EditorView.theme({
                    '&': { height: '100%' },
                }),
            ],
        });

        viewRef.current = new EditorView({
            state,
            parent: ref.current,
        });

        setTimeout(() => setInitialized(true), 0);

        return () => viewRef.current?.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setEditorGetValue(
            () => () => viewRef.current?.state.doc.toString() ?? ''
        );
        return () => setEditorGetValue(() => null);
    }, [setEditorGetValue]);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;
        if (view.state.doc.toString() === Query) return;

        view.dispatch({
            changes: { from: 0, to: view.state.doc.length, insert: Query },
        });
    }, [Query]);
    useEffect(() => {
        viewRef.current?.dispatch({
            effects: langCompartment.reconfigure(
                sql({ schema: Schema, upperCaseKeywords: true })
            ),
        });
    }, [Schema, langCompartment]);

    useEffect(() => {
        if (!viewRef.current || !initialized) return;

        viewRef.current.dispatch({
            effects: themeCompartment.reconfigure(
                resolvedTheme === 'dark'
                    ? [DarkTheme, syntaxHighlighting(Dark)]
                    : [LightTheme, syntaxHighlighting(Light)]
            ),
        });
    }, [resolvedTheme, initialized, themeCompartment]);

    useEffect(() => {
        if (!viewRef.current || !initialized) return;
        viewRef.current.dispatch({
            effects: fontSizeCompartment.reconfigure(fontSizeTheme(fontSize)),
        });
    }, [fontSize, initialized, fontSizeCompartment, fontSizeTheme]);

    useEffect(() => {
        if (!viewRef.current || !initialized) return;
        viewRef.current.dispatch({
            effects: lineNumbersCompartment.reconfigure(
                showLineNumbers ? lineNumbers() : []
            ),
        });
    }, [showLineNumbers, initialized, lineNumbersCompartment]);

    return <div ref={ref} className='h-full w-full overflow-hidden' />;
}

import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { EditorState, Compartment } from "@codemirror/state";
import {
    EditorView,
    keymap,
    lineNumbers,
    placeholder as placeholderExt,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { sql } from "@codemirror/lang-sql";
import { autocompletion } from "@codemirror/autocomplete";
import { syntaxHighlighting } from "@codemirror/language";
import { useStateContext } from "../../context/GlobalContext";
import { useSettingsStore } from "../../store";
import { highlightStyles } from "../../components/Editor/HighlightStyle";
import {
    editorThemes,
    type EditorThemeKey,
} from "../../components/Editor/Theme";

interface EditorProps {
    value?: string;
    onChange?: (value: string) => void;
    schema?: Record<string, string[]>;
    placeholder?: string;
}

export default function Editor({
    value,
    onChange,
    schema: schemaProp,
    placeholder,
}: EditorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const debounceRef = useRef<number | null>(null);

    const langCompartment = useMemo(() => new Compartment(), []);
    const themeCompartment = useMemo(() => new Compartment(), []);
    const lineNumbersCompartment = useMemo(() => new Compartment(), []);
    const fontSizeCompartment = useMemo(() => new Compartment(), []);

    const context = useStateContext();
    const {
        resolvedTheme,
        fontSize,
        showLineNumbers,
        editorTheme,
        editorHighlight,
    } = useSettingsStore();

    const pickThemeKey = useCallback(
        (
            theme: EditorThemeKey | "match",
            appTheme: EditorThemeKey
        ): EditorThemeKey => {
            if (theme === "match") {
                return appTheme;
            }
            return theme;
        },
        []
    );

    const currentQuery = value !== undefined ? value : context.Query;
    const currentSchema =
        schemaProp !== undefined ? schemaProp : context.Schema;

    const [initialized, setInitialized] = useState<boolean>(false);

    const fontSizeTheme = useCallback(
        (size: number) =>
            EditorView.theme({
                "&": { fontSize: `${size}px` },
                ".cm-scroller": { fontSize: `${size}px` },
            }),
        []
    );

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const state = EditorState.create({
            doc: currentQuery,
            extensions: [
                keymap.of([...defaultKeymap, ...historyKeymap]),
                history(),
                autocompletion(),

                langCompartment.of(
                    sql({
                        schema: currentSchema,
                        upperCaseKeywords: true,
                    })
                ),

                themeCompartment.of(
                    (() => {
                        const appTheme = resolvedTheme as EditorThemeKey;
                        const themeKey = pickThemeKey(editorTheme, appTheme);
                        const isDark =
                            themeKey === "dark" ||
                            themeKey === "midnight" ||
                            themeKey === "forest";
                        const highlight =
                            highlightStyles[editorHighlight][
                                isDark ? "dark" : "light"
                            ];
                        return [
                            editorThemes[themeKey],
                            syntaxHighlighting(highlight),
                        ];
                    })()
                ),

                fontSizeCompartment.of(fontSizeTheme(fontSize)),
                lineNumbersCompartment.of(showLineNumbers ? lineNumbers() : []),

                EditorView.updateListener.of((update) => {
                    if (!update.docChanged) {
                        return;
                    }
                    const newValue = update.state.doc.toString();

                    if (onChange) {
                        onChange(newValue);
                    } else {
                        if (debounceRef.current) {
                            clearTimeout(debounceRef.current);
                        }
                        debounceRef.current = window.setTimeout(() => {
                            context.setQuery(newValue);
                        }, 300);
                    }
                }),

                EditorView.theme({
                    "&": { height: "100%" },
                    ".cm-content": { padding: "20px 0" },
                    ...(placeholder
                        ? {
                              "&.cm-focused .cm-placeholder": {
                                  display: "none",
                              },
                          }
                        : {}),
                }),

                placeholder ? placeholderExt(placeholder) : [],
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
        const view = viewRef.current;
        if (!view) {
            return;
        }
        if (view.state.doc.toString() === currentQuery) {
            return;
        }

        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: currentQuery,
            },
        });
    }, [currentQuery]);

    useEffect(() => {
        viewRef.current?.dispatch({
            effects: langCompartment.reconfigure(
                sql({ schema: currentSchema, upperCaseKeywords: true })
            ),
        });
    }, [currentSchema, langCompartment]);

    useEffect(() => {
        if (!viewRef.current || !initialized) {
            return;
        }

        viewRef.current.dispatch({
            effects: themeCompartment.reconfigure(
                (() => {
                    const appTheme = resolvedTheme as EditorThemeKey;
                    const themeKey = pickThemeKey(editorTheme, appTheme);
                    const isDark =
                        themeKey === "dark" ||
                        themeKey === "midnight" ||
                        themeKey === "forest";
                    const highlight =
                        highlightStyles[editorHighlight][
                            isDark ? "dark" : "light"
                        ];
                    return [
                        editorThemes[themeKey],
                        syntaxHighlighting(highlight),
                    ];
                })()
            ),
        });
    }, [
        resolvedTheme,
        initialized,
        themeCompartment,
        editorTheme,
        editorHighlight,
        pickThemeKey,
    ]);

    useEffect(() => {
        if (!viewRef.current || !initialized) {
            return;
        }
        viewRef.current.dispatch({
            effects: fontSizeCompartment.reconfigure(fontSizeTheme(fontSize)),
        });
    }, [fontSize, initialized, fontSizeCompartment, fontSizeTheme]);

    useEffect(() => {
        if (!viewRef.current || !initialized) {
            return;
        }
        viewRef.current.dispatch({
            effects: lineNumbersCompartment.reconfigure(
                showLineNumbers ? lineNumbers() : []
            ),
        });
    }, [showLineNumbers, initialized, lineNumbersCompartment]);

    return <div ref={ref} className="h-full w-full overflow-hidden" />;
}

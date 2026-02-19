import type { ReactNode } from "react";

export interface QueryResultRow {
    columns: string[];
    values: any[][];
}

export interface HistoryEntry {
    query: string;
    timestamp: number;
    status: "success" | "error";
}

export interface Settings {
    editorFontSize: number;
    showLineNumbers: boolean;
    autoSaveHistory: boolean;
}

export interface GlobalContextState {
    Query: string;
    setQuery: (q: string) => void;
    isVertical: boolean;
    setisVertical: (v: boolean | ((p: boolean) => boolean)) => void;
    Theme: "light" | "dark";
    setTheme: (
        t: "light" | "dark" | ((p: "light" | "dark") => "light" | "dark")
    ) => void;
    Schema: Record<string, string[]>;
    setSchema: (s: Record<string, string[]>) => void;
    QueryResult: QueryResultRow[] | null;
    setQueryResult: (r: QueryResultRow[] | null) => void;
    QueryError: string | null;
    setQueryError: (e: string | null) => void;
    FullSchemaDetails: any;
    setFullSchemaDetails: (s: any) => void;
    ExecStatus: "ready" | "running" | "error";
    setExecStatus: (s: "ready" | "running" | "error") => void;
    ExecTimeMs: number | null;
    setExecTimeMs: (t: number | null) => void;
    History: HistoryEntry[];
    addHistory: (query: string, status: "success" | "error") => void;
    clearHistory: () => void;
    editorGetValue: (() => string) | null;
    setEditorGetValue: (fn: () => (() => string) | null) => void;
    settings: Settings;
    updateSettings: (key: keyof Settings, value: any) => void;
}

export interface GlobalContextProviderProps {
    children: ReactNode;
}

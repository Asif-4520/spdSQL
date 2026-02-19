import { useState, useEffect } from "react";
import type { Settings, HistoryEntry, QueryResultRow } from "./types";
import { loadSettings, saveSettings } from "./settings-storage";

export const useGlobalState = () => {
    const [Query, setQuery] = useState<string>("SELECT * FROM users;");
    const [Theme, setTheme] = useState<"light" | "dark">("dark");
    const [isVertical, setisVertical] = useState<boolean>(true);
    const [Schema, setSchema] = useState<Record<string, string[]>>({});
    const [QueryResult, setQueryResult] = useState<QueryResultRow[] | null>(
        null
    );
    const [QueryError, setQueryError] = useState<string | null>(null);
    const [FullSchemaDetails, setFullSchemaDetails] = useState<any>(null);
    const [ExecStatus, setExecStatus] = useState<"ready" | "running" | "error">(
        "ready"
    );
    const [ExecTimeMs, setExecTimeMs] = useState<number | null>(null);
    const [editorGetValue, setEditorGetValue] = useState<(() => string) | null>(
        null
    );
    const [History, setHistory] = useState<HistoryEntry[]>([]);
    const [settings, setSettings] = useState<Settings>(loadSettings);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    const updateSettings = (key: keyof Settings, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const addHistory = (query: string, status: "success" | "error") => {
        if (!settings.autoSaveHistory) {
            return;
        }
        setHistory((prev) =>
            [{ query, timestamp: Date.now(), status }, ...prev].slice(0, 200)
        );
    };

    const clearHistory = () => setHistory([]);

    return {
        Query,
        setQuery,
        isVertical,
        setisVertical,
        Theme,
        setTheme,
        Schema,
        setSchema,
        QueryResult,
        setQueryResult,
        QueryError,
        setQueryError,
        FullSchemaDetails,
        setFullSchemaDetails,
        ExecStatus,
        setExecStatus,
        ExecTimeMs,
        setExecTimeMs,
        History,
        addHistory,
        clearHistory,
        editorGetValue,
        setEditorGetValue,
        settings,
        updateSettings,
    };
};

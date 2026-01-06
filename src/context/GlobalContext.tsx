import {
    useState,
    useContext,
    createContext,
    useEffect,
    type ReactNode,
} from 'react';

interface Props {
    children: ReactNode;
}

type QueryResultRow = { columns: string[]; values: any[][] };

interface SettingsType {
    editorFontSize: number;
    showLineNumbers: boolean;
    autoSaveHistory: boolean;
}

const defaultSettings: SettingsType = {
    editorFontSize: 14,
    showLineNumbers: true,
    autoSaveHistory: true,
};

interface ContextType {
    Query: string;
    setQuery: (q: string) => void;
    isVertical: boolean;
    setisVertical: (v: boolean | ((p: boolean) => boolean)) => void;
    Theme: 'light' | 'dark';
    setTheme: (
        t: 'light' | 'dark' | ((p: 'light' | 'dark') => 'light' | 'dark')
    ) => void;
    Schema: Record<string, string[]>;
    setSchema: (s: Record<string, string[]>) => void;
    QueryResult: QueryResultRow[] | null;
    setQueryResult: (r: QueryResultRow[] | null) => void;
    QueryError: string | null;
    setQueryError: (e: string | null) => void;
    FullSchemaDetails: any;
    setFullSchemaDetails: (s: any) => void;
    ExecStatus: 'ready' | 'running' | 'error';
    setExecStatus: (s: 'ready' | 'running' | 'error') => void;
    ExecTimeMs: number | null;
    setExecTimeMs: (t: number | null) => void;
    History: {
        query: string;
        timestamp: number;
        status: 'success' | 'error';
    }[];
    addHistory: (query: string, status: 'success' | 'error') => void;
    clearHistory: () => void;
    editorGetValue: (() => string) | null;
    setEditorGetValue: (fn: () => (() => string) | null) => void;
    settings: SettingsType;
    updateSettings: (key: keyof SettingsType, value: any) => void;
}

const Context = createContext<ContextType | null>(null);

function GlobalContext({ children }: Props) {
    const [Query, setQuery] = useState<string>('SELECT * FROM users;');
    const [Theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isVertical, setisVertical] = useState<boolean>(true);
    const [Schema, setSchema] = useState<Record<string, string[]>>({});
    const [QueryResult, setQueryResult] = useState<QueryResultRow[] | null>(
        null
    );
    const [QueryError, setQueryError] = useState<string | null>(null);
    const [FullSchemaDetails, setFullSchemaDetails] = useState<any>(null);
    const [ExecStatus, setExecStatus] = useState<'ready' | 'running' | 'error'>(
        'ready'
    );
    const [ExecTimeMs, setExecTimeMs] = useState<number | null>(null);
    const [editorGetValue, setEditorGetValue] = useState<(() => string) | null>(
        null
    );
    const [History, setHistory] = useState<
        { query: string; timestamp: number; status: 'success' | 'error' }[]
    >([]);

    const [settings, setSettings] = useState<SettingsType>(() => {
        const saved = localStorage.getItem('SQLio-settings');
        if (saved) {
            try {
                return { ...defaultSettings, ...JSON.parse(saved) };
            } catch {
                return defaultSettings;
            }
        }
        return defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('SQLio-settings', JSON.stringify(settings));
    }, [settings]);

    const updateSettings = (key: keyof SettingsType, value: any) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const addHistory = (query: string, status: 'success' | 'error') => {
        if (!settings.autoSaveHistory) return;
        setHistory((prev) =>
            [{ query, timestamp: Date.now(), status }, ...prev].slice(0, 200)
        );
    };

    const clearHistory = () => setHistory([]);

    return (
        <Context.Provider
            value={{
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
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error('useStateContext must be used in provider');
    return ctx;
};

export default GlobalContext;

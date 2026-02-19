import {
    Table,
    CheckCircle2,
    AlertCircle,
    Plus,
    Database,
    FileEdit,
    Trash2,
} from "lucide-react";
import { CopyBtn } from "./CopyButton";

export function EmptyBox() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-(--text-secondary) gap-2 p-4">
            <Table size={24} className="opacity-40" />
            <p className="text-sm text-(--text-primary) text-center">
                Run a query to see results
            </p>
            <p className="text-xs opacity-70 text-center">
                Ctrl+Enter or Cmd+Enter
            </p>
        </div>
    );
}

export function NoRows() {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-2 p-4">
            <CheckCircle2 size={24} className="text-emerald-500" />
            <p className="text-sm text-(--text-primary) text-center">
                Query executed
            </p>
            <p className="text-xs text-(--text-secondary) text-center">
                No rows returned
            </p>
        </div>
    );
}

interface SuccessBoxProps {
    type: string;
    rows?: number;
}

export function SuccessBox({ type, rows }: SuccessBoxProps) {
    const icons: Record<string, React.ReactNode> = {
        INSERT: <Plus size={20} className="text-emerald-500" />,
        UPDATE: <FileEdit size={20} className="text-amber-500" />,
        DELETE: <Trash2 size={20} className="text-red-500" />,
        CREATE: <Database size={20} className="text-violet-500" />,
    };

    const msg =
        rows !== undefined ? `${rows} row(s) affected` : `${type} successful`;

    return (
        <div className="h-full flex items-center justify-center p-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 bg-(--bg-panel) border border-(--border-color) rounded-xl max-w-md w-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-(--bg-activity-bar) flex items-center justify-center shrink-0">
                    {icons[type] || (
                        <CheckCircle2 size={20} className="text-blue-500" />
                    )}
                </div>
                <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 font-medium text-(--text-primary) text-sm sm:text-base">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        {type} Successful
                    </div>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                        {msg}
                    </p>
                </div>
            </div>
        </div>
    );
}

interface ErrorBoxProps {
    error: string;
    resolvedTheme: string;
}

export function ErrorBox({ error, resolvedTheme }: ErrorBoxProps) {
    const isLight =
        resolvedTheme === "light" ||
        resolvedTheme === "solarized" ||
        resolvedTheme === "pastel";

    return (
        <div className="h-full p-2 sm:p-3 overflow-auto">
            <div
                className="p-3 sm:p-4 rounded-lg"
                style={{
                    backgroundColor: isLight
                        ? "#fef2f2"
                        : "rgba(239, 68, 68, 0.08)",
                }}
            >
                <div className="flex items-start gap-2">
                    <AlertCircle
                        size={16}
                        style={{
                            color: isLight ? "#dc2626" : "#f87171",
                            marginTop: 2,
                            flexShrink: 0,
                        }}
                    />
                    <div className="flex-1 min-w-0 overflow-auto">
                        <pre
                            className="text-xs sm:text-sm whitespace-pre-wrap font-mono"
                            style={{
                                color: isLight ? "#b91c1c" : "#fca5a5",
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                            }}
                        >
                            {error}
                        </pre>
                    </div>
                    <CopyBtn text={error} />
                </div>
            </div>
        </div>
    );
}
